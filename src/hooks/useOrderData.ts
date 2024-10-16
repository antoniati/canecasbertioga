"use client";

import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllOrders, getOrderById } from "@/services/read/getOrders";

export const useOrdersData = () => {
    const queryClient = useQueryClient();

    const fetchOrders = async () => {
        const OrdersFound = await getAllOrders();
        return OrdersFound || [];
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allOrdersData"] as QueryKey,
        queryFn: fetchOrders,
    });

    // Função para invalidar a query e forçar a refetch
    const refetchOrders = () => {
        queryClient.invalidateQueries({ queryKey: ["allOrdersData"] });
    };

    return {
        data,
        isLoading,
        isError,
        refetchOrders,
    };
};

export const useOrderDataById = (orderId: string) => {
    const queryClient = useQueryClient();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["orderById", orderId], // Agora a queryKey está relacionada ao orderId
        queryFn: async () => {
            const order = await getOrderById(orderId);
            return order ?? null; // Certifique-se de que está retornando null ou o Order
        },
    });

    // Função para invalidar a query e forçar a refetch
    const refetchOder = () => {
        queryClient.invalidateQueries({ queryKey: ["OrderById"] });
    };

    return {
        data,
        isLoading,
        isError,
        refetchOder,
    };
};