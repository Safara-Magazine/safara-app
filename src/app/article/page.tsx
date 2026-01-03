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

import { useEffect } from "react";

export default function ArticlePage() {
  // const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        console.log("Fetching articles...");

        // const res = await fetch("http://localhost:4000", {
        const res = await fetch("https://safara-cms.onrender.com/api/articles", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();

        console.log("Articles fetched:", json);
        console.log("Article data:", json.data);
        // setArticles(json.data || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    }

    fetchArticles();
  }, []);

  return (
    <main>
      {/* <h1>Articles</h1> */}
      {/* <pre>{JSON.stringify(articles, null, 2)}</pre> */}
    </main>
  );
}
