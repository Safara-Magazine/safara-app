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
  

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2200);
  };

  return (
    <div className="flex flex-col">
      {/* category */}
      <div className='flex justify-between items-center py-4'>
      <p className="mb-1 border text-[12px] border-neutral-400 px-2 py-1  text-center rounded-full  font-semibold uppercase tracking-widest text-neutral-400">
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
      <div className="border border-neutral-200 p-2 my-4 rounded-md">
        <AccordionItem  title="Description" defaultOpen>
          {product.description}
        </AccordionItem>
      </div>

      {/* Size */}
      <div className="mt-5 flex items-center gap-6">
        <p className=" text-[13px] font-semibold uppercase tracking-widest text-black">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'h-9 w-9 rounded border text-xs text-center font-medium transition-colors duration-150',
                selectedSize === size
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white px-2 text-neutral-800 hover:border-neutral-400'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div className="mt-5 flex items-center gap-6">
        <p className=" text-[13px] font-semibold uppercase tracking-widest text-black">
          Colour
        </p>
        <div className="flex flex-wrap items-center gap-2">
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
            : 'bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 active:scale-[.99]'
        )}
      >
        {cartAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </button>

      {/* Delivery + Shipping */}
      <div className="mt-5 border-t border-neutral-200">
        <AccordionItem title="Delivery" defaultOpen>
          <div className="space-y-2">
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


      
    </div>
  );
}