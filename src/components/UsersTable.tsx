import { User } from "@prisma/client";
import Link from "next/link";

import { PencilIcon, TrashIcon } from "./Icons";

export const UsersTable = ({ users }: { users: User[] }) => {
    return (
        <div className="w-full overflow-x-auto max-h-[400px] bg-white">
            {users.length > 0 ? (
                <table className="min-w-full border-collapse text-left">
                    <thead className="text-sm border-y mb-2 bg-slate-50">
                        <tr>
                            <th className="p-2 text-slate-700 font-semibold"> Nome </th>
                            <th className="p-2 text-slate-700 font-semibold"> Email </th>
                            <th className="p-2 text-slate-700 font-semibold"> Telefone</th>
                            <th className="p-2 text-slate-700 font-semibold"> Confirmado</th>
                            <th className="p-2 text-slate-700 font-semibold"> Opções</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 text-md font-light">
                        {users.map((user) => {
                            return (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-2 font-medium">{user.customerName}</td>
                                    <td className="p-2 font-medium">{user.email}</td>
                                    <td className="p-2 font-medium">{user.phone}</td>
                                    <td className="p-2 font-medium">{user.emailVerified ? "Sim" : "Não"}</td>                                    
                                    <td className="p-2 font-medium">
                                        <div className="flex justify-start space-x-2">
                                            <Link                                                
                                                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
                                                href={`/clientes/editar-cliente/${user.id}`}
                                            >
                                                <PencilIcon w="24" h="24" />
                                                <span>Editar</span>
                                            </Link>
                                            <Link                                                
                                                className="flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
                                                href={`/clientes/deletar-cliente/${user.id}`}
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
            ) : (
                <p className="w-full p-6 bg-slate-50 text-gray-500">
                    Nenhum Cliente Registrado
                </p>
            )}
        </div>
    );
};