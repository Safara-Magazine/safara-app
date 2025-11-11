"use client";

import DividerLine, {
  DividerLineAlignmet,
} from "@/components/molecules/DividerLine/page";
import HeadlineCard from "@/components/molecules/HeadlineCard/page";
import Link from "next/link";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface HeroSlideNew {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
  url: string;
}

interface Props {
  title: string;
  titleAlignment?: DividerLineAlignmet;
}

const heroSlides: HeroSlideNew[] = [
  {
    image: "/images/destination.png",
    title: "Destination Highlights",
    subtitle:
      "Explore Nigeria's iconic landmarks and hidden treasures Explore Nigeria's iconic landmarks and hidden treasures Explore Nigeria's iconic landmarks and hidden treasures Explore Nigeria's iconic landmarks and hidden treasures Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image: "/images/calabar.png",
    title: "Luxury Experiences",
    subtitle: "Indulge in premium travel and accommodation",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },

  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&q=80",
    title: "Luxury Experiences",
    subtitle: "Indulge in premium travel and accommodation",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
    url: "./explore-nigeria-iconic",
  },
];

const firstHeroSlides = heroSlides.slice(0, 12);

const ThreeCardDisplay = ({ title, titleAlignment = "left" }: Props) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardContainerRef.current) {
      const boxes: HTMLCollection[] = gsap.utils.toArray(
        cardContainerRef.current?.children
      );

      boxes.forEach((box, index) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50, x: 50 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 90%",
              end: "bottom 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <>
      <DividerLine title={title} alignment={titleAlignment} />
      <section
        ref={cardContainerRef}
        className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16"
      >
        {firstHeroSlides.map((slide, index) => (
          <HeadlineCard
            key={index}
            src={slide.image}
            alt={slide.alt}
            headline={slide.title}
            desc={slide.subtitle}
            url={slide.url}
          />
        ))}
      </section>
      {heroSlides.length > 12 ? (
        <Link href="/full?cat=memories&sub=features">
          <p className="text-right text-2xl my-12 hover:font-bold ">
            Read More
          </p>
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default ThreeCardDisplay;
