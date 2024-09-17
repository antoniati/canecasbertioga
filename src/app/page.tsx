import { Benefits } from "@/components/Benefits";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NewsProducts } from "@/components/NewsProducts";

export default function Home() {
  return (
    <>
      <Navbar scrollHeigh={500} />
      <main className="w-full h-auto">
        <FeaturedProducts />
        <Benefits />
        <NewsProducts />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
} 