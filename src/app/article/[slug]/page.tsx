
import Image from "@/components/Image";
import { getContentBySlug, getAllSlugs } from '@/lib/omniContents';
import ComingSoon from '@/components/component.comingsoon';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// For when you connect to backend later
// async function getArticleFromAPI(slug: string) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`, {
//       next: { revalidate: 3600 }
//     });
    
//     if (!res.ok) return null;
    
//     return res.json();
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export default async function ArticlePage({ params }: ArticlePageProps) {
  // For now: using local data
  // const article = getContentBySlug(params.slug);
  
   const { slug } = await params;
  // console.log(' Looking for slug:', slug);

  const article = getContentBySlug(slug);
  // console.log(' Found article:', article);
  
  // delay i added to simulate loading
   await new Promise(resolve => setTimeout(resolve, 3000));

  // When backend is ready
  // const article = await getArticleFromAPI(params.slug);

  // handling the coming soon case
  if (!article) {
     return <ComingSoon title="Coming Soon!" />; 
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <time className="text-sm text-gray-500 mb-4 block">
          {new Date(article.date).toLocaleDateString()}
        </time>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#4a2c5e]">
          {article.title}
        </h1>
        
        <button className="w-[100px] font-medium h-[32px] rounded-[20px] border border-[#B59157] bg-[#B59157] text-white text-[14px] mb-6">
          {article.category}
        </button>
        
        <p className="text-xl text-gray-600 mb-8">
          {article.text}
        </p>
      </div>

      {article.img && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.img}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none">
        <p>{article.content }</p>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  // For now: using local data
  const slugs = getAllSlugs();
  
  // When backend is ready: uncomment this
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  //   const articles = await res.json();
  //   return articles.map((article: { slug: string }) => ({
  //     slug: article.slug,
  //   }));
  // } catch (error) {
  //   console.log(error);
  //   return [];
  // }
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}