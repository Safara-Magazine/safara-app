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
  };
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({ 
  product, 
  className = "text-white md:px-4 md:py-2 px-2 py-1  rounded-sm md:text-[12px] text-[10px] hover:bg-opacity-80 transition-transform duration-300 hover:scale-105 cursor-pointer bg-gradient-to-r from-[#B59157] to-[#EBB659]",
  children = "Add to Cart"
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Extract numeric price from formatted string
    const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      category: product.category,
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