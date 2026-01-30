import React from "react";
import {products} from "./products";
import Link from "next/link";
import { Heart } from "lucide-react";

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
            <div key={product.id} className="group cursor-pointer h-[508px] rounded-[20px] border overflow-hidden">
              {/* Product Image */}
              <div
                className="h-[365px] relative mb-4 rounded-lg overflow-hidden bg-cover bg-center hover:scale-105 transition duration-300"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <button className="absolute top-3 left-3 z-10 p-2 bg-white rounded-md  shadow-md hover:bg-gray-50 transition-colors ">
                  <Heart className="text-gray-800 w-5 h-5 hover:scale-105  duration-300 " />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-[10px]">
                <p className="text-[16px] text-[#6A6661] font-semibold  mb-1">{product.category}</p>
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


