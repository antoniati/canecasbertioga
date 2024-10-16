"use client";

import { User } from "@prisma/client";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";

import { UserContext } from "@/contexts/UserContext";
import { getAllUsers } from "@/services/read/getUsers";


export const useUserData = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUserData deve ser usado dentro de um UserProvider");
    }

    return context;
};

export const useUsersData = () => {
    const queryClient = useQueryClient();

    const fetchUsers = async () => {
        const usersFound = await getAllUsers();
        return usersFound || [];
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allUsersData"] as QueryKey, // Tipagem explícita para a chave da query,
        queryFn: fetchUsers,
    });

    // Função para invalidar a query e forçar a refetch
    const refetchUsers = () => {
        queryClient.invalidateQueries({ queryKey: ["allUsersData"] });
    };

    return {
        data,
        isLoading,
        isError,
        refetchUsers,
    };
};


export const useUserSearch = (userData: User[]) => {
    const [filteredUserData, setFilteredUserData] = useState<User[]>([]);

    const handleSearchUsersData = useCallback((term: string, status: string | boolean) => {
        const searchTerm = term.toLowerCase();

        const usersFound = userData.filter(user => {
            const userNameLowerCase = (user.customerName ?? "").toLowerCase();

            // Verifica se o nome do produto corresponde ao termo de pesquisa
            const matchesTerm = searchTerm === "" || userNameLowerCase.includes(searchTerm);

            // Verifica se a categoria do produto corresponde ao filtro de categoria
            const matchesCategory = status || user.isTwoFactorEnabled === status;

            return matchesTerm && matchesCategory;
        });

        // Atualiza o estado para exibir os produtos encontrados ou todos os produtos caso nenhum filtro seja aplicado
        setFilteredUserData(usersFound);
    }, [userData]);

    // Atualiza os produtos filtrados se os dados originais mudarem
    useEffect(() => {
        setFilteredUserData(userData);
    }, [userData]);

    return { filteredUserData, handleSearchUsersData };
};
