"use server";

import * as z from "zod";

import { sendAccountUpdateEmail, sendEmailUpdateEmail } from "@/lib/mail";
import { UserPersonalDataSchema } from "@/schemas";
import { generatePasswordResetToken } from "@/services/create/generateTokens";
import { getUserByEmail, getUserById } from "@/services/read/getUsers";
import { updateUserPersonalData } from "@/services/update/updateUserPersonalData";


export const handleUpdateUserPersonalData = async (values: z.infer<typeof UserPersonalDataSchema>, userId: string) => {
    const userFoundById = await getUserById(userId);
    if (!userFoundById) {
        return { error: "Você não tem permissão para executar esta ação" };
    }

    const validatedFields = UserPersonalDataSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Campos Inválidos ou Inexistentes" };
    }

    const { email, customerName, phone } = validatedFields.data;

    if (email !== userFoundById.email) {
        const existingUser = await getUserByEmail(email!);
        if (existingUser) {
            return { error: "Este email ja esta em uso. Por favor, tente um email diferente" };
        }

        const passwordResetToken = await generatePasswordResetToken(email!);

        sendEmailUpdateEmail({
            email: passwordResetToken?.email ?? "",
            token: passwordResetToken?.token ?? "",
            name: values?.customerName ?? "",
            newEmail: email ?? "",
        });

        await updateUserPersonalData({
            userId: userId,
            email: email ?? userFoundById.email,
            customerName: customerName ?? userFoundById.customerName,
            phone: phone!,
        });

        return { success: "Dados Atualizados com Sucesso" };
    }

    sendAccountUpdateEmail({
        email: email ?? "",
        name: customerName ?? "",
    });

    await updateUserPersonalData({
        userId: userId,
        email: email ?? userFoundById.email,
        customerName: customerName ?? userFoundById.customerName,
        phone: phone!,
    });

    return { success: "Dados Atualizados com Sucesso" };
};