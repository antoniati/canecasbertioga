"use client";

import clsx from "clsx";
import React, { useState } from "react";

import { ConfigIcon, EmailIcon, SecureAccountIcon } from "@/components/Icons";

export default function AccountPage() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="pb-[40px]">
                <header className="w-full flex items-center border-b pb-3">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 ml-2">
                        Configurações de Conta
                    </h1>
                </header>

                {/* Grupo de Abas */}
                <div className="mt-6 flex space-x-4 bg-white p-2 rounded-lg shadow-md">
                    <button
                        className={clsx(
                            "w-auto px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 0
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(0)}
                    >
                        <ConfigIcon w="20" h="20" />
                        <span> Seus Dados </span>
                    </button>

                    <button
                        className={clsx(
                            "w-auto px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 1
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(1)}
                    >
                        <SecureAccountIcon w="20" h="20" />
                        <span> Segurança </span>
                    </button>
                    <button
                        className={clsx(
                            "w-auto px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 2
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(2)}
                    >
                        <EmailIcon w="20" h="20" />
                        <span> Notificações </span>
                    </button>
                </div>

                {/* Painéis das Abas */}
                <div className="mt-4 bg-white p-2 sm:p-6 rounded-lg shadow-lg">
                    {selectedTab === 0 && (
                        <div>
                            <span> Dados Pessoais</span>
                        </div>
                    )}

                    {selectedTab === 1 && (
                        <div>
                            <span> Segurança </span>
                        </div>
                    )}
                    {selectedTab === 2 && (
                        <div>
                            <span> Notificações </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
