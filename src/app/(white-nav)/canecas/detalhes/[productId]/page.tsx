"use client";

import { useContext, useState } from "react";

import { Benefits } from "@/components/Benefits";
import { LoadingPage } from "@/components/LoadingPage";
import { MugDetailImageSlider } from "@/components/MugDetailImageSlider";
import { ProductCard } from "@/components/ProductCard";
import { CartContext } from "@/contexts/CartContextProvider";
import { useProductDataById, useProductsData } from "@/hooks/useProductsData";

export interface Properties {
    name: string;
    value: string[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const transformProductDetails = (details: any) => {
    if (!Array.isArray(details)) {
        return [];
    }

    return details.map((item: any) => ({
        name: item?.name || "N/A",
        value: Array.isArray(item?.value) ? item.value.join(", ") : String(item?.value || "N/A"),
    }));
};

export default function MugDetails({ params }: { params: { productId: string } }) {
    const { data: products } = useProductsData();
    const { product, isLoading } = useProductDataById(params.productId);

    const cartContext = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const handleViewDetails = () => {
        setLoading(true);
    };

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    if (!product || isLoading || loading) {
        return <LoadingPage />;
    }

    const googleMapsUrl = product?.googleMapsUrl || "https://www.google.com/maps";

    const productDetails = [
        {
            category: "Características principais",
            items: product?.features || [],
        },
        {
            category: "Dimensões Aproximadas",
            items: product?.dimensions || [],
        },
        {
            category: "Especificações",
            items: product?.specifications || [],
        },
        {
            category: "Recomendações",
            items: product?.recommendations || [],
        },
    ];

    const filtteredProducts = products?.filter(filtteredProduct => filtteredProduct.categoryName === product.categoryName);

    return (
        <section className="w-full h-auto py-[80px] px-4 md:px-8 lg:px-12">
            <div className="w-full flex lg:flex-row flex-col gap-[40px] justify-start items-start">
                <div className="w-full lg:w-2/4 h-[auto] border border-slate-400 rounded-lg p-1">
                    <MugDetailImageSlider images={product?.files || []} />
                </div>
                <div className="w-full sm:w-/24 space-y-4">
                    <div className="space-y-4 mt-0 sm:mt-4">
                        <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
                        <p className="text-gray-700 text-base sm:text-lg">{product?.description}</p>
                    </div>

                    <div className="space-y-1 p-2">
                        <div className="flex items-center space-x-2">
                            <p className="font-bold text-2xl">
                                R$ {product?.price}
                            </p>
                            <span className="text-base text-gray-500">/unidade</span>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto h-[200px] pr-4 pt-4">
                        {productDetails.map((category) => (
                            <div key={category.category} className="px-2">
                                <h3 className="font-bold text-sm mb-4 text-gray-800 border-b pb-2">
                                    {category.category}
                                </h3>
                                <ul className="space-y-2">
                                    {transformProductDetails(category.items).map((item: { name: string, value: string }) => (
                                        <li key={item.name} className="flex justify-between text-sm flex-wrap">
                                            <span className="text-gray-600 font-medium">{item.name}:</span>
                                            <span className="text-gray-800">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col-reverse md:flex-row gap-4 py-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (product?.id && product?.name && product?.files[1]) {
                                    addProduct(product.id, product.name, product.files[1]);
                                }
                            }}                            
                            className="w-full md:w-auto text-center px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-8 p-4 bg-slate-50 rounded-md">
                <h2 className="font-bold text-lg">Descubra o Local da Estampa</h2>
                <p>
                    {product?.locationDescription}
                </p>
                <button
                    type="button"
                    className="flex space-x-2 items-center text-blue-600"
                    onClick={() => window.open(googleMapsUrl, "_blank")}
                >
                    <span> Visitar no Google Maps </span>
                </button>
            </div>
            <section className="space-y-6 mt-12 pb-[40px]">
                <h2 className="text-lg sm:text-xl text-center font-semibold text-gray-800 border-b border-gray-200 pb-4">
                    Produtos Relacionados
                </h2>
                <div className="flex overflow-x-auto gap-6 py-4">
                    {filtteredProducts?.slice(0, 6).map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            onLoading={handleViewDetails}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.files[3]}
                            onAddToCart={() => addProduct(product.id, product.name, product.files[1])}
                        />
                    ))}
                </div>
            </section>
            <Benefits />
        </section>
    );
}