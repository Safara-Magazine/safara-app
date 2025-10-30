import HeroSlider, { HeroSlide } from "@/components/component.heroslider";
import FeatureComponent from "@/components/components.feature";
import DividerLine from "@/components/molecules/DividerLine/page";
import ThreeCardDisplay from "@/components/templates/ThreeCardDisplay/page";
import React from "react";


const heroSlides1: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
  },
];

const Category = () => {
  return (
    <div>
      <HeroSlider slides={heroSlides1} />
      <main className="px-8">
        <DividerLine title="features" />
        <FeatureComponent />
        <ThreeCardDisplay title="regular section" />
        <ThreeCardDisplay title="special reports" />
      </main>
    </div>
  );
};

export default Category;
