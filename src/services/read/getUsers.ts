"use server";

import { db } from "@/lib/prismadb";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;

    } catch {
        return null;
    }
};

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;

    } catch {
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        const allUsers = await db.user.findMany();
        return allUsers;

    } catch (error) {
        console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
        return [];
    }
};
