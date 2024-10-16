"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { sendTwoFactorCodeEmail, sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prismadb";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateTwoFactorToken, generateVerificationToken } from "@/services/create/generateTokens";
import { getTwoFactorTokenByEmail } from "@/services/read/getTokens";
import { getTwoFactorConfirmationByUserId } from "@/services/read/getTwofactor";
import { getUserByEmail } from "@/services/read/getUsers";

export const loginSession = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
      const validatedFields = LoginSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Insira campos válidos." };

      const { email, password, code } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email || !existingUser.password) return { error: "Dados inválidos ou inexistentes. Insira dados válidos." };

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);

            await sendVerificationEmail({
                  email: verificationToken.email,
                  token: verificationToken.token,
                  name: existingUser.customerName,
            });

            return { success: "Um e-mail de verificação de conta foi enviado. Verifique sua caixa de entrada para concluir seu registro" };
      }

      if (existingUser.isTwoFactorEnabled && existingUser.email) {
            if (code) {
                  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

                  if (!twoFactorToken) return { error: "Código inexistente" };

                  if (twoFactorToken.token !== code) return { error: "Código inválido" };

                  const hasExpired = new Date(twoFactorToken.expires) < new Date();

                  if (hasExpired) return { error: "Código expirado" };

                  await db.twoFactorToken.delete({
                        where: { id: twoFactorToken.id },
                  });

                  const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                  if (existingConfirmation) {
                        await db.twoFactorConfirmation.delete({
                              where: { id: existingConfirmation.id },
                        });
                  }

                  await db.twoFactorConfirmation.create({
                        data: { userId: existingUser.id },
                  });

            } else {
                  const twoFactorToken = await generateTwoFactorToken(existingUser.email);

                  await sendTwoFactorCodeEmail({
                        email: twoFactorToken.email,
                        code: twoFactorToken.token,
                  });

                  return { twoFactor: true };
            }
      }

      try {
            await signIn("credentials", {
                  email,
                  password,
                  redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });
      } catch (error) {
            if (error instanceof AuthError) {
                  switch (error.type) {
                        case "CredentialsSignin":
                              return { error: "Credenciais inválidas. Insira credenciais válidas." };
                        default:
                              return { error: "Ops! Ocorreu um erro interno do servidor. Verifique a situação e tente novamente" };
                  }
            }
            throw error;
      }
};