/**
 * Central Export Hub for State Management & Queries
 * 
 * Usage Examples:
 * 
 * // Import from auth module
 * import { GoogleLoginButton, useGoogleAuthUrl, useAuthStore } from '@/auth';
 * 
 * // Import stores
 * import { useUIStore, useArticleStore } from '@/store';
 * 
 * // Import hooks
 * import { useArticles, useArticleBySlug, useCategories } from '@/hooks';
 */

// Auth Module (everything auth-related)
export {
  GoogleLoginButton,
  GoogleAuthCallback,
  UserProfile,
  ProtectedRoute,
  AuthStatus,
  useGoogleAuthUrl,
  useCurrentUser,
  useGoogleCallback,
  useLogout,
  useAuthStore,
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
  type GoogleAuthResponse,
} from '@/auth';

// Stores
export { useUIStore } from '@/store/useUIStore';
export { useArticleStore, type Article } from '@/store/useArticleStore';

// Query Hooks
export {
  useArticles,
  useArticleBySlug,
  useArticlesByCategory,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from '@/hooks/useArticleQueries';
export { useCategories } from '@/hooks/useCategoryQueries';

// API Configuration
export {
  API_BASE_URL,
  API_ROUTES,
  QUERY_KEYS,
  CACHE_TIME,
  formatStrapiArticle,
  handleApiError,
} from '@/lib/apiConfig';

// Test Utilities
export {
  createTestQueryClient,
  resetAllStores,
  mockArticles,
  mockUser,
} from '@/lib/testUtils';
