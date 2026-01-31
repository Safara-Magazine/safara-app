// app/store/page.tsx
import { Suspense } from "react";
import Store from "@/components/store-components/StorePage";

export default function StorePage() {
  return (
    <Suspense fallback={<div>Loading store…</div>}>
      <Store />
    </Suspense>
  );
}
