import React from "react";

export default function FeedbackSuggestions() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[80px] sm:py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full bg-white rounded-md shadow-lg p-4 sm:p-8">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-2xl text-gray-800">Feedback e Sugestões</h1>
                    <p className="text-md text-gray-500">Sua opinião é fundamental para nós!</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                    {/* Avaliações de Produtos */}
                    <div className="h-auto lg:h-[250px] bg-slate-50 p-4 sm:p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                        <p className="text-gray-700 mb-4">
                            Para melhorar continuamente nossos produtos e serviços, precisamos ouvir você. 
                            Avalie os produtos que você comprou e deixe seu comentário na seção <strong>Seus Pedidos &gt; Pedidos Entregues</strong>.
                        </p>
                        <p className="text-gray-700">
                            Se ainda não tem uma conta, <a href="/register" className="text-blue-600 hover:underline">cadastre-se</a> para acessar uma experiência de compra aprimorada e participar das avaliações.
                        </p>
                    </div>

                    {/* Sugestões de Melhoria */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compartilhe Suas Sugestões</h2>
                        <p className="text-gray-700 mb-4">
                            Tem alguma ideia para melhorar nossos serviços ou produtos? Envie suas sugestões através do formulário abaixo. 
                            Estamos sempre em busca de maneiras de oferecer a melhor experiência possível.
                        </p>
                        <form action="#" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="suggestion-name" className="block text-gray-700">Seu Nome:</label>
                                <input
                                    type="text"
                                    id="suggestion-name"
                                    name="suggestion-name"
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="suggestion-email" className="block text-gray-700">Seu E-mail:</label>
                                <input
                                    type="email"
                                    id="suggestion-email"
                                    name="suggestion-email"
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="suggestion" className="block text-gray-700">Sua Sugestão:</label>
                                <textarea
                                    id="suggestion"
                                    name="suggestion"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-700 text-white p-3 rounded-md shadow-md hover:bg-slate-800 transition duration-300 ease-in-out"
                            >
                                Enviar Sugestão
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
