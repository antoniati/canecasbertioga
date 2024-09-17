"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronIcon } from "./Icons";

export const faqData = [
    {
        header: "Entregas somente em Bertioga?",
        body: "Sim, nossos produtos são exclusivamente dedicados à cidade de Bertioga. Eles são criados para celebrar a rica cultura e beleza local. Para adquirir nossos produtos, você pode selecionar em nosso site e solicitar uma entrega dentro da cidade. Nosso objetivo é proporcionar uma lembrança autêntica e especial para quem visita nossa cidade.",
    },
    {
        header: "Quais são as opções de pagamento?",
        body: "Para sua comodidade, aceitamos uma ampla gama de opções de pagamento, incluindo cartões de crédito e débito, PIX e pagamentos via plataformas digitais como ApplePay e GooglePay. Utilizamos a Stripe API para garantir que suas transações sejam seguras e rápidas.",
    },
    {
        header: "Qual é o prazo de entrega para Bertioga?",
        body: "O prazo de entrega para Bertioga varia de 1 a 3 dias úteis, dependendo da disponibilidade do produto e da localização exata na cidade. Após a confirmação do pedido, você receberá uma estimativa de entrega precisa e um código de rastreamento para acompanhar o status da entrega.",
    },
    {
        header: "Como posso rastrear meu pedido?",
        body: "Após o envio do seu pedido, você receberá um e-mail com um link para rastreamento. Basta clicar no link para visualizar o status de sua entrega em tempo real. Se tiver alguma dúvida ou precisar de ajuda, nossa equipe de suporte está disponível para ajudar.",
    },
    {
        header: "Posso trocar ou devolver um produto?",
        body: "Sim, oferecemos uma política de devolução e troca para garantir sua satisfação. Você pode solicitar a troca ou devolução de um produto dentro de 30 dias após a compra, desde que ele esteja em perfeitas condições. Para mais informações, consulte nossa Política de Devolução e Troca.",
    },
    {
        header: "Quais são os locais de venda?",
        body: "Nossos produtos estão disponíveis exclusivamente em nosso site oficial. Não realizamos vendas em redes sociais, lojas físicas ou eventos. Esta abordagem garante que você receba produtos autênticos e diretamente de nossa equipe.",
    },
    {
        header: "É possível personalizar os produtos?",
        body: "No momento, não oferecemos personalização em nossos produtos. Todos os itens são cuidadosamente projetados para refletir a beleza e a essência da cultura local de Bertioga. Fique atento às nossas novidades, pois estamos sempre explorando novas opções!",
    },
    {
        header: "Vocês realizam entregas em outras cidades além de Bertioga?",
        body: "No momento, nossas entregas são limitadas à cidade de Bertioga. Estamos estudando a possibilidade de expandir para outras áreas no futuro, então acompanhe nossas atualizações para ficar por dentro das novidades!",
    },
];

const FAQItem = ({ header, body }: { header: string; body: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-md bg-white mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex w-full items-center justify-between p-2"
            >
                <span className="pl-1 text-start text-md font-medium text-slate-700">
                    {header}
                </span>
                <div className={`transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}>
                    <ChevronIcon w="24" h="24" />
                </div>
            </button>
            {isOpen && (
                <div className="mt-2 text-base text-slate-700 px-4 pb-6 pt-2 leading-8">
                    {body}
                </div>
            )}
        </div>
    );
};

export const FAQSection = () => {
    return (
        <section className="w-full bg-white px-4 md:px-8 lg:px-12 h-auto">
            <h2 className={"w-full py-[40px] border-t border-slate-200 text-center text-[16px] sm:text-xl"}>
                Suporte informado para tirar todas suas dúvidas
            </h2>

            <div className="w-full flex flex-col sm:flex-row justify-between py-[20px] sm:py-[40px] sm:gap-[40px] gap-[20px]">
                <div className="w-full sm:w-2/4">
                    <h2 className="text-lg sm:text-2xl font-semibold text-slate-900">
                        Perguntas Frequentes
                    </h2>

                    <p className="mt-1 text-md sm:text-lg max-w-lg">
                        Tem outra pergunta? Entre em contato conosco no{" "}
                        <Link
                            href="https://wa.me/5513981257704"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </Link>
                    </p>
                </div>

                <div className="w-full sm:w-2/4">
                    {faqData.slice(0, 6).map((faq, index) => (
                        <FAQItem key={index} header={faq.header} body={faq.body} />
                    ))}
                </div>
            </div>
        </section>
    );
};
