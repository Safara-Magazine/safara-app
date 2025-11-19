"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { landingPageHighLights } from "@/lib/constants";
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';

export default function HighlightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev === 0 ? landingPageHighLights.length - itemsPerView : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === landingPageHighLights.length - itemsPerView ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const itemWidth = wrapper.offsetWidth / itemsPerView;
    gsap.to(wrapper, {
      x: -currentIndex * itemWidth,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [currentIndex, itemsPerView]);

  return (
    <div ref={containerRef} className="w-full py-8 px-4 md:px-0 my-12 ">

      {/* btn */}
      <div className="flex justify-end gap-2 mb-6 px-4 ">
        <button
          onClick={() => handleScroll("left")}
          className="px-4 py-4  bg-[#B59157] rounded-full text-white transition-colors duration-300"
        >
          <CircleChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="px-4 py-4  bg-[#B59157] rounded-full text-white transition-colors duration-300"
        >
          <CircleChevronRight size={20} />
        </button>
      </div>

      {/* carousel */}
      <div ref={wrapperRef} className="flex gap-0 w-full">
        {landingPageHighLights.map((highlight, index) => (
          <Link key={index} href={`/${highlight.slug}`} className={`flex-shrink-0`} style={{ width: `${100 / itemsPerView}%` }}>
            <div
              className="relative h-[300px] md:h-[378px] w-full overflow-hidden group"
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
    </div>
  );
}