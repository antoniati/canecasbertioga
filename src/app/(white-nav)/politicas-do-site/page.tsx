"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const privacyPolicy = {
    title: "Política de Privacidade",
    content: "Na Canecas Bertioga, levamos a sua privacidade a sério e estamos comprometidos em proteger suas informações pessoais. Nossa Política de Privacidade segue rigorosamente todas as leis e normas estabelecidas pela Lei Geral de Proteção de Dados (13.709/2018), conhecida como LGPD, que entrou em vigor em 2020. Esta legislação garante os direitos fundamentais de liberdade e privacidade de todos os cidadãos no Brasil. Nossa política detalha como coletamos, usamos, divulgamos e gerenciamos os dados de nossos clientes.",
    listOfInformations: [
        { titleInfo: "1. Coleta de Informações", descriptionInfo: "Coletamos informações pessoais, como nome, endereço de email, localização e informações de pagamento, quando você realiza uma compra ou se registra em nosso site. Também coletamos dados de acesso e uso do serviço para melhorar nossa oferta." },
        { titleInfo: "2. Uso das Informações", descriptionInfo: "As informações coletadas são utilizadas para fornecer e melhorar nossos serviços, processar transações, enviar notificações importantes, e personalizar a experiência do usuário. Nunca vendemos suas informações pessoais para terceiros." },
        { titleInfo: "5. Compartilhamento de Informações", descriptionInfo: "Podemos compartilhar suas informações com terceiros apenas quando necessário para fornecer nossos serviços (por exemplo, processar pagamentos, denifir rotas de entrega) ou conforme exigido por lei." },
        { titleInfo: "6. Segurança das Informações", descriptionInfo: "Implementamos medidas de segurança rigorosas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL e outros protocolos de segurança para garantir a proteção dos dados." },
        { titleInfo: "7. Retenção de Dados", descriptionInfo: "Retemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos para os quais foram coletadas, incluindo qualquer requisito legal ou de relatório." },
        { titleInfo: "8. Seus Direitos", descriptionInfo: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco pelo email privacidade@canecasbertioga.com." },
        { titleInfo: "9. Contato", descriptionInfo: "Para quaisquer dúvidas ou preocupações sobre nossa política de privacidade, entre em contato conosco através do email privacidade@canecasbertioga.com." },
    ],
};

export const cookiePolicy = {
    title: "Política de Cookies",
    content: "Na Canecas Bertioga, utilizamos cookies para melhorar sua experiência em nosso site. Nossa Política de Cookies segue rigorosamente todas as leis e normas estabelecidas pela Lei Geral de Proteção de Dados (13.709/2018), LGPD, que entrou em vigor em 2020. Esta legislação garante os direitos fundamentais de liberdade e privacidade de todos os cidadãos no Brasil. Os cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. Eles nos ajudam a entender suas preferências, melhorar a funcionalidade do site e oferecer um serviço mais personalizado.",
    listOfInformations: [
        { titleInfo: "1. O que são Cookies", descriptionInfo: "Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. Eles ajudam a melhorar sua experiência de navegação ao lembrar suas preferências e configurações." },
        { titleInfo: "2. Tipos de Cookies Utilizados", descriptionInfo: "Cookies Essenciais: Necessários para o funcionamento do site. Sem esses cookies, o site pode não funcionar corretamente. Cookies de Desempenho: Coletam informações sobre como você usa o site, permitindo-nos melhorar a funcionalidade e desempenho. Cookies de Funcionalidade: Permitem que o site se lembre de suas escolhas (como nome de usuário e idioma) para proporcionar uma experiência mais personalizada. Cookies de Publicidade: Não utilizamos cookies de publicidade." },
        { titleInfo: "3. Gerenciamento de Cookies", descriptionInfo: "Você pode controlar e gerenciar cookies através das configurações do seu navegador. No entanto, desativar cookies pode afetar a funcionalidade do nosso site." },
        { titleInfo: "4. Cookies de Terceiros", descriptionInfo: "Nosso site pode utilizar cookies de terceiros para ajudar a melhorar o desempenho e monitorar o tráfego. Esses cookies estão sujeitos às políticas de privacidade desses terceiros." },
        { titleInfo: "5. Consentimento para Uso de Cookies", descriptionInfo: "Ao continuar a usar nosso site, você concorda com o uso de cookies conforme descrito nesta política. Se desejar retirar seu consentimento, você pode ajustar as configurações do seu navegador para recusar cookies." },
        { titleInfo: "6. Atualizações na Política de Cookies", descriptionInfo: "Podemos atualizar esta política de cookies de tempos em tempos. Recomendamos que você revise esta política periodicamente para se manter informado sobre como utilizamos cookies." },
        { titleInfo: "7. Contato", descriptionInfo: "Para quaisquer dúvidas ou preocupações sobre nossa política de cookies, entre em contato conosco através do email cookies@canecasbertioga.com." },
    ],
};

export const termsAndConditions = {
    title: "Termos e Condições Gerais de Uso do Site",
    lastModified: "24 de novembro, 2023",
    intro: {
        content: "Bem-vindo à nossa loja online de canecas personalizadas com imagens das paisagens da praia de Bertioga. Estes Termos e Condições regulam o uso do nosso site e as transações feitas através dele. Ao utilizar nosso site, você concorda com os seguintes termos:",
    },
    sections: [
        {
            title: "1. Introdução",
            content: "Nosso e-commerce oferece canecas personalizadas com imagens de paisagens de Bertioga. Ao realizar compras no nosso site, você está de acordo com todos os termos e condições apresentados aqui.",
        },
        {
            title: "2. Cadastro e Conta do Usuário",
            content: "Para realizar compras, o usuário deve criar uma conta, fornecendo informações verdadeiras, completas e atualizadas. O usuário é responsável pela proteção de sua senha e por todas as atividades realizadas na sua conta. Em caso de uso não autorizado, é necessário nos informar imediatamente.",
        },
        {
            title: "3. Produtos Personalizados",
            content: "As canecas são personalizadas com imagens exclusivas das praias de Bertioga, portanto, a produção é feita sob demanda. Por se tratarem de produtos personalizados, não aceitamos devoluções ou trocas, exceto em casos de defeito de fabricação.",
        },
        {
            title: "4. Preços e Pagamentos",
            content: "Todos os preços estão indicados em reais (BRL) e incluem os impostos aplicáveis. O pagamento pode ser realizado por meio de cartão de crédito, débito ou outras opções de pagamento disponíveis no site. Nos reservamos o direito de alterar os preços a qualquer momento, mas garantimos que os preços aplicados serão aqueles vigentes no momento da compra.",
        },
        {
            title: "5. Política de Cancelamento e Devoluções",
            content: "Em conformidade com o Código de Defesa do Consumidor, o cliente poderá desistir da compra dentro de 7 dias corridos a partir do recebimento do produto, exceto em casos de personalização onde não há defeito. Para cancelamentos ou devoluções, entre em contato conosco para instruções detalhadas.",
        },
        {
            title: "6. Envio e Entrega",
            content: "Oferecemos entrega exclusiva para a cidade de Bertioga, realizada de bicicleta para garantir sustentabilidade e eficiência no processo de entrega. O prazo estimado para entrega é de até 3 dias úteis após a confirmação do pagamento.",
            subsections: [
                {
                    title: "6.1. Taxas de Entrega",
                    content: "A taxa de entrega é fixa para qualquer endereço dentro de Bertioga e será informada no momento da compra.",
                },
                {
                    title: "6.2. Atrasos e Problemas de Entrega",
                    content: "Em caso de atraso, o cliente será notificado e tomaremos todas as medidas possíveis para garantir a entrega rápida. Em situações de força maior, como condições climáticas adversas, o prazo pode ser alterado. Caso ocorra qualquer problema com a entrega, entre em contato conosco imediatamente.",
                },
            ],
        },
        {
            title: "7. Propriedade Intelectual",
            content: "Todas as imagens e designs de canecas são de nossa propriedade ou licenciados exclusivamente para o uso no nosso e-commerce. O uso não autorizado de qualquer material do site é proibido e pode resultar em ações legais.",
        },
        {
            title: "8. Responsabilidades do Usuário",
            content: "O usuário compromete-se a utilizar o site de forma responsável e de acordo com as leis aplicáveis. Qualquer uso indevido do site ou tentativa de fraude será imediatamente reportada às autoridades competentes e poderá resultar no cancelamento da conta.",
        },
        {
            title: "9. Alterações dos Termos e Condições",
            content: "Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento, com aviso prévio de 10 dias. As alterações não afetarão os pedidos já realizados.",
        },
        {
            title: "10. Contato",
            content: "Para dúvidas, sugestões ou reclamações, entre em contato conosco por e-mail [email protegido] ou telefone [telefone].",
        },
    ],
};

export default function PolicyPage() {
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);

    // Atualizando o tabIndex apenas no client-side
    useEffect(() => {
        const tabIndex = parseInt(searchParams?.get("tab") || "0", 10);
        setSelectedTab(tabIndex);
    }, [searchParams]);

    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                <h1 className="font-bold text-2xl text-gray-800">Politicas do Nosso Site</h1>
            </header>

            {/* Grupo de Abas */}
            <div className="mt-6 flex space-x-4 bg-white p-2 rounded-lg shadow-md overflow-auto">
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 0
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(0)}
                >
                    Termos <span className="sr-only sm:not-sr-only">e Condições</span>
                </button>
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 1
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(1)}
                >
                    <span className="sr-only sm:not-sr-only"> Política de </span>Privacidade
                </button>
                <button
                    className={clsx(
                        "w-auto whitespace-nowrap px-4 py-2 text-sm leading-5 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2",
                        selectedTab === 2
                            ? "bg-gray-500 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    )}
                    onClick={() => setSelectedTab(2)}
                >
                    <span className="sr-only sm:not-sr-only"> Política de </span>Cookies
                </button>
            </div>

            {/* Painéis das Abas */}
            <div className="mt-4 bg-white p-2 sm:p-8 rounded-md shadow-md">
                {selectedTab === 0 && (
                    <div className="p-2 sm:p-8">
                        {/* Renderizando o conteúdo de Termos e Condições */}
                        <h2 className="text-lg font-bold mb-4">{termsAndConditions.title}</h2>
                        <p className="text-md mb-6">{termsAndConditions.intro.content}</p>
                        {termsAndConditions.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-md mb-4">
                                    {section.content}
                                </p>
                                {/* Renderizando subseções se existirem */}
                                {section.subsections && section.subsections.map((subsection, subIndex) => (
                                    <div key={subIndex} className="ml-4 mb-4">
                                        <h4 className="text-lg font-medium">
                                            {subsection.title}
                                        </h4>
                                        <p className="text-md">
                                            {subsection.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {selectedTab === 1 && (
                    <div className="p-2 sm:p-8">
                        <h2 className="text-lg font-bold mb-4">{privacyPolicy.title}</h2>
                        <p className="text-md mb-6">{privacyPolicy.content}</p>
                        <ul className="flex flex-col items-start">
                            {privacyPolicy.listOfInformations.map((info, index) => (
                                <li key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {info.titleInfo}
                                    </h3>
                                    <p className="text-md mb-4">
                                        {info.descriptionInfo}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedTab === 2 && (
                    <div className="p-2 sm:p-8">
                        <h2 className="text-lg font-bold mb-4">{cookiePolicy.title}</h2>
                        <p className="text-md mb-6">{cookiePolicy.content}</p>
                        <ul className="flex flex-col items-start">
                            {cookiePolicy.listOfInformations.map((info, index) => (
                                <li key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {info.titleInfo}
                                    </h3>
                                    <p className="text-md mb-4">
                                        {info.descriptionInfo}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
