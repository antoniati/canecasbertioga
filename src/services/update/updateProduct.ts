"use server";

import { UserRole } from "@prisma/client";
import * as z from "zod";

import { currentUser } from "@/hooks/useServerSideUser";
import { db } from "@/lib/prismadb";
import { ProductSchema } from "@/schemas";
import { getProductByName } from "@/services/read/getProducts";

const formatCurrencyToNumber = (value: string) => {
    if (!value) return 0; // caso o valor seja vazio
    return parseFloat(value.replace("R$", "").replace(",", ".").trim());
};

export const updateProduct = async (values: z.infer<typeof ProductSchema>, productId: string) => {
    const validatedFields = ProductSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid or missing fields. Please enter valid fields." };

    const {
        price,
        name,
        files,
        description,
        paymentUrl,
        googleMapsUrl,
        specifications = [],
        dimensions = [],
        features = [],
        recommendation = [],
        categoryId,
        categoryName,
        costPrice,
        locationDescription,
    } = validatedFields.data;

    const existingProductName = await getProductByName(name);

    if (existingProductName && existingProductName.id !== productId) {
        return { error: "Já existe um produto registrado com este nome. Tente um nome diferente." };
    }

    const user = await currentUser();

    if (user && user.role === UserRole.ADMIN) {
        // Formatar os valores de price e costPrice para float
        const formattedPrice = formatCurrencyToNumber(price);
        const formattedCostPrice = formatCurrencyToNumber(costPrice);

        await db.product.update({
            where: { id: productId },
            data: {
                name: name,
                files: files,
                description: description,
                locationDescription: locationDescription,
                price: formattedPrice,
                costPrice: formattedCostPrice,
                paymentUrl: paymentUrl,
                googleMapsUrl: googleMapsUrl,
                specifications: specifications,
                dimensions: dimensions,
                features: features,
                recommendations: recommendation,
                userId: user.id,
                categoryId: categoryId,
                categoryName: categoryName,
            },
        });

        return { success: "Produto atualizado com sucesso." };
    } else {
        return { error: "Você não tem permissão para executar esta ação!" };
    }
};