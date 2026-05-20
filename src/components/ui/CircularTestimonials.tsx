"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function CircularTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeTestimonial = testimonials[activeIndex];
  const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (activeIndex + 1) % testimonials.length;

  // Variants for slide animation
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8">
      {/* Testimonials container */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

        {/* Left Side: Card Deck Stack (Desktop & Mobile) */}
        <div className="relative flex items-center justify-center lg:col-span-5 h-[340px] xs:h-[380px] sm:h-[440px] lg:h-[480px] w-full max-w-[400px] mx-auto overflow-visible select-none">
          <div className="relative flex h-full w-full items-center justify-center">

            {/* Ambient gold/maroon glow behind stack */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_transparent_70%)] opacity-25 blur-3xl dark:opacity-35" />

            {/* Back-left card (Previous) */}
            <motion.div
              key={`prev-${prevIndex}`}
              className="absolute z-10 flex w-[180px] h-[230px] xs:w-[210px] xs:h-[270px] sm:w-[250px] sm:h-[320px] lg:w-[280px] lg:h-[360px] cursor-pointer items-center justify-center rounded-[2rem] border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--card)] to-[var(--background)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] dark:border-[var(--primary)]/30 overflow-hidden"
              onClick={handlePrev}
              initial={{ opacity: 0, scale: 0.7, rotate: -12, x: -40, y: -10 }}
              animate={{ opacity: 0.45, scale: 0.92, rotate: -8, x: -25, y: -8 }}
              exit={{ opacity: 0, scale: 0.7, rotate: -12, x: -40, y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {testimonials[prevIndex].image && !imageErrors[prevIndex] ? (
                <div className="relative h-full w-full">
                  <Image
                    src={testimonials[prevIndex].image}
                    alt={testimonials[prevIndex].name}
                    fill
                    sizes="(max-width: 640px) 210px, 280px"
                    className="object-cover"
                    onError={() => handleImageError(prevIndex)}
                  />
                  <div className="absolute inset-0 bg-[#800020]/10 dark:bg-[#000]/30 transition-all duration-300" />
                </div>
              ) : (
                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${testimonials[prevIndex].color} text-4xl font-bold text-white shadow-inner`}>
                  {testimonials[prevIndex].initials}
                </div>
              )}
            </motion.div>

            {/* Main Center Card (Active) */}
            <motion.div
              key={`active-${activeIndex}`}
              className="absolute z-20 flex w-[200px] h-[255px] xs:w-[230px] xs:h-[295px] sm:w-[270px] sm:h-[345px] lg:w-[300px] lg:h-[385px] items-center justify-center rounded-[2rem] border-[3px] border-[#800020] dark:border-[#D08E2F] bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] p-1 shadow-[0_15px_45px_rgba(128,0,32,0.25)] dark:shadow-[0_15px_50px_rgba(208,142,47,0.25)] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 15, rotate: 2 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 2 }}
              exit={{ scale: 0.8, opacity: 0, y: 15, rotate: 2 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {activeTestimonial.image && !imageErrors[activeIndex] ? (
                <div className="relative h-full w-full rounded-[1.8rem] overflow-hidden">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    fill
                    sizes="(max-width: 640px) 230px, 300px"
                    className="object-cover"
                    priority
                    onError={() => handleImageError(activeIndex)}
                  />
                  <div className="absolute inset-0 ring-1 ring-[#800020]/20 dark:ring-[#D08E2F]/30 rounded-[1.8rem] pointer-events-none" />
                </div>
              ) : (
                <div className={`flex h-full w-full items-center justify-center rounded-[1.8rem] bg-gradient-to-br ${activeTestimonial.color} text-5xl font-extrabold text-white shadow-inner`}>
                  {activeTestimonial.initials}
                </div>
              )}
            </motion.div>

            {/* Back-right card (Next) */}
            <motion.div
              key={`next-${nextIndex}`}
              className="absolute z-10 flex w-[180px] h-[230px] xs:w-[210px] xs:h-[270px] sm:w-[250px] sm:h-[320px] lg:w-[280px] lg:h-[360px] cursor-pointer items-center justify-center rounded-[2rem] border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--card)] to-[var(--background)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] dark:border-[var(--primary)]/30 overflow-hidden"
              onClick={handleNext}
              initial={{ opacity: 0, scale: 0.7, rotate: 12, x: 40, y: -10 }}
              animate={{ opacity: 0.45, scale: 0.92, rotate: 6, x: 25, y: -8 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 12, x: 40, y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {testimonials[nextIndex].image && !imageErrors[nextIndex] ? (
                <div className="relative h-full w-full">
                  <Image
                    src={testimonials[nextIndex].image}
                    alt={testimonials[nextIndex].name}
                    fill
                    sizes="(max-width: 640px) 210px, 280px"
                    className="object-cover"
                    onError={() => handleImageError(nextIndex)}
                  />
                  <div className="absolute inset-0 bg-[#800020]/10 dark:bg-[#000]/30 transition-all duration-300" />
                </div>
              ) : (
                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${testimonials[nextIndex].color} text-4xl font-bold text-white shadow-inner`}>
                  {testimonials[nextIndex].initials}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Right Side: Active Testimonial Card Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative min-h-[300px] rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--card)]/90 via-[var(--card)]/50 to-[var(--background)] p-6 shadow-xl backdrop-blur-md dark:border-[var(--primary)]/30 dark:shadow-[0_20px_50px_rgba(128,0,32,0.15)] sm:p-8">

            {/* Header: Name and Role at the Top */}
            <div className="border-b border-[var(--border)]/20 pb-4 mb-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2E1E1E] dark:text-[var(--foreground)] tracking-tight">
                {activeTestimonial.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
                {activeTestimonial.role}
              </p>
            </div>

            {/* Star rating row */}
            <div className="mb-4 flex gap-1 text-[var(--accent)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="overflow-hidden min-h-[100px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-4"
                >
                  <p className="font-serif text-base italic leading-relaxed text-[var(--foreground)] sm:text-lg">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls Row */}
            <div className="mt-6 flex items-center justify-between border-t border-[var(--border)]/20 pt-4">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      index === activeIndex ? "w-6 bg-[var(--primary)]" : "w-2 bg-[var(--primary)]/30 hover:bg-[var(--primary)]/65"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows (Black circular buttons matching reference) */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E1E1E] hover:bg-[#800020] text-white transition-all active:scale-95 shadow-md"
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E1E1E] hover:bg-[#800020] text-white transition-all active:scale-95 shadow-md"
                  aria-label="Next Testimonial"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
