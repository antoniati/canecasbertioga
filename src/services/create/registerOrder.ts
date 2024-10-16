"use server";

import { OrderStatus } from "@prisma/client";
import Stripe from "stripe";
import * as z from "zod";

import { db } from "@/lib/prismadb";
import { OrderSchema } from "@/schemas";

// Suprime o aviso do ESLint sobre o uso de require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SK);

export const registerOrder = async (values: z.infer<typeof OrderSchema>) => {
    const validatedFields = OrderSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos." };
    }

    const { customerName, email, city, state, zip, street, phone, cartProducts } = validatedFields.data;

    if (!Array.isArray(cartProducts) || !cartProducts.every(id => typeof id === "string")) {
        return { error: "O carrinho de produtos deve ser um array de strings." };
    }

    const uniqueIds = [...new Set(cartProducts)];
    const products = await db.product.findMany({
        where: { id: { in: uniqueIds } },
    });

    if (!products.length) return { error: "Nenhum produto encontrado no banco de dados." };

    let totalAmountInCents = 0;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const product of products) {
        const quantity = cartProducts.filter(id => id === product.id.toString()).length;
        if (quantity > 0 && product.stripePriceId) {
            line_items.push({
                price: product.stripePriceId,
                quantity,
            });
            totalAmountInCents += Math.round(product.price * 100) * quantity;
        } else {
            return { error: `O produto ${product.name} não possui um price_id no Stripe.` };
        }
    }

    try {
        // Criar a ordem no banco de dados antes de redirecionar para o Stripe
        const newOrder = await db.order.create({
            data: {
                customerName: customerName ?? "Cliente Novo",
                streetNumber: "",
                email: email ?? "",
                city,
                state,
                zip,
                street,
                phone: phone,
                line_items: line_items.map(item => ({
                    name: products.find(p => p.stripePriceId === item.price)?.name || "Produto não encontrado",
                    quantity: item.quantity,
                    price: products.find(p => p.stripePriceId === item.price)?.price || 0,
                })),
                paid: false,
                purchaseValue: parseFloat((totalAmountInCents / 100).toFixed(2)),
                orderStatus: OrderStatus.RECEIVED,
            },
        });

        // Criar uma sessão de checkout no Stripe com o ID da ordem
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            customer_email: email,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
            metadata: {
                orderId: newOrder.id, // Envia o ID do pedido no metadata
                customerName: customerName,
                email: email,
            },
        });

        return { url: session.url };
    } catch (error) {
        console.error("Erro ao criar sessão de pagamento no Stripe: ", error);
        return { error: "Erro ao criar sessão de pagamento. Tente novamente mais tarde." };
    }
};
