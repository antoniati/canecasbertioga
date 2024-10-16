"use server";

import { OrderStatus, UserRole } from "@prisma/client";

import { currentUser } from "@/hooks/useServerSideUser";
import { sendOrderOnTheWayEmail } from "@/lib/mail";
import { db } from "@/lib/prismadb";

export const updateOrderStatusToInTransit = async (orderId: string) => {
    const user = await currentUser();

    if (user && user.role === UserRole.ADMIN) {
        const orderUpdated = await db.order.update({
            where: { id: orderId },
            data: {
                orderStatus: OrderStatus.IN_TRANSIT,
            },
        });

        if (orderUpdated) {
            const emailSent = await sendOrderOnTheWayEmail(orderUpdated.email, orderUpdated.customerName, orderUpdated.id);
            return { success: "Status do pedido atualizado para em trânsito.", email: emailSent };
        } else {
            return { error: "Erro interno ao tentar atualizar o pedido" };
        }
    } else {
        return { error: "Você não tem permissão para executar esta ação!" };
    }
};