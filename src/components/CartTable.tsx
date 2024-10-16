"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useContext } from "react";

import { CartContext } from "@/contexts/CartContextProvider";

interface CartTableProps {
    products: Product[];
    cartProducts: string[];
}

const formatValueToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};

export const CartTable: React.FC<CartTableProps> = ({
    products,
    cartProducts,
}): JSX.Element => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("CartContext not found");
    }

    const { addProduct, removeProduct } = cartContext;

    const cartProductList = products.filter((product) =>
        cartProducts.includes(product.id),
    );

    return (
        <table className="min-w-full border-collapse text-left">
            <thead className="text-sm border-y mb-2 bg-slate-50">
                <tr>
                    <th className="p-2 text-slate-700 font-medium"> Nome </th>
                    <th className="p-2 text-slate-700 font-medium text-center"> Quantidade </th>
                    <th className="p-2 text-slate-700 font-medium"> Preço </th>
                </tr>
            </thead>
            <tbody>
                {cartProductList.map((product) => {
                    const quantity = cartProducts.filter(
                        (id: string) => id === product.id,
                    ).length;

                    return (
                        <tr key={product.id} className="border-b last:border-none">
                            <td className="p-3 flex items-center space-x-4">
                                <div className="w-[80px] h-[80px] rounded-lg overflow-hidden">
                                    <Image
                                        src={product.files[2]}
                                        alt={`Imagem de ${product.name}`}
                                        className="w-full h-full object-cover"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <span className="font-medium text-gray-800">
                                    {product.name}
                                </span>
                            </td>
                            <td className="p-3 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <button
                                        type="button"
                                        className="p-1 px-3 bg-slate-50 text-slate-600 rounded-lg shadow hover:bg-slate-100"
                                        onClick={() => removeProduct(product.id)}
                                    >
                                        -
                                    </button>
                                    <span className="font-bold text-lg text-slate-800">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        className="p-1 px-3 bg-slate-50 text-slate-600 rounded-lg shadow hover:bg-slate-100"
                                        onClick={() => addProduct(product.id, product.name, product.files[2])}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="p-3 text-gray-800">
                                <span className="font-medium">
                                    {formatValueToBRL(quantity * product.price)}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};