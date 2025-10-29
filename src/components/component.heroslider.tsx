// HeroSlider.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  alt?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number; // in milliseconds, default 5000
  showDots?: boolean;
  height?: string; // Tailwind class like 'h-screen' or 'h-[600px]'
  overlayOpacity?: number; // 0 to 1, default 0.5
  className?: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoPlayInterval = 5000,
  showDots = true,
  height = 'h-screen',
  overlayOpacity = 0.5,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slides.length === 0) return;

    // Animate in current content
    const tl = gsap.timeline();
    
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
    )
    .fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // Set up interval for auto-rotation (only if more than 1 slide)
    if (slides.length > 1) {
      const interval = setInterval(() => {
        // Animate out
        gsap.to([titleRef.current, subtitleRef.current], {
          y: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
          }
        });
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, slides.length, autoPlayInterval]);

  if (slides.length === 0) {
    return (
      <div className={`relative w-full ${height} flex items-center justify-center bg-gray-900`}>
        <p className="text-white text-xl">No slides available</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-br-4xl rounded-bl-4xl ${height} overflow-hidden ${className}`}>
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-ou"
          style={{
            opacity: currentIndex === index ? 1 : 0,
          }}
        >
          {slide.image.startsWith('http') ? (
            <img
              src={slide.image}
              alt={slide.alt || slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={slide.image}
              alt={slide.alt || slide.title}
              fill
              priority={index === 0}
              quality={90}
              className="object-cover"
            />
          )}
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black" 
            style={{ opacity: overlayOpacity }}
          />
        </div>
      ))}

      {/* Content Container */}
      <div 
        ref={overlayRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight"
        >
          {slides[currentIndex].title}
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-200 max-w-2xl"
        >
          {slides[currentIndex].subtitle}
        </p>

        {/* Navigation Dots */}
        {showDots && slides.length > 1 && (
          <div className="absolute bottom-10 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;