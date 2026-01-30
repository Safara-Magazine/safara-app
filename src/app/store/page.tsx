import BestSellers from "@/components/store-components/bestsellers";
import Hero from "@/components/store-components/hero";
import HighlightsSection from "@/components/store-components/store-highlights";

export default function Store() {
  return (
    <section>
      <Hero />
      <HighlightsSection />
      <BestSellers />
    </section>
  );
}