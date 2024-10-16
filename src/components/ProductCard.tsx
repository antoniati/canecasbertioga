import Image from "next/image";
import Link from "next/link";

import { EyeIcon } from "./Icons";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    onLoading: () => void;
    onAddToCart: (id: string, name: string, image: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, onAddToCart, onLoading }) => {
    return (
        <div key={id} className="w-full bg-white border rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="relative p-2">
                <Link href={`/canecas/detalhes/${id}`} onClick={onLoading}>
                    <Image
                        src={imageUrl}
                        alt={`Imagem ${name}`}
                        className="w-full object-cover rounded-t-2xl"
                        width={1000}
                        height={800}
                        priority
                    />
                    <span className="absolute bottom-2 right-4 text-sm text-gray-400">Imagem ilustrativa</span>
                    <div className="absolute text-white top-0 right-0 w-full h-full rounded-t-2xl opacity-0 hover:opacity-100 bg-black/50 transition-opacity flex items-center justify-center flex-col gap-4">
                        <EyeIcon w="36" h="36" />
                        <span>Ver Mais Detalhes</span>
                    </div>
                </Link>
            </div>

            <div className="p-4 flex flex-col space-y-2">
                <h3 className="text-lg font-semibold">{name} (325ml)</h3>
                <div className="flex items-center spac-x-1 pb-2 px-1 text-slate-700">
                    <p className="text-2xl font-bold">R$ {price}</p>
                    <span className="text-sm font-medium">/unidade</span>
                </div>
                <button
                    type="button"
                    onClick={() => onAddToCart(id, name, imageUrl)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
};