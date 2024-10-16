"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";

import { useProductsData, useProductSearch } from "@/hooks/useProductsData";

export default function SearchPage() {
    const { data: products } = useProductsData();
    const { filteredProductData, handleSearchProductsData } = useProductSearch(products ?? []);

    return (
        <div className="min-h-full sm:min-h-screen bg-gray-100 flex justify-center items-start  py-[80px] px-4 sm:px-6 lg:px-8">
            {/* Fundo com Transparência e Desfoque */}
            <div className="w-full max-w-3xl bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8 shadow-lg">
                {/* Input de Pesquisa */}
                <div className="mb-6">
                    <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleSearchProductsData(e.target.value, "")
                        }
                        placeholder="Pesquisar Canecas..."
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Lista de Produtos (Mostrando 6 Resultados) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProductData?.slice(0, 6).map((product) => (
                        <Link
                            href={`/canecas/detalhes/${product.id}`}
                            key={product.id}
                            className="relative bg-white rounded-lg shadow hover:shadow-md border overflow-hidden p-2 sm:block flex items-center justify-between"
                        >
                            <div className="w-[100px] sm:w-full">
                                <Image
                                    src={product.files[2]}
                                    alt={product.name}
                                    className="w-full h-auto object-contain border rounded-lg"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-base text-gray-700">{product.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Botão para ver todos os resultados */}
                <div className="w-full shadow-sm border text-center mt-6 p-2 rounded-md flex flex-wrap gap-2 justify-center">
                    <p>
                        {filteredProductData.length > 6
                            ? `Visualizando 6 de ${filteredProductData.length} resultados, Ver todos`
                            : `Visualizando ${filteredProductData.length} resultados`}
                    </p>
                    <Link href={"/canecas"} className="text-blue-600 hover:text-blue-600">
                        Veja a Coleção Completa
                    </Link>
                </div>
            </div>
        </div>
    );
}