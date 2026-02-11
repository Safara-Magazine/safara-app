'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductII } from '@/components/store-components/products';
import HeartButton from './heart-btn';
import Stars from './stars';
import { AccordionItem } from './accordion';

interface ProductInfoProps {
  product: ProductII;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(true);

  const maxBar = Math.max(...Object.values(product.ratingBreakdown));

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2200);
  };

  return (
    <div className="flex flex-col">
      {/* category */}
      <div className='flex justify-between items-center py-4'>
      <p className="mb-1 border text-[16px] border-neutral-400 w-[127px] text-center rounded-full  font-semibold uppercase tracking-widest text-neutral-400">
        {product.category}
      </p>

      <HeartButton productId={product.id} className=" flex-shrink-0" size={22} />
      </div>

      {/* Name */}
      <div className="mb-1.5 flex items-start justify-between gap-4">
        <h1 className=" text-[28px] font-bold leading-tight text-neutral-900">
          {product.name}
        </h1>
        
      </div>

      {/* Price */}
      <p className="mb-5 text-[32px] font-semibold tracking-tight text-neutral-900">
        {product.price}
      </p>

      {/* Description accordion */}
      <div className="border border-neutral-200 rounded-md">
        <AccordionItem  title="Description" defaultOpen>
          {product.description}
        </AccordionItem>
      </div>

      {/* Size */}
      <div className="mt-5">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'h-9 w-9 rounded border text-xs font-medium transition-colors duration-150',
                selectedSize === size
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div className="mt-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
          Colour
        </p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                'rounded border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150',
                selectedColor === color
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={cn(
          'mt-5 w-full rounded py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200',
          cartAdded
            ? 'bg-emerald-600 scale-[.99]'
            : 'bg-amber-500 hover:bg-amber-600 active:scale-[.99]'
        )}
      >
        {cartAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </button>

      {/* Delivery + Shipping */}
      <div className="mt-5 border-t border-neutral-200">
        <AccordionItem title="Delivery" defaultOpen>
          <div className="space-y-1">
            <p>
              Lagos –{' '}
              <span className="font-semibold text-neutral-800">{product.delivery.lagos}</span>
            </p>
            <p>
              Outside Lagos –{' '}
              <span className="font-semibold text-neutral-800">{product.delivery.outside}</span>
            </p>
          </div>
        </AccordionItem>
        <AccordionItem title="Shipping" defaultOpen>
          {product.shipping}
        </AccordionItem>
      </div>

      {/* ── RATINGS ── */}
      <div className="mt-10">
        <h2 className="mb-4 font-serif text-xl font-medium text-neutral-900">Ratings</h2>
        <div className="flex items-start gap-8">
          {/* Big number */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-5xl font-light leading-none text-neutral-900">
              {product.rating}
            </span>
            <span className="mt-1 text-xs text-neutral-400">/5</span>
          </div>

          {/* Bars */}
          <div className="flex flex-1 flex-col gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-2.5">
                <span className="text-xs text-amber-400">★</span>
                <span className="w-2 text-right text-xs text-neutral-400">{n}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-700"
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
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-800">
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
                <p className="mb-1 text-[13px] font-semibold text-neutral-900">{review.name}</p>
                <Stars count={review.stars} />
                <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}