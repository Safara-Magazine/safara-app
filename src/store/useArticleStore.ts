import { create } from "zustand";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image?: string;
  published_at: string;
  author?: string;
}

interface ArticleState {
  articles: Article[];
  selectedArticle: Article | null;
  favorites: string[]; // Array of article IDs
  setArticles: (articles: Article[]) => void;
  setSelectedArticle: (article: Article | null) => void;
  addFavorite: (articleId: string) => void;
  removeFavorite: (articleId: string) => void;
  isFavorited: (articleId: string) => boolean;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  selectedArticle: null,
  favorites: [],
  
  setArticles: (articles) => set({ articles }),
  
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  
  addFavorite: (articleId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, articleId])],
    })),
  
  removeFavorite: (articleId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== articleId),
    })),
  
  isFavorited: (articleId) => get().favorites.includes(articleId),
}));
