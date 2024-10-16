"use server";

import * as z from "zod";

import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";

import { generatePasswordResetToken } from "./generateTokens";
import { getUserByEmail } from "../read/getUsers";

export const handleRequestNewPassword = async (values: z.infer<typeof ResetSchema>): Promise<{ success?: string; error?: string; }> => {
      const validatedFields = ResetSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Insira campos válidos"};

      const { email } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
            const response = sendResetPasswordoken(email);
            return response;

      } else if (!existingUser) {
            return { error: "Usuário inexistente. Insira um endereço de e-mail válido."};
      } else {
            return { error: "Ocorreu um erro ao enviar uma solicitação de redefinição de senha."};
      }
};

export const sendResetPasswordoken = async (email: string) => {
      const passwordResetToken = await generatePasswordResetToken(email);

      await sendPasswordResetEmail({
            email: passwordResetToken.email,
            token: passwordResetToken.token,
      });

      return { success: "E-mail de redefinição de senha enviado. Verifique sua caixa de entrada e siga as instruções para redefinir sua senha."};
};