'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useExplorerSignup } from '@/auth/hooks/useAuthQueries';

export default function ExplorerSignUpPage() {
  const router = useRouter();
  const { mutate: signup, isPending } = useExplorerSignup();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    signup(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          // Redirect to OTP verification page
          router.push('/auth/verify-otp');
        },
        onError: (error: any) => {
          setError(error.message || 'Failed to sign up');
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
          {/* Sign Up Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Join as Explorer
              </h1>
              <p className="text-gray-600">
                Read and discover amazing stories
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-[#B59157] border-gray-300 rounded focus:ring-2 focus:ring-[#B59157]"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#B59157] hover:text-[#EBB659] transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-[#B59157] hover:text-[#EBB659] transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-gray-600">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-[#B59157] font-semibold hover:text-[#EBB659] transition-colors"
              >
                Sign In
              </Link>
            </p>

            {/* Back Link */}
            <p className="mt-4 text-center">
              <Link
                href="/signup"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to role selection
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
