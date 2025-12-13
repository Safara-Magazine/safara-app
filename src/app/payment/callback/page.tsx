'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Loader, Home, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/auth/lib/backendConfig';

interface PaymentVerification {
  status: string;
  message: string;
  data: {
    orderId: string;
    reference: string;
    amount: number;
    status: string;
  };
}

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');

  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentData, setPaymentData] = useState<PaymentVerification['data'] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setVerificationStatus('error');
        setErrorMessage('No payment reference provided');
        return;
      }

      try {
        console.log('[PaymentCallback] Verifying payment with reference:', reference);
        
        // Verify payment with backend
        const response = await axios.get<PaymentVerification>(
          `${BACKEND_BASE_URL}/api/orders/verify/${reference}`
        );

        console.log('[PaymentCallback] Verification response:', response.data);

        if (response.data.status === 'success') {
          setPaymentData(response.data.data);
          setVerificationStatus('success');
        } else {
          setVerificationStatus('error');
          setErrorMessage(response.data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('[PaymentCallback] Verification error:', error);
        setVerificationStatus('error');
        setErrorMessage(
          error instanceof axios.AxiosError
            ? error.response?.data?.message || 'Payment verification failed'
            : 'An error occurred while verifying payment'
        );
      }
    };

    verifyPayment();
  }, [reference]);

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 text-[#B59157] animate-spin mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Verifying Payment</h1>
          <p className="text-gray-600">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
          
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
            <p className="text-gray-600">{errorMessage}</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              {reference && (
                <>
                  <span className="font-semibold">Reference:</span> {reference}
                </>
              )}
              {!reference && 'No payment reference found'}
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/products"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              Try Again
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-gray-600">Your order has been confirmed</p>
        </div>

        {paymentData && (
          <div className="bg-gradient-to-r from-[#B59157]/10 to-[#EBB659]/10 rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono font-bold text-gray-900">{paymentData.orderId}</p>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="text-2xl font-bold text-[#B59157]">
                ₦{paymentData.amount?.toLocaleString()}
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Reference</p>
              <p className="font-mono text-xs text-gray-600 break-all">{paymentData.reference}</p>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <p className="font-semibold text-green-600 capitalize">{paymentData.status}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            A confirmation email has been sent to your email address with your order details.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition font-semibold"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
          <p>Order Reference: {reference}</p>
        </div>
      </div>
    </div>
  );
}
