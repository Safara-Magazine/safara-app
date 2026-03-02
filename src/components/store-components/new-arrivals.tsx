'use client';

import Link from "next/link";
import Image from "next/image";
import HeartButton from "../product-view/heart-btn";
import AddToCartButton from "../cart/add-to-cart";
import { useMergedProducts } from "@/auth/hooks/useProductQueries";

export default function NewArrivals() {
  const { data: products, isLoading, isError } = useMergedProducts();

  return (
    <section id="new" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-bold text-gray-800">NEW IN</h2>
          <Link
            href="/products"
            className="text-[#A67F3B] font-semibold text-[20px] hover:opacity-80 transition-opacity"
          >
            View more
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-[24px] overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-[10px] space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-center text-sm text-red-400 py-10">
            Failed to load products. Please try again later.
          </p>
        )}

        {/* Products Grid */}
        {products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(4, 9).map((product) => (
              <div key={product.id} className="cursor-pointer border rounded-[24px]">
                <Link href={`/store-product/${product.id}`} className="block">
                  {/* Product Image */}
                  <div className="relative group mb-4 rounded-lg overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 p-2 bg-white rounded-md items-center flex shadow-md">
                      <HeartButton productId={product.id} size={20} />
                    </div>

                    <div className="relative h-64 w-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-[10px]">
                    <p className="text-[16px] text-[#6A6661] font-semibold mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-[18px] font-bold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between py-3">
                      <p className="text-base font-semibold text-gray-800">
                        {product.price}
                      </p>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}