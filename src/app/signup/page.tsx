'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
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
        <div className="w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Join Safara Magazine
            </h1>
            <p className="text-lg text-gray-600">
              Choose how you want to participate in our community
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Explorer Card */}
            <Link
              href="/signup/explorer"
              className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#B59157]"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                📖
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">Explorer</h2>
              <p className="text-gray-600 mb-6">
                Read and discover amazing articles about travel, lifestyle, business, and culture.
              </p>

              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#B59157] font-bold mr-2">✓</span>
                  <span>Access all articles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B59157] font-bold mr-2">✓</span>
                  <span>Save favorite articles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B59157] font-bold mr-2">✓</span>
                  <span>Comment on articles</span>
                </li>
              </ul>

              <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg font-medium group-hover:shadow-lg transition-all">
                Sign Up as Explorer →
              </div>
            </Link>

            {/* Partner Card */}
            <Link
              href="/signup/partner"
              className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#B59157]"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                💼
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">Partner</h2>
              <p className="text-gray-600 mb-6">
                Share your expertise and services. Perfect for photographers, writers, and businesses.
              </p>

              <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg font-medium group-hover:shadow-lg transition-all">
                Sign Up as Partner →
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-600">Other options</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Sign Up with Google
            </h3>
            <p className="text-gray-600 mb-6">
              Sign up instantly with your Google account. Choose your role after signing in.
            </p>
            <Link
              href="/signin"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all"
            >
              Continue with Google
            </Link>
          </div>

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

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
            <p>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              {' · '}
              <Link href="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
