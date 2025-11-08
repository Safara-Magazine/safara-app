export interface HighlightsImages {
  img: string;
  text: string;
  title?: string;
  category: string;
  slug?: string;
}
// my bug was here -- i had to make title optional

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
  content?: string;
}

export const landingPageHighLights: HighlightsImages[] = [
  {
    slug: "interviews",
    img: "/images/interviews.png",
    text: "Interviews",
    category: "interviews",
  },
  {
    slug: "destination-highlight",
    img: "/images/destination.png",
    text: "Destination Highlight",
    category: "destination",
  },
  {
    slug: "fashion",
    img: "/images/fashion.jpg",
    text: "Fashion",
    category: "fashion",
  },
  {
    slug: "culture",
    img: "/images/culture.png",
    text: "Culture",
    category: "culture",
  },
];

export const landingPageNews: LandingPageNews[] = [
  {
    img: "/images/hannatu.jpg",
    title:
      "Interview with Nigeria’s Minister of Tourism & Creative Economy - Hannatu Musa Musawa",
    text: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus......",
    span: "continue reading",
    category: "Interview",
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

export const landingPageNews3: HighlightsImages[] = [
  {
    img: "/images/interviews.png",
    text: "Taste of Naija: Nigeria on a Plate – Jollof to AfangSoup",
    category: "Food",
  },
  {
    img: "/images/destination.png",
    text: " Hotel Spotlight: Top 5 Luxury Stays in Nigeria",
    category: "Travel",
    // url: "/hotel",
  },
  {
    img: "/images/fashion.jpg",
    text: "Aviation Feature: Domestic Airlines & Their Routes",
    category: "Travel",
    // url: "/interviews",
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
    date: "2025-02-10",
    content:
      "Modern web development blends creativity with technology — from front-end aesthetics to powerful back-end logic. This article explores how frameworks, responsive design, and evolving user expectations shape the next generation of digital experiences across the global tech landscape.",
  },
  {
    slug: "nigeria-culture-festivals-2025",
    img: "/images/festivals.png",
    title: "Culture & Festivals: ",
    text: "Nigeria's Celebration of 2025",
    alt: "Design system components",
    category: "Culture",
    date: "2025-02-10",
    content:
      "From the Osun-Osogbo Festival to Lagos Carnival, 2025 promises a colorful celebration of Nigeria’s diverse heritage. Discover how music, dance, and tradition unite communities, redefining the meaning of cultural pride and creative expression in a modern age.",
  },
  {
    slug: "lifestyle-travel-lagos-luxury-experience",
    img: "/images/lifestyle.png",
    title: "Lifestyle Travel: ",
    text: "The Lagos Luxury Experience (nightlife, fashion, food)",
    alt: "TypeScript code editor",
    category: "Travel",
    date: "2025-02-10",
    content:
      "Lagos sets the stage for a vibrant fusion of luxury and culture. From rooftop lounges in Victoria Island to fine dining in Lekki, experience the city’s dynamic nightlife, bold fashion, and culinary excellence — Africa’s heartbeat in motion.",
  },
  {
    slug: "international-gateway-abuja-lagos",
    img: "/images/abuja.jpg",
    title: "International Gateway: ",
    text: "Abuja & Lagos as Africa's Travel Hubs",
    alt: "Performance metrics dashboard",
    category: "Travel",
    date: "2025-02-10",
    content:
      "As Africa’s economic and diplomatic centers, Abuja and Lagos are redefining international travel connectivity. Explore how upgraded airports, global partnerships, and vibrant city life are positioning Nigeria as a premier gateway to the continent’s future.",
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
