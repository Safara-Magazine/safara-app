'use client';

import { useState } from 'react';
import { ShoppingCart, Loader } from 'lucide-react';
import { useProducts } from '@/auth/hooks/useProductQueries';
import CheckoutModal from '@/components/CheckoutModal';
import { type Product } from '@/lib/services/productService';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { data: products = [], isLoading, error } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleBuyNow = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    setSelectedProduct(product);
    setSelectedQuantity(quantity);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    setSelectedQuantity(1);
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B59157] to-[#EBB659] rounded-lg p-6 md:p-8 text-white">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-base md:text-lg opacity-90">
          Browse and purchase from our exclusive collection of products
        </p>
      </div>

      {/* Search */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#B59157] transition text-sm md:text-base"
        />
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader className="w-8 h-8 text-[#B59157] animate-spin" />
        </div>
      ) : error ? (
        <div className="p-12 text-center">
          <p className="text-red-600 font-medium">Error loading products</p>
          <p className="text-gray-600 text-sm mt-1">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-600">
            {products.length === 0 ? 'No products available yet.' : 'No products match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-64 bg-gray-200 overflow-hidden">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-[#B59157] transition line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mt-2">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="py-3 border-t border-gray-200">
                  <p className="text-xl md:text-2xl font-bold text-[#B59157]">
                    ₦{product.amount?.toLocaleString()}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Stock: {product.quantity} available
                  </p>
                </div>

                {/* Quantity Selector */}
                {product.quantity > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-bold text-sm md:text-base">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                        disabled={(quantities[product.id] || 1) >= product.quantity}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center text-sm font-bold disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Buy Button */}
                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={product.quantity <= 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 md:py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base mt-auto"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.quantity <= 0 ? 'Out of Stock' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        product={selectedProduct}
        quantity={selectedQuantity}
        onClose={closeCheckout}
      />
    </div>
  );
}
