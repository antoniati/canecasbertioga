"use client";

import { Benefits } from "@/components/Benefits";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { LoadingPage } from "@/components/LoadingPage";
import { Navbar } from "@/components/Navbar";
import { NewsProducts } from "@/components/NewsProducts";
import { ProductSearch } from "@/components/ProductSearch";
import { useProductsData } from "@/hooks/useProductsData";

export default function Home() {
  const { data: products, isLoading } = useProductsData();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!products) {
    return null;
  }


  return (
    <main className="w-full h-auto relative">
      <Navbar scrollHeigh={300} />
      <FeaturedProducts products={products ?? []} />
      <NewsProducts products={products ?? []} />
      <div className="px-4 md:px-6 lg:px-12 xl:px-24 flex items-center justify-center pb-12"> 
        <Benefits />
      </div>
      <Footer />
      <ProductSearch />
    </main>
  );
}