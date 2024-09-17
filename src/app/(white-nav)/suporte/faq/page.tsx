"use client";

import Link from "next/link";
import React from "react";

import { faqData } from "@/components/FAQSection";

export default function FAQPage() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Perguntas Frequentes</h1>
                    <p className="text-gray-500 text-md">
                        Tem outra pergunta? Entre em contato conosco, acesse a página de{" "}
                        <Link
                            href="/suporte/atendimento-ao-cliente"
                            className="text-blue-500 hover:underline"
                            rel="noopener noreferrer"
                        >
                            Atentimento ao Cliente
                        </Link>
                    </p>
                </header>

                <div className="space-y-8">
                    {faqData.map(({ header, body }, index) => (
                        <div
                            key={index}
                            className="bg-slate-50 p-5 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out"
                        >
                            <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                                {header}
                            </h2>
                            <p className="mt-2 text-gray-700">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
