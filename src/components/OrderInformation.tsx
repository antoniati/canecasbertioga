import { Order } from "@prisma/client";

export const OrderInformation = ({ order }: { order: Order }) => {
    const orderDate = order?.createdAt ? new Date(order.createdAt) : new Date();
    const date = orderDate.toLocaleDateString("pt-BR");
    const time = orderDate.toLocaleTimeString("pt-BR");

    return (
        <section>
            {/* Informações do pedido */}
            < div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 px-4">
                {/* Data e Hora do Pedido */}
                <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4" >
                    <div>
                        <h3 className="font-semibold text-gray-900 flex space-x-2 items-center">
                            <span className="text-lg mr-2">📅</span> Pedido realizado em
                        </h3>
                        <p className="text-gray-600 mt-4">
                            <b>Data:</b> {date}<br />
                            <b>Horário:</b> {time}
                        </p>
                    </div>
                </div >

                {/* Detalhes do Envio */}
                <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4" >
                    <div>
                        <h3 className="font-semibold text-gray-900 flex space-x-2 items-center">
                            <span className="text-lg mr-2">📝</span> Detalhes do Envio
                        </h3>
                        <p className="text-gray-600">
                            <b>Nome:</b> {order?.customerName}<br />
                            <b>Email:</b> {order?.email}<br />
                            <b>Telefone:</b> {order?.phone}<br />
                            <b>Rua:</b> {order?.street}<br />
                            <b>CEP:</b> {order?.zip}
                        </p>
                    </div>
                </div >

                {/* Produtos do Pedido */}
                <div className="bg-white p-4 shadow-lg rounded-lg col-span-1 md:col-span-2" >
                    <h3 className="font-semibold text-gray-900 flex space-x-2 items-center">
                        <span className="text-lg mr-2">📦</span> Produtos do Pedido
                    </h3>
                    <div className="space-y-4 mt-4">
                        {Array.isArray(order?.line_items) ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            order.line_items.map((lineItem: any, index: number) => {
                                const productName = lineItem?.name ?? "Unknown";
                                const quantity = lineItem?.quantity ?? 0;
                                const price = (lineItem?.price / 100).toFixed(2);

                                return (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                                        <p className="text-gray-900"><b>Produto:</b> {productName}</p>
                                        <p className="text-gray-600"><b>Quantidade:</b> {quantity}</p>
                                        <p className="text-gray-600"><b>Preço:</b> R$ {parseFloat(price)}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-600">Sem produtos</p>
                        )}
                    </div>
                </div >

                {/* Status de Pagamento */}
                <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4" >
                    <div>
                        <h3 className="font-semibold text-gray-900 flex space-x-2 items-center">
                            <span className="text-lg mr-2">💸</span> Status de Pagamento
                        </h3>
                        <span className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${order?.paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {order?.paid ? "Pago" : "Não Confirmado"}
                        </span>
                    </div>
                </div >

                {/* Valor Total da Compra */}
                <div className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-4" >
                    <div>
                        <h3 className="font-semibold text-gray-900 flex space-x-2 items-center">
                            <span className="text-lg mr-2">💰</span> Valor da Compra
                        </h3>
                        <p className="mt-4 px-2 text-gray-600 font-medium">R$ {order?.purchaseValue}</p>
                    </div>
                </div >
            </div >
        </section>
    );
};