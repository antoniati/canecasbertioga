"use client";

import { UserRole } from "@prisma/client";

import { NotFoundPage } from "@/components/NotFoundPage";
import { ProductForm } from "@/components/ProductForm";
import { useCurrentUserByClientSide } from "@/hooks/useClientSideUser";

export default function RegisterProductPage() {
    const currentUser = useCurrentUserByClientSide();

    if (currentUser && currentUser.role === UserRole.USER) {
        return <NotFoundPage />;
    }

    return (
        <ProductForm />
    );
}