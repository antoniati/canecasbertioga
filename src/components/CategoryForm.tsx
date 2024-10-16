"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ChangeEvent, useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useCategoriesData } from "@/hooks/useCategoriesData";
import { CategorySchema } from "@/schemas";
import { registerCategory } from "@/services/create/registerCategory";
import { updateCategory } from "@/services/update/updateCategory";

type CategoryFormProps = {
    initialData?: z.infer<typeof CategorySchema>;
};

export const CategoryForm = ({ initialData }: CategoryFormProps) => {
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<boolean>(false);
    const [transitioning, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: initialData || {},
    });

    const { data: categories } = useCategoriesData();

    const onSubmit = (values: z.infer<typeof CategorySchema>) => {
        setIsPending(true);

        startTransition(() => {
            const action = initialData ? updateCategory : registerCategory;
            action(values, initialData?.id ?? "")
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        setSuccess(data.success);
                        setIsModified(false);
                    }
                })
                .catch((error) => {
                    setError("Erro ao enviar o formulário.");
                    console.error("Erro ao enviar o formulário:", error);
                })
                .finally(() => {
                    setIsPending(false);
                });
        });
    };

    const cleanMessages = () => {
        form.clearErrors();
        setSuccess("");
        setError("");
    };

    useEffect(() => {
        if (initialData) {
            setIsModified(true); // Caso já haja dados, está em modo de edição
        }
    }, [initialData]);

    return (
        <section className="w-full bg-gradient-to-r from-gray-50 to-gray-100 h-auto flex items-start justify-start flex-col py-24 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    {initialData ? "Editar Categoria" : "Registro de Categoria"}
                </h1>
                <form
                    className={"w-full bg-white flex flex-col items-center justify-center p-2"}
                    onSubmit={form.handleSubmit(onSubmit)}
                    onChange={cleanMessages}
                >
                    {!success && (
                        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <div className="w-full space-y-1">
                                <h3 className="text-sm font-bold text-slate-800 m-1">
                                    Nome da Categoria
                                </h3>
                                <input
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    type={"text"}
                                    name={"name"}
                                    placeholder={"Digite o Nome da Categoria"}
                                    value={form.watch("name")}
                                    onChange={(e) => {

                                        form.setValue("name", e.target.value);
                                        setIsModified(e.target.value.trim().length > 0);
                                    }}
                                    disabled={isPending}
                                    autoComplete={"off"}
                                />
                            </div>

                            {categories && categories?.length > 0 && (
                                <div className="w-full space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 m-1">
                                        Subcategoria
                                    </h3>
                                    <select
                                        name={"parent"}
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer ${isPending ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => form.setValue("parent", e.target.value)}
                                        value={form.watch("parent")}
                                    >
                                        <option value="Bertioga">
                                            Escolha uma Subcategoria
                                        </option>
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="w-full flex flex-col justify-start">
                        {error ? (
                            <p className="w-full p-2 bg-rose-50 text-rose-700 font-semibold">
                                {error}
                            </p>
                        ) : success ? (
                            <div className="w-full flex items-start flex-col space-y-4">
                                <p className="w-full bg-teal-50 text-teal-700 px-4 py-8 rounded-md font-medium">
                                    {success}
                                </p>

                                <Link
                                    href={"/categorias/lista-de-categorias"}
                                    className="sm:w-auto w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full text-center"
                                >
                                    OK
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full flex sm:flex-row flex-col items-center justify-start gap-[15px] mt-4 pt-4 border-t border-slate-300">
                                <button
                                    type={"submit"}
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full"
                                    disabled={!isModified || isPending || transitioning}
                                >
                                    {initialData ? "Atualizar Categoria" : "Salvar Registro"}
                                </button>
                                <Link
                                    type={"button"}
                                    href={"/categorias/lista-de-categorias"}
                                    className="w-full sm:w-auto border border-blue-600 text-center rounded-full hover:border-blue-700 px-6 py-2 font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Cancelar
                                </Link>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};
