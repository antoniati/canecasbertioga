"use client";

import { Order, OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { updateOrderStatusToDelivered } from "@/services/update/updateOrderStatusToDelivered";
import { updateOrderStatusToInTransit } from "@/services/update/updateOrderStatusToInTransit";

export const OrderTable = ({ orders }: { orders: Order[] }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    const handleUpdateOrderStatus = async (orderId: string, orderStatus: OrderStatus) => {
        setIsPending(true);

        try {
            let result;
            if (orderStatus === OrderStatus.IN_TRANSIT) {
                result = await updateOrderStatusToInTransit(orderId);
            } else if (orderStatus === OrderStatus.DELIVERED) {
                result = await updateOrderStatusToDelivered(orderId);
            } else {
                throw new Error("Status de pedido inválido");
            }

            if (result.success) {
                toast.success(result.success, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (result.error) {
                toast.error(result.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar atualizar.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full overflow-x-auto max-h-[400px] bg-white">
            <table className="min-w-full border-collapse text-left">
                <thead className="text-sm border-y mb-2 bg-slate-50">
                    <tr>
                        <th className="p-2 text-slate-700 font-semibold">Detalhe</th>
                        <th className="p-2 text-slate-700 font-semibold">Canecas</th>
                        <th className="p-2 text-slate-700 font-semibold">Pagamento</th>
                        <th className="p-2 text-slate-700 font-semibold">Entrega</th>
                        <th className="p-2 text-slate-700 font-semibold">Valor</th>
                        <th className="p-2 text-slate-700 font-semibold">Opções</th>
                    </tr>
                </thead>

                <tbody className="text-gray-700 text-md font-light">
                    {orders.map((order) => {
                        const orderDate = new Date(order.createdAt);
                        const date = orderDate.toLocaleDateString("pt-BR");
                        const time = orderDate.toLocaleTimeString("pt-BR");

                        return (
                            <tr key={order.id} className="w-full border-b border-gray-200 hover:bg-amber-50 transition-colors pb-2">
                                <td className="p-2 whitespace-nowrap flex flex-col space-y-1">
                                    <div className="flex items-center space-x-1">
                                        <b className="font-bold">Data:</b> {date}
                                        <b className="font-bold">Horário:</b> {time}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <b className="font-bold">Cliente: </b> {order.isCustomer ? "Sim" : "Não"}
                                        <b className="font-bold">Nome: </b>{order.customerName}
                                    </div>
                                    <b className="font-bold">Email: </b>{order.email}
                                    <b className="font-bold">Telefone de Contato: </b>{order.phone}
                                    <b className="font-bold">Rua: </b>{order.street}
                                    <b className="font-bold">CEP: </b> {order.zip}
                                </td>
                                <td className="p-2">
                                    {Array.isArray(order.line_items) ? (
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        order.line_items.map((lineItem: any, index: number) => {
                                            const productName = lineItem?.name ?? "Unknown";
                                            const quantity = lineItem?.quantity ?? 0;

                                            return (
                                                <div key={index} className="p-2 border-y whitespace-nowrap">
                                                    {productName}
                                                    <br />
                                                    <span className="font-bold">
                                                        Quantidade: {quantity}
                                                    </span>
                                                    <br />
                                                    <span className="font-bold">
                                                        Preço Unidade: R$ {lineItem?.price}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>Sem produtos</div>
                                    )}
                                </td>
                                <td className="text-center p-2 whitespace-nowrap">
                                    <span className={`p-2 rounded-full shadow-sm ${order.paid ? "bg-teal-100 text-teal-700 font-medium" : "bg-amber-300"}`}>
                                        {order.paid ? "Pago" : "Não Confirmado"}
                                    </span>
                                </td>
                                <td className="text-center p-2 whitespace-nowrap ">
                                    <span className={"p-2 rounded-full shadow-sm bg-white flex items-center justify-center"}>
                                        {order.orderStatus === "PREPARING" ? (
                                            <>
                                                🚧 <span className="ml-2">Preparando para Envio</span>
                                            </>
                                        ) : order.orderStatus === "IN_TRANSIT" ? (
                                            <>
                                                🚚 <span className="ml-2">Em Trânsito</span>
                                            </>
                                        ) : order.orderStatus === "DELIVERED" ? (
                                            <>
                                                🎉 <span className="ml-2">Entregue</span>
                                            </>
                                        ) : (
                                            <>
                                                📝 <span className="ml-2">Pedido Recebido</span>
                                            </>
                                        )}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap text-center p-2 font-medium">
                                    <strong>
                                        R$ {order?.purchaseValue}
                                    </strong>
                                </td>
                                <td className="w-[240px] p-2">
                                    <div className="w-full flex flex-col justify-start gap-[10px]">
                                        {order.orderStatus !== "IN_TRANSIT" && order.orderStatus !== "DELIVERED" ? (
                                            <button
                                                disabled={isPending}
                                                type="button"
                                                className="text-start w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-700 text-white font-semibold px-2 py-1 rounded-full transition-all duration-300 transform hover:scale-105"
                                                onClick={() => handleUpdateOrderStatus(order.id, OrderStatus.IN_TRANSIT)}
                                            >
                                                <span>Enviar</span>
                                            </button>
                                        ) : order.orderStatus === "DELIVERED" && (
                                            <></>
                                        )}
                                        {order.orderStatus === "IN_TRANSIT" && (
                                            <button
                                                disabled={isPending}
                                                type="button"
                                                className="text-start w-full flex items-center justify-center space-x-2 bg-amber-700 hover:bg-amber-700 text-white font-semibold px-2 py-1 rounded-full transition-all duration-300 transform hover:scale-105"
                                                onClick={() => router.push(`/seus-pedidos/rastreio/${order.id}`)}
                                            >
                                                <span>Rastrear</span>
                                            </button>
                                        )}
                                        {order.orderStatus !== "DELIVERED" && (
                                            <button
                                                disabled={isPending}
                                                type="button"
                                                className="text-start flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-full transition-all duration-300 transform hover:scale-105"
                                                onClick={() => handleUpdateOrderStatus(order.id, OrderStatus.DELIVERED)}
                                            >
                                                <span>Confirmar</span>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};