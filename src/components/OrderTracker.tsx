"use client";

import { BicycleIcon, BoxesIcon, CheckIcon, HappyFaceIcon } from "./Icons";

export const OrderTracker = ({ status }: { status: string }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 relative space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 z-0"></div>

            <div className="flex flex-col items-center z-10">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <CheckIcon w="36" h="36" />
                </div>
                <span className="mt-2 text-green-500 font-semibold text-sm text-center">
                    Pedido Aprovado
                </span>
            </div>

            <div className="flex flex-col items-center z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${status === "PREPARING" ? "bg-amber-500" : (status === "DELIVERED" || status === "IN_TRANSIT") ? "bg-green-500" : "bg-gray-200"}`}>
                    <BoxesIcon w="36" h="36" />
                </div>
                <span className={`mt-2 text-sm font-semibold text-center ${status === "PREPARING" ? "text-amber-500" : (status === "IN_TRANSIT" || status === "DELIVERED") ? "text-green-500" : "text-gray-200"}`}>
                    {status === "PREPARING" ? "Preparando para Entrega" : (status === "IN_TRANSIT" || status === "DELIVERED") ? "Pedido Preparado" : ""}
                </span>
            </div>

            <div className="flex flex-col items-center z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${status === "IN_TRANSIT" ? "bg-amber-500" : status === "DELIVERED" ? "bg-green-500" : "bg-gray-200"}`}>
                    <BicycleIcon w="36" h="36" />
                </div>
                <span className={`mt-2 text-sm font-semibold text-center ${status === "IN_TRANSIT" ? "text-amber-500" : status === "DELIVERED" ? "text-green-500" : "text-gray-200"}`}>
                    {status === "IN_TRANSIT" ? "A Caminho" : status === "DELIVERED" ? "Chegou ao Local" : "Entrega"}
                </span>
            </div>

            <div className="flex flex-col items-center z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${status === "DELIVERED" ? "bg-green-500" : "bg-gray-200"}`}>
                    <HappyFaceIcon w="36" h="36" />
                </div>
                <span className={`mt-2 text-sm font-semibold text-center ${status === "DELIVERED" ? "text-green-500" : "text-gray-200"}`}>
                    {status === "DELIVERED" ? "Entregue" : "Recebimento"}
                </span>
            </div>
        </div>
    );
};