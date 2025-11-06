// Component includes image with text at the bottom

"use client";

import { useGSAP } from "@gsap/react";
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
  const textRef = useRef<HTMLDivElement>(null);


  const handleMouseEnter = () => {
    if (imageRef.current && textRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05, // zoom in
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(textRef.current, {
        y: -5, // subtle lift
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current && textRef.current) {
      gsap.to(imageRef.current, {
        scale: 1, // reset zoom
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(textRef.current, {
        y: 0, // reset position
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <figure
      className="flex flex-col gap-6 my-2 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={url}>
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
      <figcaption ref={textRef}>
        <h2 className="text-center font-semibold text-2xl">
          {headline.toUpperCase()}
        </h2>
        <p className="text-center">{desc}</p>
      </figcaption>
    </figure>
  );
};
export default HeadlineCard;
