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
}: CourseImageProps) {
  const fallback = getCourseFallbackImage(category);
  const [prevSrc, setPrevSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState(src || fallback);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src || fallback);
  }

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      className={`object-cover ${className}`}
      onError={handleError}
      priority={priority}
    />
  );
}
