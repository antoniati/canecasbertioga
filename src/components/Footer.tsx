import Link from "next/link";

import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "./Icons";

export const Footer = (): JSX.Element => {
    return (
        <footer className="bg-gray-50">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[40px] px-8 lg:px-12 border-t border-slate-200 gap-[20px]">
                <div className="flex flex-col space-y-2">
                    <h4 className="font-semibold border-b border-slate-300 w-[200px] pb-2">Loja</h4>
                    <ul className="space-y-1">
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/carrinho"}>Carrinho</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/canecas"}>Canecas</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/seus-pedidos"}>Seus Pedidos</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/sua-conta"}>Sua Conta</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2">
                    <h4 className="font-semibold border-b border-slate-300 w-[200px] pb-2">Suporte</h4>
                    <ul className="space-y-1">
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/suporte/atendimento-ao-cliente"}>Atendimento ao Cliente</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/suporte/devolucao"}>Devolução e Troca</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/suporte/entregas-e-rastreio"}>Status de Pedidos</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/suporte/faq"}>Perguntas Frequentes</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={"/suporte/opnioes-e-sugestoes"}>FeedBack e Avaliações</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2">
                    <h4 className="font-semibold border-b border-slate-300 w-[200px] pb-2">Políticas do Site</h4>
                    <ul className="space-y-1">
                        <li><Link className="text-blue-500 hover:text-blue-700" href={`/politicas-do-site?tab=${0}`}>Termos e Condições</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={`/politicas-do-site?tab=${1}`}>Políticas de Privacidade</Link></li>
                        <li><Link className="text-blue-500 hover:text-blue-700" href={`/politicas-do-site?tab=${2}`}>Políticas de Cookies</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2">
                    <h4 className="font-semibold border-b border-slate-300 w-[200px] pb-2">Siga-nos nas Redes Sociais</h4>
                    <div className="flex p-2 gap-4">
                        <Link href={"https://www.instagram.com/canecasbertioga/"} className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105"> <InstagramIcon w="36" h="36" /> </Link>
                        <Link href={"https://www.facebook.com/canecasbertioga"} className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105"> <FacebookIcon w="36" h="36" /> </Link>
                        <Link href={"https://www.youtube.com/@canecasbertioga"} className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105"> <YoutubeIcon w="38" h="38" /> </Link>
                        <Link href={"#"} className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-105"> <WhatsappIcon w="36" h="36" /> </Link>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-start px-[20px] md:px-[40px] lg:px-[80px] py-[40px]">
                <h3 className="text-[14px] text-center md:text-end w-full">
                    &#169; <b>Canecas Bertioga</b>, Todos os Direitos Reservados | Desenvolvido em Bertioga
                </h3>
                <div className="justify-center md:justify-end border-t border-slate-300 w-full pt-4 sm:pt-2 mt-4 sm:mt-2 text-xs sm:text-sm flex gap-[5px] flex-wrap">
                    <p className="text-xs">Um brinde a Costa Paulista!</p>
                </div>
            </div>
        </footer>
    );
};