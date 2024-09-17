"use client";

import Link from "next/link";
import { useContext } from "react";

import { FAQSection } from "@/components/FAQSection";
import { MugDetailImageSlider } from "@/components/MugDetailImageSlider";
import { RelatedProductsSlider } from "@/components/RelatedProductsSlider";
import { CartContext } from "@/contexts/CartContextProvider";
import { categories } from "@/utils/categoriesDataTest";
import { products, Properties } from "@/utils/productDataTest";

const transformProductDetails = (details: Properties[]): { name: string; value: string }[] => {
    if (!Array.isArray(details)) {
        return [];
    }

    return details.map((item: Properties) => ({
        name: item.name,
        value: item.value.join(", "),
    }));
};

export default function MugDetails({ params }: { params: { productId: string } }) {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    if (!products[0]) {
        return (
            <section className="w-full h-screen flex items-center justify-center px-4">
                <div className="max-w-lg flex flex-col items-center justify-center gap-[15px]">
                    <p className="bg-rose-50 text-rose-500 px-4 py-8 rounded-md font-medium">
                        ID Inválido ou inexistente. Por favor, verifique e tente novamente.
                    </p>
                    <Link href={"/categorias/lista-de-categorias"} className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors duration-300">
                        OK
                    </Link>
                </div>
            </section>
        );
    }

    const googleMapsUrl = products[0].googleMapsUrl || "https://www.google.com/maps";

    const productDetails = [
        {
            category: "Características principais",
            items: products[0].features || [],
        },
        {
            category: "Dimensões Aproximadas",
            items: products[0].dimensions || [],
        },
        {
            category: "Especificações",
            items: products[0].specifications || [],
        },
        {
            category: "Recomendações",
            items: products[0].recommendations || [],
        },
    ];


    categories;

    return (
        <section className="w-full h-auto py-[80px] px-4 md:px-[40px] lg:px-[80px]">
            <div className="w-full flex lg:flex-row flex-col gap-[40px] justify-start items-start">
                <div className="w-full lg:w-2/4 h-[auto] border border-slate-400 rounded-lg p-1">
                    <MugDetailImageSlider images={products[0].files || []} />
                </div>
                <div className="w-full sm:w-/24 space-y-4">
                    <div className="space-y-4 mt-0 sm:mt-4">
                        <h1 className="text-2xl font-bold text-gray-900">{products[0].name}</h1>
                        <p className="text-gray-700">{products[0].description}</p>
                        {params.productId}
                    </div>
                    <div className="space-y-1">
                        <h2 className="font-medium">Por apenas</h2>
                        <div className="flex items-center space-x-2">
                            <p className="font-bold text-2xl">
                                R$ {products[0].price}
                            </p>
                            <span className="text-sm text-gray-500">unidade</span>
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

                    <div className="w-full flex flex-col md:flex-row gap-2 py-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto border border-[#0074d4] hover:shadow-md px-4 py-2 rounded-md  text-[#0074d4] cursor-pointer transition-all duration-300 font-semibold"
                            onClick={() => addProduct(products[0].id)}
                        >
                            Adicionar ao carrinho
                        </button>
                        <Link
                            href={"/carrinho"}
                            type="button"
                            onClick={() => addProduct(products[0].id)}
                            className="w-full sm:w-auto bg-[#0A91FF] hover:bg-[#33A3FF] hover:shadow-md text-slate-50 px-7 py-2 rounded-md  cursor-pointer text-center font-semibold"
                        >
                            Comprar Agora
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-8 p-4 bg-slate-50 rounded-lg">
                <h2 className="font-bold text-lg">Descubra o Local da Estampa</h2>
                <p>
                    {products[0].locationDescription}
                </p>
                <button
                    type="button"
                    className="flex space-x-2 items-center text-blue-600"
                    onClick={() => window.open(googleMapsUrl, "_blank")}
                >
                    <span> Visitar no Google Maps </span>
                </button>
            </div>

            <RelatedProductsSlider />
            <FAQSection />
        </section>
    );
}
