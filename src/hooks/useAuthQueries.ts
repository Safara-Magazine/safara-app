import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { BACKEND_ENDPOINTS } from "@/lib/backendConfig";

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
  const response = await axios.get(BACKEND_ENDPOINTS.GOOGLE_AUTH);
  return response.data;
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
