export interface HighlightsImages {
  img: string,
  text: string,
  category: string
}

export interface LandingPageNews {
  img: string,
  title: string,
  text: string,
  span: string,
  category: string
}

export interface Article {
  slug: string;
  img: string;
  title: string;
  text: string;
  alt?: string;
  category: string;
}

export const landingPageHighLights: HighlightsImages[] = [
  {
      img: '/images/interviews.png',
      text: "Interviews",
      category: "interviews"
  },
  {
      img: '/images/destination.png',
      text: "Destination Highlight",
      category: "destination"
  },
  {
      img: '/images/fashion.jpg',
      text: "Fashion",
      category: "fashion"
  },
  {
      img: '/images/culture.png',
      text: "Culture",
      category: "culture"
  },
]


export const landingPageNews: LandingPageNews[] = [
  { img: '/images/hannatu.jpg',
  title: 'Interview with Nigeria’s Minister of Tourism & Creative Economy - Hannatu Musa Musawa',
  text: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus......",
  span: 'continue reading',
  category: 'Culture'
}
]

export const landingPageNews2: LandingPageNews[] = [
  { img: '/images/hannatu.jpg',
  title: 'International Airlines: Global Connections to Nigeria',
  text: "Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero . Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero Story subheadline Lorem ipsum dolor sit amet, consectetur adipiscing elit.... ",
  span: 'continue reading',
  category: 'Travel'
}
]

//    sage was here lol
export const landingPageNews3: HighlightsImages[] = [
  {
      img: '/images/interviews.png',
      text: "Taste of Naija: Nigeria on a Plate – Jollof to AfangSoup",
      category: "Food"
  },
  {
      img: '/images/destination.png',
      text: " Hotel Spotlight: Top 5 Luxury Stays in Nigeria",
      category: "Travel"
  },
  {
      img: '/images/fashion.jpg',
      text: "Aviation Feature: Domestic Airlines & Their Routes",
      category: "Travel"
  },
]


export const landingPageArticles: Article[] = [
  {
    slug: 'understanding-modern-web-development',
    img: '/images/calabar.png',
    title: 'Understanding Modern Web Development',
    text: '',
    alt: 'Modern web development workspace',
    category: 'Lifestyle'
  },
  {
    slug: 'design-systems-guide',
    img: '/images/festivals.png',
    title: 'Culture & Festivals: ',
    text: "Nigeria's Celebration of 2025",
    alt: 'Design system components',
    category: 'Culture'
  },
  {
    slug: 'typescript-best-practices',
    img: '/images/lifestyle.png',
    title: 'Lifestyle Travel: ',
    text: 'The Lagos Luxury Experience(nightlife, fashion, food)',
    alt: 'TypeScript code editor',
    category: 'Travel'
  },
  {
    slug: 'performance-optimization',
    img: '/images/abuja.jpg',
    title: 'International Gateway: ',
    text: "Abuja & Lagos as Africa's Travel Hubs",
    alt: 'Performance metrics dashboard',
    category: 'Travel'
  },
];
