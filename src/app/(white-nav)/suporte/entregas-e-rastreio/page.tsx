import React from "react";

type TrackingDetail = {
    title: string;
    description: string;
    additionalInfo?: React.ReactNode;    
};

const trackingDetails: TrackingDetail[] = [
    {
        title: "Como Rastrear Seu Pedido",
        description: "Para rastrear seu pedido, acesse a página de rastreamento e insira o número do pedido fornecido no e-mail de confirmação. Você também pode usar o link direto para o rastreamento que foi enviado para seu e-mail.",
    },
    {
        title: "Status do Pedido",
        description: "O status do seu pedido pode variar entre as seguintes etapas: Processando, Enviado, Em Transito e Entregue. Cada uma dessas etapas será atualizada automaticamente no sistema à medida que o pedido avança.",
    },
    {
        title: "Problemas com o Rastreamento",
        description: "Se você tiver problemas ao rastrear seu pedido, entre em contato com nosso suporte ao cliente. Estamos aqui para ajudar a resolver qualquer problema e garantir que você receba seu pedido sem contratempos.",
    },
    {
        title: "Atualizações de Entrega",
        description: "Você receberá atualizações por e-mail quando seu pedido estiver a caminho e quando for entregue. Certifique-se de que seu e-mail esteja correto e verifique a pasta de spam caso não receba as atualizações.",
    },
    {
        title: "Pedidos Não Entregues",
        description: "Caso seu pedido não tenha sido entregue dentro do prazo estimado, entre em contato com nosso suporte. Verificaremos o status da entrega e tomaremos as providências necessárias para resolver a situação.",
    },
    {
        title: "Informações de Contato",
        description: "Para qualquer dúvida ou problema relacionado ao rastreamento, você pode entrar em contato com nosso suporte ao cliente através do e-mail suporte@exemplo.com ou pelo telefone (11) 1234-5678.",
    },
];

export default function OrderTracking() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Status de Pedido e Rastreio de Entregas</h1>
                    <p className="text-gray-500 text-md">Acompanhe o progresso do seu pedido com facilidade e eficiência</p>
                </header>

                <div className="space-y-8">
                    {trackingDetails.map(({ title, description, additionalInfo }, index) => (
                        <div key={index} className="bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                            <div className="flex items-start">
                                <div className="">
                                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                                    <p className="mt-2 text-gray-800">{description}</p>
                                    {additionalInfo}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
