// Component includes image with text at the bottom

"use client";

import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

interface Props {
  src: string;
  alt: string;
  headline: string;
  desc: string;
  url: string;
  className?: string;
}

const HeadlineCard = ({ src, headline, desc, alt, className, url }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  const handleMouseImageEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.125,
        duration: 0.75,
        ease: "ease-in",
      });
    }
  };
  const handleMouseImageLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.75,
        ease: "ease.out",
      });
    }
  };

  const handleMouseTextEnter = () => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -2,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };
  const handleMouseTextLeave = () => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 0,
        ease: "power3.out",
      });
    }
  };

  return (
    <figure className="flex flex-col gap-6 my-2 cursor-pointer">
      <Link
        href={`/article/${url}`}
        onMouseEnter={handleMouseImageEnter}
        onMouseLeave={handleMouseImageLeave}
      >
        <div className="overflow-hidden w-full rounded-2xl">
          <Image
            width={450}
            height={420}
            ref={imageRef}
            src={src}
            alt={alt}
            className={clsx("object-cover h-[420px] w-full", className)}
          />
        </div>
      </Link>
      <figcaption>
        <Link href={`/article/${url}`}>
          <h2
            className="relative text-center font-semibold text-2xl mb-1.5 will-change-transform"
            ref={titleRef}
            onMouseEnter={handleMouseTextEnter}
            onMouseLeave={handleMouseTextLeave}
          >
            {headline.toUpperCase()}
          </h2>
        </Link>
        <p className="text-center line-clamp-2">{desc}</p>
      </figcaption>
    </figure>
  );
};
export default HeadlineCard;
