import React from "react";

type InstructionSection = {
    title: string;
    description: string;
    additionalInfo?: React.ReactNode;
};

const instructionSections: InstructionSection[] = [
    {
        title: "Cuidados Gerais",
        description: "Para manter a sua caneca personalizada em ótimas condições, siga estas orientações:",
        additionalInfo: (
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                <li>Evite temperaturas extremas. Não coloque a caneca no congelador ou em temperaturas muito altas.</li>
                <li>Não use abrasivos ou produtos químicos fortes na limpeza.</li>
                <li>Recomenda-se lavar a mão em vez de usar a máquina de lavar louça para preservar a personalização.</li>
            </ul>
        ),
    },
    {
        title: "Dicas de Uso",
        description: "Para aproveitar ao máximo a sua caneca personalizada, considere as seguintes dicas:",
        additionalInfo: (
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                <li>Use a caneca para bebidas quentes, como café e chá, para um prazer máximo.</li>
                <li>Evite deixar a caneca exposta ao sol por longos períodos para evitar desbotamento.</li>
                <li>Se você notar que a caneca está começando a desbotar, considere aplicar um revestimento protetor específico para cerâmica.</li>
            </ul>
        ),
    },
    {
        title: "Resolução de Problemas",
        description: " Caso você encontre problemas com a sua caneca, aqui estão algumas soluções: ",
        additionalInfo: (
            <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                <li>Se a personalização começar a descolar, certifique-se de seguir as instruções de cuidados para evitar isso.</li>
                <li>Para manchas persistentes, use uma solução de limpeza suave e um pano macio.</li>
                <li>Se a caneca estiver rachada ou danificada, entre em contato com o suporte para opções de substituição.</li>
            </ul>
        ),
    },
];

export default function UsageCareInstructions() {
    return (
        <section className="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-200 py-[100px] px-4 sm:px-8 lg:px-12">
            <div className="w-full h-auto bg-white p-4 sm:p-8 lg:p-12 rounded-md shadow-md">
                <header className="w-full flex flex-col border-b pb-4 mb-4 gap-2">
                    <h1 className="font-bold text-lg sm:text-2xl text-gray-800">Instruções de Uso e Cuidados</h1>
                    <p className="text-gray-500 text-md">Siga nossas dicas especiais para maior durabilidade da sua caneca.</p>
                </header>

                <div className="space-y-8">
                    {instructionSections.map(({ title, description, additionalInfo }, index) => (
                        <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-sm hover:bg-slate-100 transition duration-300 ease-in-out" >
                            <div className="flex items-start">
                                <div className="">
                                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                                    <p className="mt-2 text-gray-800">{description}</p>
                                    {additionalInfo}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}