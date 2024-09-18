const privacyPolicy = {
    listOfInformations: [
        { titleInfo: "1. Visão geral", descriptionInfo: "Nossa Política de Privacidade segue rigorosamente todas as leis e normas estabelecidas pela Lei Geral de Proteção de Dados (13.709/2018), conhecida como LGPD, que entrou em vigor em 2020. Esta legislação garante os direitos fundamentais de liberdade e privacidade de todos os cidadãos no Brasil. Nossa política detalha como coletamos, usamos, divulgamos e gerenciamos os dados de nossos clientes." },
        { titleInfo: "2. Coleta de Informações", descriptionInfo: "Coletamos informações pessoais, como nome, endereço de email, localização e informações de pagamento, quando você realiza uma compra ou se registra em nosso site. Também coletamos dados de acesso e uso do serviço para melhorar nossa oferta." },
        { titleInfo: "3. Uso das Informações", descriptionInfo: "As informações coletadas são utilizadas para fornecer e melhorar nossos serviços, processar transações, enviar notificações importantes, e personalizar a experiência do usuário. Nunca vendemos suas informações pessoais para terceiros." },
        { titleInfo: "4. Compartilhamento de Informações", descriptionInfo: "Podemos compartilhar suas informações com terceiros apenas quando necessário para fornecer nossos serviços (por exemplo, processar pagamentos, denifir rotas de entrega) ou conforme exigido por lei." },
        { titleInfo: "5. Segurança das Informações", descriptionInfo: "Implementamos medidas de segurança rigorosas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL e outros protocolos de segurança para garantir a proteção dos dados." },
        { titleInfo: "6. Retenção de Dados", descriptionInfo: "Retemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos para os quais foram coletadas, incluindo qualquer requisito legal ou de relatório." },
        { titleInfo: "7. Seus Direitos", descriptionInfo: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco pelo email privacidade@canecasbertioga.com." },
        { titleInfo: "8. Contato", descriptionInfo: "Para quaisquer dúvidas ou preocupações sobre nossa política de privacidade, entre em contato conosco através do email privacidade@canecasbertioga.com." },
    ],
};

export default function PolicyPageManager(): JSX.Element {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
        <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
            <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Política de Privacidade</h1>
                <p className="text-gray-500 text-md">Na Canecas Bertioga, levamos a sua privacidade a sério e estamos comprometidos em proteger suas informações.</p>
            </header>

            <ul className="flex flex-col items-start space-y-8">
                {privacyPolicy.listOfInformations.map((info, index) => (
                    <li key={index} className="w-full bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {info.titleInfo}
                        </h3>
                        <p className="mt-2 text-gray-800">
                            {info.descriptionInfo}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
    );
}
