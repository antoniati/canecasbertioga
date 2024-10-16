import Link from "next/link";

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-300">404</h1>
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mt-4">Página não encontrada</h2>
                <p className="text-lg text-gray-500 mt-2">Desculpe, a página que você está procurando não existe.</p>
                <Link href="/" legacyBehavior>
                    <a className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                        Voltar para a página inicial
                    </a>
                </Link>
            </div>
            <div className="absolute bottom-4 text-sm text-gray-400">
                <p>Desenvolvido com ❤️ por CANECAS{" "}
                    <>
                        <span className="text-blue-600">B</span>
                        <span className="text-blue-700">E</span>
                        <span className="text-blue-800">R</span>
                        <span className="text-rose-400">T</span>
                        <span className="text-red-500">I</span>
                        <span className="text-amber-500">O</span>
                        <span className="text-green-600">G</span>
                        <span className="text-green-800">A</span>
                    </>
                </p>
            </div>
        </div >
    );
};