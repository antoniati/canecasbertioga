"use server";

import bcryptjs from "bcryptjs";
import * as z from "zod";

import { UserDataSecuritySchema } from "@/schemas";
import { getUserById } from "@/services/read/getUsers";
import { updateUserDataSecurity } from "@/services/update/updateUserDataSecurity";

export const handleUpdateUserDataSecurity = async (values: z.infer<typeof UserDataSecuritySchema>, userId: string) => {
    const user = await getUserById(userId);
    if (!user) {
        return { error: "Você não tem permissão para executar esta ação." };
    }

    const { success, data: validatedValues } = UserDataSecuritySchema.safeParse(values);
    if (!success) {
        return { error: "Campos inválidos ou inexistente" };
    }

    const { password, confirmPassword, isTwoFactorEnabled } = validatedValues;

    // Se a senha for fornecida, verifique se a senha atual é válida
    if (password) {
        const isPasswordValid: boolean = await bcryptjs.compare(password, user.password!);
        if (!isPasswordValid) {
            return { error: "Senha incorreta. Por favor, insira uma senha válida" };
        }

        // Verifique se a senha e a confirmação da senha correspondem
        if (confirmPassword) {
            // Se as senhas são iguais, hashe a nova senha
            const hashedPassword: string = await bcryptjs.hash(confirmPassword, 10);

            await updateUserDataSecurity({
                userId,
                password: hashedPassword,
                isTwoFactorEnabled: isTwoFactorEnabled ?? user.isTwoFactorEnabled,
            });

            return { success: "Senha Atualizada com Sucesso!" };
        } else {
            // Senha fornecida mas sem confirmação, apenas atualizar o 2FA
            await updateUserDataSecurity({
                userId,
                password: user.password!,
                isTwoFactorEnabled: isTwoFactorEnabled ?? user.isTwoFactorEnabled,
            });

            return { success: "Senha Atualizada com Sucesso!" };
        }
    } else {
        // Apenas atualização do 2FA sem alteração de senha
        await updateUserDataSecurity({
            userId,
            password: user.password!,
            isTwoFactorEnabled: isTwoFactorEnabled ?? user.isTwoFactorEnabled,
        });

        return { success: "Código de Autenticação Atualizado com Sucesso!" };
    }
};