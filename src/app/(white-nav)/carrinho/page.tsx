"use client";

import Link from "next/link";
import React, { useContext } from "react";

import { CartTable } from "@/components/CartTable";
import { CartIcon } from "@/components/Icons";
import { CartContext } from "@/contexts/CartContextProvider";
import { products } from "@/utils/productDataTest";

export default function CartPage() {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { cartProducts, addProduct, removeProduct } = cartContext;

    return (
        cartProducts && cartProducts?.length > 0 ? (
            <div className="w-full sm:w-2/4 h-auto md:h-screen py-[80px] px-4 md:px-8 lg:px-12 flex justify-start items-start flex-col-reverse md:flex-row gap-[10px]">
                <CartTable
                    products={products}
                    cartProducts={cartProducts}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                />
            </div>
        ) : (
            <section className="w-full flex items-start justify-start flex-col space-y-4 px-4 md:px-8 lg:px-12 py-[100px]">
                <header className="w-full flex justify-start items-center pb-4 border-b">
                    <CartIcon w="24" h="24" />
                    <h1 className="font-semibold text-lg ml-2">Carrinho de Compras</h1>
                </header>

                <p className="w-full bg-gray-50 text-gray-700 px-4 py-8 rounded-md font-medium">
                    Seu carrinho esta vazio. Inclua algumas de nossas canecas incríveis ao seu carrinho.
                </p>

                <Link 
                href={"/canecas"} 
                className="w-full sm:w-auto text-lg  bg-[#0A91FF] hover:bg-[#33A3FF] hover:shadow-md text-slate-50 px-4 py-2 rounded-md cursor-pointer text-center font-semibold"
                >
                    Vá as compras
                </Link>
            </section>
        )
    );
}