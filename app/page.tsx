import { HeroSection }      from "@/components/home/HeroSection";
import { TrustBar }         from "@/components/home/TrustBar";
import { ProductsSection }  from "@/components/home/ProductsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductsSection />
      <NewsletterSection />
    </>
  );
}
