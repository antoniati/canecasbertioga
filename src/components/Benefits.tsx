import { BicycleIcon, EarthIcon, MugIcon, SecureIcon } from "./Icons";

const benefits = [
    {
        icon: <BicycleIcon w="60" h="60" />,
        title: "Entregas Exclusivas em Bertioga",
        description: "Serviço rápido, dedicado e focado.",
    },
    {
        icon: <MugIcon w="60" h="60" />,
        title: "Mais de 50 Modelos de Canecas",
        description: "Designs únicos e especiais para você.",
    },
    {
        icon: <SecureIcon w="60" h="60" />,
        title: "Compra 100% Segura",
        description: "Vendemos somente pelo nosso site.",
    },
    {
        icon: <EarthIcon w="60" h="60" />,
        title: "Eco-friendly",
        description: "Tintas livres de cádmio e chumbo.",
    },
];

export const Benefits = () => {
    return (
        <section className="w-full flex items-center justify-center bg-gradient-to-r from-blue-900 to-sky-600 text-white pb-12 lg:pb-20 md:px-0 md:pt-0 pt-[40px]">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[20px] md:px-[40px]">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center md:justify-center justify-start">
                        {benefit.icon}
                        <div className="ml-4">
                            <p className="text-lg font-semibold">{benefit.title}</p>
                            <p className="">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};