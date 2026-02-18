'use client';

import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string; 
    image: string;
    category?: string;
    color?: string;
    size?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({ 
  product, 
  className = `
    text-white 
    px-3 py-2 
    sm:px-4 sm:py-2 
    md:px-5 md:py-3 
    rounded-sm 
    text-[10px] sm:text-[12px] md:text-[14px] 
    hover:bg-opacity-80 
    transition-transform duration-300 
    hover:scale-105 
    cursor-pointer 
    bg-gradient-to-r from-[#B59157] to-[#EBB659]
  `,
  children = "Add to Cart"
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      category: product.category,
      color: product.color,
      size: product.size || "One Size",
    });

    toast.success(`${product.name} added to cart!`, {
      description: product.price,
      duration: 2000,
    });
  };

  return (
    <button onClick={handleAddToCart} className={className}>
      {children}
    </button>
  );
}
