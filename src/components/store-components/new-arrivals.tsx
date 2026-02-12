import { newProducts } from "./products";
import Link from "next/link";
// import { Heart } from "lucide-react";
import HeartButton from "../product-view/heart-btn";
import AddToCartButton from "../cart/add-to-cart";

export default function NewArrivals() {
  return (
    <section id="new" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-bold text-gray-800">NEW IN</h2>

          {/* to be revisited as well */}
          <Link
            href="/products"
            className="text-[#A67F3B] font-semibold text-[20px] hover:opacity-80 transition-opacity"
          >
            View more
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
          {newProducts.map((product) => (
            <div key={product.id} className=" cursor-pointer border rounded-[24px]">

              <Link href={`/store-product/${product.id}`} className="block">
              {/* Product Image */}
              <div className="relative group mb-4 rounded-lg overflow-hidden">
                {/* i'll be back to integrate endpoints and state changes  */}

                <div className="absolute top-3 left-3 z-10 p-2 bg-white rounded-md items-center flex shadow-md">
                  

                  <HeartButton productId={product.id} size={20} />
                </div>

                <div
                  className="h-64 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
              </div>

              {/* Product Info */}
              <div className="p-[10px]">
                <p className="text-[16px] text-[#6A6661] font-semibold  mb-1">
                  {product.category}
                </p>

                <h3 className="text-[18px] font-bold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between py-3">
                <p className="text-base font-semibold text-gray-800">
                  {product.price}
                </p>

                {/* add to cart btn */}
                {/* <button className=" text-white px-4 py-2 rounded-sm text-sm hover:bg-opacity-80  transition-transform duration-300 hover:scale-105 cursor-pointer bg-gradient-to-r from-[#B59157] to-[#EBB659]">
                    Add to Cart
                </button> */}

                <AddToCartButton product={product} />
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
