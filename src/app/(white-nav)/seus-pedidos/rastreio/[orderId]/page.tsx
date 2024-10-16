"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { ListCheckedIcon, ListClockIcon } from "@/components/Icons";
import { OrderInformation } from "@/components/OrderInformation";
import { OrderTracker } from "@/components/OrderTracker";
import { RealTimeTracking } from "@/components/RealTimeTraking";
import { useOrderDataById } from "@/hooks/useOrderData";

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
    const { data: order, isLoading } = useOrderDataById(params.orderId);

    const [selectedTab, setSelectedTab] = useState(0);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                (error) => {
                    console.error("Erro ao obter a localização: ", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                },
            );
        } else {
            console.error("Geolocation não é suportado pelo navegador.");
        }
    }, []);

    if (isLoading) {
        return (
            <section className="w-full h-screen flex flex-col items-center justify-center gap-[40px] bg-gradient-to-r from-blue-900 to-sky-600">
                <p className="text-lg">Carregando Página</p>
            </section>
        );
    }

    if (!order && !isLoading) {
        return (
            <section className="w-full h-screen flex flex-col items-center justify-center gap-[40px] bg-gradient-to-r from-blue-900 to-sky-600">
                <div className="max-w-lg p-6 bg-gray-50 border-l-4 border-gray-500 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <span className="text-lg mr-4"> ⚠️</span>
                        <h3 className="text-md font-semibold text-gray-800">Nenhum Pedido Encontrado</h3>
                    </div>
                    <p className="text-gray-700"> Deculpe não encontramos nenhum pedido para o ID de rastreio fornecido.  Caso tenha alguma dúvida ou precise de suporte, não hesite em entrar em contato conosco. Estamos aqui para ajudar!</p>
                </div >
            </section>
        );
    }

    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="pb-[40px]">
                <header className="w-full flex items-center border-b pb-3">
                    <h1 className="font-bold text-xl ml-2 text-gray-800">Seus Pedidos</h1>
                </header>

                {/* Grupo de Abas */}
                <div className="mt-6 flex space-x-4 bg-white p-2 rounded-lg shadow-md overflow-auto">
                    <button
                        className={clsx(
                            "w-auto px-4 whitespace-nowrap py-2 text text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 0
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(0)}
                    >
                        <ListClockIcon w="20" h="20" />
                        <span> Pedido Atual </span>
                    </button>

                    <button
                        className={clsx(
                            "w-auto px-4 whitespace-nowrap text py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                            selectedTab === 1
                                ? "bg-gray-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedTab(1)}
                    >
                        <ListCheckedIcon w="20" h="20" />
                        <span> Rastrear em Tempo Real </span>
                    </button>
                </div>

                {/* Painéis das Abas */}
                <div className="mt-4 bg-white p-2 sm:p-6 rounded-lg shadow-lg">
                    {selectedTab === 0 && (
                        <div>
                            <OrderTracker status={order?.orderStatus ?? ""} />
                            <OrderInformation order={order!} />
                        </div>
                    )}

                    {selectedTab === 1 && (
                        <RealTimeTracking
                            currentLocation={{
                                lat: lat,
                                lng: lng,
                            }}
                            destinationLocation={{
                                lat: -23.797193,
                                lng: -46.017435,
                            }}
                        />
                    )}
                </div>
            </div>
        </section >
    );
}
