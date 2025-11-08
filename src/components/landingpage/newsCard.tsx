"use client";

import { landingPageNews3 } from "@/lib/constants";
import Image from "@/components/Image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { generateSlug } from "@/lib/omniContents";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export const NewsCard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    // Initial animation on load
    gsap.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    cards.forEach((card) => {
      if (!card) return;

      const image = card.querySelector(".news-image");
      const text = card.querySelector(".news-text");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -8,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(image, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(text, {
          color: "#2563eb",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(text, {
          color: "#1f2937",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-4 items-start">
          {landingPageNews3.map((item, i) => {
            const isCenter = i === 1;

            
            return (
              <Link  className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    isCenter ? "md:col-span-5 md:-mt-4" : "md:col-span-3"
                  }`} key={i} href={`/article/${generateSlug(item.text)}`}>
                <div
                  key={i}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                 
                >
                  <div className="relative overflow-hidden">
                    <div
                      className={`relative ${
                        isCenter ? "aspect-[4/3]" : "aspect-[4/3]"
                      } w-full overflow-hidden bg-gray-100`}
                    >
                      <Image
                        className="news-image object-cover transition-transform duration-500"
                        fill
                        src={item.img}
                        alt={`News article ${i + 1}`}
                        sizes={
                          isCenter
                            ? "(max-width: 768px) 100vw, 40vw"
                            : "(max-width: 768px) 100vw, 30vw"
                        }
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* tag goes here */}
                  <div
                    className={`p-6 space-y-3 ${
                      isCenter ? "lg:p-8" : "lg:p-6"
                    }`}
                  >
                    <button className="w-[100px] font-medium h-[32px]  rounded-[20px] border border-[#B59157] group-hover:bg-[#B59157] group-hover:text-white text-[#B59157] text-[14px]  transition-colors duration-300">
                      {item.category}
                    </button>

                    <p
                      className={`news-text font-medium text-gray-800 leading-relaxed transition-colors duration-300  ${
                        isCenter ? "text-lg lg:text-xl" : "text-base lg:text-lg"
                      }`}
                    >
                      {item.text}
                    </p>

                    {/* Read more indicator */}
                    <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-semibold">Read more</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Accent border on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
