'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/auth';
import Image from 'next/image';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setLoading, setError } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processToken = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          throw new Error('No token provided in auth callback');
        }

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Decode token to get user info (basic JWT decode)
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const decoded = JSON.parse(jsonPayload);
          console.log('Decoded token:', decoded);

          if (decoded.sub || decoded.id) {
            setUser({
              id: decoded.sub || decoded.id,
              email: decoded.email,
              name: decoded.name || decoded.email,
            });
          }
        } catch (decodeError) {
          console.warn('Could not decode token, will fetch user data:', decodeError);
          // Token decode failed, but we still have the token - that's fine
        }

        setIsProcessing(false);

        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } catch (error) {
        console.error('Auth success processing error:', error);
        const errorMsg =
          error instanceof Error ? error.message : 'Authentication failed';
        setErrorMessage(errorMsg);
        setError(errorMsg);
        setIsProcessing(false);

        // Redirect to signin on error after 3 seconds
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      }
    };

    processToken();
  }, [searchParams, router, setUser, setError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {isProcessing && !errorMessage && (
          <div className="text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-green-600 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Safara!
            </h1>
            <p className="text-gray-600 mb-8">
              Your account has been created successfully. Redirecting you now...
            </p>

            {/* Loading spinner */}
            <div className="flex justify-center mb-4">
              <div className="animate-spin">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              If you're not redirected, click below
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h1>
            <p className="text-red-600 mb-8">{errorMessage}</p>
            <button
              onClick={() => router.push('/signin')}
              className="px-6 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Redirect button as fallback */}
        {isProcessing && !errorMessage && (
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Go to Home →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
