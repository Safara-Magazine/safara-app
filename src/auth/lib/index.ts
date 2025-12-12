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
  explorerSignup,
  partnerSignup,
  verifyOtp,
  resendOtp,
  adminLogin,
  adminVerify,
  type ExplorerSignupRequest,
  type PartnerSignupRequest,
  type SignupResponse,
  type OtpVerificationRequest,
  type OtpVerificationResponse,
  type AdminLoginRequest,
  type AdminLoginResponse,
  type AdminVerifyRequest,
  type AdminVerifyResponse,
} from "./manualAuthService";

export {
  BACKEND_BASE_URL,
  BACKEND_ROUTES,
  BACKEND_ENDPOINTS,
} from "./backendConfig";
