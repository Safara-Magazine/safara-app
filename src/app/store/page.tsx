"use client";

import BestSellers from "@/components/store-components/bestsellers";
import Hero from "@/components/store-components/hero";
import HighlightsSection from "@/components/store-components/store-highlights";
import DealsSection from "@/components/store-components/store-grid";
import NewArrivals from "@/components/store-components/new-arrivals";
import StoreNavigation from "@/components/layout/Header/StoreNavBar";

import { useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

export default function Store() {

  const searchParams = useSearchParams();
    const section = searchParams.get("section");

   useEffect(() => {
    if (!section) return;

    const el = document.getElementById(section);

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200); 
    }
  }, [section]);

  return (
    <section>
      <StoreNavigation />
      <Hero />
      <HighlightsSection />
      <BestSellers />
      <DealsSection />
      <NewArrivals />
    </section>
  );
}