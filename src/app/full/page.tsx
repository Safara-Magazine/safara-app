"use client";

import Navigation from "@/components/layout/Header/HomePageNavBar";
import ContentFeedDisplay from "@/components/templates/component.contentfeed";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const FullDisplay = () => {
  const router = useRouter();
  return (
    <div className="pb-8">
      <Navigation />
      <main className="mx-8">
        <button
          onClick={() => router.push("/memories")}
          className="flex items-center gap-2 px-4 py-2 mt-8 bg-[#d4af8f] text-white font-semibold rounded hover:bg-[#c79b77] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Memories Page
        </button>
        <ContentFeedDisplay
          title="features"
          paginationPresent={true}
        />
      </main>
    </div>
  );
};

export default FullDisplay;
