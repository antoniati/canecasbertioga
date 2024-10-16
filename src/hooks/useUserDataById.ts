"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/services/read/getUsers";

export const useUserDataById = (userId: string) => {

    const fetchUserData = async () => {
        if (userId) {
            const userFound = await getUserById(userId);
            return userFound || null;
        }
        return null;
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["userData", userId],
        queryFn: fetchUserData,
        enabled: !!userId,
    });

    return {
        isLoading,
        isError,
        data,
    };
};