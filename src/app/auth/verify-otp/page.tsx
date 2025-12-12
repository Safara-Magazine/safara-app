'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useVerifyOtp, useResendOtp } from '@/auth/hooks';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [showResend, setShowResend] = useState(false);

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  // Get email from localStorage and set up timer
  useEffect(() => {
    const signupEmail = localStorage.getItem('signupEmail');
    if (!signupEmail) {
      // Redirect to signup if no email in localStorage
      router.push('/signup');
      return;
    }
    setEmail(signupEmail);
  }, [router]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) {
      setShowResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 characters');
      return;
    }

    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          // Redirect to success page
          router.push('/');
        },
        onError: (error: any) => {
          setError(error.message || 'Failed to verify OTP');
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (isResending) return;

    resendOtp(email, {
      onSuccess: () => {
        setTimer(300); // Reset timer
        setShowResend(false);
        setOtp(''); // Clear OTP input
        setError('');
      },
      onError: (error: any) => {
        setError(error.message || 'Failed to resend OTP');
      },
    });
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
          {/* OTP Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
              <p className="text-gray-600">
                We've sent a 6-digit code to <br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* OTP Verification Form */}
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.toUpperCase())}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#B59157] transition"
                  required
                />
              </div>

              {/* Timer */}
              <div className="text-center">
                {!showResend ? (
                  <p className="text-sm text-gray-600">
                    Code expires in{' '}
                    <span className="font-bold text-[#B59157]">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <p className="text-sm text-orange-600 font-medium">
                    Code has expired. Please request a new one.
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isVerifying || !otp || showResend}
                className="w-full py-2.5 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="mt-8 text-center">
              {showResend ? (
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-[#B59157] hover:text-[#EBB659] font-medium transition-colors disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    disabled
                    className="text-[#B59157] font-medium cursor-not-allowed opacity-50"
                  >
                    Resend in {formatTime(timer)}
                  </button>
                </p>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Need help?</span> Check your spam folder or{' '}
                <Link href="/contact" className="text-[#B59157] hover:text-[#EBB659]">
                  contact support
                </Link>
              </p>
            </div>

            {/* Change Email */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Wrong email?{' '}
              <Link
                href="/signup"
                className="text-[#B59157] font-semibold hover:text-[#EBB659] transition-colors"
              >
                Start over
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
