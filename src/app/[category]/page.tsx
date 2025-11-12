"use client";

import HeroSlider, { HeroSlide } from "@/components/component.heroslider";
import FeatureComponent from "@/components/components.feature";
import SubCategoryHeader from "@/components/layout/Header/SubCategoryHeader";
import SubCategorySidebar from "@/components/layout/Sidebar/SubCategorySidebar";
import DividerLine from "@/components/molecules/DividerLine/page";
import ContentFeedDisplay from "@/components/templates/component.contentfeed";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
import { useState } from "react";

const heroSlides1: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
  },
];

const Category = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data fetching snippet
  // const pathname = usePathname();

  // const { data, error, isLoading } = useQuery<HeroSlide[]>({
  //   queryKey: ["category-data", pathname],
  //   queryFn: async () => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     return res.data;
  //   },
  // });

  // if (isLoading) return <p>Loading users...</p>;
  // if (error) return <p>Error loading users</p>;

  return (
    <>
      <SubCategoryHeader
        isOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SubCategorySidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <HeroSlider slides={heroSlides1} />
      <main className="px-8">
        <DividerLine title="features" />
        <FeatureComponent />
        <ContentFeedDisplay title="regular section" paginationPresent={false} />
        <ContentFeedDisplay title="special reports" paginationPresent={false} />
      </main>
    </>
  );
};

export default Category;
