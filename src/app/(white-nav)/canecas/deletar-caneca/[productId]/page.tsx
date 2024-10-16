"use client";

import { UserRole } from "@prisma/client";
import Link from "next/link";

import { DeletePageManager } from "@/components/DeletePageManager";
import { NotFoundPage } from "@/components/NotFoundPage";
import { useCurrentUserByClientSide } from "@/hooks/useClientSideUser";
import { useProductDataById } from "@/hooks/useProductsData";
import { deleteProduct } from "@/services/delete/deleteProduct";

export default function DeleteProduct({ params }: { params: { productId: string } }) {
    const currentUser = useCurrentUserByClientSide();
    const { product, isLoading } = useProductDataById(params.productId);

    if (currentUser && currentUser.role === UserRole.USER) {
        return <NotFoundPage />;
    }

    if (!isLoading && !product) {
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
                    name={`da ${product?.name ?? ""}`}
                    urlBackPage={"/canecas/lista-de-canecas"}
                    idToDeleteData={params.productId}
                    deleteFunction={deleteProduct}
                />
            )}
        </main>
    );
}