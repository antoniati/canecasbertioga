"use client";

import clsx from "clsx";
import React, { useState } from "react";

import { ListCheckedIcon, ListClockIcon } from "@/components/Icons";

export default function OrderPage() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="pb-[40px]">
                <header className="w-full flex items-center border-b pb-3">
                    <h1 className="font-bold text-xl ml-2 text-gray-800">Seus Pedidos</h1>
                </header>

                {/* Grupo de Abas */}
                <div className="mt-6 flex space-x-4 bg-white p-2 rounded-lg shadow-md">
                    <button
                        className={clsx(
                            "w-auto px-4 py-2 text text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 0
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(0)}
                    >
                        <ListClockIcon w="20" h="20" />
                        <span> Pedidos Atuais </span>
                    </button>

                    <button
                        className={clsx(
                            "w-auto px-4 text py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 1
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(1)}
                    >
                        <ListCheckedIcon w="20" h="20" />
                        <span> Pedidos Entregues </span>
                    </button>
                </div>

                {/* Painéis das Abas */}
                <div className="mt-4 bg-white p-2 sm:p-6 rounded-lg shadow-lg">
                    {selectedTab === 0 && (
                        <div>
                            {/* Conteúdo da aba "Pedidos Atuais" */}
                            <h2>Pedidos Atuais</h2>
                            {/* Adicione o conteúdo específico aqui */}
                        </div>
                    )}

                    {selectedTab === 1 && (
                        <div>
                            {/* Conteúdo da aba "Pedidos Entregues" */}
                            <h2>Pedidos Entregues</h2>
                            {/* Adicione o conteúdo específico aqui */}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
