"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getCourseFallbackImage } from "@/data/courses";

interface CourseImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export function CourseImage({
  src,
  alt,
  category,
  className = "",
  fill = true,
  width,
  height,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: CourseImageProps) {
  const fallback = getCourseFallbackImage(category);
  const resolvedSrc = src || fallback;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imgSrc = failedSource === resolvedSrc ? fallback : resolvedSrc;

  const handleError = () => {
    if (resolvedSrc !== fallback) {
      setFailedSource(resolvedSrc);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
        onError={handleError}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={handleError}
      priority={priority}
    />
  );
}
