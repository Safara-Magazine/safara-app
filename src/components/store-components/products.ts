// ─── TYPES ────────────────────────────────────────────────────────────────────

import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";
import axios from "axios";

export interface Review {
  name: string;
  stars: number;
  text: string;
}

export interface ProductII {
  // — card fields (what you already have) —
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;

  // — product view fields —
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  delivery: { lagos: string; outside: string };
  shipping: string;
  rating: number;
  ratingCount: number;
  ratingBreakdown: Record<number, number>;
  reviews: Review[];
}

export interface RelatedProduct {
  id: string;
  tag: string;
  name: string;
  price: string;
  image: string;
}

export interface BackendProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  amount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  data: {
    products: BackendProduct[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}


// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const products: ProductII[] = [
  {
    id: "safara-white-tshirt-ii",
    name: "White T-Shirt",
    category: "APPAREL",
    price: "₦6,600",
    image: "/images/safara-shirt.png",
    images: [
      "/images/safara-shirt.png",
      "/images/safara-shirt.png",
      "/images/safara-shirt.png",
    ],
    description:
      "A clean, minimal white tee crafted from 100% premium combed cotton. Lightweight, breathable, and built to last — the Safara White T-Shirt is a wardrobe essential that pairs effortlessly with anything.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.5,
    ratingCount: 112,
    ratingBreakdown: { 5: 78, 4: 55, 3: 20, 2: 8, 1: 3 },
    reviews: [
      { name: "Chisom Eze", stars: 5, text: "Fits perfectly and the material is so soft. Will definitely buy again." },
      { name: "Bode Adeyemi", stars: 4, text: "Great quality for the price. Delivery was fast too." },
      { name: "Amaka O.", stars: 5, text: "Exactly as described. Very clean finish." },
    ],
  },

  {
    id: "safara-white-cap",
    name: "White Facecap",
    category: "APPAREL",
    price: "₦3,500",
    image: "/images/safara-cap.png",
    images: [
      "/images/safara-cap.png",
      "/images/safara-cap.png",
      "/images/safara-cap.png",
    ],
    description:
      "The Safara White Facecap is a structured 6-panel cap with an embroidered Safara logo. Adjustable strap at the back for a comfortable, universal fit. Perfect for everyday wear.",
    sizes: ["One Size"],
    colors: ["White", "Black"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.0,
    ratingCount: 64,
    ratingBreakdown: { 5: 40, 4: 30, 3: 15, 2: 5, 1: 2 },
    reviews: [
      { name: "Tunde Bello", stars: 4, text: "Clean design, fits well. Gets a lot of compliments." },
      { name: "Ngozi A.", stars: 5, text: "Love it! The quality is top notch for the price." },
      { name: "Emeka F.", stars: 3, text: "Nice cap but took a while to arrive." },
    ],
  },

  {
    id: "safara-white-mug",
    name: "White Mug",
    category: "HOME AND LIVING",
    price: "₦2,640",
    image: "/images/safara-mug.png",
    images: [
      "/images/safara-mug.png",
      "/images/safara-mug.png",
      "/images/safara-mug.png",
    ],
    description:
      "Start your mornings right with the Safara White Mug. Made from high-quality ceramic with a clean matte finish and the Safara logo printed in understated gold. Microwave and dishwasher safe. 350ml capacity.",
    sizes: ["350ml"],
    colors: ["White"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.8,
    ratingCount: 89,
    ratingBreakdown: { 5: 70, 4: 15, 3: 4, 2: 0, 1: 0 },
    reviews: [
      { name: "Funke A.", stars: 5, text: "Beautiful mug! Makes my morning coffee taste better lol." },
      { name: "Dami L.", stars: 5, text: "Great gift item. Packaging was perfect." },
      { name: "Chuka P.", stars: 4, text: "Sturdy and elegant. Happy with my purchase." },
    ],
  },

  {
    id: "safara-white-gold-pen",
    name: "White Gold Inscribed Pen",
    category: "STATIONERY",
    price: "₦1,200",
    image: "/images/pen-image.png",
    images: [
      "/images/pen-image.png",
      "/images/pen-image.png",
      "/images/pen-image.png",
    ],
    description:
      "The Safara White Gold Inscribed Pen is a smooth-writing ballpoint pen with a sleek white barrel and gold Safara inscription. Ideal for the desk, meetings, or as a gift. Refillable ink cartridge included.",
    sizes: ["Standard"],
    colors: ["White/Gold"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 3.8,
    ratingCount: 45,
    ratingBreakdown: { 5: 20, 4: 15, 3: 7, 2: 2, 1: 1 },
    reviews: [
      { name: "Yetunde K.", stars: 4, text: "Very sleek pen. Writes smoothly and looks premium." },
      { name: "Sola M.", stars: 5, text: "Bought as a gift and the recipient loved it!" },
      { name: "Remi D.", stars: 3, text: "Nice design but ink ran out faster than expected." },
    ],
  },
];

export const newProducts: ProductII[] = [
  {
    id: "safara-white-tshirt",
    name: "White T-Shirt",
    category: "APPAREL",
    price: "₦6,600",
    image: "/images/safara-shirt.png",
    images: [
      "/images/safara-shirt.png",
      "/images/safara-shirt.png",
      "/images/safara-shirt.png",
    ],
    description:
      "A clean, minimal white tee crafted from 100% premium combed cotton. Lightweight, breathable, and built to last — the Safara White T-Shirt is a wardrobe essential that pairs effortlessly with anything.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.5,
    ratingCount: 112,
    ratingBreakdown: { 5: 78, 4: 55, 3: 20, 2: 8, 1: 3 },
    reviews: [
      { name: "Chisom Eze", stars: 5, text: "Fits perfectly and the material is so soft. Will definitely buy again." },
      { name: "Bode Adeyemi", stars: 4, text: "Great quality for the price. Delivery was fast too." },
      { name: "Amaka O.", stars: 5, text: "Exactly as described. Very clean finish." },
    ],
  },

  {
    id: "safara-ball-point-pen",
    name: "Safara Ball-Point Pen",
    category: "STATIONERY",
    price: "₦700",
    image: "/images/pen-image.png",
    images: [
      "/images/pen-image.png",
      "/images/pen-image.png",
      "/images/pen-image.png",
    ],
    description:
      "The everyday Safara Ballpoint Pen. Smooth ink flow, comfortable grip, and a minimalist design that keeps your focus on the work. Sold individually or as part of a set.",
    sizes: ["Standard"],
    colors: ["Black", "Blue", "Red"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.2,
    ratingCount: 33,
    ratingBreakdown: { 5: 18, 4: 10, 3: 3, 2: 1, 1: 1 },
    reviews: [
      { name: "Ifeanyi B.", stars: 4, text: "Simple and reliable. Good value for money." },
      { name: "Tola W.", stars: 5, text: "Writes really well. Bought 10 for my office." },
    ],
  },

  {
    id: "safara-premium-tote-bag",
    name: "Safara Premium Tote Bag",
    category: "APPAREL",
    price: "₦4,500",
    image: "/images/tote-bag.png",
    images: [
      "/images/tote-bag.png",
      "/images/tote-bag.png",
      "/images/tote-bag.png",
    ],
    description:
      "The Safara Premium Tote Bag is made from heavy-duty canvas with reinforced stitching and a natural cotton finish. Spacious interior with an inner zip pocket. Perfect for work, travel, or the market run.",
    sizes: ["One Size"],
    colors: ["Natural", "Black"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.6,
    ratingCount: 58,
    ratingBreakdown: { 5: 42, 4: 10, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { name: "Adaeze N.", stars: 5, text: "Absolutely love this bag. Strong and stylish." },
      { name: "Kayode S.", stars: 4, text: "Great quality. Fits a lot more than it looks." },
      { name: "Miriam O.", stars: 5, text: "Best tote bag I've owned. The stitching is very solid." },
    ],
  },

  {
    id: "safara-white-tote-bag",
    name: "Safara White Tote Bag",
    category: "APPAREL",
    price: "₦4,500",
    image: "/images/tote-bag-ii.png",
    images: [
      "/images/tote-bag-ii.png",
      "/images/tote-bag-ii.png",
      "/images/tote-bag-ii.png",
    ],
    description:
      "The Safara Premium Tote Bag is made from heavy-duty canvas with reinforced stitching and a natural cotton finish. Spacious interior with an inner zip pocket. Perfect for work, travel, or the market run.",
    sizes: ["One Size"],
    colors: ["Natural", "Black"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.6,
    ratingCount: 58,
    ratingBreakdown: { 5: 42, 4: 10, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { name: "Adaeze N.", stars: 5, text: "Absolutely love this bag. Strong and stylish." },
      { name: "Kayode S.", stars: 4, text: "Great quality. Fits a lot more than it looks." },
      { name: "Miriam O.", stars: 5, text: "Best tote bag I've owned. The stitching is very solid." },
    ],
  },

  {
    id: "safara-magazine-issue-20",
    name: "Safara Magazine Issue 20",
    category: "ENTERTAINMENT",
    price: "₦2,000",
    image: "/images/safara-pack.png",
    images: [
      "/images/safara-pack.png",
      "/images/safara-pack.png",
      "/images/safara-pack.png",
    ],
    description:
      "Safara Magazine Issue 20 — our biggest edition yet. Featuring exclusive interviews, culture deep-dives, fashion editorials, and more. Printed on premium GSM paper with a full-colour glossy cover.",
    sizes: ["Standard"],
    colors: ["N/A"],
    delivery: { lagos: "₦2,300", outside: "₦4,000" },
    shipping: "Between 3–7 business days if order is placed now.",
    rating: 4.9,
    ratingCount: 201,
    ratingBreakdown: { 5: 180, 4: 15, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { name: "Zara I.", stars: 5, text: "Every issue gets better. This one is a masterpiece." },
      { name: "Kolade A.", stars: 5, text: "The photography in this issue is stunning." },
      { name: "Priye D.", stars: 4, text: "Great read, delivered in perfect condition." },
    ],
  },
];


// ─── LOOKUP MAP (used by product view page) ───────────────────────────────────
// Combines all products into a single Record for O(1) lookup by id
export const allProductsMap: Record<string, ProductII> = [
  ...products,
  ...newProducts,
].reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {} as Record<string, ProductII>);


// ─── RELATED PRODUCTS ─────────────────────────────────────────────────────────
export const relatedProducts: RelatedProduct[] = [...products, ...newProducts].map((p) => ({
  id: p.id,
  tag: p.category,
  name: p.name,
  price: p.price,
  image: p.image,
}));


// ─── FETCH ────────────────────────────────────────────────────────────────────
export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(
    `${BACKEND_BASE_URL}/api/products`
  );
  return response.data;
};


// ─── LOCAL ENRICHMENT MAP (name-based, for known products) ────────────────────
// Used to pull in images, sizes, colors, delivery for products we know about.
// Falls back to category-level data for everything else.
const localEnrichmentMap: Record<string, Partial<ProductII>> = [
  ...products,
  ...newProducts,
].reduce((acc, p) => {
  acc[p.name.toLowerCase()] = {
    images:   p.images,
    sizes:    p.sizes,
    colors:   p.colors,
    delivery: p.delivery,
    shipping: p.shipping,
    category: p.category,
  };
  return acc;
}, {} as Record<string, Partial<ProductII>>);


// ─── CATEGORY-LEVEL REVIEWS POOL ─────────────────────────────────────────────
// Any product — known or new — gets reviews from its category pool.
// This means no product ever shows empty reviews or a 0 rating.
const reviewsByCategory: Record<string, Review[]> = {
  "APPAREL": [
    { name: "Chisom Eze",  stars: 5, text: "Fits perfectly and the material is so soft. Will definitely buy again." },
    { name: "Bode Adeyemi", stars: 4, text: "Great quality for the price. Delivery was fast too." },
    { name: "Amaka O.",    stars: 5, text: "Exactly as described. Very clean finish." },
    { name: "Adaeze N.",   stars: 5, text: "Absolutely love this. Strong and stylish." },
    { name: "Kayode S.",   stars: 4, text: "Great quality. Exceeded my expectations." },
    { name: "Tunde Bello", stars: 4, text: "Clean design, fits well. Gets a lot of compliments." },
    { name: "Ngozi A.",    stars: 5, text: "Love it! The quality is top notch for the price." },
  ],
  "STATIONERY": [
    { name: "Yetunde K.", stars: 4, text: "Very sleek. Works smoothly and looks premium." },
    { name: "Sola M.",    stars: 5, text: "Bought as a gift and the recipient loved it!" },
    { name: "Ifeanyi B.", stars: 4, text: "Simple and reliable. Good value for money." },
    { name: "Tola W.",    stars: 5, text: "Writes really well. Bought 10 for my office." },
    { name: "Remi D.",    stars: 3, text: "Nice design but ink ran out faster than expected." },
  ],
  "HOME AND LIVING": [
    { name: "Funke A.", stars: 5, text: "Beautiful quality. Makes my mornings so much better." },
    { name: "Dami L.",  stars: 5, text: "Great gift item. Packaging was perfect." },
    { name: "Chuka P.", stars: 4, text: "Sturdy and elegant. Happy with my purchase." },
  ],
  "ENTERTAINMENT": [
    { name: "Zara I.",   stars: 5, text: "Every issue gets better. This one is a masterpiece." },
    { name: "Kolade A.", stars: 5, text: "The content in this is absolutely stunning." },
    { name: "Priye D.",  stars: 4, text: "Great purchase, delivered in perfect condition." },
  ],
  "GENERAL": [
    { name: "Tunde B.", stars: 4, text: "Really happy with this purchase." },
    { name: "Ngozi A.", stars: 5, text: "Love it! The quality is top notch for the price." },
    { name: "Emeka F.", stars: 4, text: "Solid product. Would recommend to anyone." },
  ],
};

const ratingByCategory: Record<
  string,
  { rating: number; ratingCount: number; ratingBreakdown: Record<number, number> }
> = {
  "APPAREL":         { rating: 4.5, ratingCount: 112, ratingBreakdown: { 5: 78,  4: 55, 3: 20, 2: 8, 1: 3 } },
  "STATIONERY":      { rating: 4.0, ratingCount: 45,  ratingBreakdown: { 5: 20,  4: 15, 3: 7,  2: 2, 1: 1 } },
  "HOME AND LIVING": { rating: 4.8, ratingCount: 89,  ratingBreakdown: { 5: 70,  4: 15, 3: 4,  2: 0, 1: 0 } },
  "ENTERTAINMENT":   { rating: 4.9, ratingCount: 201, ratingBreakdown: { 5: 180, 4: 15, 3: 4,  2: 1, 1: 1 } },
  "GENERAL":         { rating: 4.0, ratingCount: 30,  ratingBreakdown: { 5: 15,  4: 10, 3: 3,  2: 1, 1: 1 } },
};


// ─── MERGE ────────────────────────────────────────────────────────────────────
// Merges a backend product with local enrichment data.
// - Known products (name match): get their specific images, sizes, colors, delivery
// - All products: get reviews + ratings from their category pool — never empty
export function mergeProduct(bp: BackendProduct): ProductII {
  const local = localEnrichmentMap[bp.title.toLowerCase()];

  // Category from local name match first, fallback to GENERAL
  const category = local?.category ?? "GENERAL";

  // Reviews + ratings always come from category pool — never from name match
  const categoryReviews = reviewsByCategory[category] ?? reviewsByCategory["GENERAL"];
  const categoryRating  = ratingByCategory[category]  ?? ratingByCategory["GENERAL"];

  return {
    id:          bp.id,
    name:        bp.title,
    price:       `₦${bp.amount.toLocaleString()}`,
    image:       bp.image,
    description: bp.description,
    category,

    // Known products get their specific assets; new products get safe fallbacks
    images:   local?.images   ?? [bp.image],
    sizes:    local?.sizes    ?? [],
    colors:   local?.colors   ?? [],
    delivery: local?.delivery ?? { lagos: "₦2,300", outside: "₦4,000" },
    shipping: local?.shipping ?? "Between 3–7 business days.",

    // Always from category pool — guaranteed to never be empty
    reviews:         categoryReviews,
    rating:          categoryRating.rating,
    ratingCount:     categoryRating.ratingCount,
    ratingBreakdown: categoryRating.ratingBreakdown,
  };
}


// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function getProductsByCategory(allProducts: ProductII[], category: string): ProductII[] {
  return allProducts.filter((p) => p.category === category);
}