"use server";

import { db } from "@/lib/prismadb";

export const deleteCategory = async (categoryId: string): Promise<{ success: string, error: string }> => {
    try {
        const response = await db.category.delete({
            where: { id: categoryId },
        });

        if (!response) {
            return {
                error: "ID Inválido ou Inexistente.",
                success: "",
            };
        }

        return {
            success: "Categoria Deletada com Sucesso!",
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