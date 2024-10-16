"use server";

import { db } from "@/lib/prismadb";

type UpdateUserDataSecurityType = {
    userId: string;
    password: string;
    isTwoFactorEnabled: boolean;
}

export const updateUserDataSecurity = async ({ userId, password, isTwoFactorEnabled }: UpdateUserDataSecurityType) => {
    try {
        return await db.user.update({
            where: { id: userId },
            data: {
                password,
                isTwoFactorEnabled,
            },
        });
    } catch (error) {
        console.error("Erro Interno do Servidor", error);
        throw new Error("Erro Interno do Servidor");
    }
};