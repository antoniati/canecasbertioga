"use server";

import { db } from "@/lib/prismadb";

export const deleteProduct = async (productId: string): Promise<{ success: string, error: string }> => {
    try {
        const response = await db.product.delete({
            where: { id: productId },
        });

        if (!response) {
            return {
                error: "ID Inválido ou Inexistente.",
                success: "",
            };
        }

        return {
            success: "Caneca Deletada com Sucesso!",
            error: "",
        };
    } catch (error) {
        console.error("Erro Interno do Servidor:", error);

        return {
            success: "",
            error: "Erro Interno do Servidor",
        };
    }
};