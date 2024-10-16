"use server";

import { db } from "@/lib/prismadb";

export const getAllProducts = async () => {
    try {
        const allProducts = await db.product.findMany();
        return allProducts;

    } catch (error) {
        console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
        return [];
    }
};

export const getProductById = async (id: string | undefined) => {
    try {
        const product = await db.product.findUnique({ where: { id } });
        if (!product) {
            console.error(`Produto com o ID ${id} não foi encontrado no banco de dados.`);
        }
        return product;
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        return null;
    }
};  

export const getProductByName = async (name: string | undefined) => {
    try {
        const product = await db.product.findFirst({ where: { name } });
        return product;
    } catch {
        return null;
    }
};