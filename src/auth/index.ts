/**
 * Auth Module Index
 * Central export point for all auth functionality
 */

// Components
export {
  GoogleLoginButton,
  GoogleAuthCallback,
  UserProfile,
  ProtectedRoute,
  AuthStatus,
} from "./components";

// Hooks
export {
  useGoogleAuthUrl,
  useCurrentUser,
  useGoogleCallback,
  useLogout,
  type GoogleAuthResponse,
} from "./hooks";

// Store
export { useAuthStore } from "./store";

// Libraries
export {
  initGoogleAuth,
  handleGoogleOAuthCallback,
  getAuthCodeFromUrl,
  redirectToGoogleLogin,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  BACKEND_BASE_URL,
  BACKEND_ROUTES,
  BACKEND_ENDPOINTS,
} from "./lib";
