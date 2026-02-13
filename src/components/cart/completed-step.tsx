'use client';

import { useCartStore } from '@/store/cartStore';
import { CheckCircle2} from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from './step-indicator';
import Link from 'next/link';
export default function CompleteStep() {
  const { clearCart, resetCheckout, deliveryInfo, getTotal } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    // Optional: Clear cart after successful order
    // Uncomment if you want to clear the cart immediately
    // clearCart();
  }, []);

  const handleContinueShopping = () => {
    // Clear cart and reset checkout state
    clearCart();
    resetCheckout();
    router.push('/store');
  };

  // no page for this atm
  const handleViewOrders = () => {
  
    clearCart();
    resetCheckout();
  
    router.push('/orders');
  };

  return (
    <>
   {/* breadcrumb */}

        <div className="flex max-w-6xl mx-auto gap-2 mt-30 items-center  text-[16px] text-[#767572]">
          <Link href="/">Home</Link>
          <span>&gt;&gt;</span>
          <Link href="/store">Store</Link>
          <span>&gt;&gt;</span>
          <Link href="/categories">Categories</Link>
          <span>&gt;&gt;</span>
          <Link href="/apparel">Apparel</Link>
          <span>&gt;&gt;</span>
          <Link href="/totebags">Tote Bags</Link>
          <span>&gt;&gt;</span>
          <Link href="/safara-tote-bag">Safara Tote Bag</Link>
          <span>&gt;&gt;</span>
          <span className="text-[#2F1C32] font-medium">Cart</span>
        </div>

    <div className='-pt-25'>
    <StepIndicator currentStep={4} />
    </div>
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-12">
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Order Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Done! Your order is now being prepared for delivery.
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Total:</span>
              <span className="font-semibold text-gray-900">
                ₦{getTotal().toLocaleString()}
              </span>
            </div>
            {deliveryInfo && (
              <>
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">Delivery Address:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {deliveryInfo.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {deliveryInfo.streetAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    {deliveryInfo.city}, {deliveryInfo.country}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {deliveryInfo.phone}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md">
          <p className="text-sm text-blue-800 text-center">
             A confirmation email has been sent to{' '}
            <span className="font-semibold">{deliveryInfo?.email}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleViewOrders}
            className="flex-1 px-6 py-3 border-2 border-[#B59157] text-[#B59157] rounded-md hover:bg-[#B59157] hover:text-white transition-colors font-medium"
          >
            View Orders
          </button>
          <button
            onClick={handleContinueShopping}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@safara.com" className="text-[#B59157] hover:underline">
              support@safara.com
            </a>
          </p>
        </div>
      </div>
    </div>
            </>
  );
}