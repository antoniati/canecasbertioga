"use client";

import { Product } from "@prisma/client";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { getAllProducts, getProductById } from "@/services/read/getProducts";


export const useProductsData = () => {
    const queryClient = useQueryClient();

    const fetchProducts = async () => {
        const productsFound = await getAllProducts();
        return productsFound || [];
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allProductsData"] as QueryKey, // Tipagem explícita para a chave da query,
        queryFn: fetchProducts,
    });

    // Função para invalidar a query e forçar a refetch
    const refetchProducts = () => {
        queryClient.invalidateQueries({ queryKey: ["allProductsData"] });
    };

    return {
        data,
        isLoading,
        isError,
        refetchProducts,
    };
};

export const useProductDataById = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchProductById = useCallback(async () => {
        setIsLoading(true);
        const productFound = await getProductById(productId);

        if (productFound) {
            setProduct(productFound);
        } else {
            console.error("Nenhum produto encontrado para o ID:", productId);
        }

        setIsLoading(false);
    }, [productId]);

    useEffect(() => {
        handleFetchProductById();
    }, [handleFetchProductById]);

    return { product, handleFetchProductById, isLoading };
};


export const useProductSearch = (productData: Product[]) => {
    const [filteredProductData, setFilteredProductData] = useState<Product[]>([]);

    const handleSearchProductsData = useCallback((term: string, filter: string | boolean) => {
        const searchTerm = term.toLowerCase(); 

        const productsFound = productData.filter(product => {
            const productNameLowerCase = (product.name ?? "").toLowerCase();

            // Verifica se o nome do produto corresponde ao termo de pesquisa
            const matchesTerm = searchTerm === "" || productNameLowerCase.includes(searchTerm);

            // Verifica se a categoria do produto corresponde ao filtro de categoria
            const matchesCategory = filter === "" || product.categoryId === filter;

            return matchesTerm && matchesCategory;
        });

        // Atualiza o estado para exibir os produtos encontrados ou todos os produtos caso nenhum filtro seja aplicado
        setFilteredProductData(productsFound);
    }, [productData]);

    // Atualiza os produtos filtrados se os dados originais mudarem
    useEffect(() => {
        setFilteredProductData(productData);
    }, [productData]);

    return { filteredProductData, handleSearchProductsData };
};
