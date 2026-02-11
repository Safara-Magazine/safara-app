'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/favoritesStore';

interface HeartButtonProps {
  productId: string;
  size?: number;
  className?: string;
}

export default function HeartButton({ productId, size = 24, className }: HeartButtonProps) {
  const { toggleFavorite, isFavorite, _hasHydrated } = useFavoritesStore();
  const isLiked = isFavorite(productId);

  // Wait for store to hydrate
  if (!_hasHydrated) {
    return (
      <button
        aria-label="Add to favorites"
        className={cn("transition-transform duration-150", className)}
      >
        <Heart
          size={size}
          className="transition-colors duration-200 stroke-gray-400"
        />
      </button>
    );
  }

  return (
    <button
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
      className={cn("transition-transform duration-150 hover:scale-110 active:scale-95", className)}
    >
      <Heart
        size={size}
        className={cn(
          'transition-colors duration-200',
          isLiked
            ? 'fill-red-500 stroke-red-500'
            : 'stroke-gray-400'
        )}
      />
    </button>
  );
}