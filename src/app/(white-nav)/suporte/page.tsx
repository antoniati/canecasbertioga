import React from "react";

import { BoxesIcon, FeedbackIcon, HelpIcon, MugIcon, PathLocationIcon, PhoneIcon } from "@/components/Icons";

type CardData = {
    href: string;
    title: string;
    description: string;
    icon?: JSX.Element;
};

const cardData: CardData[] = [
    {
        href: "/suporte/atendimento-ao-cliente",
        title: "Atendimento ao Cliente",
        description: "Entre em contato com nossa equipe dedicada para obter suporte personalizado e solucionar qualquer dúvida ou problema. Estamos prontos para ajudar você!",
        icon: <PhoneIcon w="36" h="36" />,
    },
    {
        href: "/suporte/faq",
        title: "Perguntas Frequentes",
        description: "Explore as respostas para as perguntas mais comuns sobre nossos produtos e serviços. Encontre rapidamente a informação que você precisa.",
        icon: <HelpIcon w="36" h="36" />,
    },
    {
        href: "/suporte/entregas-e-rastreio",
        title: "Rastreio de Entregas",
        description: "Acompanhe o status da sua entrega em tempo real. Descubra a localização do seu pedido e a estimativa de chegada com facilidade e transparência.",
        icon: <PathLocationIcon w="36" h="36" />,
    },
    {
        href: "/suporte/devolucao",
        title: "Processo de Devolução",
        description: "Aprenda como devolver um produto de maneira simples e eficiente. Veja todos os detalhes sobre o nosso processo de devolução e como garantir uma experiência tranquila.",
        icon: <BoxesIcon w="36" h="36" />,
    },
    {
        href: "/suporte/instrucoes-de-uso",
        title: "Instruções de Uso",
        description: "Aproveite ao máximo suas canecas com nossas instruções detalhadas. Descubra dicas e cuidados para garantir que seus produtos se mantenham impecáveis por mais tempo.",
        icon: <MugIcon w="36" h="36" />,
    },
    {
        href: "/suporte/opnioes-e-sugestoes",
        title: "Feedback e Avaliações",
        description: "Compartilhe sua opinião e avalie nossos produtos. Seu feedback é fundamental para aprimorarmos continuamente e oferecer a melhor experiência.",
        icon: <FeedbackIcon w="36" h="36" />,
    },
];

export default function SupportPage() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-36 px-4 sm:px-8 lg:px-12">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900">Ajuda e Suporte</h1>
                <p className="mt-2 text-lg text-gray-600">Encontre as informações e ajuda de que você precisa</p>
            </header>

            {/* Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardData.map(({ href, title, description, icon }, index) => (
                    <a
                        key={index}
                        href={href}
                        className="bg-white p-6 rounded-md shadow-md duration-300 transition-transform transform hover:scale-105 flex flex-col"
                    >
                        <div className="flex items-center gap-4">
                            {icon}
                            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                        </div>
                        <p className="mt-4 text-gray-600">{description}</p>
                    </a>
                ))}
            </div>
        </section>
    );
}