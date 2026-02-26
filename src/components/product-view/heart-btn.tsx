"use client";

import React, { forwardRef } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { toast } from "sonner";

interface HeartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string;
  size?: number;
}

const HeartButton = forwardRef<HTMLButtonElement, HeartButtonProps>(
  ({ productId, size = 24, className, onClick, ...props }, ref) => {
    const { toggleFavorite, isFavorite, _hasHydrated } = useFavoritesStore();
    const isLiked = isFavorite(productId);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const wasLiked = isLiked;
      toggleFavorite(productId);

      if (wasLiked) {
        toast("Removed from Favorites!");
      } else {
        toast("Added to Favorites!");
      }

      // allow Radix / parent handlers to still run
      onClick?.(e);
    };

    // Still render a button during hydration, BUT keep the ref + props!
    if (!_hasHydrated) {
      return (
        <button
          ref={ref}
          className={cn("transition-transform duration-150", className)}
          {...props}
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
        ref={ref}                // ✅ Radix attaches here
        onClick={handleClick}
        className={cn(
          "transition-transform duration-150 hover:scale-110 active:scale-95",
          className
        )}
        {...props}               // ✅ Radix events injected here
      >
        <Heart
          size={size}
          className={cn(
            "transition-colors duration-200",
            isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
          )}
        />
      </button>
    );
  }
);

HeartButton.displayName = "HeartButton";

export default HeartButton;