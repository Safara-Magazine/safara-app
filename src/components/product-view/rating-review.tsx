'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductII } from '@/components/store-components/products';

import Stars from './stars';

      
 
interface ProductInfoProps {
  product: ProductII;
}

export default function RatingReview({ product }: ProductInfoProps) {
  const [reviewsOpen, setReviewsOpen] = useState(true);

  const maxBar = Math.max(...Object.values(product.ratingBreakdown));
  return (
   <>
          {/* ── RATINGS ── */}
      <div className="mt-10  w-full ">
        <h2 className="mb-4 text-[28px]  font-semibold text-black">Ratings</h2>
        <div className="flex items-start gap-8">

          {/* Big number */}
          <div className="flex items-baseline gap-1">
            <span className="text-[96px] font-light leading-none text-black">
              {product.rating}
            </span>
            <span className="mt-1 text-xl text-black">/5</span>
          </div>

          {/* Bars */}
          <div className="flex flex-1 flex-col gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-2.5">
                {/* no time for icons... */}
                <span className="text-xl text-[#D5A34C]">★</span>
                <span className="w-2 text-right text-l text-black">{n}</span>

                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-700"
                    style={{
                      width: `${Math.round(
                        ((product.ratingBreakdown[n] ?? 0) / maxBar) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <div className="mt-8 overflow-hidden rounded-lg border border-neutral-200">
        {/* Header toggle */}
        <button
          onClick={() => setReviewsOpen((o) => !o)}
          className="flex w-full items-center justify-between bg-white px-4 py-3.5"
        >
          <span className="text-[28px] font-semibold  tracking-widest text-black">
            Reviews
          </span>
          <ChevronDown
            size={16}
            className={cn(
              'text-neutral-400 transition-transform duration-250',
              reviewsOpen && 'rotate-180'
            )}
          />
        </button>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            reviewsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden divide-y divide-neutral-100 bg-white">
            {product.reviews.map((review, i) => (
              <div key={i} className="px-4 py-3.5">
                <p className="mb-1 text-[16px] font-bold text-neutral-900">{review.name}</p>

                <Stars count={review.stars} />

                <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

   </>
  )};
      
      