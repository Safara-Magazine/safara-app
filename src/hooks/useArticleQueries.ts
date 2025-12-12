import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "@/store/useArticleStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

// Fetch all articles
const fetchArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data.data || [];
};

// Fetch article by slug
const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await axios.get(`${API_BASE_URL}/articles?filters[slug][$eq]=${slug}`);
  return response.data.data[0];
};

// Fetch articles by category
const fetchArticlesByCategory = async (category: string): Promise<Article[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/articles?filters[category][$eq]=${category}`
  );
  return response.data.data || [];
};

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["articles", slug],
    queryFn: () => fetchArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useArticlesByCategory = (category: string) => {
  return useQuery({
    queryKey: ["articles", "category", category],
    queryFn: () => fetchArticlesByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Mutation for creating an article (if needed)
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newArticle: Partial<Article>) => {
      const response = await axios.post(`${API_BASE_URL}/articles`, {
        data: newArticle,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

// Mutation for updating an article
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<Article>) => {
      const response = await axios.put(`${API_BASE_URL}/articles/${id}`, {
        data,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

// Mutation for deleting an article
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_BASE_URL}/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
