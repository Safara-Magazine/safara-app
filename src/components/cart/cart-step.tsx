'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CartStep() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getDiscount,
    discountCode,
    setDiscountCode,
    applyDiscount,
    nextStep,
  } = useCartStore();

  const [localDiscountCode, setLocalDiscountCode] = useState(discountCode);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    if (localDiscountCode.trim()) {
      applyDiscount(localDiscountCode);
    }
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-24 h-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Add some items to get started</p>
        <Link
          href="/store"
          className="px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Product Details Table Header */}
      <div className="grid grid-cols-12 gap-4 pb-4 border-b font-medium text-sm text-gray-700">
        <div className="col-span-6">Product Details</div>
        <div className="col-span-3 text-center">Quantity</div>
        <div className="col-span-3 text-right">Price</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 py-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 items-center pb-4 border-b last:border-0"
          >
            {/* Product Info */}
            <div className="col-span-6 flex items-start gap-3">
              <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  {item.color && <span>Colour: {item.color}</span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="col-span-3 flex items-center justify-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Price & Remove */}
            <div className="flex-col-reverse col-span-3 col-reverse flex items-end justify-end gap-3 text-right">
              <span className="font-semibold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 transition-colors text-xs"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className="mt-6 pb-6 border-b">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount code <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Insert code"
            value={localDiscountCode}
            onChange={(e) => setLocalDiscountCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
          />
          <button
            onClick={handleApplyDiscount}
            className="px-6 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600 mt-2">
            ✓ Discount code "{discountCode}" applied!
          </p>
        )}
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Cart</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <a
          href="/"
          className="flex-1 px-6 py-3 border-2 border-[#B59157] text-[#B59157] rounded-md hover:bg-[#B59157] hover:text-white transition-colors text-center font-medium"
        >
          Back to home
        </a>
        <button
          onClick={nextStep}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity font-medium"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}