
import Image from "@/components/Image";
import {  getAllSlugs } from '@/lib/omniContents';
import ComingSoon from '@/components/component.comingsoon';
import { BACKEND_ENDPOINTS } from "@/auth/lib/backendConfig";
// import axios from "axios";
// import { useState, useEffect } from "react";


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


// testing this 
async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(BACKEND_ENDPOINTS.ARTICLES.BY_IDENTIFIER(slug), {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.log('Article not found:', res.status);
      return null;
    }

    const data = await res.json();
    console.log('Response data:', data);
    
   
    return data.data; 
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}



export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return <ComingSoon title="Coming Soon!" />; 
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <time className="text-sm text-gray-500 mb-4 block">
          
          {new Date(article.createdAt).toLocaleDateString()}
        </time>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#4a2c5e]">
          {article.title}
        </h1>
        
        <button className="w-[100px] font-medium h-[32px] rounded-[20px] border border-[#B59157] bg-[#B59157] text-white text-[14px] mb-6">
          {article.category}
        </button>
        
        
        <p className="text-xl text-gray-600 mb-8">
          {article.excerpt}
        </p>
      </div>

    
      {article.images?.[0]?.url && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.images[0].url}
            alt={article.images[0].altText || article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none">
       
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/*  Add tags if they exist */}
      {/* {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex gap-2">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-[#EBB659]/20 text-[#B59157] rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      )} */}
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