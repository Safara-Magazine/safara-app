export interface HighlightsImages {
  img: string;
  text: string;
  category: string;
  url: string;
}

export interface LandingPageNews {
  img: string;
  title: string;
  text: string;
  span: string;
  category: string;
}

export interface Article {
  slug: string;
  img: string;
  title: string;
  text: string;
  alt?: string;
  category: string;
  date?: string;  

}

export const landingPageHighLights: HighlightsImages[] = [
  {
    img: "/images/interviews.png",
    text: "Interviews",
    category: "interviews",
    url: "/interviews",
  },
  {
    img: "/images/destination.png",
    text: "Destination Highlight",
    category: "destination",
    url: "/destination",
  },
  {
    img: "/images/fashion.jpg",
    text: "Fashion",
    category: "fashion",
    url: "/fashion",
  },
  {
    img: "/images/culture.png",
    text: "Culture",
    category: "culture",
    url: "/culture",
  },
  {
    img: "/images/culture.png",
    text: "Taste of Naija",
    category: "food",
    url: "/food",
  },
  {
    img: "/images/culture.png",
    text: "Lifestyle",
    category: "lifestyle",
    url: "/lifestyle",
  },
  {
    img: "/images/culture.png",
    text: "Travel Tips & Guides",
    category: "travel",
    url: "/travel",
  },
  {
    img: "/images/culture.png",
    text: "Original Content",
    category: "original",
    url: "/original",
  },
];

export const landingPageNews: LandingPageNews[] = [
  {
    img: "/images/hannatu.jpg",
    title:
      "Interview with Nigeria’s Minister of Tourism & Creative Economy - Hannatu Musa Musawa",
    text: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus......",
    span: "continue reading",
    category: "Culture",
  },
];

export const landingPageNews2: LandingPageNews[] = [
  {
    img: "/images/hannatu.jpg",
    title: "International Airlines: Global Connections to Nigeria",
    text: "Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero . Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit.... ",
    span: "continue reading",
    category: "Travel",
  },
];

//    sage was here lol
export const landingPageNews3: HighlightsImages[] = [
  {
    img: "/images/interviews.png",
    text: "Taste of Naija: Nigeria on a Plate – Jollof to AfangSoup",
    category: "Food",
    url: "/food",
  },
  {
    img: "/images/destination.png",
    text: " Hotel Spotlight: Top 5 Luxury Stays in Nigeria",
    category: "Travel",
    url: "/hotel",
  },
  {
    img: "/images/fashion.jpg",
    text: "Aviation Feature: Domestic Airlines & Their Routes",
    category: "Travel",
    url: "/interviews",
  },
];

export const landingPageArticles: Article[] = [
  {
    slug: "understanding-modern-web-development",
    img: "/images/calabar.png",
    title: "Understanding Modern Web Development",
    text: "",
    alt: "Modern web development workspace",
    category: "Lifestyle",
  },
  {
    slug: "design-systems-guide",
    img: "/images/festivals.png",
    title: "Culture & Festivals: ",
    text: "Nigeria's Celebration of 2025",
    alt: "Design system components",
    category: "Culture",
  },
  {
    slug: "typescript-best-practices",
    img: "/images/lifestyle.png",
    title: "Lifestyle Travel: ",
    text: "The Lagos Luxury Experience(nightlife, fashion, food)",
    alt: "TypeScript code editor",
    category: "Travel",
  },
  {
    slug: "performance-optimization",
    img: "/images/abuja.jpg",
    title: "International Gateway: ",
    text: "Abuja & Lagos as Africa's Travel Hubs",
    alt: "Performance metrics dashboard",
    category: "Travel",
  },
];


export const dummyArticles: Article[] = [
  {
    slug: "understanding-modern-web-development",
    img: "/images/hompagehero.png",
    title: "Understanding Modern Web Development",
    text: "Explore the latest trends and best practices in web development, from React to Next.js and beyond.",
    alt: "Modern web development workspace",
    category: "Development",
  },
  {
    slug: "design-systems-guide",
    img: "/images/hompagehero.png",
    title: "Building Scalable Design Systems",
    text: "Learn how to create and maintain design systems that grow with your product.",
    alt: "Design system components",
    category: "Design",
  },
  {
    slug: "typescript-best-practices",
    img: "/images/hompagehero.png",
    title: "TypeScript Best Practices for 2025",
    text: "Master TypeScript with these essential tips and patterns for modern applications.",
    alt: "TypeScript code editor",
    category: "Development",
  },
  {
    slug: "performance-optimization",
    img: "/images/hompagehero.png",
    title: "Web Performance Optimization",
    text: "Techniques to make your website lightning fast and improve user experience.",
    alt: "Performance metrics dashboard",
    category: "Performance",
  },
  {
    slug: "accessible-web-design",
    img: "/images/hompagehero.png",
    title: "Creating Accessible Web Experiences",
    text: "Build inclusive websites that work for everyone with these accessibility principles.",
    alt: "Accessibility testing tools",
    category: "Accessibility",
  },
  {
    slug: "nextjs-server-components",
    img: "/images/hompagehero.png",
    title: "Next.js Server Components Deep Dive",
    text: "Understanding the power of React Server Components in Next.js applications.",
    alt: "Next.js logo and code",
    category: "Development",
  },
];