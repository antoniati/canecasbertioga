import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canecas Exclusivas de Bertioga | Um Brinde à Costa Paulista",
  description: "Eleve suas manhãs com nossas canecas de design exclusivo que capturam a beleza e a essência de Bertioga.  Inspiradas pelas paisagens e a cultura vibrante de Bertioga. Cada peça é uma celebração da Costa Paulista.",

  keywords: "canecas exclusivas, presentes únicos,lembranças Bertioga, Costa Paulista, lembranças sofisticadas, produtos artesanais, cultura local, lifestyle Bertioga",

  authors: [
    {
      name: "Canecas Bertioga",
      url: "https://www.canecasbertioga.com.br",
    },
  ],
  openGraph: {
    title: "Canecas Exclusivas de Bertioga | Um Brinde à Costa Paulista",
    description: "Descubra canecas que não são apenas utensílios, mas obras de arte. Inspiradas na beleza natural de Bertioga, nossas peças elevam o cotidiano a um novo patamar de sofisticação.",
    url: "https://www.canecasbertioga.com.br",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://www.canecasbertioga.com.br/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caneca Exclusiva de Bertioga com Vista Panorâmica",
      },
    ],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <main className={clsx(inter.className, "bg-white text-slate-800")}>
      <Navbar scrollHeigh={0} />
      {children}
      <Footer />
    </main>
  );
}