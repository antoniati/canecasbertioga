import React from "react";

import { CartIcon } from "@/components/Icons";
import { Image } from "@/components/Image";
import { Product } from "@/utils/productDataTest";

interface CartTableProps {
    products: Product[];
    cartProducts: string[];
    addProduct: (productId: string) => void;
    removeProduct: (productId: string) => void;
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
    addProduct,
    removeProduct,
}): JSX.Element => {
    const moreThisProduct = (id: string) => addProduct(id);
    const lessThisProduct = (id: string) => removeProduct(id);

    const cartProductList = products.filter((product) =>
        cartProducts.includes(product.id),
    );

    let total = 0;

    cartProductList.forEach((product) => {
        const quantity = cartProducts.filter((id) => id === product.id).length;

        total += product.price * quantity;
    });

    return (
        <section className="w-full p-6 lg:p-8 rounded-lg shadow-md bg-white">
            <header className="w-full flex items-center mb-6 border-b pb-3">
                <CartIcon w="24" h="24" />
                <h1 className="font-bold text-xl ml-2 text-gray-800">
                    Carrinho de Compras
                </h1>
            </header>
            <div className="overflow-auto max-h-[200px]">
                <table className="min-w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-sm font-semibold text-gray-700 border-b">
                                Produto
                            </th>
                            <th className="p-3 text-sm font-semibold text-center text-gray-700 border-b">
                                Quantidade
                            </th>
                            <th className="p-3 text-sm font-semibold text-gray-700 border-b">
                                Preço
                            </th>
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
                                                path={product.files[2]}
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
                                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                onClick={() => lessThisProduct(product.id)}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-lg text-gray-800">
                                                {quantity}
                                            </span>
                                            <button
                                                type="button"
                                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                                onClick={() => moreThisProduct(product.id)}
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
            </div>
            <div className="w-full flex justify-between items-center mt-6 border-t pt-4">
                <h2 className="text-xl font-bold text-gray-800">Total</h2>
                <p className="text-xl font-bold text-gray-800">
                    {formatValueToBRL(total)}
                </p>
            </div>
        </section>
    );
};