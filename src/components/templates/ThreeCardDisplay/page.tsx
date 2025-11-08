import DividerLine, {
  DividerLineAlignmet,
} from "@/components/molecules/DividerLine/page";
import HeadlineCard from "@/components/molecules/HeadlineCard/page";
import React from "react";

export interface HeroSlideNew {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

interface Props {
  title: string;
  titleAlignment?: DividerLineAlignmet;
}

const heroSlides: HeroSlideNew[] = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    title: "Destination Highlights",
    subtitle: "Explore Nigeria's iconic landmarks and hidden treasures",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&q=80",
    title: "Luxury Experiences",
    subtitle: "Indulge in premium travel and accommodation",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
    title: "Natural Wonders",
    subtitle: "Witness the beauty of untouched landscapes",
    alt: "Ocean sunset view",
  },
];

const ThreeCardDisplay = ({ title, titleAlignment = "left" }: Props) => {
  return (
    <>
      <DividerLine title={title} alignment={titleAlignment} />
      <section className="grid grid-cols-2 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroSlides.map((slide, index) => (
          <HeadlineCard
            key={index}
            src={slide.image}
            alt={slide.alt}
            headline={slide.title}
            desc={slide.subtitle}
          />
        ))}
      </section>
    </>
  );
};

export default ThreeCardDisplay;
