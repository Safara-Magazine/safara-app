// // import FeatureComponent from "@/components/components.feature";

// // // Fetch from your API
// // // async function getArticles(): Promise<Article[]> {
// // //   try {
// // //     const res = await fetch('https://your-api.com/articles', {
// // //       next: { revalidate: 3600 }
// // //     });

// // //     if (!res.ok) throw new Error('Failed to fetch');

// // //     return res.json();
// // //   } catch (error) {
// // //     console.error('Error fetching articles:', error);
// // //     return [];
// // //   }
// // // }

// // export default async function ArticlePage() {
// // //   const articles = await getArticles(); USE WHEN API IS READY

// //   return (
// //     <main>
// //       {/* <ArticleFeature articles={articles} /> */}
// //       <FeatureComponent />
// //     </main>
// //   );
// // }

// // This tests strapi connection,
// //  Add this page to src/app/article/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { BACKEND_ENDPOINTS } from "@/auth/lib/backendConfig";
// import axios from "axios";
// import FeatureComponent, { Article } from "@/components/components.feature";

// export default function ArticlePage() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchArticles() {
//       try {
//         setLoading(true);
//         setError(null);

//         console.log("Fetching articles from CMS...");

//         const response = await axios.get(BACKEND_ENDPOINTS.ARTICLES.LIST, {
//           headers: { "Content-Type": "application/json" },
//         });

//         console.log("Articles fetched successfully:", response.data);

//         // Transform API data to match ArticleFeatureProps shape
//         const rawArticles = Array.isArray(response.data.data?.articles)
//           ? response.data.data.articles
//           : [];

//         const fetchedArticles: Article[] = rawArticles.map((item: any) => ({
//           slug: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
//           img: item.images?.[0]?.url || "/images/hompagehero.png",
//           title: item.title,
//           text: item.excerpt || item.content || "",
//           date: item.createdAt || "Unknown",
//           alt: item.images?.[0]?.altText || item.title,
//         }));

//         setArticles(fetchedArticles);
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         if (axios.isAxiosError(err)) {
//           setError(err.response?.data?.message || err.message);
//         } else {
//           setError("An unexpected error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchArticles();
//   }, []);

//   return (
//     <main className="px-6 py-8 max-w-7xl mx-auto">
//       {/* {loading && <p>Loading articles...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {!loading && !error && (
//         <FeatureComponent articles={articles} maxArticles={6} />
//       )} */}
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getAllArticles, type Article } from "@/lib/services/articleService";
import FeatureComponent from "@/components/components.feature";
import { Loader } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

         console.log("Fetching articles from CMS...");

      
        const data = await getAllArticles();
        
       
        const publishedArticles = data.filter(article => article.published);
        
        setArticles(publishedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err instanceof Error ? err.message : "Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-[#B59157] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Transform API articles to match your component's expected format
  const transformedArticles = articles.map(article => ({
    slug: article.slug,
    img: article.images?.[0]?.url || "",
    title: article.title,
    text: article.excerpt,
    date: article.createdAt,
    alt: article.images?.[0]?.altText || article.title,
  }));

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <FeatureComponent articles={transformedArticles} maxArticles={6} />
    </main>
  );
}