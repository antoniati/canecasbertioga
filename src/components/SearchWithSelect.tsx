"use client";

import React, { ChangeEvent, useState } from "react";

import { SearchIcon } from "./Icons";

type SearchWithSelectType = {
    isLoadingData?: boolean;
    onSearch: (term: string, status: string) => void;
    children: React.ReactNode;
};

export const SearchWithSelect: React.FC<SearchWithSelectType> = React.memo(function SearchWithSelect({
    onSearch,
    children,
    isLoadingData,
}): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const handleInputChange = (term: string) => {
        setSearchTerm(term);
        onSearch(term, selectedStatus);
    };

    const handleSelectChange = (value: string) => {
        setSelectedStatus(value);
        onSearch(searchTerm, value);
    };

    return (
        <div className="max-w-[800px] flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
                <input
                    className={`w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isLoadingData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    type="text"
                    name="search"
                    placeholder="Pesquisar Canecas..."
                    spellCheck={false}
                    autoComplete="off"
                    disabled={isLoadingData}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-700 pointer-events-none">
                    <SearchIcon w="20" h="20" />
                </span>
            </div>

            <div className="relative flex-1">
                <select
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer ${isLoadingData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    name="Selecionar por Praia"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectChange(e.target.value)}
                    value={selectedStatus}
                    disabled={isLoadingData}
                >
                    {children}
                </select>
            </div>
        </div>
    );
});