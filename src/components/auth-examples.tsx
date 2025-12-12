/**
 * Authentication Example Components
 * Shows how to implement Google authentication
 */

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getAuthCodeFromUrl, redirectToGoogleLogin, isAuthenticated } from "@/lib/googleAuthService";
import { useGoogleAuthUrl, useGoogleCallback, useAuthStore, useLogout } from "@/auth";

/**
 * Example: Google Login Button Component
 */
export function GoogleLoginButton() {
  const { data: authUrlData, isLoading } = useGoogleAuthUrl();

  const handleGoogleLogin = async () => {
    if (authUrlData?.url) {
      window.location.href = authUrlData.url;
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading || !authUrlData}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Loading..." : "Sign in with Google"}
    </button>
  );
}

/**
 * Example: Google OAuth Callback Handler
 * Place this component on your callback route (e.g., /auth/callback)
 */
export function GoogleAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: handleCallback, isPending } = useGoogleCallback();
  const { setError } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setError(`Authentication failed: ${error}`);
      router.push("/login");
      return;
    }

    if (code) {
      handleCallback(code, {
        onSuccess: () => {
          // Redirect to home or dashboard
          router.push("/");
        },
        onError: () => {
          router.push("/login");
        },
      });
    }
  }, [searchParams, router, handleCallback, setError]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isPending ? "Completing authentication..." : "Authentication failed"}
        </h1>
        {isPending && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        )}
      </div>
    </div>
  );
}

/**
 * Example: User Profile Component
 */
export function UserProfile() {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  if (!isAuthenticated) {
    return <p className="text-gray-600">Not logged in</p>;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
      <button
        onClick={() => logout()}
        disabled={isPending}
        className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

/**
 * Example: Protected Route Wrapper
 * Use this to protect routes that require authentication
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Example: Login Page Component
 */
export function LoginPage() {
  const { error } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Safara Magazine</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <GoogleLoginButton />
          <p className="text-center text-sm text-gray-600">
            Secure login powered by Google
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example: Auth Status Component
 * Shows current authentication status
 */
export function AuthStatus() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="font-semibold mb-2">Authentication Status</h3>
      <p className="text-sm mb-2">
        Status: {isAuthenticated ? "Logged in" : "Not logged in"}
      </p>
      {isAuthenticated && user && (
        <div className="text-sm space-y-1">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
