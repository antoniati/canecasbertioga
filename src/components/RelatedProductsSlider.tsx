import Link from "next/link";
import React, { useContext } from "react";

import { CartContext } from "@/contexts/CartContextProvider";
import { products } from "@/utils/productDataTest";

import { EyeIcon } from "./Icons";
import { Image } from "./Image";

export const RelatedProductsSlider = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    return (
        <section className="space-y-6 mt-12 px-4 md:px-8 pb-[40px]">
            <h2 className="text-3xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
                Produtos Relacionados
            </h2>
            <div className="flex overflow-x-auto gap-6 py-4">
                {products.slice(0, 9).map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <div className="relative block">
                            <Link href={`/canecas/detalhes/${product.id}`} className="relative overflow-hidden ">
                                <Image
                                    path={product.files[3]}
                                    alt={`Imagem ${product.name}`}
                                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    width={1000}
                                    height={1000}
                                />
                                <div className="absolute inset-0 flex text-white items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                                    <EyeIcon w="36" h="36" />
                                </div>
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                                <div className="flex items-center space-x-2 mb-4">
                                    <p className="text-xl font-semibold text-gray-800">
                                        R$ {product.price}
                                    </p>
                                    <span className="text-sm text-gray-500">unidade</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto border border-[#0074d4] hover:shadow-md px-4 py-2 rounded-md  text-[#0074d4] cursor-pointer transition-all duration-300 font-semibold"
                                        onClick={() => addProduct(product.id)}
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
