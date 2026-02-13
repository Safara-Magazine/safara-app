"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleLoginButton } from "@/auth";
import Image from "next/image";
// import { BACKEND_ENDPOINTS } from "@/auth/lib/backendConfig";
import { useLogin } from "@/auth/hooks/useAuthQueries";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading] = useState(false);
  const router = useRouter();
  const { mutate: loginUser} = useLogin();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    loginUser(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          // Redirect to home page
          router.push("/");
        },
        onError: (error: Error) => {
          setError(error.message || "Failed to sign in");
        },
      },
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
          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Sign In
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome back to Safara Magazine
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 text-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <div className="mb-8">
              <div className="mb-4">
                <GoogleLoginButton />
              </div>
              <p className="text-center text-sm text-gray-600">
                Quick and secure sign-in with Google
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">
                Or continue with email
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#B59157] hover:text-[#EBB659] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#B59157] font-semibold hover:text-[#EBB659] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
            <p>
              <Link
                href="/privacy"
                className="hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>
              {" · "}
              <Link
                href="/terms"
                className="hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
