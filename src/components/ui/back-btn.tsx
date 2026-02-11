"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface BackButtonProps {
  children: ReactNode;
  fallbackHref?: string; // if user opened product in new tab
  className?: string;
}

export default function BackButton({
  children,
  fallbackHref = "/products",
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // If there is history → go back
    if (window.history.length > 1) {
      router.back();
    } else {
      // Direct visit / refresh fallback
      router.push(fallbackHref);
    }
  };

  return (
    <button onClick={handleBack} className={className}>
      {children}
    </button>
  );
}
