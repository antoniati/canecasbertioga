"use server";

import { db } from "@/lib/prismadb";

type UserUpdatePersonalDataType = {
    userId: string;
    email: string;
    customerName: string;
    phone: string;
};

export const updateUserPersonalData = async ({
    userId,
    email,
    customerName,
    phone,
}: UserUpdatePersonalDataType) => {
    try {
        return await db.user.update({
            where: { id: userId },
            data: {
                email,
                customerName,
                phone,
            },
        });
    } catch (error) {
        console.error("Erro Interno do Servidor", error);
        throw new Error("Erro Interno do Servidor");
    }
};
