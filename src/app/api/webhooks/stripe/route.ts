"use server";

import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { sendOrderShippedEmail } from "@/lib/mail";
import { db } from "@/lib/prismadb";

const stripe = new Stripe(process.env.STRIPE_SK!, { apiVersion: "2024-06-20" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: NextRequest): Promise<Response> {
    const sig = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        const body = await request.text();
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error("Falha na verificação da assinatura do Webhook:", err);
        return NextResponse.json({ error: "Falha na verificação da assinatura do Webhook" }, { status: 400 });
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            // Responder ao Stripe para evitar timeout
            NextResponse.json({ received: true }, { status: 200 });

            // Extrair o orderId do metadata
            const orderId = session.metadata?.orderId;
            if (!orderId) throw new Error("ID do pedido não encontrado no metadata");

            const email = session.metadata?.email;
            const customerName = session.metadata?.customerName;

            // Atualizar o status do pedido no banco de dados
            await db.order.update({
                where: { id: orderId },
                data: { orderStatus: OrderStatus.PREPARING, paid: true },
            });

            const sessionCustomerName = session.customer_details?.name ?? "Client Novo";
            const sessionEmail = session.customer_details?.email ?? "Sem Email";

            await sendOrderShippedEmail(
                email ?? sessionEmail,
                customerName ?? sessionCustomerName,
                orderId,
            );
        }
    } catch (err) {
        console.log("Erro ao processar o webhook:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
}