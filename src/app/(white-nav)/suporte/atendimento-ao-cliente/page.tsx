import Link from "next/link";

import { WhatsappIcon } from "@/components/Icons";

export default function SupportCenter() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full bg-white rounded-md shadow-lg p-8">             
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">                    
                    <h1 className="font-bold text-2xl text-gray-800">Atendimento ao Cliente</h1>
                    <p className="text-md text-gray-500">Atendimento durante o horário comercial, das 9h às 18h.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                    {/* Contact Methods */}
                    <div className="flex flex-col-reverse md:flex-col gap-8 mb-0 md:mb-12">
                        {/* Email Support */}
                        <div className="flex-1 bg-slate-50 p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                            <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                                Suporte por E-mail
                            </h2>
                            <p className="mt-2 text-gray-700">
                                Para dúvidas gerais ou questões sobre pedidos, entre em contato conosco através do e-mail:
                                <a href="mailto:support@example.com" className="text-slate-600 hover:underline"> support@example.com</a>
                            </p>
                        </div>

                        {/* Phone Support */}
                        <div className="flex-1 bg-slate-50 p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out">
                            <h2 className="text-lg font-semibold text-slate-700 flex items-center">
                                Suporte por Telefone
                            </h2>
                            <p className="mt-2 text-gray-700 mb-4">
                                Para atendimento mais rápido, entre em contato através do whatsapp
                            </p>
                            <Link
                                href="https://wa.me/5513981257704"
                                target="_blank"
                                className="w-full sm:w-2/4 text-center py-2 px-4 bg-[#1ebea5] text-white transition-all duration-300 font-semibold rounded-md flex items-center justify-center gap-2"
                            >
                                <WhatsappIcon w="24" h="24" />
                                <span className="text-lg font-medium">Fale Conosco</span>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Formulário de Cantato</h2>
                        <form action="#" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Seu Nome:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700">Seu E-mail:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700">Mensagem:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-700 text-white p-3 rounded-md shadow-md hover:bg-slate-800 transition duration-300 ease-in-out"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
