"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { CategoryTable } from "@/components/CategoriesTable";
import { SearchIcon } from "@/components/Icons";
import { useCategoriesData } from "@/hooks/useCategoriesData";

export default function CategoryListPage() {
    const [searchTerm, setSearchTerm] = useState(""); // Hook que deve sempre ser chamado
    const { data: categories, isLoading } = useCategoriesData(); // Hook que deve sempre ser chamado

    // Verificação se o dado está carregando ou não retornou categorias
    if (isLoading) {
        return <p>Carregando...</p>; // Exibição do carregamento
    }

    if (!categories) {
        return <p>Nenhuma categoria encontrada</p>; // Exibe uma mensagem no caso de erro
    }

    // Filtragem das categorias com base no termo de pesquisa
    const filteredCategoriesData = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );


    return (
        <section className="w-full h-auto bg-gradient-to-r from-gray-50 to-gray-100 flex items-start justify-start py-24 flex-col space-y-4 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    Lista de Categorias ({filteredCategoriesData.length})
                </h1>

                <div className="relative my-4">
                    <input
                        className={`w-auto px-4 py-2 text-[16px] pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        type="text"
                        name="search"
                        placeholder="Pesquisar Categoria..."
                        spellCheck={false}
                        autoComplete="off"
                        disabled={isLoading}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute top-[7px] left-[10px] text-slate-700">
                        <SearchIcon w="24" h="24" />
                    </span>
                </div>

                {filteredCategoriesData.length > 0 ? (
                    <CategoryTable categories={filteredCategoriesData} />
                ) : (
                    <div className="w-full p-6 h-[300px] bg-white text-gray-500 flex items-center justify-center">
                        <p className="text-center text-gray-500 font-medium text-lg">
                            Nenhuma Categoria Encontrada
                        </p>
                    </div>
                )}

                <div className="w-full flex sm:flex-row flex-col items-center justify-start gap-[15px] mt-4 pt-4 border-t border-slate-300">
                    <Link
                        type={"button"}
                        href={"/categorias/cadastrar-categoria"}
                        className="w-full sm:w-auto trasnform hover:scale-105 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full text-center transition-all duration-300 hover:shadow-md"
                    >
                        Registrar Categoria
                    </Link>
                    <Link
                        type={"button"}
                        href={"/dashboard"}
                        className="w-full sm:w-auto trasnform hover:scale-105 border border-blue-600 text-center rounded-full hover:border-blue-700 px-6 py-2 font-medium text-blue-600 hover:text-blue-700 transition-all duration-300 hover:shadow-md"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </section>
    );
}