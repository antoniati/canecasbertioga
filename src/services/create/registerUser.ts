"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prismadb";
import { UserRegisterSchema } from "@/schemas";

import { generateVerificationToken } from "./generateTokens";
import { getUserByEmail } from "../read/getUsers";

export const registerUser = async (values: z.infer<typeof UserRegisterSchema>) => {
      const validatedFields = UserRegisterSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Insira campos válidos" };

      const {
            email,
            password,
            customerName,
            phone,
      } = validatedFields.data;

      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await getUserByEmail(email);

      if (existingUser) return { error: "Este e-mail já está em uso. Tente um e-mail diferente" };

      await db.user.create({
            data: {
                  customerName,
                  phone,
                  email,
                  role: "USER",
                  password: hashedPassword,
            },
      });

      const verificationToken = await generateVerificationToken(email);

      await sendVerificationEmail({
            email: verificationToken.email,
            token: verificationToken.token,
            name: customerName,
      });

      return { success: "Um e-mail de confirmação de conta foi enviado para você! Verifique sua caixa de entrada para concluir seu registro e confirmar sua conta." };
};