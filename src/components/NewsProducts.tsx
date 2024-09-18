"use client";

import Link from "next/link";
import { useContext } from "react";

import { CartContext } from "@/contexts/CartContextProvider";
import { products } from "@/utils/productDataTest";

import { EyeIcon } from "./Icons";
import { Image } from "./Image";

export const NewsProducts = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    if (products && products.length > 0) {
        return (
            <section className="w-full bg-white px-4 md:px-8 lg:px-12 flex flex-col gap-[15px] items-center justify-center pb-[40px]">
                <h2 className={"w-full py-[40px] border-t border-slate-200 text-center text-lg sm:text-xl"}>
                    Explore Nossa Nova Coleção Exclusiva de Canecas
                </h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-6">
                    {products.slice(0, 9).map((product, index) => (
                        <div key={index} className="w-full bg-white sm:max-w-[400px] border rounded-md flex flex-col items-start justify-between shadow-md transition-transform transform hover:scale-105">
                            <Link href={`/canecas/detalhes/${product.id}`}>
                                <div className="w-full relative">
                                    <span className="absolute bottom-2 text-[14px] right-4 text-slate-400">
                                        Imagem ilustrativa
                                    </span>
                                    <Image
                                        path={product.files[3]}
                                        alt={`Imagem ${product.name}`}
                                        className="object-contain w-auto h-auto max-w-full max-h-full border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 rounded-md"
                                        width={1000}
                                        height={1000}
                                        priority={true}
                                    />
                                    <div className=" absolute top-0 right-0 w-full h-full rounded-md opacity-0 hover:opacity-50 bg-gray-900 transition-all duration-500 flex flex-col items-center justify-center space-y-4">
                                        <span className="absolute top-0 right-0 mr-4 mt-4 text-white">
                                            <EyeIcon w="36" h="36" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div className="w-full px-4 flex-col mt-4 justify-start items-start space-y-2">
                                <h3 className="font-medium text-md">{product.name}</h3>
                                <div>
                                    <div className="space-y-1">                                        <div className="flex items-center space-x-2">
                                        <p className="font-bold text-lg">
                                            R$ {product.price}
                                        </p>
                                        <span className="text-sm text-gray-500">unidade</span>
                                    </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2 py-4">
                                        <button
                                            type="button"
                                            className="w-full border border-[#0074d4] hover:shadow-md px-4 py-2 rounded-md  text-[#0074d4] cursor-pointer transition-all duration-300 font-semibold"
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
            </section >
        );
    }
};