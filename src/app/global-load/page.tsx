"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapTest() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        x: 200,
        duration: 1,
        backgroundColor: "skyblue",
        borderRadius: "1rem",
      });
      console.log("GSAP animation ran successfully!");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div ref={boxRef} className="w-20 h-20 bg-gray-400"></div>
    </div>
  );
}
