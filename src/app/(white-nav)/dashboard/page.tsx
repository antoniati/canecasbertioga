"use client";

import Link from "next/link";

import { DateIcon, LayersIcon, MugIcon, PersonIcon } from "@/components/Icons";
import { useCategoriesData } from "@/hooks/useCategoriesData";
import { useOrdersData } from "@/hooks/useOrderData";
import { useProductsData } from "@/hooks/useProductsData";
import { useUsersData } from "@/hooks/useUserData";

export default function DashboardPage() {
    const { data: products } = useProductsData();
    const { data: categories } = useCategoriesData();
    const { data: orders } = useOrdersData();
    const { data: users } = useUsersData();

    const gridDashData = [
        {
            icon: MugIcon,
            title: "Lista de Canecas",
            pageUrl: "/canecas/lista-de-canecas",
            quantity: products?.length ?? [],
        },
        {
            icon: PersonIcon,
            title: "Lista de Clientes",
            pageUrl: "/clientes/lista-de-clientes",
            quantity: users?.length ?? [],
        },
        {
            icon: DateIcon,
            title: "Pedidos",
            pageUrl: "/seus-pedidos/lista-de-pedidos",
            quantity: orders?.length ?? [],
        },
        {
            icon: LayersIcon,
            title: "Categorias",
            pageUrl: "/categorias/lista-de-categorias",
            quantity: categories?.length ?? [],
        },
    ];

    return (
        <section className="w-full bg-gradient-to-r from-gray-50 to-gray-100 h-auto flex items-start justify-start flex-col py-24 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    Dashboard
                </h1>
                <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
                    {gridDashData.map((gridData, index) => (
                        <Link key={index} href={`${gridData.pageUrl}`} className="border bg-white p-4 rounded-md shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 ">
                            <div className="space-y-4 relative">
                                <div className="flex justify-start space-x-2">
                                    <gridData.icon w="24" h="24" />
                                    <h1>{gridData.title}</h1>
                                </div>
                                <div className="mt-6 grid grid-cols-3 divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border">
                                    <div className="truncate px-3 py-2 space-y-1">
                                        <p className="truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                            Quantidade
                                        </p>
                                        <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            {gridData.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}