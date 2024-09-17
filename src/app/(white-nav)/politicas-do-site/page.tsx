"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { cookiePolicy, privacyPolicy, termsAndConditions } from "@/utils/policyData";

export default function PolicyPage() {
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);

    // Atualizando o tabIndex apenas no client-side
    useEffect(() => {
        const tabIndex = parseInt(searchParams?.get("tab") || "0", 10);
        setSelectedTab(tabIndex);
    }, [searchParams]);

    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                <h1 className="font-bold text-2xl text-gray-800">Politicas do Nosso Site</h1>
            </header>

            {/* Grupo de Abas */}
            <div className="mt-6 flex space-x-4 bg-white p-2 rounded-lg shadow-md overflow-auto">
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 0
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(0)}
                >
                    Termos <span className="sr-only sm:not-sr-only">e Condições</span>
                </button>
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 1
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(1)}
                >
                    <span className="sr-only sm:not-sr-only"> Política de </span>Privacidade
                </button>
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 2
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(2)}
                >
                    <span className="sr-only sm:not-sr-only"> Política de </span>Cookies
                </button>
            </div>

            {/* Painéis das Abas */}
            <div className="mt-4 bg-white p-2 sm:p-8 rounded-md shadow-md">
                {selectedTab === 0 && (
                    <div className="p-2 sm:p-8">
                        {/* Renderizando o conteúdo de Termos e Condições */}
                        <h2 className="text-lg font-bold mb-4">{termsAndConditions.title}</h2>
                        <p className="text-md mb-6">{termsAndConditions.intro.content}</p>
                        {termsAndConditions.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-md mb-4">
                                    {section.content}
                                </p>
                                {/* Renderizando subseções se existirem */}
                                {section.subsections && section.subsections.map((subsection, subIndex) => (
                                    <div key={subIndex} className="ml-4 mb-4">
                                        <h4 className="text-lg font-medium">
                                            {subsection.title}
                                        </h4>
                                        <p className="text-md">
                                            {subsection.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {selectedTab === 1 && (
                    <div className="p-2 sm:p-8">
                        <h2 className="text-lg font-bold mb-4">{privacyPolicy.title}</h2>
                        <p className="text-md mb-6">{privacyPolicy.content}</p>
                        <ul className="flex flex-col items-start">
                            {privacyPolicy.listOfInformations.map((info, index) => (
                                <li key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {info.titleInfo}
                                    </h3>
                                    <p className="text-md mb-4">
                                        {info.descriptionInfo}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedTab === 2 && (
                    <div className="p-2 sm:p-8">
                        <h2 className="text-lg font-bold mb-4">{cookiePolicy.title}</h2>
                        <p className="text-md mb-6">{cookiePolicy.content}</p>
                        <ul className="flex flex-col items-start">
                            {cookiePolicy.listOfInformations.map((info, index) => (
                                <li key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {info.titleInfo}
                                    </h3>
                                    <p className="text-md mb-4">
                                        {info.descriptionInfo}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
