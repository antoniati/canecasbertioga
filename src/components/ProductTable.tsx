"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

import { PencilIcon, TrashIcon } from "./Icons";

type ProductTableProps = {
    products: Product[]
};

export const ProductTable = ({ products }: ProductTableProps) => {
    const router = useRouter();

    return (
        <div className="w-full overflow-x-auto max-h-[400px] bg-white">
            {products.length > 0 ? (
                <table className="min-w-full border-collapse text-left">
                    <thead className="text-sm border-y mb-2 bg-slate-50">
                        <tr>
                            <th className="p-2 text-slate-700 font-semibold"> Nome </th>
                            <th className="p-2 text-slate-700 font-semibold"> Preço de Custo </th>
                            <th className="p-2 text-slate-700 font-semibold"> Preço de Venda</th>
                            <th className="p-2 text-slate-700 font-semibold"> Categorias</th>
                            <th className="p-2 text-slate-700 font-semibold"> Opções</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 text-md font-light">
                        {products.map((product) => {
                            return (
                                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-2 font-medium">{product.name}</td>
                                    <td className="p-2 font-medium">R$ {product.costPrice}</td>
                                    <td className="p-2 font-medium">R$ {product.price}</td>
                                    <td className="p-2 font-medium">{product.categoryName}</td>
                                    <td className="p-2 font-medium">
                                        <div className="flex justify-start space-x-2">
                                            <button
                                                type="button"
                                                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
                                                onClick={() => router.push(`/canecas/editar-caneca/${product.id}`)}
                                            >
                                                <PencilIcon w="24" h="24" />
                                                <span>Editar</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
                                                onClick={() => router.push(`/canecas/deletar-caneca/${product.id}`)}
                                            >
                                                <TrashIcon w="24" h="24" />
                                                <span>Deletar</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p className="w-full p-6 bg-slate-50 text-gray-500">
                    Nenhuma Caneca registrada até o momento. Você pode utilizar a funcionalidade de registro disponível para registrar uma caneca.
                </p>
            )}
        </div>
    );
};