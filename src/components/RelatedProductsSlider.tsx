import React, { useContext } from "react";

import { CartContext } from "@/contexts/CartContextProvider";
import { useProductsData } from "@/hooks/useProductsData";

import { ProductCard } from "./ProductCard";

export const RelatedProductsSlider = () => {
    const { data: products } = useProductsData();
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    return (
        <section className="space-y-6 mt-12 pb-[40px]">
            <h2 className="text-lg sm:text-xl text-center font-semibold text-gray-800 border-b border-gray-200 pb-4">
                Produtos Relacionados
            </h2>
            <div className="flex overflow-x-auto gap-6 py-4">
                {products?.slice(0, 9).map((product) => (
                    <ProductCard
                        key={product.id}
                        onLoading={() => {}}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.files[3]}
                        onAddToCart={() => addProduct(product.id, product.name, product.files[1])}
                    />
                ))}
            </div>
        </section>
    );
};
