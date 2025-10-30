"use client";

import HeroSlider, { HeroSlide } from "@/components/component.heroslider";
import FeatureComponent from "@/components/components.feature";
import SubCategoryHeader from "@/components/layout/Header/SubCategoryHeader";
import SubCategorySidebar from "@/components/layout/Sidebar/SubCategorySidebar";
import DividerLine from "@/components/molecules/DividerLine/page";
import ThreeCardDisplay from "@/components/templates/ThreeCardDisplay/page";
import React, { useState } from "react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <SubCategoryHeader setIsSidebarOpen={setIsSidebarOpen} />
      <SubCategorySidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <HeroSlider slides={heroSlides1} />
      <main className="px-8">
        <DividerLine title="features" />
        <FeatureComponent />
        <ThreeCardDisplay title="regular section" />
        <ThreeCardDisplay title="special reports" />
      </main>
    </>
  );
};

export default Category;
