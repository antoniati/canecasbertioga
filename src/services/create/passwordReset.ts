"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/prismadb";
import { NewPasswordSchema } from "@/schemas";

import { getPasswordResetTokenByToken } from "../read/getTokens";
import { getUserByEmail } from "../read/getUsers";

export const handleResetPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
      if (!token) return { error: "Token inexistente" };

      const validatedFields = NewPasswordSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Insira campos válidos." };

      const { password } = validatedFields.data;

      const existingToken = await getPasswordResetTokenByToken(token);

      if (!existingToken) return { error: "Token inválido. Insira um token válido" };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return { error: "Token expirado. Insira um token novo e atualizado." };

      const existingUser = await getUserByEmail(existingToken.email);

      const hashedPassword = await bcrypt.hash(password, 10);

      if (existingUser) {
            await db.user.update({
                  where: { id: existingUser.id },
                  data: { password: hashedPassword },
            });

            await db.passwordResetToken.delete({
                  where: { id: existingToken.id },
            });

            return { success: "Senha atualizada com sucesso!" };

      } else if (!existingUser) {
            return { error: "Usuário inexistente. Insira um endereço de e-mail válido." };
      } else {
            return { error: "Erro ao redefinir a senha." };
      }
};