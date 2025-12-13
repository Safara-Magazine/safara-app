'use client';

import { useState } from 'react';
import { X, AlertCircle, Loader } from 'lucide-react';
import { useInitializeOrder } from '@/auth/hooks/useOrderQueries';
import { type Product } from '@/lib/services/productService';

interface CheckoutModalProps {
  isOpen: boolean;
  product: Product | null;
  quantity: number;
  onClose: () => void;
}

export default function CheckoutModal({
  isOpen,
  product,
  quantity,
  onClose,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    customerName: '',
    phone: '',
  });
  const [error, setError] = useState<string>('');
  const { mutate: initializeOrder, isPending } = useInitializeOrder();

  const totalAmount = product ? product.amount * quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!formData.customerName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!product) {
      setError('Product not found');
      return;
    }

    initializeOrder({
      email: formData.email,
      customerName: formData.customerName,
      phone: formData.phone,
      items: [
        {
          productId: product.id,
          quantity: quantity,
        },
      ],
    });
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isPending}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{product.title}</span>
              <span className="font-medium">×{quantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-[#B59157]">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              disabled={isPending}
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              disabled={isPending}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 801 234 5678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              disabled={isPending}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && <Loader className="w-4 h-4 animate-spin" />}
            {isPending ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
