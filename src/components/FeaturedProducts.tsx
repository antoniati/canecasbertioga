"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState, useMemo } from "react";

import { ChevronIcon } from "@/components/Icons";
import { CartContext } from "@/contexts/CartContextProvider";

import { LoadingPage } from "./LoadingPage";

export const FeaturedProducts = ({ products }: { products: Product[] }): JSX.Element => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("Contexto do carrinho não encontrado!");
    }

    const { addProduct } = cartContext;

    // Usando useMemo para memorizar featuredProducts
    const featuredProducts = useMemo(() => products?.slice(0, 3) || [], [products]);

    useEffect(() => {
        if (featuredProducts.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [featuredProducts]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null) return;

        const touchEndX = e.touches[0].clientX;
        const touchDifference = touchStartX - touchEndX;

        if (touchDifference > 50) {
            nextSlide();
            setTouchStartX(null);
        } else if (touchDifference < -50) {
            prevSlide();
            setTouchStartX(null);
        }
    };

    const handleTouchEnd = () => {
        setTouchStartX(null);
    };

    const handleViewDetails = () => {
        setLoading(true);
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <section
            className="relative flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 text-slate-800 py-12 lg:py-24 px-1 md:px-6 lg:px-12 xl:px-24"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full md:w-1/2 text-center md:text-left px-2">
                <h1 className="text-lg md:text-2xl lg:text-5xl font-bold mb-4">
                    {featuredProducts[currentSlide]?.name || ""}
                </h1>
                <p className="text-base lg:text-lg mb-6">
                    {featuredProducts[currentSlide]?.description || ""}
                </p>
                <button
                    type="button"
                    onClick={() =>
                        addProduct(
                            featuredProducts[currentSlide]?.id ?? "",
                            featuredProducts[currentSlide]?.name ?? "",
                            featuredProducts[currentSlide]?.files[1] ?? "",
                        )
                    }
                    className="w-full md:w-auto text-center py-3 px-6 text-white font-semibold rounded-full shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    Adicionar ao Carrinho
                </button>
            </div>

            {featuredProducts.length > 0 && (
                <div className="w-full relative md:w-1/2 flex justify-center items-center">
                    <div className="p-2 rounded-lg shadow text-center absolute top-[20px] right-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <h2 className="text-base lg:text-xl">por apenas</h2>
                        <p className="flex flex-row lg:flex-col text-lg items-center lg:text-3xl font-bold">
                            R$ {featuredProducts[currentSlide]?.price}
                            <span className="w-auto lg:w-full text-sm font-medium text-end">/unidade</span>
                        </p>
                    </div>

                    <Link
                        href={`/canecas/detalhes/${featuredProducts[currentSlide]?.id}`}
                        className="w-full sm:h-auto h-[320px] relative"
                        onClick={handleViewDetails}
                    >
                        <Image
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            src={`${featuredProducts[currentSlide]?.files[3] ?? "/"}`}
                            alt={`Imagem ${featuredProducts[currentSlide]?.name}`}
                            width={1000}
                            height={800}
                            priority
                        />
                    </Link>
                </div>
            )}

            <button
                className="top-2/4 hidden lg:block absolute left-[10px] bg-white text-gray-600 font-bold p-2 -rotate-90 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
                onClick={prevSlide}
            >
                <ChevronIcon w="20" h="20" />
            </button>
            <button
                className="top-2/4 hidden lg:block absolute right-[10px] bg-white text-gray-600 font-bold p-2 rotate-90 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
                onClick={nextSlide}
            >
                <ChevronIcon w="20" h="20" />
            </button>
        </section>
    );
};