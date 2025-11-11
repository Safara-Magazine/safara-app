"use client";

import ThreeCardDisplay from "@/components/templates/ThreeCardDisplay/page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FullDisplay = () => {
  const router = useRouter();
  return (
    <div className="p-8">
      <button onClick={() => router.back()} className="px-4 py-2 ">
        <ArrowLeft />
      </button>
      <ThreeCardDisplay title="features" />
    </div>
  );
};

export default FullDisplay;
