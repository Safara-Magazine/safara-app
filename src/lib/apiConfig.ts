/**
 * API Configuration for TanStack Query
 * Centralized API configuration and helper functions
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export const API_ROUTES = {
  ARTICLES: "/articles",
  CATEGORIES: "/categories",
  COMMENTS: "/comments",
  USERS: "/users",
} as const;

export const QUERY_KEYS = {
  // Articles
  ARTICLES: ["articles"] as const,
  ARTICLE_BY_SLUG: (slug: string) => [...QUERY_KEYS.ARTICLES, slug] as const,
  ARTICLES_BY_CATEGORY: (category: string) =>
    [...QUERY_KEYS.ARTICLES, "category", category] as const,

  // Categories
  CATEGORIES: ["categories"] as const,
  CATEGORY: (id: string) => [...QUERY_KEYS.CATEGORIES, id] as const,

  // Comments
  COMMENTS: ["comments"] as const,
  COMMENTS_BY_ARTICLE: (articleId: string) =>
    [...QUERY_KEYS.COMMENTS, articleId] as const,
} as const;

export const CACHE_TIME = {
  ARTICLES: 1000 * 60 * 5, // 5 minutes
  CATEGORIES: 1000 * 60 * 30, // 30 minutes
  COMMENTS: 1000 * 60 * 3, // 3 minutes
  USER: 1000 * 60 * 15, // 15 minutes
} as const;

/**
 * Format Strapi API response to match our Article interface
 */
interface StrapiArticleData {
  id?: string;
  documentId?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  featured_image?: { url?: string };
  publishedAt?: string;
  author?: { name?: string };
}

export const formatStrapiArticle = (data: StrapiArticleData) => ({
  id: data.id || data.documentId,
  title: data.title,
  slug: data.slug,
  content: data.content,
  excerpt: data.excerpt,
  category: data.category,
  featured_image: data.featured_image?.url,
  published_at: data.publishedAt || new Date().toISOString(),
  author: data.author?.name,
});

/**
 * Handle API errors consistently
 */
interface ApiError extends Error {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
    };
  };
}

export const handleApiError = (error: ApiError): string => {
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};
