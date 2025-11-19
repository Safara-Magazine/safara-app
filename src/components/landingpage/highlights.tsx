"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { landingPageHighLights } from "@/lib/constants";


export default function HighlightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const items = itemsRef.current;
    
    items.forEach((item, index) => {
      if (item) {
        if (index === currentIndex) {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateX(100%)";
        }
      }
    });

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % landingPageHighLights.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="w-full py-8 px-4 md:px-0 my-12 relative h-[300px] md:h-[378px] overflow-hidden">
      {landingPageHighLights.map((highlight, index) => (
        <Link key={index} href={`/${highlight.slug}`}>
          <div
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full overflow-hidden group opacity-0 transition-all duration-700 ease-out"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${highlight.img})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
              <p className="text-white text-xl md:text-2xl font-bold uppercase text-center tracking-wide drop-shadow-lg">
                {highlight.text}
              </p>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d4af8f] transition-all duration-500 pointer-events-none" />
          </div>
        </Link>
      ))}
    </div>
  );
}