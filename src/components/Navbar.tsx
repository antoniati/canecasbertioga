"use client";

import Link from "next/link";
import { useContext, useEffect, useState, useRef } from "react";

import { CartContext } from "@/contexts/CartContextProvider";

import {
    CartIcon,
    ListIcon,
    PersonIcon,
    QuestionIcon,
    LogoIcon,
    ShopIcon,
    SearchIcon,
    LogoutIcon,
    MenuIcon,
    MugIcon,
} from "./Icons";

export const Navbar = ({ scrollHeigh }: { scrollHeigh: number }) => {
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
        <nav className={`w-full fixed top-0 left-0 z-50 ${isScrolled ? "bg-white text-slate-800 shadow-md" : "bg-gradient-to-r from-blue-900 to-sky-600 text-white"} transition-all duration-300`}>
            <div className="container mx-auto px-4 sm:px-8 lg:px-12 py-[15px] flex justify-between items-center">
                <Link href={"/"} className="flex items-center space-x-2 sm:pl-0 pl-2">
                    <span className={`${isScrolled ? "text-[#0074d4]" : "text-white"}`}>
                        <LogoIcon w="24" h="24" />
                    </span>
                    <h1 className="text-sm sm:text-md font-semibold">
                        <span>CANECAS</span>
                        {" "}
                        {isScrolled ? (
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
                        ) : "BERTIOGA"}
                    </h1>
                </Link>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link href={"/canecas"}>
                        <div className="flex items-center space-x-2">
                            <SearchIcon w="27" h="27" />
                            <span className={`hidden md:inline ${isScrolled ? "text-slate-800" : "text-white"} text-md`}>Pesquisar</span>
                        </div>
                    </Link>
                    <Link href={"/carrinho"}>
                        <div className="flex items-center space-x-2">
                            <CartIcon w="22" h="22" />
                            <span className={`hidden md:inline ${isScrolled ? "text-slate-800" : "text-white"} text-md`}>Carrinho</span>
                            ({cartProducts.length})
                        </div>
                    </Link>
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`flex items-center space-x-2 ${isScrolled ? "text-slate-800" : "text-white"} text-md`}
                        >
                            <MenuIcon w="27" h="27" />
                        <span className={`hidden md:inline ${isScrolled ? "text-slate-800" : "text-white"} text-md`}>Menu</span>                        
                        </button>
                        {isMenuOpen && (
                            <ul ref={menuRef} className="w-[200px] absolute right-0 mt-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                                {menuItemData.map((item, index) => (
                                    <li key={index} className="border-b last:border-b-0">
                                        <Link href={item.url} className="flex items-center space-x-2 p-2 hover:bg-blue-100" onClick={handleMenuItemClick}>
                                            <span className="text-blue-600">
                                                {item.icon}
                                            </span>
                                            <span className={`${isScrolled ? "text-slate-800" : "text-gray-800"} text-lg mb-1`}>{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href={"/"} className="flex items-center space-x-2 p-2 hover:bg-blue-100" onClick={handleMenuItemClick}>
                                        <span className="text-blue-600">
                                            <LogoutIcon w="24" h="24" />
                                        </span>
                                        <span className={`${isScrolled ? "text-slate-800" : "text-gray-800"} text-lg`}>Sair</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};