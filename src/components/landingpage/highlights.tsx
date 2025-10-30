"use client"

import { landingPageHighLights } from "@/lib/constants"
import React, { useEffect, useRef } from "react"


export default function HighlightsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Simple fade-in animation without GSAP
    const items = itemsRef.current
    items.forEach((item, index) => {
      if (item) {
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, index * 200)
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="w-full py-8 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-full mx-auto">
        {landingPageHighLights.map((highlight, index) => (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            className="relative h-[300px] md:h-[378px] w-full overflow-hidden group opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${highlight.img})`,
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <p className="text-white text-xl md:text-2xl font-bold uppercase text-center tracking-wide drop-shadow-lg">
                {highlight.text}
              </p>
            </div>
            
            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d4af8f] transition-all duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}