import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { BACKEND_ENDPOINTS } from "../lib";

export interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}

/**
 * Get Google OAuth URL
 */
const getGoogleAuthUrl = async (): Promise<{ url: string }> => {
  try {
    console.log("Fetching OAuth URL from:", BACKEND_ENDPOINTS.GOOGLE_AUTH);
    const response = await axios.get(BACKEND_ENDPOINTS.GOOGLE_AUTH);
    console.log("OAuth URL fetched successfully:", response.data);
    
    // Backend returns google_auth_url, map it to url for consistency
    const { google_auth_url, url } = response.data;
    const authUrl = google_auth_url || url;
    
    if (!authUrl) {
      throw new Error("No OAuth URL returned from backend");
    }
    
    return { url: authUrl };
  } catch (error) {
    console.error("Failed to fetch OAuth URL:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || !error.response) {
        throw new Error(
          `Cannot reach backend at ${BACKEND_ENDPOINTS.GOOGLE_AUTH}. Is your backend running?`
        );
      }
      throw new Error(
        error.response?.data?.message || `Backend error: ${error.message}`
      );
    }
    throw error;
  }
};

/**
 * Handle Google OAuth callback - GET request with code parameter
 */
const handleGoogleCallback = async (code: string): Promise<GoogleAuthResponse> => {
  const response = await axios.get(BACKEND_ENDPOINTS.GOOGLE_CALLBACK, {
    params: { code },
  });
  return response.data;
};

/**
 * Get current user
 */
const getCurrentUser = async (): Promise<GoogleAuthResponse["user"]> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token");

  const response = await axios.get(BACKEND_ENDPOINTS.ME, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};

/**
 * Logout
 */
const logout = async (): Promise<void> => {
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      await axios.post(
        BACKEND_ENDPOINTS.LOGOUT,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  localStorage.removeItem("authToken");
};

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Get Google OAuth URL
 */
export const useGoogleAuthUrl = () => {
  return useQuery({
    queryKey: ["google-auth-url"],
    queryFn: getGoogleAuthUrl,
    staleTime: Infinity, // URL doesn't change
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * Get current user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem("authToken"),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Google OAuth callback mutation
 */
export const useGoogleCallback = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: handleGoogleCallback,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem("authToken", data.token);

      // Update auth store
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      });

      setError(null);
      setLoading(false);

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Authentication failed";

      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear auth store
      authStore.logout();

      // Clear queries
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Still clear local state even if API call fails
      authStore.logout();
    },
  });
};
