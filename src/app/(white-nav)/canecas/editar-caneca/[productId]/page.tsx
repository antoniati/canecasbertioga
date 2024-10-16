"use client";

import { UserRole } from "@prisma/client";

import { NotFoundPage } from "@/components/NotFoundPage";
import { ProductForm } from "@/components/ProductForm";
import { PropsOfProperties } from "@/components/PropertyManager";
import { useCurrentUserByClientSide } from "@/hooks/useClientSideUser";
import { useProductDataById } from "@/hooks/useProductsData";


export default function ProductEditPage({ params }: { params: { productId: string } }) {
    const currentUser = useCurrentUserByClientSide();
    
    const { product, isLoading } = useProductDataById(params.productId);
 
    if (currentUser && currentUser.role === UserRole.USER) {
        return <NotFoundPage />;
    }
    
    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center gap-[40px]">
                <p className="p-4">Carregando Dados. Por favor Aguarde</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center gap-[40px]">
                <p className="p-4 bg-gray-50 w-full rounded-md">Produto não encontrado.</p>
            </div>
        );
    }

    // Formatação dos campos para edição
    const formattedProduct = {
        ...product,
        price: product.price.toFixed(2),
        costPrice: product.costPrice.toFixed(2),
        paymentUrl: product.paymentUrl ?? undefined,
        googleMapsUrl: product.googleMapsUrl ?? undefined,
        categoryId: product.categoryId ?? undefined,
        categoryName: product.categoryName ?? undefined,
        specifications: product.specifications as PropsOfProperties[],
        dimensions: product.dimensions as PropsOfProperties[],
        features: product.features as PropsOfProperties[],
    };

    return (
        <main className="w-full h-screen">
            <ProductForm initialData={formattedProduct} />
        </main>
    );
}
