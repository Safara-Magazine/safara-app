"use client";
import AddToCartButton from "@/components/cart/add-to-cart";
import HeartButton from "@/components/product-view/heart-btn";
import { useMergedProducts } from "../../auth/hooks/useProductQueries";
import { getProductsByCategory } from "@/components/store-components/products";
import Link from "next/link";
import Image from "next/image";

export default function StationaryCategories() {
  const { data: mergedProducts = [], isLoading, isError } = useMergedProducts();

  const stationeryProducts = getProductsByCategory(
    mergedProducts,
    "STATIONERY",
  );
  // console.log(stationeryProducts);

  return (
    <>
      <main className="md:px-20 px-5 md:pt-10 pt-5">
        <div className="flex flex-col space-y-4 py-4"></div>

        <div className="flex  justify-between items-center md:mb-8">
          <h2 className="hidden md:block text-[20px] font-bold text-gray-800">
            STATIONERY
          </h2>

          {/* // TODO: add link to see all stationery products */}
          <Link
            href="/products"
            className="text-[#A67F3B] hidden md:block font-semibold text-[20px] hover:opacity-80 transition-opacity"
          >
            See All
          </Link>
        </div>

        {/* sm - thingy here */}
        <div className="bg-gradient-to-l   from-[#B59157] to-[#EBB659] block md:hidden my-8 flex py-2 px-4 w-full justify-between rounded-md">
          <h2 className="block md:hidden text-[20px] font-bold text-white">
            STATIONERY
          </h2>

          <Link
            href="/products"
            className=" block md:hidden text-white  font-semibold text-[20px] hover:opacity-80 transition-opacity"
          >
            View More
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-[20px] border overflow-hidden animate-pulse"
              >
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
        {stationeryProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* just display first 4 abeg */}
            {stationeryProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="cursor-pointer rounded-[20px] border overflow-hidden"
              >
                <Link href={`/store-product/${product.id}`} className="block">
                  {/* Product Image */}
                  <div className="relative group mb-4 rounded-lg overflow-hidden">
                    <div className="absolute h-10 top-3 left-3 z-10 p-2 items-center bg-white rounded-md shadow-md">
                      <HeartButton productId={product.id} size={23} />
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
      </main>
    </>
  );
}
