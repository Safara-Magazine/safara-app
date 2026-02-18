'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RelatedProduct } from '@/components/store-components/products';
import HeartButton from './heart-btn';
import AddToCartButton from '../cart/add-to-cart';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <p className="mb-4 text-[22px] sm:text-[26px] md:text-[28px] font-semibold uppercase tracking-widest text-black">
        You might also like
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div key={item.id} className="group relative">
            <Link href={`/store-product/${item.id}`} className="block">
              {/* Image */}
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Heart */}
                <div className="absolute right-2 top-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <HeartButton productId={item.id} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <p className="mb-0.5 text-[16px]  font-semibold uppercase tracking-widest text-neutral-400">
                {item.tag}
              </p>
              <p className="mb-2 text-[18px] font-medium leading-snug text-neutral-900">
                {item.name}
              </p>
            </Link>

            {/* Price + Add to cart */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-base font-semibold text-neutral-900">
                {item.price}
              </span>

              <AddToCartButton product={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
