import { useCallback, useEffect, useState } from "react";

import { Product } from "@/utils/productDataTest";

export const useProductSearch = (productData: Product[]) => {
    const [filteredProductData, setFilteredProductData] = useState(productData);

    const handleSearchProductsData = useCallback((term: string, filter: string) => {
        const searchTerm = term.toLowerCase();

        const productsFound = productData.filter(product => {
            const productNameLowerCase = (product.name ?? "").toLowerCase();

            // Verifica se o nome do produto corresponde ao termo de pesquisa
            const matchesTerm = searchTerm === "" || productNameLowerCase.includes(searchTerm);

            // Verifica se a categoria do produto corresponde ao filtro de categoria
            const matchesCategory = filter === "" || product.categoryName === filter;

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