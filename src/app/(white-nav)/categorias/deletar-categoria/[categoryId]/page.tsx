"use client";

import Link from "next/link";

import { DeletePageManager } from "@/components/DeletePageManager";
import { useCategoryDataById } from "@/hooks/useCategoriesData";
import { deleteCategory } from "@/services/delete/deleteCategory";

export default function DeleteCategory({ params }: { params: { categoryId: string } }) {
    const { category, isLoading } = useCategoryDataById(params.categoryId);

    if (!isLoading && !category) {
        return (
            <section className="w-full  h-screen flex items-center justify-center">
                <div className="max-w-lg flex flex-col items-center justify-center gap-[15px]">
                    <p className="bg-rose-50 text-rose-500 px-4 py-8 rounded-md font-medium">
                        ID Inválido ou inexiste. Por favor, verifique e tente novamente.
                    </p>
                    <Link href={"/categorias/lista-de-categorias"} className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors duration-300">
                        OK
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <main className="w-full h-screen">
            {isLoading ? (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-[40px]">
                    <p className="p-4">Carregando Dados. Por favor Aguarde</p>
                </div>
            ) : (
                <DeletePageManager
                    name={`da ${category?.name ?? ""}`}
                    urlBackPage={"/categorias/lista-de-categorias"}
                    idToDeleteData={params.categoryId}
                    deleteFunction={deleteCategory}
                />
            )}
        </main>
    );
}