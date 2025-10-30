import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  try {
    const res = await fetch(`https://your-api.com/articles/${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    console.log(error)
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Article Header */}
      <div className="mb-8">
        <time className="text-sm text-gray-500 mb-4 block">
          {article.date}
        </time>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {article.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {article.text}
        </p>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={article.img}
          alt={article.alt || article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <p>{article.content}</p>
        {/* Add your full article content here */}
      </article>
    </main>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const res = await fetch('https://your-api.com/articles');
    const articles = await res.json();
    
    return articles.map((article: { slug: string }) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.log(error)
    return [];
  }
}