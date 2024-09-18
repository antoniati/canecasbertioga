const cookiePolicy = {
    listOfInformations: [
        {
            titleInfo: "1. Visão geral",
            descriptionInfo: "Nossa Política de Cookies segue rigorosamente todas as leis e normas estabelecidas pela Lei Geral de Proteção de Dados (13.709/2018), LGPD, que entrou em vigor em 2020. Esta legislação garante os direitos fundamentais de liberdade e privacidade de todos os cidadãos no Brasil. Os cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. Eles nos ajudam a entender suas preferências, melhorar a funcionalidade do site e oferecer um serviço mais personalizado.",
        },
        {
            titleInfo: "2. Tipos de Cookies Utilizados",
            descriptionInfo: "",
            additionalInfo: (
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                    <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site. Sem esses cookies, o site pode não funcionar corretamente.</li>
                    <li><strong>Cookies de Desempenho:</strong>  Coletam informações sobre como você usa o site, permitindo-nos melhorar a funcionalidade e desempenho. </li>
                    <li><strong>Cookies de Funcionalidade:</strong>  Permitem que o site se lembre de suas escolhas (como nome de usuário e idioma) para proporcionar uma experiência mais personalizada. </li>
                    <li><strong> Cookies de Publicidade:</strong>  Não utilizamos cookies de publicidade.</li>
                </ul>
            ),
        },
        {
            titleInfo: "3. Gerenciamento de Cookies",
            descriptionInfo: "Você pode controlar e gerenciar cookies através das configurações do seu navegador. No entanto, desativar cookies pode afetar a funcionalidade do nosso site.",
        },
        {
            titleInfo: "4. Cookies de Terceiros",
            descriptionInfo: "Nosso site pode utilizar cookies de terceiros para ajudar a melhorar o desempenho e monitorar o tráfego. Esses cookies estão sujeitos às políticas de privacidade desses terceiros.",
        },
        {
            titleInfo: "5. Consentimento para Uso de Cookies",
            descriptionInfo: "Ao continuar a usar nosso site, você concorda com o uso de cookies conforme descrito nesta política. Se desejar retirar seu consentimento, você pode ajustar as configurações do seu navegador para recusar cookies.",
        },
        {
            titleInfo: "6. Atualizações na Política de Cookies",
            descriptionInfo: "Podemos atualizar esta política de cookies de tempos em tempos. Recomendamos que você revise esta política periodicamente para se manter informado sobre como utilizamos cookies.",
        },
        {
            titleInfo: "7. Contato",
            descriptionInfo: "Para quaisquer dúvidas ou preocupações sobre nossa política de cookies, entre em contato conosco através do email cookies@canecasbertioga.com.",
        },
    ],

};

export default function PolicyPageManager(): JSX.Element {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Política de Cookies</h1>
                    <p className="text-gray-500 text-md">Na Canecas Bertioga, utilizamos cookies para melhorar sua experiência em nosso site.</p>
                </header>

                <ul className="flex flex-col items-start space-y-8">
                    {cookiePolicy.listOfInformations.map((info, index) => (
                        <li key={index} className="w-full bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {info.titleInfo}
                            </h3>
                            <p className="mt-2 text-gray-800">
                                {info.descriptionInfo}
                            </p>
                            {info.additionalInfo}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}