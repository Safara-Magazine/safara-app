// Component includes image with text at the bottom

import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  alt: string;
  headline: string;
  desc: string;
  className?: string;
}

const HeadlineCard = ({ src, headline, desc, alt, className }: Props) => {
  return (
    <figure className="flex flex-col gap-4 my-2">
      <Image
        width={450}
        height={420}
        src={src}
        alt={alt}
        className={clsx(
          "rounded-2xl object-cover h-[420px]  w-full ",
          className
        )}
      />
      <figcaption>
        <h2 className="text-center cursor-pointer font-semibold text-2xl">
          {headline.toUpperCase()}
        </h2>
        <p className="text-center ">{desc}</p>
      </figcaption>
    </figure>
  );
};

export default HeadlineCard;
