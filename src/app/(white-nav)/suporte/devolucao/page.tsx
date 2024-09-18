import React from "react";

type PolicyDetail = {
    title: string;
    description: string;
    additionalInfo?: React.ReactNode;    
};

const policyDetails: PolicyDetail[] = [
    {
        title: "Visão Geral",
        description: "Nossa política de devolução foi projetada para garantir sua total satisfação com a compra. Você tem a garantia legal para solicitar uma devolução ou troca de acordo com o artigo 18 do código de defesa do consumidor. Nossa equipe está comprometida em facilitar o processo e assegurar que suas expectativas sejam atendidas com o máximo de eficiência.",        
    },
    {
        title: "Cobertura da Garantia",
        description: "Todas as canecas personalizadas compradas em nosso site estão cobertas por uma garantia legal de 30 a 90 dias  contra defeitos de fabricação. A garantia inclui:",
        additionalInfo: (
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                <li>Defeitos na personalização.</li>
                <li>Problemas estruturais na caneca.</li>
                <li>Descolamento da impressão.</li>
            </ul>
        ),
    },
    {
        title: "Como Devolver",
        description: "Para iniciar uma devolução, entre em contato com nosso suporte ao cliente para receber um código de devolução e instruções detalhadas. Você pode devolver o item através dos Correios ou de uma transportadora de sua escolha.",        
    },
    {
        title: "Política de Troca",
        description: "Se você deseja trocar um item, entre em contato com nosso suporte ao cliente para verificar a disponibilidade do novo item. As trocas são processadas assim que recebemos o item devolvido e verificamos sua condição.",        
    },
    {
        title: "Verificar Status da Devolução",
        description: "Após solicitar uma devolução, você pode verificar o status a qualquer momento usando o link fornecido no e-mail de confirmação de devolução. Se precisar de mais informações, entre em contato com nosso suporte.",        
    },
    {
        title: "Instruções de Embalagem",
        description: "Ao embalar o item para devolução, certifique-se de:",
        additionalInfo: (
            <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                <li>Incluir todos os acessórios e peças originais.</li>
                <li>Utilizar a embalagem original sempre que possível.</li>
                <li>Adicionar uma cópia do recibo ou comprovante de compra.</li>
            </ul>
        ),        
    },
];

export default function ReturnPolicy() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Política de Devolução e Troca</h1>
                    <p className="text-gray-500 text-md">Oferecemos processos simples e ágeis para garantir sua satisfação</p>
                </header>

                <div className="space-y-8">
                    {policyDetails.map(({ title, description, additionalInfo }, index) => (
                        <div key={index} className="bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out" >
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
