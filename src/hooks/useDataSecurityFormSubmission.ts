"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { UserDataSecuritySchema } from "@/schemas";
import { handleUpdateUserDataSecurity } from "@/serverActions/handleUpdateUserDataSecurity";

export const useDataSecurityFormSubmission = ({ userData }: { userData: User }) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(userData?.isTwoFactorEnabled ?? false);
    const [isPending, startTransition] = useTransition();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm<z.infer<typeof UserDataSecuritySchema>>({
        resolver: zodResolver(UserDataSecuritySchema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                isTwoFactorEnabled: userData.isTwoFactorEnabled ?? false,
            });

            setIsTwoFactorEnabled(userData.isTwoFactorEnabled ?? false);
        }
    }, [userData, reset]);

    const onSubmit = (values: z.infer<typeof UserDataSecuritySchema>) => {
        startTransition(async () => {
            const response = await handleUpdateUserDataSecurity(values, userData?.id ?? "");

            if (response.error) {
                setError(response.error);
            } else if (response.success) {
                setSuccess(response.success);
            }
        });
    };

    const cleanMessages = () => {
        clearErrors();
        setSuccess("");
        setError("");
    };

    const handleFieldChange = () => {
        setHasChanges(true);
        cleanMessages();
    };

    return {
        register,
        setValue,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
        error,
        success,
        setSuccess,
        cleanMessages,
        isTwoFactorEnabled,
        setIsTwoFactorEnabled,
        handleFieldChange,
        hasChanges,
        setHasChanges,
    };
};