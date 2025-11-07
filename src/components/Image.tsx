"use client";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

export default function Image(props: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-200 rounded-lg`}
      >
        <span className="text-gray-400 text-xs">Image unavailable</span>
      </div>
    );
  }

  return <NextImage {...props} onError={() => setError(true)} />;
}
