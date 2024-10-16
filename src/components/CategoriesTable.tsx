"use client";

import Link from "next/link";

import { PencilIcon, TrashIcon } from "./Icons";

type CategoryTableProps = {
    categories: { id: string, name: string, parent: string | null }[];
};

export const CategoryTable = ({ categories }: CategoryTableProps) => {
    return (
        <div className="w-full overflow-x-auto h-[300px] bg-white">
            <table className="min-w-full border-collapse text-left">
                <thead className="text-sm border-y mb-2 bg-slate-50">
                    <tr>
                        <th className="p-2 text-slate-700 font-semibold"> Nome </th>
                        <th className="p-2 text-slate-700 font-semibold"> Opções</th>
                    </tr>
                </thead>

                <tbody className="text-gray-800 text-md font-light">
                    {categories.map((category) => {
                        return (
                            <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="p-2 font-medium">{category.name}</td>
                                <td className="p-2">
                                    <div className="flex justify-start space-x-2">
                                        <Link
                                            href={`/categorias/editar-categoria/${category.id}`}
                                            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-md"
                                        >
                                            <PencilIcon w="24" h="24" />
                                            <span>Editar</span>
                                        </Link>
                                        <Link
                                            href={`/categorias/deletar-categoria/${category.id}`}
                                            className="flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-md"
                                        >
                                            <TrashIcon w="24" h="24" />
                                            <span>Deletar</span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
