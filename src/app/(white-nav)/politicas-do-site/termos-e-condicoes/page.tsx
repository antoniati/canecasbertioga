const termsAndConditions = {
    listOfInformations: [
        {
            title: "1. Cadastro e Conta do Usuário",
            content: "Para realizar compras, o usuário deve criar uma conta, fornecendo informações verdadeiras, completas e atualizadas. O usuário é responsável pela proteção de sua senha e por todas as atividades realizadas na sua conta. Em caso de uso não autorizado, é necessário nos informar imediatamente.",
        },
        {
            title: "2. Produtos Personalizados",
            content: "As canecas são personalizadas com imagens exclusivas das praias de Bertioga, portanto, a produção é feita sob demanda. Por se tratarem de produtos personalizados, não aceitamos devoluções ou trocas, exceto em casos de defeito de fabricação.",
        },
        {
            title: "3. Preços e Pagamentos",
            content: "Todos os preços estão indicados em reais (BRL) e incluem os impostos aplicáveis. O pagamento pode ser realizado por meio de cartão de crédito, débito ou outras opções de pagamento disponíveis no site. Nos reservamos o direito de alterar os preços a qualquer momento, mas garantimos que os preços aplicados serão aqueles vigentes no momento da compra.",
        },
        {
            title: "4. Política de Cancelamento e Devoluções",
            content: "Em conformidade com o Código de Defesa do Consumidor, o cliente poderá desistir da compra dentro de 7 dias corridos a partir do recebimento do produto, exceto em casos de personalização onde não há defeito. Para cancelamentos ou devoluções, entre em contato conosco para instruções detalhadas.",
        },
        {
            title: "5. Envio e Entrega",
            content: "Oferecemos entrega exclusiva para a cidade de Bertioga, realizada de bicicleta para garantir sustentabilidade e eficiência no processo de entrega. O prazo estimado para entrega é de até 3 dias úteis após a confirmação do pagamento.",
            subsections: [
                {
                    title: "5.1. Taxas de Entrega",
                    content: "A taxa de entrega é fixa para qualquer endereço dentro de Bertioga e será informada no momento da compra.",
                },
                {
                    title: "5.2. Atrasos e Problemas de Entrega",
                    content: "Em caso de atraso, o cliente será notificado e tomaremos todas as medidas possíveis para garantir a entrega rápida. Em situações de força maior, como condições climáticas adversas, o prazo pode ser alterado. Caso ocorra qualquer problema com a entrega, entre em contato conosco imediatamente.",
                },
            ],
        },
        {
            title: "6. Propriedade Intelectual",
            content: "Todas as imagens e designs de canecas são de nossa propriedade ou licenciados exclusivamente para o uso no nosso e-commerce. O uso não autorizado de qualquer material do site é proibido e pode resultar em ações legais.",
        },
        {
            title: "7. Responsabilidades do Usuário",
            content: "O usuário compromete-se a utilizar o site de forma responsável e de acordo com as leis aplicáveis. Qualquer uso indevido do site ou tentativa de fraude será imediatamente reportada às autoridades competentes e poderá resultar no cancelamento da conta.",
        },
        {
            title: "8. Alterações dos Termos e Condições",
            content: "Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento, com aviso prévio de 10 dias. As alterações não afetarão os pedidos já realizados.",
        },
        {
            title: "9. Contato",
            content: "Para dúvidas, sugestões ou reclamações, entre em contato conosco por e-mail [email protegido] ou telefone [telefone].",
        },
    ],
};

export default function PolicyPageManager(): JSX.Element {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Termos e Condições Gerais de Uso do Site</h1>
                    <p className="text-gray-500 text-md">Ultima atualização 7 de setembro, 2024</p>
                </header>

                <p className="pb-4 text-gray-800">
                    Bem-vindo à nossa loja online de canecas personalizadas com imagens das paisagens da praia de Bertioga. Estes Termos e Condições regulam o uso do nosso site e as transações feitas através dele. Ao utilizar nosso site, você concorda com os seguintes termos:
                </p>

                <ul className="flex flex-col items-start space-y-8">
                    {termsAndConditions.listOfInformations.map((info, index) => (
                        <li key={index} className="w-full bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {info.title}
                            </h3>
                            <p className="mt-2 text-gray-800">
                                {info.content}
                            </p>
                            {info.subsections?.map((subInfo, index) => (
                                <div key={index} className="mt-4 p-2">
                                    <h3 className="text-md font-medium text-gray-800">
                                        {subInfo.title}
                                    </h3>
                                    <p className="mt-2 text-gray-800">
                                        {subInfo.content}
                                    </p>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}