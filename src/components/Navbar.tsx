"use client";

import { UserRole } from "@prisma/client";
import Link from "next/link";
import { useContext, useEffect, useState, useRef } from "react";

import { CartIcon, ListIcon, PersonIcon, QuestionIcon, LogoIcon, ShopIcon, SearchIcon, LogoutIcon, MenuIcon, MugIcon, DashboardIcon } from "@/components/Icons";
import { CartContext } from "@/contexts/CartContextProvider";
import { useSearchModal } from "@/contexts/SearchModalContext";
import { useCurrentUserByClientSide } from "@/hooks/useClientSideUser";
import { createLogoutSession } from "@/services/create/createLogoutSession";

export const Navbar = ({ scrollHeigh }: { scrollHeigh: number }) => {
    const currentUser = useCurrentUserByClientSide();
    const { openModal } = useSearchModal();

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("Contexto do carrinho não encontrado!");
    }

    const { cartProducts } = cartContext;

    const menuItemData = [
        {
            icon: <ShopIcon w="24" h="24" />,
            title: "Loja",
            url: "/",
        },
        {
            icon: <MugIcon w="24" h="24" />,
            title: "Canecas",
            url: "/canecas",
        },
        {
            icon: <ListIcon w="24" h="24" />,
            title: "Seus Pedidos",
            url: "/seus-pedidos",
        },
        {
            icon: <PersonIcon w="24" h="24" />,
            title: "Sua Conta",
            url: "/sua-conta",
        },
        {
            icon: <QuestionIcon w="24" h="24" />,
            title: "Suporte",
            url: "/suporte",
        },
    ];

    useEffect(() => {
        if (scrollHeigh === 0) {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > scrollHeigh);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollHeigh]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={`w-full fixed top-0 left-0 z-40 ${isScrolled ? "bg-white shadow" : "bg-gradient-to-r from-gray-50 to-gray-100"} text-slate-800 transition-all duration-300`}>
            <div className="w-full py-[15px] flex justify-between items-center px-4 md:px-6 lg:px-12 xl:px-24">
                <Link href={"/"} className="w-2/4 flex items-center space-x-2 sm:pl-0 pl-2">
                    <span className={"text-[#0074d4]"}>
                        <LogoIcon w="24" h="24" />
                    </span>
                    <h1 className="text-xs sm:text-sm font-semibold">
                        <span>CANECAS</span>
                        {" "}
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
                    </h1>
                </Link>

                <div className="w-2/4 flex items-center justify-end space-x-2 sm:space-x-4">
                    {currentUser && currentUser.role === UserRole.ADMIN ? (
                        <Link href={"/dashboard"} className="transition-transform transform hover:scale-105">
                            <div className="flex items-center space-x-2">
                                <DashboardIcon w="27" h="27" />
                                <span className={"hidden md:inline text-slate-800 text-md"}>Dashboard</span>
                            </div>
                        </Link>
                    ) : (
                        <button type="button" onClick={openModal} className="transition-transform transform hover:scale-105">
                            <div className="flex items-center space-x-2">
                                <SearchIcon w="27" h="27" />
                                <span className={"hidden md:inline text-slate-800 text-md"}>Pesquisar</span>
                            </div>
                        </button>
                    )}

                    <Link href={"/carrinho"} className="transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-2">
                            <CartIcon w="22" h="22" />
                            <span className={"hidden md:inline text-slate-800 text-md"}>Carrinho</span>
                            ({cartProducts.length})
                        </div>
                    </Link>

                    <div className="relative">
                        {/* Botão para abrir o menu lateral */}
                        <button
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={"flex items-center space-x-2 text-slate-800 text-md transition-transform transform hover:scale-105"}
                        >
                            <MenuIcon w="27" h="27" />
                            <span className={"hidden md:inline text-slate-800 text-md"}>Menu</span>
                        </button>

                        {/* Menu lateral com transição */}
                        <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} >
                            <div className="p-6 relative">
                                <h2 className="text-xl font-bold mb-4 text-slate-800">Menu</h2>
                                <ul>
                                    {menuItemData.map((item, index) => (
                                        <li key={index} className="border-b last:border-b-0">
                                            <Link href={item.url} className="flex items-center space-x-2 p-2 hover:bg-blue-100 transition-all" onClick={handleMenuItemClick}>
                                                <span className="text-blue-700 transition-transform transform hover:scale-105">
                                                    {item.icon}
                                                </span>
                                                <span className={`${isScrolled ? "text-slate-800" : "text-gray-800"} text-lg mb-1`}>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                    {currentUser && (
                                        <li>
                                            <Link
                                                href={"/"}
                                                className="flex items-center space-x-2 p-2 hover:bg-blue-100 transition-all"
                                                onClick={() => {
                                                    createLogoutSession();
                                                    handleMenuItemClick();
                                                }}
                                            >
                                                <span className="text-blue-600">
                                                    <LogoutIcon w="24" h="24" />
                                                </span>
                                                <span className={`${isScrolled ? "text-slate-800" : "text-gray-800"} text-lg`}>Sair</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                {/* Botão para fechar o menu lateral*/}
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="absolute top-[10px] right-[10px] text-slate-700 text-3xl cursor-pointer"
                                >
                                    <span className="py-1 px-2 flex items-center justify-center">
                                        &times;
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};