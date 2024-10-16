import type { Metadata } from "next";
import { Hind } from "next/font/google";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "@/auth";
import { CartContextProvider } from "@/contexts/CartContextProvider";
import { SearchModalProvider } from "@/contexts/SearchModalContext";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { UserProvider } from "@/providers/UserProvider";

import "leaflet/dist/leaflet.css";
import "./globals.css";

const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Canecas Exclusivas de Bertioga | Um Brinde à Costa Paulista",
  description: "Eleve suas manhãs com nossas canecas de design exclusivo que capturam a beleza e a essência de Bertioga.  Inspiradas pelas paisagens intocadas e a cultura vibrante de Bertioga. Cada peça é uma celebração da Costa Paulista.",

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session} >
      <html lang="pt-BR" className={`${hind.className} antialiased bg-gradient-to-r from-blue-900 to-sky-600 `}>
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
          />
          <Script
            src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"
            strategy="beforeInteractive" // Ou "afterInteractive" se preferir
          />
        </head>
        <body>
          <CartContextProvider>
            <UserProvider>
              <ReactQueryProvider>
                <SearchModalProvider>
                  {children}
                </SearchModalProvider>
              </ReactQueryProvider>
              <ToastContainer
                className={"top-[80px]"}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </UserProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  name: "Caneca Exclusiva de Bertioga",
                  description:
                    "Uma caneca que captura a essência da Costa Paulista, perfeita para quem valoriza o design único e a autenticidade local.",
                  image: "https://www.canecasbertioga.com.br/og-image.jpg",
                  brand: {
                    "@type": "Brand",
                    name: "Canecas Bertioga",
                  },
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "BRL",
                    price: "35.00",
                    url: "https://www.canecasbertioga.com.br/produtos/caneca-exclusiva-de-bertioga",
                    availability: "https://schema.org/InStock",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "150",
                  },
                }),
              }}
            />
          </CartContextProvider>
        </body>
      </html>
    </SessionProvider >
  );
}
