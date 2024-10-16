import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductSearch } from "@/components/ProductSearch";
import { SearchModalProvider } from "@/contexts/SearchModalContext";

export const metadata: Metadata = {
    title: "Canecas Exclusivas de Bertioga | Um Brinde à Costa Paulista",
    description: "Eleve suas manhãs com nossas canecas de design exclusivo que capturam a beleza e a essência de Bertioga.  Inspiradas pelas paisagens intocadas e a cultura vibrante de Bertioga. Cada peça é uma celebração da Costa Paulista.",

    keywords: "canecas exclusivas, presentes únicos,lembranças Bertioga, Costa Paulista, lembranças sofisticadas, produtos artesanais, cultura local, lifestyle Bertioga",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <SearchModalProvider>
                <Navbar scrollHeigh={0} />
                {children}
                <Footer />
                <ProductSearch />
            </SearchModalProvider>
        </main>
    );
}