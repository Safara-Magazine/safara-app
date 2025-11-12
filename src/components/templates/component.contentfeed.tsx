"use client";

/* Displays content in a 3-card grid on desktop
 Can customise to include pagination controls or not
 Non paginated option includes the display of 12 cards and a read more button that 
 takes users to a page that displays(paginated) all the articles for that particular section

*/

import DividerLine, {
  DividerLineAlignmet,
} from "@/components/molecules/DividerLine/page";
import HeadlineCard from "@/components/molecules/HeadlineCard/page";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

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
  numItemsDisplayed?: number;
  cardContainerStyles?: string;
  dividerLineStyles?: string;
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

const ContentFeedDisplay = ({
  title,
  titleAlignment = "left",
  paginationPresent = false,
  numItemsDisplayed = 12,
  cardContainerStyles,
  dividerLineStyles,
}: Props) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const firstHeroSlides = heroSlides.slice(0, numItemsDisplayed);

  // Animation

  useGSAP(() => {
    if (!cardContainerRef.current) return;

    const allCards = gsap.utils.toArray<HTMLElement>(
      cardContainerRef.current.children
    );

    const rows = [];
    for (let i = 0; i < allCards.length; i += 4) {
      rows.push(allCards.slice(i, i + 4));
    }

    console.log(rows);

    rows.forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: row[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Pagination logic
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(heroSlides.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return heroSlides.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <DividerLine
        title={title}
        alignment={titleAlignment}
        styling={dividerLineStyles}
      />

      <section
        ref={cardContainerRef}
        className={clsx(
          "grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16",
          cardContainerStyles
        )}
      >
        {/* Displays only the number of cards specified in numOfItemsDisplayed */}
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

        {/* Displays all the data it fetches */}
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

      {/* Activated only when all the data fetched is greater than the default number set(12) */}
      {!paginationPresent && heroSlides.length > numItemsDisplayed ? (
        <Link
          href="/full?cat=memories&sub=features"
          className="my-12 text-right block"
        >
          <p className="relative inline-block text-[#d4af8f] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#d4af8f] after:transition-all after:duration-300 hover:after:w-full">
            Read More
          </p>
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
                      ? "bg-[#4a2c5e] text-white"
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

export default ContentFeedDisplay;
