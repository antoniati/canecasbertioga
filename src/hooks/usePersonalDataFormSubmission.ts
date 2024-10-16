"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { UserPersonalDataSchema } from "@/schemas";
import { handleUpdateUserPersonalData } from "@/serverActions/handleUpdateUserPersonalData";

export const usePersonalDataFormSubmission = ({ userData }: { userData: User }) => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm<z.infer<typeof UserPersonalDataSchema>>({ resolver: zodResolver(UserPersonalDataSchema) });

    useEffect(() => {
        if (userData) {
            reset({
                customerName: userData.customerName ?? "",
                email: userData.email ?? "",
                phone: userData.phone ?? "",
            });
        }
    }, [userData, reset]);

    const onSubmit = (values: z.infer<typeof UserPersonalDataSchema>) => {
        startTransition(async () => {
            const response = await handleUpdateUserPersonalData(values, userData?.id ?? "");

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
        watch,
        setValue,
        handleSubmit,
        errors,
        onSubmit,
        isPending,
        error,
        success,
        setSuccess,
        cleanMessages,
        handleFieldChange,
        hasChanges,
    };
};