"use server";

import { signOut } from "@/auth";

export const createLogoutSession = async () => {
      try {
            // Realiza o logout do usuário sem redirecionamento automático.
            await signOut({ redirect: false });
      } catch (error) {
            // Registra o erro no console para análise e lança uma exceção com uma mensagem de erro genérica.
            console.error("Erro Interno do Servidor", error);
            throw new Error("Erro Interno do Servidor");
      }
};