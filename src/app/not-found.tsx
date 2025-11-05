"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-screen text-center bg-[#0a0a0a] text-white overflow-hidden"
    >
      <h1 className="fade-in text-8xl font-bold text-red-500 tracking-widest mb-4">
        404
      </h1>
      <p className="fade-in text-xl max-w-md mx-auto text-gray-400">
        The page you’re looking for has vanished into the void.  
        Perhaps it never existed — or maybe it’s just hiding.
      </p>
      <Link
        href="/"
        className="fade-in mt-8 px-6 py-3 border border-gray-700 rounded-lg text-gray-200 hover:bg-gray-800 transition-all"
      >
        Return Home
      </Link>

      
    </div>
  );
}
