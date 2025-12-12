/**
 * Google OAuth Callback Handler Component
 * Place this on your /auth/callback route
 */

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleCallback } from "../hooks";
import { useAuthStore } from "../store";


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

    if (code && !isPending) {
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
  }, [searchParams, router, handleCallback, setError, isPending]);

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
