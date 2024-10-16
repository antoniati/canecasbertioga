"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";

import { CartTable } from "@/components/CartTable";
import { CartIcon, PathLocationIcon } from "@/components/Icons";
import { OrderForm } from "@/components/OrderForm";
import { CartContext } from "@/contexts/CartContextProvider";
import { useProductsData } from "@/hooks/useProductsData";

export default function CartPage() {
    const { data: products } = useProductsData();

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { cartProducts, clearCart } = cartContext;

    const cartProductList = products?.filter((product) =>
        cartProducts.includes(product.id),
    );

    let total = 0;

    cartProductList?.forEach((product) => {
        const quantity = cartProducts.filter((id) => id === product.id).length;

        total += product.price * quantity;
    });

    const [activeTab, setActiveTab] = useState<number>(0);

    const nextTab = () => {
        setActiveTab((prev) => (prev < 2 ? prev + 1 : prev));
    };

    const progressWidth = `${(activeTab / 2) * 100}%`;

    return cartProducts && cartProducts.length > 0 ? (
        <div className="w-full h-screen py-[80px] px-4 md:px-6 lg:px-12 xl:px-24">
            {/* Header das etapas */}
            <div className="flex justify-between items-center mb-8 py-4">
                <div
                    className={`cursor-pointer ${activeTab === 0 ? "text-blue-600" : "text-gray-400"
                        } flex items-center gap-2`}
                    onClick={() => setActiveTab(0)}
                >
                    <CartIcon w="24" h="24" />
                    <span className="hidden sm:inline">Carrinho</span>
                </div>
                <div
                    className={`cursor-pointer ${activeTab === 1 ? "text-blue-600" : "text-gray-400"
                        } flex items-center gap-2`}
                    onClick={() => setActiveTab(1)}
                >
                    <PathLocationIcon w="24" h="24" />
                    <span className="hidden sm:inline">Local da Entrega</span>
                </div>
                <div className={"text-gray-400 flex items-center gap-2"}>
                    <span className="hidden sm:inline">Finalização</span>
                </div>
            </div>
            {/* Barra de Progresso */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8 relative">
                <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: progressWidth }}
                ></div>
            </div>

            {/* Conteúdo das Etapas */}
            {activeTab === 0 && (
                <section className="w-full flex flex-col lg:flex-row items-start gap-4">
                    {/* Seção Carrinho */}
                    <section className="w-full lg:w-2/3 p-6 lg:p-8 rounded-lg shadow-md bg-white">
                        <h2 className="font-semibold text-lg mb-4">Canecas Selecionadas</h2>
                        <CartTable products={products ?? []} cartProducts={cartProducts} />
                    </section>

                    {/* Resumo do Pedido */}
                    <section className="w-full lg:w-1/3 p-6 lg:p-8 rounded-lg shadow-md bg-white">
                        <h2 className="font-semibold text-lg mb-4 border-b pb-2">
                            Resumo da Compra
                        </h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                Produtos ({cartProducts.length}){" "}
                                <span className="text-gray-500">R$ {total}</span>
                            </li>
                            <li className="flex justify-between">
                                Frete: <strong className="text-green-500">Grátis</strong>
                            </li>
                            <li className="flex justify-between font-bold text-lg">
                                Total: <strong className="text-slate-800">R$ {total}</strong>
                            </li>
                        </ul>
                        <div className="border-t pt-4 mt-6">
                            <button
                                onClick={nextTab}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition transform hover:scale-105"
                            >
                                Definir Local de Entrega
                            </button>
                        </div>
                    </section>
                </section>
            )}

            {activeTab === 1 && (
                <OrderForm cartProducts={cartProducts} clearCart={clearCart} />
            )}

            {activeTab === 2 && (
                <section className="w-full text-center py-16">
                    <h2 className="text-2xl font-semibold mb-4">Finalizando...</h2>
                    <p className="text-gray-500 mb-8">
                        Você será redirecionado para o pagamento seguro.
                    </p>
                    <OrderForm cartProducts={cartProducts} clearCart={clearCart} />
                </section>
            )}
        </div>
    ) : (
        <section className="flex flex-col space-y-4 px-4 md:px-8 lg:px-12 py-[100px]">
            <header className="w-full flex justify-start items-center pb-4 border-b">
                <CartIcon w="20" h="20" />
                <h1 className="font-semibold text-lg ml-2">Carrinho</h1>
            </header>
            <p className="w-full bg-gray-50 text-gray-700 px-4 py-8 rounded-md font-medium">
                Seu carrinho está vazio. Inclua algumas de nossas canecas incríveis ao
                seu carrinho.
            </p>
            <div className="w-full flex items-center justify-center h-[200px] px-[20px]">
                <Link
                    href="/canecas"
                    className="w-full md:w-auto text-center px-6 border-blue-600 border text-blue-600 font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    Veja a Coleção Completa
                </Link>
            </div>
        </section>
    );
}