import HeroSlider, { HeroSlide } from "@/components/component.heroslider";
import ThreeCardDisplay from "@/components/templates/ThreeCardDisplay/page";
import React from "react";

const heroSlides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&q=80",
    title: "Luxury Experiences",
    subtitle: "Indulge in premium travel and accommodation",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
];

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
        {/* <DividerLine title="features" /> */}
        {/* <FeatureComponent /> */}
        <ThreeCardDisplay title="regular section" />
        <ThreeCardDisplay title="special reports" />
      </main>
    </div>
  );
};

export default Category;
