import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductToastProps {
    productName: string;
    productImage: string;
}

export const ProductToast: React.FC<ProductToastProps> = ({ productName, productImage }) => {
    return (
        <div className="flex items-center">
            <Image
                src={productImage}
                alt={productName}
                width={100}
                height={100}
            />
            <div className="space-y-4 flex flex-col">
                <h2 className="text-slate-800">Caneca Adicionada</h2>
                <p className="text-gray-500">{productName}</p>
                <Link
                    href="/carrinho"
                    className="p-2 text-blue-600 hover:text-blue-700 font-bold"
                >
                    Ver carrinho
                </Link>
            </div>
        </div>
    );
};