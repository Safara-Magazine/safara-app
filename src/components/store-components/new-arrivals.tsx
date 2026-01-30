import { newProducts } from "./products";

export default function NewArrivals() {
  

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">NEW IN</h2>
          <a href="#more" className="text-amber-600 font-medium text-sm hover:opacity-80 transition-opacity">
            View more
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden">

                <button className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow-md">
                  <svg width="18" height="18" viewBox="0 0 20 20">
                    <path d="M10 18s-8-5.5-8-10a4 4 0 0 1 8-3 4 4 0 0 1 8 3c0 4.5-8 10-8 10z" 
                      fill="#e74c3c" stroke="#e74c3c" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </button>
                
               <div
  className="h-64 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-cover bg-center"
  style={{ backgroundImage: `url(${product.image})` }}
>
</div>


              </div>

              {/* Product Info */}
              <div>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-base font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-base font-semibold text-gray-800">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

