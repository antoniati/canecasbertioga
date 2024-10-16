"use server";

import { UserRole } from "@prisma/client";
import * as z from "zod";

import { currentUser } from "@/hooks/useServerSideUser";
import { db } from "@/lib/prismadb";
import { CategorySchema } from "@/schemas";
import { getCategoryByName } from "@/services/read/getCategories";

export const registerCategory = async (values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Insira campos válidos." };

    const { name, parent } = validatedFields.data;

    const existingCategoryName = await getCategoryByName(name);

    if (existingCategoryName) return { error: "Este nome já está registrado. Tente um nome diferente." };

    const user = await currentUser();

    if (user && user.role === UserRole.ADMIN) {
        await db.category.create({
            data: {
                name,
                parent,
                userId: user.id,
            },
        });

        return { success: "Categoria Registrada com Sucesso." };
    } else {
        return { error: "Você não tem permissão para executar esta ação!" };
    }
};