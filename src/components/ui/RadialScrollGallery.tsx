"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

// Safe client-side registration of GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RadialScrollGalleryProps {
  items: GalleryItem[];
}

export function RadialScrollGallery({ items }: RadialScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const totalItems = items.length;
  const angleStep = 13; // Degrees between each card along the wheel
  const maxRotation = ((totalItems - 1) / 2) * angleStep; // E.g., for 7 items: 3 * 13 = 39 degrees

  // Get individual card placement angle relative to the wheel
  const getCardAngle = (index: number) => {
    return (index - (totalItems - 1) / 2) * angleStep;
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Smoothly rotate the entire wheel based on scroll progress
        gsap.fromTo(
          wheelRef.current,
          { rotate: maxRotation },
          {
            rotate: -maxRotation,
            ease: "none",
            scrollTrigger: {
              trigger: pinWrapperRef.current,
              start: "top top",
              end: "+=100%", // Scroll duration is exactly 100% of viewport height
              scrub: 1.0, // Smooth scroll integration
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => {
        mm.revert(); // Safely unregisters all matching matchMedia events and kills associated ScrollTriggers
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-slate-950/20"
      style={{
        // Define a responsive radius to keep fanning uniform and safe from layout shifts
        "--radius": "clamp(680px, 72vh, 900px)",
      } as React.CSSProperties}
    >
      {/* 
        The pinned screen container that drives the ScrollTrigger pinning.
        Using h-screen combined with end: "+=100%" scroll duration ensures a perfectly 
        smooth experience with absolutely zero trailing empty spacer gaps.
      */}
      <div ref={pinWrapperRef} className="relative h-screen w-full">
        {/* Pinned Sticky Window Frame */}
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden py-16 px-4">
          
          {/* Top Info Header */}
          <div className="mx-auto max-w-3xl space-y-4 text-center z-10">
            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-950/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-500 shadow-sm backdrop-blur-sm dark:border-cyan-400/30">
              Gallery Cohorts
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-slate-100 sm:text-4xl tracking-tight">
              Explore Krishana Cohorts In Action
            </h2>
            <p className="text-sm leading-7 text-slate-400 sm:text-base max-w-2xl mx-auto">
              Workshops, mentorship, digital learning, project building, community support, and student success moments.
            </p>
          </div>

          {/* Radial Wheel Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 
              Center of rotation is positioned dynamically based on 55vh (card screen center) + radius
            */}
            <div
              ref={wheelRef}
              className="absolute left-1/2 flex items-center justify-center rounded-full pointer-events-auto transition-transform duration-200 ease-out will-change-transform"
              style={{
                top: "calc(55vh + var(--radius))",
                width: "40px",
                height: "40px",
                transformOrigin: "center center",
                transform: `rotate(${maxRotation}deg) translateZ(0)`, // Server fallback matches first item centered + GPU acceleration
              }}
            >
              {items.map((item, index) => {
                const cardAngle = getCardAngle(index);
                const isHovered = hoveredId === item.id;
                const isAnyHovered = hoveredId !== null;
                const isSibling = isAnyHovered && !isHovered;

                return (
                  <div
                    key={item.id}
                    className="absolute left-1/2 top-1/2 origin-center will-change-transform"
                    style={{
                      transform: `translate3d(-50%, -50%, 0) rotate(${cardAngle}deg) translateY(calc(-1 * var(--radius)))`,
                    }}
                  >
                    {/* Inner interactive Card container */}
                    <div
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={cn(
                        "relative transition-all duration-500 ease-out origin-center select-none will-change-[transform,opacity,filter]",
                        isHovered ? "scale-[1.10] z-30" : "scale-100 z-10",
                        isSibling ? "opacity-65 blur-[1px] scale-[0.97]" : "opacity-100"
                      )}
                    >
                      {/* Premium card glowing shadow base */}
                      <div
                        className={cn(
                          "absolute -inset-px rounded-[24px] bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 blur-md transition-opacity duration-500 -z-10",
                          isHovered ? "opacity-25" : "opacity-0"
                        )}
                      />

                      {/* The glass card */}
                      <article className="relative w-[280px] h-[360px] rounded-[24px] overflow-hidden border border-cyan-500/20 bg-slate-900/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col justify-between group transition-colors duration-500 hover:border-cyan-400/40">
                        {/* Card Image section */}
                        <div className="relative flex-1 overflow-hidden">
                          {imageErrors[item.id] ? (
                            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950 flex flex-col items-center justify-center p-6 text-center border-b border-cyan-500/10">
                              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3">
                                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                                {item.category}
                              </span>
                            </div>
                          ) : (
                            <Image
                              src={item.imageSrc}
                              alt={item.alt}
                              fill
                              sizes="280px"
                              onError={() => handleImageError(item.id)}
                              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                          {/* Rich ambient dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                          <div className="absolute inset-0 ring-1 ring-white/5" />

                          {/* Category Badge */}
                          <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-cyan-950/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-400 shadow-md">
                            {item.category}
                          </div>
                        </div>

                        {/* Title & Caption section */}
                        <div className="p-5 bg-slate-950/50 backdrop-blur-sm border-t border-cyan-500/10">
                          <h3 className="font-sans text-base font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom indicator instruction */}
          <div className="mx-auto text-center z-10 pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500/60 animate-pulse">
              Scroll To Rotate Cohorts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
