'use client';

import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function PaymentStep() {
  const { nextStep, getTotal, deliveryInfo } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate payment gateway redirect/processing
    // In production, this is where you'd integrate with Paystack, Flutterwave, etc.
    const timer = setTimeout(() => {
      // For demo purposes, we'll automatically proceed to complete step
      // In production, this would be handled by payment gateway callback
      handlePaymentSuccess();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePaymentSuccess = () => {
    setIsProcessing(false);
    nextStep();
  };

  // In a real implementation, you would:
  // 1. Initialize payment with your gateway (Paystack, Flutterwave, etc.)
  // 2. Redirect user to payment page or show embedded form
  // 3. Handle callback/webhook
  // 4. Verify payment
  // 5. Move to next step

  /* Example Paystack Integration (commented out):
  
  useEffect(() => {
    const handler = PaystackPop.setup({
      key: 'your-public-key',
      email: deliveryInfo?.email || '',
      amount: getTotal() * 100, // Amount in kobo
      currency: 'NGN',
      ref: 'safara_' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function(response) {
        // Payment complete! Reference: response.reference
        nextStep();
      },
      onClose: function() {
        // User closed payment modal
        alert('Payment cancelled');
      }
    });
    
    handler.openIframe();
  }, []);
  
  */

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="mb-6">
            <Loader2 className="w-16 h-16 text-[#B59157] animate-spin mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-600 mb-8">
            You are being redirected to payment. Please wait...
          </p>

          {/* Payment Info Card */}
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount to pay:</span>
                <span className="font-semibold text-gray-900">
                  ₦{getTotal().toLocaleString()}
                </span>
              </div>
              {deliveryInfo && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">
                      {deliveryInfo.email}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">
                      {deliveryInfo.phone}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            <p>Your payment is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}