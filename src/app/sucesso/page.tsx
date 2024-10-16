import Link from "next/link";

import { WhatsappIcon } from "@/components/Icons";
import { OrderTracker } from "@/components/OrderTracker";

export default function SuccessPageManager() {
    return (
        <main className="w-full h-auto flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-sky-600 relative py-[80px] sm:py-[100px] px-4 overflow-hidden">
            <section className="w-full md:w-[700px] bg-white p-8 rounded-lg shadow-md text-start relative">
                <h2 className="text-2xl font-bold text-slate-600">
                    Compra realizada com sucesso!
                </h2>
                <p className="text-md mt-2 text-gray-700">
                    Sua compra foi realizada com sucesso! Estamos preparando seu pedido para entrega. Para acompanhar seu pedido verifique o email que enviamos para você
                </p>

                <OrderTracker status={"PREPARING"} />

                <p className="text-md pt-[40px] text-gray-700">
                    Se tiver qualquer dúvida ou precisar de assistência, nossa equipe de
                    suporte está disponível para ajudar.
                </p>

                <div className="w-full flex flex-col sm:flex-row gap-4 border-t pt-4 mt-4">
                    <Link
                        href="https://wa.me/5513981257704"
                        target="_blank"
                        className="w-full sm:w-2/4 text-center py-2 px-4 bg-[#1ebea5] text-white transition-all duration-300 font-semibold rounded-md flex items-center justify-center gap-2"
                    >
                        <WhatsappIcon w="24" h="24" />
                        <span className="text-lg font-medium">Fale Conosco</span>
                    </Link>
                    <Link
                        href="/canecas"
                        className="w-full sm:w-2/4 text-center py-2 px-4 border-[#0074d4] text-[#0074d4] border rounded-md transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                    >
                        <span className="text-lg font-medium">Voltar as Compras</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
