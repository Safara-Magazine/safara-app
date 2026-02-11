'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [fading, setFading] = useState(false);

  const switchImage = (idx: number) => {
    if (idx === selected) return;
    setFading(true);
    setTimeout(() => {
      setSelected(idx);
      setFading(false);
    }, 150);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#ece9e2]">
        <Image
          src={images[selected]}
          alt={productName}
          fill
          className={cn(
            'object-cover transition-opacity duration-150',
            fading ? 'opacity-0' : 'opacity-100'
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2.5">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => switchImage(i)}
            className={cn(
              'relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors duration-150',
              i === selected ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'
            )}
          >
            <Image
              src={src}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}