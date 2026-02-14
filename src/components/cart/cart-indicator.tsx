"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartIndicator() {
  const count = useCartStore((s) => s.getTotalItems());
  const hasHydrated = useCartStore((s) => s._hasHydrated);

  // Wait for hydration to prevent mismatch
  if (!hasHydrated) {
    return (
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <ShoppingCart
        className={`w-6 h-6 ${
          count > 0 ? "text-gray-900" : "text-gray-700"
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