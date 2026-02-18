"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useCartStore } from "@/store/cartStore";
import { allProductsMap, relatedProducts } from "../../components/store-components/products";
import StoreNavigation from "@/components/layout/Header/StoreNavBar";
import { HeartIcon } from "lucide-react";
import HeartButton from "@/components/product-view/heart-btn";
import AddToCartButton from "@/components/cart/add-to-cart";
import RelatedProducts from "@/components/product-view/related-products";

export default function FavouritesPage() {
  const { favorites, _hasHydrated, toggleFavorite } = useFavoritesStore();
  const { addToCart, _hasHydrated: cartHydrated } = useCartStore();

  const favouriteItems = favorites
    .map((id) => allProductsMap[id])
    .filter(Boolean);

  const getUniqueRandomProducts = (products: typeof relatedProducts, count: number) => {
  // Remove duplicates first
  const uniqueProducts = products.filter((product, index, self) => 
    index === self.findIndex((p) => p.id === product.id)
  );
  
  // Then shuffle
  const shuffled = [...uniqueProducts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const related = getUniqueRandomProducts(relatedProducts, 3);
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
      <div className="flex gap-2 mt-24 sm:mt-30 pl-4 sm:pl-[50px] max-w-6xl mx-auto items-center text-[#767572]">
        <Link className="text-[16px]" href="/">Home</Link>
        <span>&gt;&gt;</span>
        <span className="text-[#2F1C32] font-bold text-[18px]">Favorites</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Favourite items */}
        <div className="space-y-4 py-6 border border-[#827F7B] rounded-md max-w-6xl">
          {favouriteItems.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:grid sm:grid-cols-12 mr-3 gap-3 sm:gap-4 items-start sm:items-center pb-4 border-b last:border-0 px-3 sm:px-0"
            >

              {/* Mobile: top row with heart + product info */}
              <div className="flex w-full sm:contents gap-3 items-start">

                {/* heart-btn */}
                <HeartButton className="ml-0 sm:ml-3 mt-1 flex-shrink-0" productId={product.id} size={24} />

                {/* Product info */}
                <div className="col-span-5 flex h-full gap-3 flex-1">
                  <Link href={`/store-product/${product.id}`} className="flex-shrink-0">
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
                  <div className="flex flex-col justify-between py-2 h-full">
                    <Link href={`/store-product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 truncate hover:underline">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex gap-4 text-[#6A6661] text-[18px]">
                      <p className="text-xs text-gray-500 mt-1">
                        Color: {product.colors}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {product.sizes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: bottom row with price + add to cart */}
              <div className="flex w-full sm:contents items-center justify-between pl-[calc(24px+0.75rem+0.75rem)] sm:pl-0">

                {/* Price */}
                <div className="sm:col-span-3 sm:flex sm:justify-center">
                  <span className="font-semibold text-gray-900">
                    {product.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="sm:col-span-3 sm:flex sm:flex-col sm:items-end sm:gap-2">
                  <AddToCartButton product={product} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Action buttons  */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
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


      {/* related products */}
      <div className="mt-13 mb-3 max-w-6xl mx-auto px-4 py-8">
      <RelatedProducts products={related} />

      </div>
    </>
  );
}