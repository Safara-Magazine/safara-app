"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function FavoritesIndicator() {
  const count = useFavoritesStore((s) => s.favorites.length);
  const hasHydrated = useFavoritesStore((s) => s._hasHydrated);

  // Wait for hydration
  if (!hasHydrated) {
    return (
      <div className="relative">
        <Heart className="w-6 h-6 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Heart
        className={`w-6 h-6 ${
          count > 0 ? "text-gray-700" : "text-gray-700"
        }`}
      />

      {count > 0 && (
        <span className="absolute -top-3 -right-3 bg-[#422746] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}