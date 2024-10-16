"use client";

import { Product } from "@prisma/client";
import clsx from "clsx";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
import { useContext, useState } from "react";

import { CartContext } from "@/contexts/CartContextProvider";

import { LoadingPage } from "./LoadingPage";
import { ProductCard } from "./ProductCard";


const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400"],
});

export const NewsProducts = ({ products }: { products: Product[] }) => {
    const cartContext = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const handleViewDetails = () => {
        setLoading(true);
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct } = cartContext;

    if (products && products.length > 0) {
        return (
            <section className="w-full bg-white flex flex-col items-center justify-center px-4 md:px-6 lg:px-12 xl:px-24">
                <header className="w-full flex items-center justify-center h-[100px]">
                    <h2 className={clsx(workSans.className, "w-full text-center text-lg sm:text-xl")}>
                        Explore Nossa Nova Coleção Exclusiva de Canecas
                    </h2>
                </header>
                {/* Grid de produtos */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.slice(3, 11).map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            onLoading={handleViewDetails}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.files[3]}
                            onAddToCart={() => addProduct(product.id, product.name, product.files[1])}
                        />
                    ))}
                </section>
                <footer className="w-full flex items-center justify-center h-[200px] px-[20px]">
                    <Link
                        href="/canecas"
                        className="w-full md:w-auto text-center px-6 border-blue-600 border text-blue-600 font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        onClick={handleViewDetails}
                    >
                        Veja a Coleção Completa
                    </Link>
                </footer>
            </section >
        );
    }
};