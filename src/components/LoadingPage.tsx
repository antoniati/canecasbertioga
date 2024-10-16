import { LogoIcon } from "./Icons";

export const LoadingPage = () => {
    return (
        <section className="flex justify-center items-center h-screen bg-white">
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Círculo de loading com gradiente */}
                <div className="absolute w-32 h-32 border rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-white animate-spin"></div>
                {/* Logo centralizado */}
                <div className="absolute w-[120px] h-[120px] z-10 bg-white rounded-full text-blue-700 flex items-center justify-center">
                    <div className="ml-2">
                        <LogoIcon w="48" h="48" />
                    </div>
                </div>
            </div>
        </section>
    );
};
