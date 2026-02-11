import { notFound } from "next/navigation";
import Link from "next/link";

import {
  allProductsMap,
  relatedProducts,
} from "@/components/store-components/products";

import ProductGallery from "@/components/product-view/product-gallery";
import ProductInfo from "@/components/product-view/product-info";
import RelatedProducts from "@/components/product-view/related-products";

// ─── DATA FETCHING (FRONTEND ONLY) ────────────────────────────────────────────
async function getProduct(id: string) {
  return allProductsMap[id] ?? null;
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { productId: string };
}

// ─── METADATA ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const product = await getProduct(params.productId);

  return {
    title: product ? `${product.name} – Safara` : "Product Not Found",
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.productId);

  if (!product) notFound();

  const related = relatedProducts
    .filter((p) => p.id !== params.productId)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs text-neutral-500 transition-colors hover:bg-neutral-200"
        >
          <span>←</span>
          <span>{product.category}</span>
        </Link>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
          <ProductInfo product={product} />
        </div>

        {/* Related products */}
        <RelatedProducts products={related} />
      </div>
    </main>
  );
}
