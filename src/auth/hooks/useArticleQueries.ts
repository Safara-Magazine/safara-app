/**
 * Article Query Hooks
 * TanStack Query hooks for all article operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getArticleStats,
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  type ArticleStats,
  type Article,
  type CreateArticleRequest,
  type UpdateArticleRequest,
} from "@/lib/services/articleService";
import { useAuthStore } from "@/auth/store/useAuthStore";

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Get article statistics
 */
export const useArticleStats = () => {
  return useQuery({
    queryKey: ["articles", "stats"],
    queryFn: getArticleStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Get all articles
 */
export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticles,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Get article by ID or slug
 */
export const useArticleDetail = (identifier: string | null) => {
  return useQuery({
    queryKey: ["articles", identifier],
    queryFn: () => getArticleById(identifier!),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Create article mutation
 */
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: createArticle,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log("[useCreateArticle] Article created successfully:", data);
      setLoading(false);
      // Invalidate articles queries to refetch
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "stats"] });
    },
    onError: (error: any) => {
      console.error("[useCreateArticle] Error:", error);
      const errorMessage = error.message || "Failed to create article";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Update article mutation
 */
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId: string; payload: UpdateArticleRequest }) =>
      updateArticle(articleId, payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log("[useUpdateArticle] Article updated successfully:", data);
      setLoading(false);
      // Invalidate articles queries to refetch
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["articles", data.id] });
    },
    onError: (error: any) => {
      console.error("[useUpdateArticle] Error:", error);
      const errorMessage = error.message || "Failed to update article";
      setError(errorMessage);
      setLoading(false);
    },
  });
};

/**
 * Delete article mutation
 */
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { setError, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: deleteArticle,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      console.log("[useDeleteArticle] Article deleted successfully");
      setLoading(false);
      // Invalidate articles queries to refetch
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "stats"] });
    },
    onError: (error: any) => {
      console.error("[useDeleteArticle] Error:", error);
      const errorMessage = error.message || "Failed to delete article";
      setError(errorMessage);
      setLoading(false);
    },
  });
};
