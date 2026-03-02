// import { notFound } from "next/navigation";
// // import Link from "next/link";
// import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";
// import BackButton from "@/components/ui/back-btn";
// import RatingReview from "@/components/product-view/rating-review";
// import {
//   allProductsMap,
//   relatedProducts,
//   type ProductII,
// } from "@/components/store-components/products";
// import { useMergedProducts } from "../../../auth/hooks/useProductQueries"
// import { useParams } from "next/navigation";
// import StoreNavigation from "@/components/layout/Header/StoreNavBar";

// import ProductGallery from "@/components/product-view/product-gallery";
// import ProductInfo from "@/components/product-view/product-info";
// import RelatedProducts from "@/components/product-view/related-products";
// import { type Product } from "@/lib/services/productService";

// // ─── TYPES ────────────────────────────────────────────────────────────────────

// interface PageProps {
//   params: Promise<{ id: string }>;
// }


// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// // Map a backend Product into the ProductII shape that ProductGallery
// // and ProductInfo expect. Fields the backend doesn't have get sensible defaults.
// function backendToProductII(p: Product): ProductII {
//   return {
//     id: p.id,
//     name: p.title,
//     category: "PRODUCT", // backend doesn't have category yet
//     price: `₦${p.amount?.toLocaleString()}`,
//     image: p.image,
//     images: [p.image], // backend only has one image for now
//     description: p.description,
//     sizes: [], // not on backend yet
//     colors: [], // not on backend yet
//     delivery: { lagos: "₦2,300", outside: "₦4,000" },
//     shipping: "Between 3–7 business days if order is placed now.",
//     rating: 0,
//     ratingCount: 0,
//     ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
//     reviews: [],
//   };
// }

// // ─── DATA FETCHING ────────────────────────────────────────────────────────────

// // Try to fetch the product from the backend first.
// // If it's not found there (404) or the request fails, fall back to the
// // static allProductsMap so existing hardcoded products keep working.
// async function getProduct(id: string): Promise<ProductII | null> {
//   // 1. Try static map first for known products (instant, no network)
//   if (allProductsMap[id]) {
//     return allProductsMap[id];
//   }

//   // 2. Not in static data — try the backend
//   try {
//     const res = await fetch(`${BACKEND_BASE_URL}/api/products/${id}`, {
//       // Revalidate every 60 seconds so new products show up without full redeploy
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) {
//       // 404 or other error — product genuinely doesn't exist
//       console.log("Fetching product with ID:", id);

//       return null;
//     }

//     const json = await res.json();
//     const backendProduct: Product = json.data;
//     return backendToProductII(backendProduct);
//   } catch {
//     // Network error — return null so the page shows notFound()
//     return null;
//   }
// }

// // ─── METADATA ────────────────────────────────────────────────────────────────

// export async function generateMetadata({ params }: PageProps) {
//   const { id } = await params;   

//   const product = await getProduct(id);

//   return {
//     title: product ? `${product.name} – Safara` : "Product Not Found",
//     description: product?.description ?? "",
//   };
// }

// // ─── PAGE ─────────────────────────────────────────────────────────────────────

// export default async function ProductPage({ params }: PageProps) {
//   const { id } = await params;   // ✅ unwrap the Promise

//   const product = await getProduct(id);

//   // Nothing in static data AND nothing from backend — show 404
//   if (!product) notFound();

//   // Related products — filter out the current one and cap at 3
//  const related = relatedProducts
//     .filter((p) => p.id !== id)   // ✅ use the resolved id
//     .slice(0, 3);

//   return (
//     <>
//     <StoreNavigation />
//     <main className="min-h-screen pt-20 bg-neutral-50">
//       <div className="mx-auto max-w-6xl px-4 pb-20 pt-8">
//         {/* Breadcrumb */}
//         <BackButton
//           // href="/products"  
//           className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-200"
//         >
//           <span>←</span>
//           <span>Back</span>
//         </BackButton>

//         {/* Product grid */}
          
//         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 ">

//           <ProductGallery
//             images={product.images}
//             productName={product.name}
//           />
//           <ProductInfo product={product} />
//         </div>

//         {/* rating-review component */}
//         <RatingReview product={product} />

//         {/* Related products */}
//         <RelatedProducts products={related} />
//       </div>
//     </main>
//     </>
//   );
// }


import { notFound } from "next/navigation";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";
import BackButton from "@/components/ui/back-btn";
import RatingReview from "@/components/product-view/rating-review";
import { mergeProduct, type ProductII } from "@/components/store-components/products";
import StoreNavigation from "@/components/layout/Header/StoreNavBar";
import ProductGallery from "@/components/product-view/product-gallery";
import ProductInfo from "@/components/product-view/product-info";
import RelatedProducts from "@/components/product-view/related-products";
import { type Product } from "@/lib/services/productService";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

// ─── DATA FETCHING ────────────────────────────────────────────────────────────

// Fetch ALL products from backend, merge with local enrichment data
async function getAllMergedProducts(): Promise<ProductII[]> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const backendProducts: Product[] = json.data.products;

    // mergeProduct gives real backend ID + local ratings/sizes/reviews
    return backendProducts.map(mergeProduct);
  } catch {
    return [];
  }
}

// ─── METADATA ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const allProducts = await getAllMergedProducts();
  const product = allProducts.find((p) => p.id === id);

  return {
    title: product ? `${product.name} – Safara` : "Product Not Found",
    description: product?.description ?? "",
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const allProducts = await getAllMergedProducts();

  // ✅ Match by real backend ID
  const product = allProducts.find((p) => p.id === id);

  if (!product) notFound();

  // ✅ Related products built from real backend data — correct IDs guaranteed
  const related = allProducts
    .filter((p) => p.id !== id)
    .slice(0, 3)
    .map((p) => ({
      id:    p.id,
      tag:   p.category,
      name:  p.name,
      price: p.price,
      image: p.image,
    }));

  return (
    <>
      <StoreNavigation />
      <main className="min-h-screen pt-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-8">

          <BackButton className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-200">
            <span>←</span>
            <span>Back</span>
          </BackButton>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          <RatingReview product={product} />
          <RelatedProducts products={related} />

        </div>
      </main>
    </>
  );
}