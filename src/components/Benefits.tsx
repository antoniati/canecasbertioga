import { Work_Sans } from "next/font/google";

import { BicycleIcon, MugIcon, SecureIcon } from "./Icons";

const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const benefits = [
    {
        icon: <BicycleIcon w="60" h="60" />,
        title: "Entregas somente em Bertioga",
        description: "Atendimento exclusivo para região",
    },
    {
        icon: <MugIcon w="60" h="60" />,
        title: "+ 50 Modelos de Canecas",
        description: "Designs únicos e especiais para você.",
    },
    {
        icon: <SecureIcon w="60" h="60" />,
        title: "Compra 100% Segura",
        description: "Vendemos somente pelo nosso site.",
    },
];

export const Benefits = () => {
    return (
        <section className="w-full flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 text-slate-800 py-12 lg:py-20 md:px-0 pt-[40px] rounded-lg">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex">
                        {benefit.icon}
                        <div className="ml-4">
                            <p className="text-lg font-semibold">{benefit.title}</p>
                            <p className={workSans.className}>{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};