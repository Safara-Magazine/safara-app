/**
 * Article Service
 * Handles all article API calls to the backend
 */

import axios from "axios";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface ArticleImage {
  id?: string;
  url: string;
  altText: string;
  caption?: string;
  order?: number;
  createdAt?: string;
  articleId?: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  images: ArticleImage[];
}

export interface UpdateArticleRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  images?: ArticleImage[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
    picture?: string | null;
  };
  images: ArticleImage[];
}

export interface ArticleStats {
  total: number;
  published: number;
  draft: number;
  totalViews: number;
}

export interface ArticlesResponse {
  status: string;
  data: {
    articles: Article[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ArticleResponse {
  status: string;
  message: string;
  data: Article;
}

export interface StatsResponse {
  status: string;
  message: string;
  data: ArticleStats;
}

// ============================================================================
// ARTICLE STATS
// ============================================================================

export const getArticleStats = async (): Promise<ArticleStats> => {
  try {
    console.log("[articleService] Fetching article stats");
    const response = await axios.get<StatsResponse>(
      `${BACKEND_BASE_URL}/api/articles/stats`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[articleService] Stats fetched:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[articleService] Error fetching stats:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch article statistics"
      );
    }
    throw error;
  }
};


// ============================================================================
// GET ALL ARTICLES
// ============================================================================

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    console.log("[articleService] Fetching all articles");
    const response = await axios.get<ArticlesResponse>(
      `${BACKEND_BASE_URL}/api/articles`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[articleService] Articles fetched:", response.data.data.articles);
    return response.data.data.articles || [];
  } catch (error) {
    console.error("[articleService] Error fetching articles:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch articles"
      );
    }
    throw error;
  }
};

// ============================================================================
// GET ARTICLE BY ID OR SLUG
// ============================================================================

export const getArticleById = async (identifier: string): Promise<Article> => {
  try {
    console.log("[articleService] Fetching article:", identifier);
    const response = await axios.get<ArticleResponse>(
      `${BACKEND_BASE_URL}/api/articles/${identifier}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[articleService] Article fetched:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[articleService] Error fetching article:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch article"
      );
    }
    throw error;
  }
};

// ============================================================================
// CREATE ARTICLE
// ============================================================================

export const createArticle = async (
  payload: CreateArticleRequest
): Promise<Article> => {
  try {
    console.log("[articleService] Creating article:", payload.title);
    const response = await axios.post<ArticleResponse>(
      `${BACKEND_BASE_URL}/api/articles`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[articleService] Article created:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[articleService] Error creating article:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create article"
      );
    }
    throw error;
  }
};

// ============================================================================
// UPDATE ARTICLE
// ============================================================================

export const updateArticle = async (
  articleId: string,
  payload: UpdateArticleRequest
): Promise<Article> => {
  try {
    console.log("[articleService] Updating article:", articleId);
    const response = await axios.patch<ArticleResponse>(
      `${BACKEND_BASE_URL}/api/articles/${articleId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("[articleService] Article updated:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[articleService] Error updating article:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update article"
      );
    }
    throw error;
  }
};

// ============================================================================
// DELETE ARTICLE
// ============================================================================

export const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    console.log("[articleService] Deleting article:", articleId);
    await axios.delete(`${BACKEND_BASE_URL}/api/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    console.log("[articleService] Article deleted:", articleId);
  } catch (error) {
    console.error("[articleService] Error deleting article:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete article"
      );
    }
    throw error;
  }
};
