import { Suspense } from "react";
import Store from "@/components/store-components/StorePage";
import GlobalLoader from "@/components/global-loader";

export default function StorePage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Store />
    </Suspense>
  );
}
