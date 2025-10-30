'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Article {
  slug: string;
  img: string;
  title: string;
  text: string;
  date: string;
  alt?: string;
}

interface ArticleFeatureProps {
  articles?: Article[];
  maxArticles?: number;
}

const DUMMY_ARTICLES: Article[] = [
  {
    slug: 'understanding-modern-web-development',
    img: '/images/hompagehero.png',
    title: 'Understanding Modern Web Development',
    text: 'Explore the latest trends and best practices in web development, from React to Next.js and beyond.',
    date: '29th Oct 2025',
    alt: 'Modern web development workspace'
  },
  {
    slug: 'design-systems-guide',
    img: '/images/hompagehero.png',
    title: 'Building Scalable Design Systems',
    text: 'Learn how to create and maintain design systems that grow with your product.',
    date: '28th Oct 2025',
    alt: 'Design system components'
  },
  {
    slug: 'typescript-best-practices',
    img: '/images/hompagehero.png',
    title: 'TypeScript Best Practices for 2025',
    text: 'Master TypeScript with these essential tips and patterns for modern applications.',
    date: '27th Oct 2025',
    alt: 'TypeScript code editor'
  },
  {
    slug: 'performance-optimization',
    img: '/images/hompagehero.png',
    title: 'Web Performance Optimization',
    text: 'Techniques to make your website lightning fast and improve user experience.',
    date: '26th Oct 2025',
    alt: 'Performance metrics dashboard'
  },
  {
    slug: 'accessible-web-design',
    img: '/images/hompagehero.png',
    title: 'Creating Accessible Web Experiences',
    text: 'Build inclusive websites that work for everyone with these accessibility principles.',
    date: '25th Oct 2025',
    alt: 'Accessibility testing tools'
  },
  {
    slug: 'nextjs-server-components',
    img: '/images/hompagehero.png',
    title: 'Next.js Server Components Deep Dive',
    text: 'Understanding the power of React Server Components in Next.js applications.',
    date: '24th Oct 2025',
    alt: 'Next.js logo and code'
  },
];

export const FeatureComponent: React.FC<ArticleFeatureProps> = ({
  articles,
  maxArticles = 6,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const remainingArticlesRef = useRef<HTMLDivElement>(null);

  const displayArticles = (articles && articles.length > 0 
    ? articles 
    : DUMMY_ARTICLES
  ).slice(0, maxArticles);

  useEffect(() => {
    if (!sectionRef.current || displayArticles.length === 0) return;

    const ctx = gsap.context(() => {
      // Featured article animation
      if (featuredRef.current) {
        const featuredTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        });

        // Image zoom and fade in
        featuredTimeline.fromTo(
          featuredRef.current.querySelector('.featured-image'),
          {
            scale: 1.3,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          }
        );

        // Overlay fade in
        featuredTimeline.fromTo(
          featuredRef.current.querySelector('.featured-overlay'),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '-=0.8'
        );

        // Content slide up with stagger
        featuredTimeline.fromTo(
          featuredRef.current.querySelectorAll('.featured-content > *'),
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      // Remaining articles stagger animation
      if (remainingArticlesRef.current) {
        const articles = remainingArticlesRef.current.querySelectorAll('.article-card');
        
        gsap.fromTo(
          articles,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: remainingArticlesRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Hover animation for each article card
        articles.forEach((card) => {
          const image = card.querySelector('.article-image');
          const content = card.querySelector('.article-content');

          card.addEventListener('mouseenter', () => {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.4,
              ease: 'power2.out',
            });
            gsap.to(content, {
              x: 5,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
            gsap.to(content, {
              x: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }

      // Featured article hover animation
      if (featuredRef.current) {
        const featuredImage = featuredRef.current.querySelector('.featured-image');
        const featuredContent = featuredRef.current.querySelector('.featured-content');

        featuredRef.current.addEventListener('mouseenter', () => {
          gsap.to(featuredImage, {
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(featuredContent, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        featuredRef.current.addEventListener('mouseleave', () => {
          gsap.to(featuredImage, {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(featuredContent, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [displayArticles.length]);

  if (displayArticles.length === 0) {
    return null;
  }

  const [featuredArticle, ...remainingArticles] = displayArticles;

  return (
    <section ref={sectionRef} className="w-full py-12 ">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Article - Left Side */}
          <Link 
            ref={featuredRef}
            href={`/articles/${featuredArticle.slug}`}
            className="group relative max-h-[751px]  overflow-hidden rounded-lg"
          >
            <Image
              src={featuredArticle.img}
              alt={featuredArticle.alt || featuredArticle.title}
              fill
              className="featured-image object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="featured-overlay absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="featured-content absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <time className="text-sm font-medium text-gray-200 mb-3 block">
                {featuredArticle.date}
              </time>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 line-clamp-2">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-200 text-base md:text-lg line-clamp-2">
                {featuredArticle.text}
              </p>
            </div>
          </Link>

          {/* Remaining Articles - Right Side */}
          <div ref={remainingArticlesRef} className="flex flex-col gap-2 max-h-[751px]">
            {remainingArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-card group  flex gap-2 rounded-lg shadow-md hover:bg-gray-50 hover:shadow-2xl text-[#1D1B18] transition-colors"
              >
                {/* Article Image */}
                <div className="relative w-32 h-32 md:w-40 md:h-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={article.img}
                    alt={article.alt || article.title}
                    fill
                    className="article-image object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="article-content flex-1 flex flex-col justify-between min-w-0">
                  <div className='flex flex-col justify-between h-full p-1'>
                    <div className='block md:flex items-center justify-between'>
                        <h3 className="text-base md:text-lg font-bold text-[#1D1B18] mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                        </h3>
                        <time className="text-xs md:text-sm font-medium text-red-500 mb-2 block">
                        {article.date}
                        </time>
                    </div>
                    <p className="text-[14px] text-[#1D1B18]">
                      {article.text}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComponent;