"use client";

import { Order, OrderStatus } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

import { OrderTable } from "@/components/OrderTable";
import { useOrdersData } from "@/hooks/useOrderData";

export default function OrderListPage() {
    const { data: orders, isLoading } = useOrdersData();

    // Estados para os filtros
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    // Função para filtrar pedidos
    const filteredOrders = orders?.filter((order: Order) => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0]; // Obtém a data no formato 'YYYY-MM-DD'
        const matchesDate = selectedDate ? orderDate === selectedDate : true;
        const matchesStatus = selectedStatus ? order.orderStatus === selectedStatus : true;
        return matchesDate && matchesStatus;
    });

    return (
        <section className="w-full h-auto bg-gradient-to-r from-gray-50 to-gray-100 flex items-start justify-start py-24 flex-col space-y-4 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    Lista de Pedidos ({filteredOrders?.length ?? 0})
                </h1>

                {/* Filtros */}
                <div className="flex space-x-4 my-4">
                    {/* Filtro por data */}
                    <div>
                        <label htmlFor="date" className="sr-only text-xs font-semibold p-1 text-gray-700">Data do Pedido</label>
                        <input
                            id="date"
                            type="date"
                            className={`w-auto px-4 py-2 cursor-pointer text-[16px] pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            value={selectedDate || ""}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    {/* Filtro por status */}
                    <div>
                        <label htmlFor="status" className="sr-only text-xs font-semibold p-1 text-gray-700">Status do Pedido</label>
                        <select
                            id="status"
                            className={`w-auto px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value={OrderStatus.RECEIVED}>Recebidos</option>
                            <option value={OrderStatus.PREPARING}>Preparando</option>
                            <option value={OrderStatus.IN_TRANSIT}>Em trânsito</option>
                            <option value={OrderStatus.DELIVERED}>Entregues</option>
                        </select>
                    </div>
                </div>

                {filteredOrders && (
                    <div className="w-full flex flex-col sapce-y-4">
                        <OrderTable orders={filteredOrders} />

                        <div className="py-6">
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