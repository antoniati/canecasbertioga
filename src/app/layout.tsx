import type { Metadata } from "next";
import localFont from "next/font/local";

import { CartContextProvider } from "@/contexts/CartContextProvider";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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

  return (

    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <CartContextProvider>
          {children}
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
  );
}