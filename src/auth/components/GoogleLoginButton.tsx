/**
 * Google Login Button Component
 * Handles redirect to Google OAuth
 */

"use client";

import { useEffect, useState } from "react";
import { useGoogleAuthUrl } from "../hooks";


export function GoogleLoginButton() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [debugError, setDebugError] = useState<string | null>(null);
  const { data: authUrlData, isLoading, error, status } = useGoogleAuthUrl();

  useEffect(() => {
    // Debug logging
    console.log("useGoogleAuthUrl state:", {
      status,
      isLoading,
      hasData: !!authUrlData,
      url: authUrlData?.url,
      error: error?.message,
    });
  }, [authUrlData, isLoading, error, status]);

  const handleGoogleLogin = () => {
    // Debug info
    setDebugError(null);
    console.log("handleGoogleLogin called", {
      authUrlData,
      hasUrl: !!authUrlData?.url,
      isLoading,
    });

    if (!authUrlData?.url) {
      const errorMsg = error 
        ? `Backend Error: ${error.message}` 
        : "OAuth URL not available - Backend may not be running at http://localhost:4000";
      console.error(errorMsg);
      setDebugError(errorMsg);
      return;
    }

    setIsRedirecting(true);
    // Redirect to Google login
    window.location.href = authUrlData.url;
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading || !authUrlData || isRedirecting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading && "Loading OAuth URL..."}
        {isRedirecting && "Redirecting to Google..."}
        {!isLoading && !isRedirecting && "Sign in with Google"}
      </button>
      {error && (
        <p className="text-red-600 text-sm">
          Error loading OAuth: {error.message}
        </p>
      )}
      {debugError && (
        <div className="text-sm bg-yellow-50 border border-yellow-200 p-2 rounded text-yellow-800">
          {debugError}
        </div>
      )}
    </div>
  );
}
