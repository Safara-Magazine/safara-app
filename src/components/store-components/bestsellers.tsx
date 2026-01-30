import React from "react";
import products from "./products";
import Link from "next/link";

export default function BestSellers() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-bold text-gray-800">
            SHOP OUR BEST SELLERS
          </h2>

          {/* to be revisited, i think */}
          <Link
            href="/products"
            className="text-[#A67F3B] font-semibold text-[20px] hover:opacity-80 transition-opacity"
          >
            See All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer ">
              {/* Product Image */}
              <div
                className="h-[365px] relative mb-4 rounded-lg overflow-hidden bg-cover bg-center hover:scale-105  duration-300 "
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <button className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 18s-8-5.5-8-10a4 4 0 0 1 8-3 4 4 0 0 1 8 3c0 4.5-8 10-8 10z"
                      stroke="#333"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-[16px] text-[#6A6661] font-semibold mb-1">{product.category}</p>
                <h3 className="text-[18px] font-bold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-base font-semibold text-gray-800">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// export default BestSellers;
