import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { BACKEND_ENDPOINTS } from "../lib";
import {
  explorerSignup,
  partnerSignup,
  verifyOtp,
  resendOtp,
  adminLogin,
  adminVerify,
  login
} from "../lib/manualAuthService";

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
    console.log("Fetching OAuth URL from:", BACKEND_ENDPOINTS.AUTH.GOOGLE_AUTH);
    const response = await axios.get(BACKEND_ENDPOINTS.AUTH.GOOGLE_AUTH);
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
          `Cannot reach backend at ${BACKEND_ENDPOINTS.AUTH.GOOGLE_AUTH}. Is your backend running?`
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
  const response = await axios.get(BACKEND_ENDPOINTS.AUTH.GOOGLE_CALLBACK, {
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

  const response = await axios.get(BACKEND_ENDPOINTS.AUTH.ME, {
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
        BACKEND_ENDPOINTS.AUTH.LOGOUT,
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
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Authentication failed";

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

// ============================================================================
// MANUAL AUTH MUTATIONS
// ============================================================================

/**
 * Explorer signup mutation
 */
export const useExplorerSignup = () => {
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: explorerSignup,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setError(null);
      setLoading(false);
      // Store email for OTP verification
      localStorage.setItem("signupEmail", data.data.email);
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to sign up as explorer";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Partner signup mutation
 */
export const usePartnerSignup = () => {
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: partnerSignup,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setError(null);
      setLoading(false);
      // Store email and service type for OTP verification
      localStorage.setItem("signupEmail", data.data.email);
      localStorage.setItem("typeOfService", data.data.typeOfService || "");
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to sign up as partner";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * OTP verification mutation
 */
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: verifyOtp,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem("authToken", data.access_token);

      // Update auth store
      setUser({
        id: data.user.user_id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });

      setError(null);
      setLoading(false);

      // Clear signup email from localStorage
      localStorage.removeItem("signupEmail");
      localStorage.removeItem("typeOfService");

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Failed to verify OTP";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Resend OTP mutation
 */
export const useResendOtp = () => {
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: resendOtp,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setError(null);
      setLoading(false);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Failed to resend OTP";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Admin login mutation (request password)
 */
export const useAdminLogin = () => {
  const { setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: adminLogin,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setError(null);
      setLoading(false);
      // Store admin email for verification step
      localStorage.setItem("adminEmail", data.data.email);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Failed to initiate admin login";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Admin verify mutation (verify password)
 */
export const useAdminVerify = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: adminVerify,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log("[useAdminVerify] Login successful, data:", data);
      
      // Save token to localStorage
      localStorage.setItem("authToken", data.access_token);

      // Update auth store with admin user data
      const userData = {
        id: data.user.user_id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };
      
      console.log("[useAdminVerify] Setting user in store:", userData);
      setUser(userData);

      setError(null);
      setLoading(false);

      // Clear admin email from localStorage
      localStorage.removeItem("adminEmail");

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Failed to verify admin credentials";
      setError(errorMessage);
      setLoading(false);
    },
  });
};


// manual login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      // Save token to localStorage
      localStorage.setItem("authToken", data.access_token);

      // Update auth store
      setUser({
        id: data.user.user_id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });

      setError(null);
      setLoading(false);

      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Failed to sign in";
      setError(errorMessage);
      setLoading(false);
    },
  });
};
