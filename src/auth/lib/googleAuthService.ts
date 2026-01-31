/**
 * Google OAuth Service
 * Handles Google authentication flow
 */

import { BACKEND_ENDPOINTS } from "@/auth/lib/backendConfig";

/**
 * Initialize Google authentication flow
 */
export const initGoogleAuth = async (): Promise<string> => {
  try {
    const response = await fetch(BACKEND_ENDPOINTS.AUTH.GOOGLE_AUTH);
    if (!response.ok) {
      throw new Error("Failed to get Google auth URL");
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error initializing Google auth:", error);
    throw error;
  }
};

/**
 * Handle Google OAuth callback
 * Extract auth code from URL and exchange for token via GET request
 */
export const handleGoogleOAuthCallback = async (code: string) => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINTS.AUTH.GOOGLE_CALLBACK}?code=${encodeURIComponent(code)}`
    );

    if (!response.ok) {
      throw new Error("Failed to complete Google authentication");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error handling Google OAuth callback:", error);
    throw error;
  }
};

/**
 * Get auth code from URL parameters
 */
export const getAuthCodeFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("code");
};

/**
 * Redirect to Google login
 */
export const redirectToGoogleLogin = async () => {
  try {
    const authUrl = await initGoogleAuth();
    window.location.href = authUrl;
  } catch (error) {
    console.error("Failed to redirect to Google login:", error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
};

/**
 * Get stored auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

/**
 * Set auth token
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

/**
 * Clear auth token
 */
export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};
