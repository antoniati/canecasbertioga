"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AtentionIcon } from "./Icons";

type DeletePageType = {
    name: string;
    urlBackPage: string;
    idToDeleteData: string;
    deleteFunction: (id: string) => Promise<{ success: string, error: string }>;
};

export const DeletePageManager = ({ deleteFunction, idToDeleteData, urlBackPage, name }: DeletePageType) => {
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const router = useRouter();

    const handleGoBackPage = () => {
        router.push(urlBackPage);
    };

    const handleDeleteData = async () => {
        setIsPending(true);
        setError("");
        setSuccess("");

        try {
            const result = await deleteFunction(idToDeleteData);

            if (result.success) {
                setSuccess(result.success);
            } else if (result.error) {
                setError(result.error);
            }
        } catch (error) {
            setError("An error occurred while trying to delete data. Please try again later.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full space-y-4 px-[80px] pt-[80px] h-screen">
            <h1 className="flex space-x-2 items-center p-2 bg-gray-50">
                <span className="text-amber-600">
                    <AtentionIcon w="24" h="24" />
                </span>
                <span className="text-lg font-semibold">Atenção!</span>
            </h1>

            {success ? (
                <div className="w-full flex-col space-y-4 items-start">
                    <p className="bg-teal-50 text-teal-500 px-4 py-8 rounded-md font-medium">
                        {success}
                    </p>
                    <button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                        onClick={handleGoBackPage}
                    >
                        OK
                    </button>
                </div>
            ) : error ? (
                <div className="w-full flex-col space-y-4 items-start">
                    <p className="bg-rose-50 text-rose-700">
                        {error}
                    </p>
                    <button
                        type="button"
                        onClick={handleGoBackPage}
                    >
                        Voltar
                    </button>
                </div>
            ) : (
                <>
                    <p className="bg-rose-50 text-rose-600 px-4 py-8 rounded-md font-medium">
                        Você tem certeza que deseja excluir os dados {name} ? Ao clicar em `&quot;Sim, Excluir`&quot;, todos os dados serão excluídos irreversivelmente.
                        Por favor, certifique-se antes de prosseguir.
                    </p>

                    <div className="justify-start gap-2 flex sm:flex-row flex-col">
                        <button
                            type="button"
                            className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 px-3 py-2 text-white rounded-md transition-colors duration-300"
                            onClick={handleDeleteData}
                            disabled={isPending}
                        >
                            Sim, Deletar
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto border border-blue-600 text-center rounded-md hover:border-blue-700 px-3 py-2 font-medium text-blue-600 hover:text-blue-700"
                            onClick={handleGoBackPage}
                            disabled={isPending}
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            )
            }
        </div >
    );
};