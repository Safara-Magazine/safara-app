"use client";

import React, { useEffect, useRef } from "react";
import DividerLine from "../molecules/DividerLine/page";
import { landingPageNews, landingPageNews2 } from "@/lib/constants";
import Image from "@/components/Image";
import Link from "next/link"; 
import { generateSlug } from "@/lib/omniContents"; 

export const LandingPageNews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const newsItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Staggered fade-in animation
    newsItemsRef.current.forEach((item, index) => {
      if (item) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 300);
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 max-w-7xl mx-auto ">
      <DividerLine title="FEATURED" />

      <div className="space-y-12 md:space-y-16 mb-8 md:mb-16">
        {landingPageNews.map((page, i) => {
          const isEven = i % 2 === 0;

          return (
      
            <Link
              key={i}
              href={`/article/${generateSlug(page.title)}`}
            >
              <div
                ref={(el) => {
                  newsItemsRef.current[i] = el;
                }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out cursor-pointer ${
                  isEven ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden rounded-lg shadow-2xl group ${
                    isEven ? "" : "md:col-start-2"
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={page.img}
                      alt="news"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4a2c5e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content */}

                {/* here as well- sage */}
                <div
                  className={`flex flex-col justify-center space-y-4  ${
                    isEven ? "" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#4a2c5e] leading-tight transition-colors duration-300 hover:text-[#5d3770]">
                    {page.title}
                  </h3>

                  <button className="w-[100px] font-medium h-[32px]  rounded-[20px] border border-[#B59157] bg-[#B59157] text-white  text-[14px]  transition-colors duration-300">
                      {page.category}
                  </button>


                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {page.text}
                  </p>

                  <div className="flex justify-end pt-4 ">

                    

                    <button className="group/btn relative text-sm md:text-base font-semibold text-[#EBB659] hover:text-[#d4af8f] transition-all duration-300 flex items-center gap-2 overflow-hidden">
                      <span className="relative z-10">{page.span}</span>

                      {/* Animated underline */}
                      <div className="absolute  bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#EBB659] to-[#B59157] group-hover/btn:w-full transition-all duration-500 ease-out" />

                      {/* Arrow animation */}
                      <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <DividerLine title="MORE FEATURES" />
    </section>
  );
};

export const LandingPageNews2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const newsItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Staggered fade-in animation
    newsItemsRef.current.forEach((item, index) => {
      if (item) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 300);
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 max-w-7xl mx-auto ">
      <div className="space-y-12 md:space-y-16 mb-8 md:mb-16">
        {landingPageNews2.map((page, i) => {
          const isEven = i % 2 === 0;

          return (
            
            <Link
              key={i}
              href={`/article/${generateSlug(page.title)}`}
            >
              <div
                ref={(el) => {
                  newsItemsRef.current[i] = el;
                }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center opacity-0 translate-y-12 transition-all duration-1000 ease-out cursor-pointer ${
                  isEven ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden rounded-lg shadow-2xl group ${
                    isEven ? "" : "md:col-start-2"
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={page.img}
                      alt="news"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4a2c5e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center space-y-4  ${
                    isEven ? "" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#4a2c5e] leading-tight transition-colors duration-300 hover:text-[#5d3770]">
                    {page.title}
                  </h3>

                  <button className="w-[100px] font-medium h-[32px]  rounded-[20px] border border-[#B59157] bg-[#B59157] text-white  text-[14px]  transition-colors duration-300">
                      {page.category}
                  </button>

                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {page.text}
                  </p>

                  <div className="flex justify-end pt-4">
                    <button className="group/btn relative text-sm md:text-base font-semibold text-[#EBB659] hover:text-[#d4af8f] transition-all duration-300 flex items-center gap-2 overflow-hidden">
                      <span className="relative z-10">{page.span}</span>

                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#EBB659] to-[#B59157] group-hover/btn:w-full transition-all duration-500 ease-out" />

                      {/* Arrow animation */}
                      <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <DividerLine title="MORE FEATURES" alignment="right" />
    </section>
  );
};