/**
 * Auth Library Index
 * Export all authentication utilities
 */

export {
  initGoogleAuth,
  handleGoogleOAuthCallback,
  getAuthCodeFromUrl,
  redirectToGoogleLogin,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} from "./googleAuthService";

export {
  BACKEND_BASE_URL,
  BACKEND_ROUTES,
  BACKEND_ENDPOINTS,
} from "./backendConfig";
