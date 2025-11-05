

import { 
  landingPageHighLights, 
  landingPageNews, 
  landingPageNews2, 
  landingPageNews3 ,
  landingPageArticles
} from './constants';


export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}



function normalizeHighlights(items: typeof landingPageHighLights) {
  return items.map(item => ({
    slug: generateSlug(item.title || item.text),
    title: item.title || item.text,
    text: item.text || '',
    img: item.img,
    category: item.category,
    content: '',
    date: new Date().toISOString(),
    span: 'continue reading'
  }));
}

function normalizeNews(items: typeof landingPageNews) {
  return items.map(item => ({
    slug: generateSlug(item.title),
    title: item.title,
    text: item.text,
    img: item.img,
    category: item.category,
    content: item.text,
    date: new Date().toISOString(),
    span: item.span
  }));
}

// the grand merger
export const allContent = [
  ...normalizeHighlights(landingPageHighLights),
  ...normalizeNews(landingPageNews),
  ...normalizeNews(landingPageNews2),
  ...normalizeHighlights(landingPageNews3),
  ...landingPageArticles,
];


export function getContentBySlug(slug: string) {
  return allContent.find(item => item.slug === slug);
}


export function getAllSlugs() {
  return allContent.map(item => item.slug);
}


