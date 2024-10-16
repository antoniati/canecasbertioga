"use client";

import { CategoryForm } from "@/components/CategoryForm";
import { useCategoryDataById } from "@/hooks/useCategoriesData";

export default function CategoryEditPage({ params }: { params: { categoryId: string } }) {
    const { category, isLoading } = useCategoryDataById(params.categoryId);

    if (!category) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center gap-[40px]">
                <p className="p-4">Carregando Dados. Por favor Aguarde</p>
            </div>
        );
    }

    // Transformando o valor de `parent` de `null` para `undefined`
    const normalizedCategory = {
        ...category,
        parent: category.parent ?? undefined, // Se `parent` for null, torna-o undefined
    };

    return (
        <main className="w-full h-screen">
            {isLoading ? (
                <div className="w-full h-screen flex flex-col items-center justify-center gap-[40px]">
                    <p className="p-4">Carregando Dados. Por favor Aguarde</p>
                </div>
            ) : (
                <CategoryForm initialData={normalizedCategory} />
            )}
        </main>
    );
}