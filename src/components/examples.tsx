/**
 * Example Component: Using TanStack Query with Zustand
 * This file demonstrates best practices for combining both libraries
 */

"use client";

import { useArticles, useArticlesByCategory} from "@/hooks";
import { useArticleStore, useUIStore } from "@/store";
import { ReactNode } from "react";

// Example: Articles List Component
export function ArticlesListExample() {
  const { data: articles, isLoading, error } = useArticles();
  const { favorites, addFavorite, removeFavorite, isFavorited } =
    useArticleStore();

  if (isLoading) return <div className="p-4">Loading articles...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading articles</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>
      <div className="grid gap-4">
        {articles?.map((article) => (
          <div key={article.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
            <div className="flex gap-2 items-center">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {article.category}
              </span>
              <button
                onClick={() =>
                  isFavorited(article.id)
                    ? removeFavorite(article.id)
                    : addFavorite(article.id)
                }
                className={`text-lg ${
                  isFavorited(article.id) ? "text-red-500" : "text-gray-400"
                }`}
              >
                {isFavorited(article.id) ? "♥" : "♡"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Total articles: {articles?.length} | Favorites: {favorites.length}
      </div>
    </div>
  );
}

// Example: Category Filter Component
export function CategoryFilterExample() {
  const selectedCategory = useUIStore((state) => state.theme); // Can store selected category similarly
  const { data: articles, isLoading } = useArticlesByCategory("tech");

  if (isLoading) return <div>Loading category articles...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tech Articles</h2>
      <div className="space-y-2">
        {articles?.map((article) => (
          <div key={article.id} className="p-2 border-b">
            <h4 className="font-semibold">{article.title}</h4>
            <p className="text-xs text-gray-500">{article.published_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example: Header with UI State
export function HeaderExample() {
  const { isSidebarOpen, toggleSidebar, theme, setTheme } = useUIStore();

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">Safara Magazine</h1>
      </div>

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2 hover:bg-gray-100 rounded"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {isSidebarOpen && (
        <div className="fixed left-0 top-16 w-64 bg-gray-50 h-screen border-r">
          <nav className="p-4 space-y-2">
            <a href="/" className="block p-2 hover:bg-gray-200 rounded">
              Home
            </a>
            <a href="/tech" className="block p-2 hover:bg-gray-200 rounded">
              Tech
            </a>
            <a href="/business" className="block p-2 hover:bg-gray-200 rounded">
              Business
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// Example: Favorites Panel Component
export function FavoritesPanelExample() {
  const { favorites, articles, setSelectedArticle } = useArticleStore();
  const favoriteArticles = articles.filter((a) => favorites.includes(a.id));

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-bold mb-3">My Favorites ({favorites.length})</h3>
      {favoriteArticles.length === 0 ? (
        <p className="text-gray-500 text-sm">No favorites yet</p>
      ) : (
        <ul className="space-y-2">
          {favoriteArticles.map((article) => (
            <li
              key={article.id}
              className="p-2 bg-white rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedArticle(article)}
            >
              <p className="text-sm font-medium">{article.title}</p>
              <p className="text-xs text-gray-500">{article.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
