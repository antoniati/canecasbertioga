"use client";

import React, { ChangeEvent,  useContext, useState } from "react";

import { LoadingPage } from "@/components/LoadingPage";
import { ProductCard } from "@/components/ProductCard";
import { CartContext } from "@/contexts/CartContextProvider";
import { useCategoriesData } from "@/hooks/useCategoriesData";
import { useProductsData } from "@/hooks/useProductsData";

export default function AllProductsPage() {
    const { data: products } = useProductsData();
    const { data: categories } = useCategoriesData();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleViewDetails = () => {
        setLoading(true);
    };

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    if (!products) {
        return null;
    }

    const filteredProducts = selectedCategory ? products.filter((product) => product.categoryId === selectedCategory) : products;

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <section className="min-h-screen bg-[##E0FBFC] py-12 px-4 md:px-8 lg:px-12 xl:px-24">
            <header className={"fixed left-0 pb-4 top-0 pt-[80px] border-b px-4 md:px-8 lg:px-12 xl:px-24 z-10 w-full flex flex-col md:flex-row items-start justify-between bg-white transition-all duration-300 ease-in-out"} >
                <div className={"w-full transition-all duration-300 ease-in-out"}>
                    <h1 className={"text-xl md:text-3xl font-bold text-gray-900 tracking-tight md:text-start text-center w-full transition-all duration-300 ease-in-out"}>
                        Coleção Exclusiva de Canecas
                    </h1>
                    <p className={"sr-only lg:not-sr-only md:flex hidden text-lg text-gray-500 transition-opacity duration-300 ease-in-out"}>
                        Descubra as canecas personalizadas mais criativas. Selecione sua praia
                        favorita!
                    </p>
                </div>

                <div className={"w-full flex md:flex-row flex-col justify-center md:justify-end mt-4"}>
                    <label
                        htmlFor="selectBeach"
                        className="mr-4 md:text-lg font-medium text-gray-700 md:px-0 px-2 py-1 text-sm"
                    >
                        Filtrar por Praia:
                    </label>
                    <select
                        id="selectBeach"
                        value={selectedCategory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        <option value="">Todas as Praias</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {/* Grid de produtos */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-[180px] sm:pt-[140px]">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        onLoading={handleViewDetails}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.files[3]}
                        onAddToCart={() => addProduct(product.id, product.name, product.files[2])}
                    />
                ))}
            </section>
        </section>
    );
}
