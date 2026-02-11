'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RelatedProduct } from '@/components/store-components/products';
import HeartButton from './heart-btn';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <p className="mb-4 text-[28px] font-semibold uppercase tracking-widest text-black">
        You might also like
      </p>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
        {products.map((item) => (
          <div key={item.id} className="group relative">
            <Link href={`/product/${item.id}`} className="block">
              {/* Image */}
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-350 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />

                {/* Heart */}
                <div className="absolute right-2 top-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <HeartButton productId={item.id} size={14} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                {item.tag}
              </p>
              <p className="mb-2 text-[13px] font-medium leading-snug text-neutral-900">
                {item.name}
              </p>
            </Link>

            {/* Price + Add to cart */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-semibold text-neutral-900">{item.price}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //  wire to cart store later
                }}
                className="rounded bg-amber-500 px-3 py-1.5 text-[11px] font-bold uppercase bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 active:scale-[.99]"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}