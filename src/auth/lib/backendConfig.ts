/**
 * Backend Configuration
 * Configure backend URLs and endpoints
 */

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const BACKEND_ROUTES = {
  AUTH: {
    GOOGLE: "/api/auth/google",
    GOOGLE_CALLBACK: "/api/auth/google/callback",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },

   ARTICLES: {
    LIST: "/api/articles",
    BY_IDENTIFIER: (identifier: string) => `/api/articles/${identifier}`,
  },
} as const;

export const BACKEND_ENDPOINTS = {
 AUTH : {
  GOOGLE_AUTH: `${BACKEND_BASE_URL}${BACKEND_ROUTES.AUTH.GOOGLE}`,
  GOOGLE_CALLBACK: `${BACKEND_BASE_URL}${BACKEND_ROUTES.AUTH.GOOGLE_CALLBACK}`,
  LOGOUT: `${BACKEND_BASE_URL}${BACKEND_ROUTES.AUTH.LOGOUT}`,
  ME: `${BACKEND_BASE_URL}${BACKEND_ROUTES.AUTH.ME}`,
},

 ARTICLES: {
    LIST: `${BACKEND_BASE_URL}${BACKEND_ROUTES.ARTICLES.LIST}`,
    BY_IDENTIFIER: (identifier: string) =>
      `${BACKEND_BASE_URL}${BACKEND_ROUTES.ARTICLES.BY_IDENTIFIER(identifier)}`,
  },
} as const;

// Debug logging
if (typeof window !== 'undefined') {
  console.log("Backend Configuration:", {
    BACKEND_BASE_URL,
    BACKEND_ENDPOINTS,
  });
}

