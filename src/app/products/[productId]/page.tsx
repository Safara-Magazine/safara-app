'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Loader, ShoppingCart } from 'lucide-react';
import CheckoutModal from '@/components/CheckoutModal';
import { getProductById, type Product } from '@/lib/services/productService';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('[ProductDetail] Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (quantity > 0 && product && quantity <= product.quantity) {
      setIsCheckoutOpen(true);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && (!product || newQuantity <= product.quantity)) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-[#B59157] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || 'Product not found'}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#B59157] text-white rounded-lg hover:bg-[#EBB659] transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = product.amount * quantity;
  const isOutOfStock = product.quantity <= 0;

  return (
    <div className="space-y-8 px-4 md:px-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-[#B59157] hover:text-[#EBB659] transition font-medium"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Products
      </Link>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden min-h-96">
          {product?.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400 w-full h-full">
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-[#B59157] to-[#EBB659] rounded-lg p-6 text-white">
            <p className="text-xs md:text-sm opacity-90 mb-1">Product Price</p>
            <p className="text-3xl md:text-4xl font-bold">
              ₦{product.amount?.toLocaleString()}
            </p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Stock Available</p>
              <p className={`text-2xl font-bold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                {product.quantity} {isOutOfStock ? '- Out of Stock' : 'items'}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Total Price */}
          {!isOutOfStock && (
            <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Amount</span>
              <span className="text-3xl font-bold text-[#B59157]">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
            </button>
            <Link
              href="/products"
              className="w-full text-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <p><span className="text-gray-600">Product ID:</span> {product.id}</p>
            <p><span className="text-gray-600">Created:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        product={product}
        quantity={quantity}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
