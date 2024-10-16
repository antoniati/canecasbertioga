
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useCategoriesData } from "@/hooks/useCategoriesData";
import { useUploadedFiles } from "@/hooks/useUploaderFiles";
import { ProductSchema } from "@/schemas";
import { registerProduct } from "@/services/create/registerProduct";
import { updateProduct } from "@/services/update/updateProduct";
import { handlePriceChangeToBRL } from "@/utils/handlePriceChangeToBRL";

import { TrashIcon, UploadIcon } from "./Icons";
import { PropertyManager, PropsOfProperties } from "./PropertyManager";

type ProductFormProps = {
    initialData?: z.infer<typeof ProductSchema>;
};

export const ProductForm = ({ initialData }: ProductFormProps) => {
    const { data: categories } = useCategoriesData();

    const [dimensions, setDimensions] = useState<PropsOfProperties[]>(initialData?.dimensions || []);
    const [specifications, setSpecifications] = useState<PropsOfProperties[]>(initialData?.specifications || []);
    const [features, setFeatures] = useState<PropsOfProperties[]>(initialData?.features || []);
    const [recommendation, setRecommendation] = useState<PropsOfProperties[]>(initialData?.recommendation || []);
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const [transitioning, startTransition] = useTransition();

    const {
        uploadedFiles,
        isUploadingFiles,
        errorUploadFiles,
        setErrorUploadFiles,
        handleUploadFiles,
        setUploadedFiles,
        removeFile,
    } = useUploadedFiles();

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {},
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        setIsPending(true);

        if (uploadedFiles.length === 0) {
            setIsPending(false);
            setError("Insira fotos do produto. Clique no botão de upload para adicionar fotos.");
            return;
        }

        values.files = uploadedFiles;

        values.dimensions = dimensions;
        values.specifications = specifications;
        values.features = features;
        values.recommendation = recommendation;

        startTransition(() => {
            const action = initialData ? updateProduct : registerProduct;
            action(values, initialData?.id ?? "")
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        setSuccess(data.success);
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
        clearErrors();
        setSuccess("");
        setError("");
    };

    const formatNumber = (inputValue: string) => {
        // Remove todos os caracteres não numéricos
        const numericValue = inputValue.replace(/[^\d]/g, "");

        // Converte para número (dividido por 100 para considerar duas casas decimais)
        const valueAsNumber = Number(numericValue) / 100;

        // Formata para Real Brasileiro
        const formattedValue = valueAsNumber.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        return formattedValue;
    };

    const formattedPrice = formatNumber(initialData?.price ?? "");
    const formattedCostPrice = formatNumber(initialData?.costPrice ?? "");


    useEffect(() => {
        if (initialData) {

            setDimensions(initialData?.dimensions ?? []);
            setRecommendation(initialData?.recommendation ?? []);
            setSpecifications(initialData?.specifications ?? []);
            setFeatures(initialData?.features ?? []);

            if (initialData?.files!.length > 0) {
                setUploadedFiles(initialData.files ?? []);
            }

            reset({
                name: initialData.name,
                price: initialData.price,
                costPrice: initialData.costPrice,
                description: initialData.description,
                locationDescription: initialData.locationDescription,
                paymentUrl: initialData.paymentUrl,
                googleMapsUrl: initialData.googleMapsUrl,
                files: initialData.files,
                categoryId: initialData.categoryId ?? "",
                categoryName: initialData.categoryName ?? "",
                dimensions: initialData?.dimensions ?? [],
                specifications: initialData?.specifications ?? [],
                recommendation: initialData?.recommendation ?? [],
                features: initialData?.features ?? [],
            });
        }
    }, [initialData, setUploadedFiles, reset]);


    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        setUploadedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            const draggedItem = updatedFiles[draggedIndex];

            // Remove o item arrastado
            updatedFiles.splice(draggedIndex, 1);
            // Adiciona o item na nova posição
            updatedFiles.splice(index, 0, draggedItem);

            return updatedFiles;
        });

        setDraggedIndex(null); // Reseta o estado de arraste
    };

    return (
        <section className="w-full bg-gradient-to-r from-gray-50 to-gray-100 h-auto flex items-start justify-start flex-col py-24 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-4">
                    {initialData ? "Editar Caneca" : "Registro de Caneca"}
                </h1>
                <form
                    className={"w-full bg-white flex flex-col items-center justify-center mt-4 p-2"}
                    onSubmit={handleSubmit(onSubmit)}
                    onChange={cleanMessages}
                >
                    {!success && (
                        <div className={"w-full flex-col overflow-auto pb-2 space-y-4 items-start h-[350px] sm:h-[400px] px-1"}>
                            <div className="w-full space-y-1">
                                <h3 className="text-sm font-bold text-slate-800 ml-1 mb-2">Fotos/Videos do Produto</h3>
                                <div className="flex flex-wrap items-center" style={{ gap: "10px" }}>
                                    {!!uploadedFiles?.length && uploadedFiles?.map((link, index) => (
                                        <div
                                            key={index}
                                            className="w-[100px] h-[100px] relative rounded-md border border-slate-200 cursor-move"
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDrop(index)}
                                        >
                                            <button
                                                type="button"
                                                className="absolute bg-white rounded-lg shadow border"
                                                onClick={() => removeFile(index)}
                                            >
                                                <TrashIcon w="20" h="20" />
                                            </button>

                                            {link.endsWith(".mp4") || link.endsWith(".webm") ? (
                                                <div className="w-full h-full">
                                                    <video
                                                        src={`${link}`}
                                                        width={1000}
                                                        height={800}
                                                        controls={false}
                                                        className="object-cover w-full h-full"
                                                        autoPlay
                                                        muted
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full">
                                                    <Image
                                                        src={`${link}`}
                                                        alt={`Uploaded image ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                        width={1000}
                                                        height={800}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Área de Upload */}
                                    <label className="w-[80px] h-[80px] border-2 rounded-lg hover:shadow-md cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-slate-800 bg-slate-200 border-slate-300 p-2">
                                        <UploadIcon w="24" h="24" />
                                        <span> Upload </span>
                                        <input
                                            className="hidden"
                                            type="file"
                                            id="file"
                                            name="file"
                                            accept="image/*,video/*"
                                            multiple
                                            onChange={handleUploadFiles}
                                        />
                                    </label>
                                </div>
                            </div>

                            <section className="flex flex-col sm:flex-row gap-[15px] pt-4">
                                <div className="w-full sm:w-2/4 space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Nome do Produto
                                    </h3>
                                    <input
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        type={"text"}
                                        name={"name"}
                                        placeholder={"Digite o nome do produto"}
                                        onChange={(e) => setValue("name", e.target.value)}
                                        disabled={isPending}
                                        defaultValue={initialData?.name}
                                    />
                                    {errors.name && <span className="text-red-500">Este campo é obrigatório</span>}
                                </div>

                                <div className="w-full sm:w-2/4 space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Selecione a categoria
                                    </h3>
                                    <select
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        name={"category"}
                                        defaultValue={initialData ? initialData?.categoryId : ""}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                            const selectedValue = e.target.value; // Obter o valor selecionado
                                            const selectedCategory = categories?.find((cat) => cat.id === selectedValue);
                                            setValue("categoryId", selectedValue); // Atualizar o valor com a string
                                            setValue("categoryName", selectedCategory ? selectedCategory.name : ""); // Atualizar o nome da categoria
                                        }}

                                    >
                                        <option value="" disabled>Escolha uma categoria</option>
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </section>
                            <section className="flex flex-col sm:flex-row gap-[15px]">
                                <div className="w-full space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Insira o preço de custo
                                    </h3>
                                    <input
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        type={"text"}
                                        name={"costPrice"}
                                        placeholder={"R$ 0.00"}
                                        onChange={handlePriceChangeToBRL("costPrice", setValue)}
                                        disabled={isPending}
                                        defaultValue={formattedCostPrice}
                                    />
                                    {errors.costPrice && <span className="text-red-500">Este campo é obrigatório</span>}
                                </div>

                                <div className="w-full space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Insira o valor de venda
                                    </h3>
                                    <input
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        type={"text"}
                                        name={"price"}
                                        placeholder={"R$ 0.00"}
                                        onChange={handlePriceChangeToBRL("price", setValue)}
                                        disabled={isPending}
                                        defaultValue={formattedPrice}
                                    />
                                    {errors.price && <span className="text-red-500">Este campo é obrigatório</span>}
                                </div>
                            </section>

                            <section className="flex flex-col sm:flex-row gap-[15px]">
                                <div className="w-full sm:w-2/4 space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Link de Pagamento
                                    </h3>
                                    <input
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        type={"text"}
                                        name={"paymentUrl"}
                                        placeholder={"Insira o Link de pagamento"}
                                        onChange={(e) => setValue("paymentUrl", e.target.value)}
                                        disabled={isPending}
                                        defaultValue={initialData?.paymentUrl}
                                    />
                                    {errors.paymentUrl && <span className="text-red-500">Este campo é obrigatório</span>}
                                </div>

                                <div className="w-full sm:w-2/4 space-y-1">
                                    <h3 className="text-sm font-bold text-slate-800 ml-1">
                                        Link do Google Maps (Localidade)
                                    </h3>
                                    <input
                                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                        type={"text"}
                                        name={"googleMapsUrl"}
                                        placeholder={"Insira o Link do Google Maps"}
                                        onChange={(e) => setValue("googleMapsUrl", e.target.value)}
                                        disabled={isPending}
                                        defaultValue={initialData?.googleMapsUrl}
                                    />
                                    {errors.googleMapsUrl && <span className="text-red-500">Este campo é obrigatório</span>}
                                </div>
                            </section>
                            <div className="w-full space-y-1">
                                <h3 className="text-sm font-bold text-slate-800 ml-1">
                                    Descreva o produto
                                </h3>
                                <textarea
                                    rows={6}
                                    name={"description"}
                                    placeholder={"Insira uma descrição curta e informativa do produto..."}
                                    onChange={(e) => setValue("description", e.target.value)}
                                    disabled={isPending}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    defaultValue={initialData?.description}
                                />
                                {errors.description && <span className="text-red-500">Este campo é obrigatório</span>}
                            </div>
                            <div className="w-full space-y-1">
                                <h3 className="text-sm font-bold text-slate-800 ml-1">
                                    Descrição Descubra o Local
                                </h3>
                                <textarea
                                    rows={6}
                                    name={"locationDescription"}
                                    placeholder={"Insira uma descrição  para incentivar a visita..."}
                                    onChange={(e) => setValue("locationDescription", e.target.value)}
                                    disabled={isPending}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                    defaultValue={initialData?.locationDescription}
                                />
                                {errors.locationDescription && <span className="text-red-500">Este campo é obrigatório</span>}
                            </div>

                            <div className={`${isPending || transitioning ? "bg-gray-100 cursor-not-allowed" : ""} w-full space-y-1`}>
                                <h3 className="text-sm font-bold text-slate-800 ml-1">
                                    Propriedades
                                </h3>
                                <PropertyManager
                                    title="Dimensões"
                                    properties={dimensions}
                                    setProperties={setDimensions}
                                />
                                <PropertyManager
                                    title="Especificações"
                                    properties={specifications}
                                    setProperties={setSpecifications}
                                />
                                <PropertyManager
                                    title="Características"
                                    properties={features}
                                    setProperties={setFeatures}
                                />
                                <PropertyManager
                                    title="Recomendações"
                                    properties={recommendation}
                                    setProperties={setRecommendation}
                                />
                            </div>
                        </div>
                    )}

                    <div className="w-full flex flex-col">
                        {error ? (
                            <div className="w-full flex-col space-y-1">
                                <p className="w-full bg-rose-50 text-rose-700 p-2 rounded-md">
                                    {error}
                                </p>
                                <button
                                    className="w-full"
                                    type={"button"}
                                    onClick={() => setError("")}
                                >
                                    OK
                                </button>
                            </div>
                        ) : errorUploadFiles ? (
                            <div className="w-full flex-col space-y-1">
                                <p className="w-full bg-rose-50 text-rose-700 p-2 rounded-md">
                                    {errorUploadFiles}
                                </p>
                                <button
                                    className="w-full"
                                    type={"button"}
                                    onClick={() => setErrorUploadFiles("")}
                                >
                                    OK
                                </button>
                            </div>
                        ) : success ? (
                            <div className="w-full flex items-start flex-col space-y-4">
                                <p className="w-full bg-teal-50 text-teal-700 px-4 py-8 rounded-md font-medium">
                                    {success}
                                </p>
                                <Link
                                    href={"/canecas/lista-de-canecas"}
                                    className="w-full sm:w-auto hover:shadow-md transition-transform duration-300 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full"

                                >
                                    OK
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full  flex sm:flex-row flex-col items-center justify-start gap-[15px] mt-4 pt-4 border-t border-slate-300">
                                <button
                                    type={"submit"}
                                    className={`${isPending || transitioning ? "bg-blue-50 cursor-not-allowed" : ""} w-full sm:w-auto hover:shadow-md transition-transform duration-300 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full`}
                                    disabled={isUploadingFiles || isPending || transitioning}
                                >
                                    {initialData ? "Atualizar Caneca" : "Salvar Registro"}
                                </button>
                                <Link
                                    type={"button"}
                                    href={"/canecas/lista-de-canecas"}
                                    className={`${isPending || transitioning ? "hidden" : ""} w-full sm:w-auto hover:shadow-md transition-transform duration-300 transform hover:scale-105 border border-blue-600 text-center rounded-full hover:border-blue-700 px-6 py-2 font-medium text-blue-600 hover:text-blue-700`}
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