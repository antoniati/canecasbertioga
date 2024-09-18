"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "@/contexts/CartContextProvider";
import { products } from "@/utils/productDataTest";

import { Image } from "./Image"; // image kit

export const FeaturedProducts = (): JSX.Element => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("Contexto do carrinho não encontrado!");
    }

    const { addProduct } = cartContext;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const extractDescriptionUntilFirstPeriod = (description: string): string => {
        const periodIndex = description.indexOf(".");
        return periodIndex !== -1 ? description.slice(0, periodIndex + 1) : description;
    };

    return (
        <section className="relative w-full flex flex-col-reverse md:flex-row items-center bg-gradient-to-r from-blue-900 to-sky-600 text-white px-4 md:px-8 lg:px-12 pt-[40px]">
            <div className="w-full md:w-2/4 flex flex-col items-start justify-center gap-4 py-0 md:py-12 text-white">
                <h1 className="text-2xl md:text-3xl font-bold leading-8 md:leading-9">
                    {products[currentSlide]?.name}
                </h1>
                <h2 className="flex flex-col items-start md:items-end text-lg md:text-xl absolute right-[10px] md:right-[80px] top-[80px] z-10 bg-slate-700/90 p-2 rounded-md">
                    <span className="text-[14px] sm:text-[16px]">por apenas</span>
                    <b className="text-lg md:text-3xl">R$ 49,99</b>
                    <span className="text-xs">unidade</span>
                </h2>
                <p className="max-w-[650px] xl:max-w-[800px] text-base md:text-lg leading-6 md:leading-7">
                    {extractDescriptionUntilFirstPeriod(products[currentSlide]?.description || "")}
                </p>
                <div className="w-full flex flex-col md:flex-row gap-2 py-4">
                    <Link
                        href={"/carrinho"}
                        type="button"
                        onClick={() => addProduct(products[currentSlide].id)}
                        className="w-full sm:w-auto bg-[#0A91FF] hover:bg-[#33A3FF] hover:shadow-md text-slate-50 px-4 py-2 rounded-md cursor-pointer text-center font-semibold"
                    >
                        Comprar Agora
                    </Link>
                    <Link href={`/canecas/detalhes/${products[currentSlide]?.id}`} className="w-full sm:w-auto border border-slate-50 text-slate-50 px-4 py-2 rounded-md cursor-pointer text-center font-semibold hover:shadow-md">
                        Ver Detalhes
                    </Link>
                </div>
            </div>
            <div className="w-full md:w-2/4 flex items-center justify-center md:justify-end pr-[0px] md:pr-[40px] mt-[40px] sm:mt-[0px]">
                <Image
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                    path={products[currentSlide].files[3]}
                    alt={`Imagem ${products[currentSlide]?.name}`}
                    width={2000}
                    height={1800}
                    priority={true}
                />
            </div>
        </section>
    );
};