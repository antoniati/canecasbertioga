"use client";

import React, { createContext, useContext, useState } from "react";

interface SearchModalContextProps {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const SearchModalContext = createContext<SearchModalContextProps | null>(null);

export const useSearchModal = () => {
    const context = useContext(SearchModalContext);
    if (!context) {
        throw new Error("useSearchModal must be used within a SearchModalProvider");
    }
    return context;
};

interface SearchModalContextProviderProps {
    children: React.ReactNode;
}

export const SearchModalProvider = ({ children }: SearchModalContextProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <SearchModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </SearchModalContext.Provider>
    );
};