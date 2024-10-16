"use client";

import { Category } from "@prisma/client";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { getAllCategories, getCategoryById, getCategoryByName } from "@/services/read/getCategories";

export const useCategoriesData = () => {
    const queryClient = useQueryClient();

    const fetchCategories = async () => {
        const categoriesFound: Category[] = await getAllCategories();
        return categoriesFound || [];
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ["allCategoriesData"] as QueryKey, // Tipagem explícita para a chave da query,
        queryFn: fetchCategories,
    });

    // Função para invalidar a query e forçar a refetch
    const refetchCategories = () => {
        queryClient.invalidateQueries({ queryKey: ["allCategoriesData"] });
    };

    return {
        data,
        isLoading,
        isError,
        refetchCategories,
    };
};


export const useCategoryDataById = (categoryId: string) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchCategoryById = useCallback(async () => {
        setIsLoading(true);
        const categoryFound = await getCategoryById(categoryId);

        if (categoryFound) {
            setCategory(categoryFound);
        }

        setIsLoading(false);
    }, [categoryId]); // O `categoryId` é uma dependência da função

    useEffect(() => {
        handleFetchCategoryById();
    }, [handleFetchCategoryById]);

    return { category, handleFetchCategoryById, isLoading };
};

export const useCategoryDataByName = (categoryName: string) => {
    const [category, setCategory] = useState<Category | null>(null);

    const handleFetchCategoryByName = useCallback(async () => {
        const categoryFound = await getCategoryByName(categoryName);

        if (categoryFound) {
            setCategory(categoryFound);
        }
    }, [categoryName]); // O `categoryName` é uma dependência da função

    useEffect(() => {
        handleFetchCategoryByName();
    }, [handleFetchCategoryByName]);

    return { category, handleFetchCategoryByName };
};


export const useCategoriesSearch = (categoriesData: Category[]) => {
    const [filteredCategoriesData, setFilteredCategoriesData] = useState(categoriesData);

    const handleSearchCategoriesData = useCallback((type: string | null) => {

        const categoriesFound = categoriesData.filter(category => {
            const matchesType = !type || category.name === type;

            return matchesType;
        });

        setFilteredCategoriesData(categoriesFound);
    }, [categoriesData]);

    return { filteredCategoriesData, handleSearchCategoriesData };
};