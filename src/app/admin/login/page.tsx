'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAdminLogin } from '@/auth/hooks/useAuthQueries';

export default function AdminLoginPage() {
  const router = useRouter();
  const { mutate: adminLogin, isPending } = useAdminLogin();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Basic email validation
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail) {
      setError('Please enter a valid email address');
      return;
    }

    adminLogin(
      { email },
      {
        onSuccess: () => {
          // Redirect to admin verification page
          router.push('/admin/login/verify');
        },
        onError: (error: any) => {
          setError(error.message || 'Failed to initiate admin login');
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
          {/* Admin Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Access the Safara Magazine admin dashboard
              </p>
            </div>

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                🔒 <span className="font-semibold">Secure authentication:</span> A verification code will be sent to your email.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Admin Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="admin@safara.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your registered admin email address
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending || !isValidEmail}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>We'll send you a verification code</li>
                <li>Check your email (valid for 5 minutes)</li>
                <li>Enter the code to access your dashboard</li>
              </ol>
            </div>

            {/* Back to Home */}
            <p className="mt-8 text-center text-sm text-gray-600">
              <Link href="/" className="text-[#B59157] hover:text-[#EBB659] transition-colors">
                ← Back to home
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Not an admin? <Link href="/signin" className="text-[#B59157] font-semibold hover:text-[#EBB659]">Sign in as user</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}
