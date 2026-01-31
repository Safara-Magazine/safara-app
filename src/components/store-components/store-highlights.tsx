"use client";

import { storeHighLights } from "@/lib/constants";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export default function HighlightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simple fade-in animation without GSAP
    const items = itemsRef.current;
    items.forEach((item, index) => {
      if (item) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full py-8 px-4 md:px-0 my-12">

       {/* breadcrumb */}
        <div className="flex gap-2 md:hidden items-center  text-[16px] text-[#767572]">
          <Link href="/">Home</Link>
          <span>&gt;&gt;</span>
          <span className="text-[#2F1C32] font-medium">Store</span>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-6 md:gap-0 max-w-full mx-auto">
        {storeHighLights.map((highlight, index) => (
          <Link key={index} href={`/${highlight.slug}`}>
            <div
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative h-[210px] md:h-[378px] w-full overflow-hidden group opacity-0 translate-y-8 transition-all  duration-700 ease-out"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${highlight.img})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-white text-[14.06px] md:text-[20px] font-bold uppercase text-center tracking-wide drop-shadow-lg">
                  {highlight.text}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d4af8f] transition-all duration-500 pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
