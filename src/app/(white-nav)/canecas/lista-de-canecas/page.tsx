"use client";

import { UserRole } from "@prisma/client";
import Link from "next/link";

import { NotFoundPage } from "@/components/NotFoundPage";
import { ProductTable } from "@/components/ProductTable";
import { SearchWithSelect } from "@/components/SearchWithSelect";
import { useCategoriesData } from "@/hooks/useCategoriesData";
import { useCurrentUserByClientSide } from "@/hooks/useClientSideUser";
import { useProductsData, useProductSearch } from "@/hooks/useProductsData";

export default function ProductListPage() {
    const currentUser = useCurrentUserByClientSide();
    
    const { data: products, isLoading: isLoadingProducts } = useProductsData();
    const { data: categories, isLoading: isLoadingCategories } = useCategoriesData();
    const { filteredProductData, handleSearchProductsData } = useProductSearch(products ?? []);
    
    if (currentUser && currentUser.role === UserRole.USER) {
        return <NotFoundPage />;
    }
    return (
        <section className="w-full h-auto bg-gradient-to-r from-gray-50 to-gray-100 flex items-start justify-start py-24 flex-col space-y-4 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    Lista de Canecas ({filteredProductData?.length ?? 0})
                </h1>

                <SearchWithSelect
                    onSearch={handleSearchProductsData}
                    isLoadingData={isLoadingProducts || isLoadingCategories}
                >
                    <option value="">Todas as Praias</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </SearchWithSelect>

                {products && (
                    <div className="w-full flex flex-col sapce-y-4">
                        <ProductTable products={filteredProductData} />

                        <div className="w-full flex sm:flex-row flex-col items-center justify-start gap-4 mt-4">
                            <Link
                                type={"button"}
                                href={"/canecas/cadastrar-canecas"}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full text-center transition-transform transform duration-300 hover:scale-105 hover:shadow-md"
                            >
                                Registrar Caneca
                            </Link>
                            <Link
                                type={"button"}
                                href={"/dashboard"}
                                className="w-full sm:w-auto border border-blue-600 text-center rounded-full hover:border-blue-700 px-6 py-2 font-medium text-blue-600 hover:text-blue-700 transition-transform transform duration-300 hover:scale-105 hover:shadow-md"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}