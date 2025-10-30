import FeatureComponent from "@/components/components.feature";

// Fetch from your API
// async function getArticles(): Promise<Article[]> {
//   try {
//     const res = await fetch('https://your-api.com/articles', {
//       next: { revalidate: 3600 }
//     });
    
//     if (!res.ok) throw new Error('Failed to fetch');
    
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return [];
//   }
// }

export default async function ArticlePage() {
//   const articles = await getArticles(); USE WHEN API IS READY
  
  return (
    <main>
      {/* <ArticleFeature articles={articles} /> */}
      <FeatureComponent />
    </main>
  );
}