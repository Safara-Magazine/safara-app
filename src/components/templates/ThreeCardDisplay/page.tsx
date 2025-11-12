"use client";

import DividerLine, {
  DividerLineAlignmet,
} from "@/components/molecules/DividerLine/page";
import HeadlineCard from "@/components/molecules/HeadlineCard/page";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
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
  paginationPresent?: boolean;
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

const ThreeCardDisplay = ({
  title,
  titleAlignment = "left",
  paginationPresent = true,
}: Props) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(heroSlides.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return heroSlides.slice(start, start + itemsPerPage);
  }, [currentPage]);

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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <DividerLine title={title} alignment={titleAlignment} />

      <section
        ref={cardContainerRef}
        className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16"
      >
        {!paginationPresent &&
          firstHeroSlides.map((slide, index) => (
            <HeadlineCard
              key={index}
              src={slide.image}
              alt={slide.alt}
              headline={slide.title}
              desc={slide.subtitle}
              url={slide.url}
            />
          ))}

        {paginationPresent &&
          currentItems.map((slide, index) => (
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

      {!paginationPresent && heroSlides.length > 12 ? (
        <Link href="/full?cat=memories&sub=features" className="my-12 block">
          {" "}
          <p className="text-right text-2xl hover:font-bold ">
            {" "}
            Read More{" "}
          </p>{" "}
        </Link>
      ) : (
        ""
      )}

      {paginationPresent && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* First and Prev */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            «
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, i, arr) => (
              <React.Fragment key={page}>
                {i > 0 && arr[i - 1] !== page - 1 && (
                  <span className="px-1">…</span>
                )}
                <button
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          {/* Next and Last */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            ›
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
          >
            »
          </button>

          {/* Page dropdown */}
          <div className="ml-4 flex items-center text-gray-600">
            Page
            <select
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="mx-2 border rounded px-2 py-1"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            of {totalPages}
          </div>
        </div>
      )}
    </>
  );
};

export default ThreeCardDisplay;
