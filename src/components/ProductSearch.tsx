"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { useSearchModal } from "@/contexts/SearchModalContext";
import { useProductsData } from "@/hooks/useProductsData";

import { SearchIcon } from "./Icons";

export const ProductSearch = () => {
    const { data: products } = useProductsData();
    const { isOpen, closeModal } = useSearchModal();

    const [searchTerm, setSearchTerm] = useState<string>("");

    if (!isOpen || !products) return null;

    const handleSearchProductsData = (value: string) => {
        setSearchTerm(value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <section
            onClick={closeModal}
            className={`${isOpen ? "fixed top-0 left-0" : "hidden"}  w-full h-screen flex items-start justify-center bg-slate-900 bg-opacity-30 backdrop-blur-lg z-50 p-4 md:p-6 sm:p-12`}
        >
            <div
                className="w-full max-w-3xl bg-white rounded-xl p-8 shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex-1 mb-4">
                    <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchProductsData(e.target.value)}
                        placeholder="Pesquisar Canecas..."
                        className="w-full px-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute inset-y-0 left-[10px] flex items-center text-gray-600 pointer-events-none">
                        <SearchIcon w="24" h="24" />
                    </span>
                </div>

                {filteredProducts?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredProducts?.slice(0, 6).map((product) => (
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
                ) : (
                    <p className="w-full flex items-center justify-center text-gray-500 border p-8 rounded-lg">
                        Nenhuma Caneca Encontrada
                    </p>
                )}

                {products?.length > 0 && (
                    <div className="w-full border-t text-center mt-6 p-4 flex flex-wrap gap-2 justify-center">
                        <p>
                            Visualizando {products?.length} resultados
                        </p>
                        <Link href={"/canecas"} className="text-blue-600 hover:text-blue-600">
                            Veja a Coleção Completa
                        </Link>
                    </div>
                )}

                <span
                    onClick={closeModal}
                    className="absolute top-0 right-[10px] text-slate-700 text-3xl cursor-pointer"
                >
                    &times;
                </span>
            </div>
        </section>
    );
};