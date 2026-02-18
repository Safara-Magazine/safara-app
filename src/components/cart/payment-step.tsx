'use client';

import { useCartStore } from '@/store/cartStore';
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useInitializeOrder } from '../../auth/hooks/useOrderQueries'; 
import { toast } from 'sonner';


// Normalize Nigerian numbers to international format
const normalizePhone = (phone: string) => {
  let cleaned = phone.replace(/\s+/g, '');

  // If user entered 080...
  if (cleaned.startsWith('0')) {
    cleaned = '+234' + cleaned.slice(1);
  }

  // If user entered 234...
  else if (cleaned.startsWith('234') && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }

  // If already correct (+234...) leave it alone

  return cleaned;
};

export default function PaymentStep() {
  const { deliveryInfo, items, getTotal } = useCartStore();

  const hasStarted = useRef(false); 
  const initializeOrderMutation = useInitializeOrder();

 useEffect(() => {
  if (hasStarted.current) return;
  hasStarted.current = true;

  if (!deliveryInfo) {
    toast.error('Missing delivery information');
    return;
  }

  if (!items.length) {
    toast.error('Your cart is empty');
    return;
  }

  // ✅ Add this log BEFORE calling mutate
  const payload = {
    email: deliveryInfo.email,
    customerName: deliveryInfo.fullName,
    phone: normalizePhone(deliveryInfo.phone),
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };
  console.log('[PaymentStep] Payment payload:', payload);

  initializeOrderMutation.mutate(payload);
}, [deliveryInfo, items, initializeOrderMutation]);

  // Handle mutation error UI fallback
  useEffect(() => {
    if (initializeOrderMutation.isError) {
      console.error('Payment initialization failed:', initializeOrderMutation.error);
      toast.error('Unable to start payment. Please try again.');
    }
  }, [initializeOrderMutation.isError, initializeOrderMutation.error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Loader2 className="w-16 h-16 text-[#B59157] animate-spin mb-6" />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Redirecting to Secure Payment
        </h2>

        <p className="text-gray-600 mb-6">
          Please wait while we connect you to the payment gateway...
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-xl font-semibold">
            ₦{getTotal().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
