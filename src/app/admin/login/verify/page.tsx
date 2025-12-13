'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminVerify } from '@/auth/hooks';

export default function AdminVerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: adminVerify, isPending } = useAdminVerify();

  // Get email from localStorage
  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      router.push('/admin/login');
      return;
    }
    setEmail(adminEmail);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter the verification code');
      return;
    }

    console.log("[AdminVerifyPage] Starting admin verification for:", email);

    adminVerify(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("[AdminVerifyPage] Verification succeeded, data:", data);
          // Clear admin email from localStorage
          localStorage.removeItem('adminEmail');
          // Add a small delay to allow Zustand store to update
          setTimeout(() => {
            console.log("[AdminVerifyPage] Redirecting to dashboard");
            router.push('/admin/dashboard');
          }, 500);
        },
        onError: (error: any) => {
          console.log("[AdminVerifyPage] Verification failed:", error);
          setError(error.message || 'Failed to verify credentials');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/BrandLogo.png"
              alt="Logo"
              className="h-8 sm:h-10 w-auto object-contain"
              width={20}
              height={20}
            />
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-md">
          {/* Verification Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Verify Your Identity
              </h1>
              <p className="text-gray-600">
                Enter the code we sent to <br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-900">
                ✓ <span className="font-semibold">Email verified:</span> Check your inbox for the verification code.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password (Verification Code) Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 10-character code"
                    maxLength={10}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M15.171 13.576l1.414 1.414A2 2 0 0016 15.414V17a2 2 0 11-2-2h1.586a2 2 0 001.414.586z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  10-character code sent to your email (valid for 5 minutes)
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isPending || !password}
                className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Verifying...' : 'Verify & Login'}
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-900">
                  <span className="font-semibold">Code format:</span> Your code should be 10 characters long (mix of letters and numbers).
                </p>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Didn't receive the code?</p>
                <Link
                  href="/admin/login"
                  className="text-[#B59157] hover:text-[#EBB659] font-semibold transition-colors"
                >
                  Request a new code
                </Link>
              </div>
            </div>

            {/* Back Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              <Link href="/admin/login" className="text-[#B59157] hover:text-[#EBB659] transition-colors">
                ← Back to login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
