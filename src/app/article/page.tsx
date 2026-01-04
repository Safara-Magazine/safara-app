// import FeatureComponent from "@/components/components.feature";

// // Fetch from your API
// // async function getArticles(): Promise<Article[]> {
// //   try {
// //     const res = await fetch('https://your-api.com/articles', {
// //       next: { revalidate: 3600 }
// //     });

// //     if (!res.ok) throw new Error('Failed to fetch');

// //     return res.json();
// //   } catch (error) {
// //     console.error('Error fetching articles:', error);
// //     return [];
// //   }
// // }

// export default async function ArticlePage() {
// //   const articles = await getArticles(); USE WHEN API IS READY

//   return (
//     <main>
//       {/* <ArticleFeature articles={articles} /> */}
//       <FeatureComponent />
//     </main>
//   );
// }

// This tests strapi connection,
//  Add this page to src/app/article/page.tsx

"use client";

import { useEffect, useState } from "react";
import { BACKEND_ENDPOINTS } from "@/auth/lib/backendConfig";
import axios from "axios";
import FeatureComponent, { Article } from "@/components/components.feature";

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching articles from CMS...");

        const response = await axios.get(BACKEND_ENDPOINTS.ARTICLES.LIST, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Articles fetched successfully:", response.data);

        // Transform API data to match ArticleFeatureProps shape
        const rawArticles = Array.isArray(response.data.data?.articles)
          ? response.data.data.articles
          : [];

        const fetchedArticles: Article[] = rawArticles.map((item: any) => ({
          slug: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
          img: item.images?.[0]?.url || "/images/hompagehero.png",
          title: item.title,
          text: item.excerpt || item.content || "",
          date: item.createdAt || "Unknown",
          alt: item.images?.[0]?.altText || item.title,
        }));

        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <FeatureComponent articles={articles} maxArticles={6} />
      )}
    </main>
  );
}
