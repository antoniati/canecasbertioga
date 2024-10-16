"use server";

import { UserRole } from "@prisma/client";
import * as z from "zod";

import { currentUser } from "@/hooks/useServerSideUser";
import { db } from "@/lib/prismadb";
import { ProductSchema } from "@/schemas";
import { getProductByName } from "@/services/read/getProducts";

const formatCurrencyToNumber = (value: string) => {
    if (!value) return 0; // caso o valor seja vazio
    return parseFloat(value.replace("R$", "").replace(".", "").replace(",", ".").trim());
};

export const registerProduct = async (values: z.infer<typeof ProductSchema>) => {
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

    if (existingProductName) return { error: "There is already a product registered with this name. Please try a different name." };

    const user = await currentUser();


    if (user && user.role === UserRole.ADMIN) {
        // Formatar os valores de price e costPrice para float
        const formattedPrice = formatCurrencyToNumber(price);
        const formattedCostPrice = formatCurrencyToNumber(costPrice);
        await db.product.create({
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

        return { success: "Produto registrado com sucesso." };
    } else {
        return { error: "You do not have permission to perform this action!" };
    }
};