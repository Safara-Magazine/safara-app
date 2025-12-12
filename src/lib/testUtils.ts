/**
 * Testing Utilities for Zustand Stores and TanStack Query
 * Use these utilities in your tests to mock stores and queries
 */

import { QueryClient } from "@tanstack/react-query";
import { useUIStore, useArticleStore } from "@/store";
import { useAuthStore } from "@/auth/store";

/**
 * Create a test QueryClient with optimized defaults for testing
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Reset all Zustand stores to initial state
 */
export function resetAllStores() {
  useUIStore.setState({
    isSidebarOpen: false,
    isSearchOpen: false,
    theme: "light",
  });

  useArticleStore.setState({
    articles: [],
    selectedArticle: null,
    favorites: [],
  });

  useAuthStore.setState({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });
}

/**
 * Mock article data for testing
 */
export const mockArticles = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    content: "Learn how to build with Next.js...",
    excerpt: "A beginner's guide to Next.js",
    category: "tutorial",
    featured_image: "/images/nextjs.jpg",
    published_at: "2024-01-01T00:00:00Z",
    author: "John Doe",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    slug: "advanced-react-patterns",
    content: "Deep dive into React patterns...",
    excerpt: "Master advanced React concepts",
    category: "tutorial",
    featured_image: "/images/react.jpg",
    published_at: "2024-01-02T00:00:00Z",
    author: "Jane Smith",
  },
];

/**
 * Mock user data for testing
 */
export const mockUser = {
  id: "user-1",
  email: "test@example.com",
  name: "Test User",
  role: "user",
};

/**
 * Example test setup
 *
 * import { render, screen } from '@testing-library/react';
 * import { TestQueryWrapper, resetAllStores, mockArticles } from '@/lib/testUtils';
 *
 * describe('ArticlesList', () => {
 *   beforeEach(() => {
 *     resetAllStores();
 *   });
 *
 *   it('renders article list', () => {
 *     const { useArticleStore } = require('@/store');
 *     useArticleStore.setState({ articles: mockArticles });
 *
 *     render(<ArticlesList />, { wrapper: TestQueryWrapper });
 *
 *     expect(screen.getByText('Getting Started with Next.js')).toBeInTheDocument();
 *   });
 * });
 */
