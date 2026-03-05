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