"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useCartStore } from "@/store/cartStore";
import { allProductsMap } from "../../components/store-components/products";
import StoreNavigation from "@/components/layout/Header/StoreNavBar";
import { HeartIcon } from "lucide-react";

export default function FavouritesPage() {
  const { favorites, _hasHydrated, toggleFavorite } = useFavoritesStore();
  const { addToCart, _hasHydrated: cartHydrated } = useCartStore();

  const favouriteItems = favorites
    .map((id) => allProductsMap[id])
    .filter(Boolean);

  const handleAddToCart = (productId: string) => {
    const product = allProductsMap[productId];
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[₦,]/g, ""), 10),
      image: product.image,
      category: product.category,
    });
  };

  // Hydration guard
  if (!_hasHydrated || !cartHydrated) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 items-center pb-4 border-b"
            >
              <div className="col-span-6 flex items-center gap-3">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0" />
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-gray-100 rounded" />
                  <div className="h-2.5 w-20 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="col-span-3 flex justify-center">
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
              <div className="col-span-3 flex justify-end">
                <div className="h-8 w-28 bg-gray-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // empty state
  if (favouriteItems.length === 0) {
    return (
      <>
        <StoreNavigation />
        <div className="flex mt-14 flex-col items-center justify-center py-16">
          <div className="text-gray-400 mb-4">
            <HeartIcon className="w-24 h-24" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No favourites yet
          </h3>
          <p className="text-gray-500 mb-6">
            Items added to favourites will show up here
          </p>
          <Link
            href="/store"
            className="px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Browse Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <StoreNavigation />

      {/* breadcrumbs */}
       <div className="flex gap-2 mt-25 pl-[50px] max-w-6xl mx-auto py-4  font-bold items-center  text-[18px] text-[#767572]">
          <Link href="/">Home</Link>
          <span>&gt;&gt;</span>
          <span className="text-[#2F1C32] font-medium">Favorites</span>
        </div>

      <div className="max-w-6xl  mx-auto  py-8">
        {/* Table header 
        <div className="grid grid-cols-12 gap-4 pb-4 border-b font-medium text-sm text-gray-700">
          <div className="col-span-6">Product Details</div>
          <div className="col-span-3 text-center">Price</div>
          <div className="col-span-3 text-right"></div>
        </div> */}

        {/* Favourite items */}
        <div className="space-y-4 py-6">
          {favouriteItems.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-12 gap-4 items-center pb-4 border-b last:border-0"
            >
              {/* Product info */}
              <div className="col-span-6 flex items-start gap-3">
                <Link href={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* ii */}
                <div className="flex flex-col justify-between border border-red-300 h-full">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 truncate hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-3 flex justify-center">
                <span className="font-semibold text-gray-900">
                  {product.price}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-3 flex flex-col items-end gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="px-4 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="text-red-500 hover:text-red-600 transition-colors text-xs"
                  aria-label="Remove from favourites"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons  */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="flex-1 px-6 py-3 border-2 border-[#B59157] text-[#B59157] rounded-md hover:bg-[#B59157] hover:text-white transition-colors text-center font-medium"
          >
            Back to home
          </Link>
          <Link
            href="/store"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity font-medium text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
