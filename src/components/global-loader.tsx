"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    // Start by waiting 500ms — only show loader if it's taking long
    showTimeout = setTimeout(() => {
      setLoading(true);

      // Animate loader fade in
      gsap.to(loaderRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "flex",
      });

      // Animate progress bar from 0% to 100%
      gsap.fromTo(
        progressBarRef.current,
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power2.inOut" }
      );
    }, 500);

    // Fade out after navigation finishes
    hideTimeout = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          setLoading(false);
        },
      });
      gsap.set(progressBarRef.current, { width: "0%" });
    }, 2000); // Hide after 2s regardless

    // Cleanup
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [pathname]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0"
      style={{ display: loading ? "flex" : "none" }}
    >
      {/* Circular spinner */}
      <Loader2 className="h-10 w-10 text-[#422746] font-bold animate-spin" />

      {/* Top progress bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[3px] bg-[#422746] w-0 rounded-r-full"
      />
    </div>
  );
}
