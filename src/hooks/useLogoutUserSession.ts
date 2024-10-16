"use client";

import { useRouter } from "next/navigation";

import { createLogoutSession } from "@/services/create/createLogoutSession";

export const useLogoutUserSession = () => {
    const router = useRouter();

    // Função para manipular logout e redirecionar o usuário
    const handleLogout = async () => {
        // Função de logout executada no lado do servidor
        await createLogoutSession();

        // Redirecionamento executado no lado do cliente
        router.push("/");
    };

    return { router, handleLogout };
};