"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { galleryItems, krishanaGalleryItems, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { RadialScrollGallery } from "@/components/ui/RadialScrollGallery";

const DEFAULT_ACTIVE_INDEX = Math.floor((galleryItems.length - 1) / 2);

function GalleryCard({
  item,
  priority = false,
}: {
  item: GalleryItem;
  priority?: boolean;
}) {
  return (
    <article className="glow-card group relative overflow-hidden rounded-[28px] border border-[var(--border)]/55 bg-[var(--card)] shadow-[0_18px_40px_rgba(76,38,18,0.10)]">
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
        <Image
          src={item.imageSrc}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 84vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(31,18,12,0.88)] via-[rgba(31,18,12,0.30)] to-[rgba(31,18,12,0.06)] transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
        <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-[var(--primary)]/86 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary-foreground)] shadow-md">
          {item.category}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-serif text-xl font-extrabold">{item.title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/82">
            {item.caption}
          </p>
        </div>
      </div>
    </article>
  );
}

function KrishanaGalleryCard({ item }: { item: GalleryItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-cyan-500/20 bg-slate-900/40 shadow-[0_16px_36px_rgba(14,165,233,0.08)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_20px_48px_rgba(14,165,233,0.18)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        {imageError ? (
          <div className="w-full h-full bg-[linear-gradient(135deg,#0EA5E9_0%,#10B981_100%)] flex items-center justify-center p-4 text-center text-white font-bold">
            <span className="text-sm font-semibold">{item.title}</span>
          </div>
        ) : (
          <Image
            src={item.imageSrc}
            alt={item.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
        <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-cyan-950/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-400 shadow-md">
          {item.category}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-sans text-base font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h3>
          <p className="mt-1 max-w-sm text-xs text-slate-300 leading-normal line-clamp-2">
            {item.caption}
          </p>
        </div>
      </div>
    </article>
  );
}

export function GallerySection() {
  const { messages } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [isDesktop, setIsDesktop] = useState(false);
  const isKrishana = process.env.NEXT_PUBLIC_SITE_VARIANT === "krishana";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
      
      const timer = setTimeout(() => {
        setIsDesktop(mediaQuery.matches);
      }, 0);

      const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => {
        clearTimeout(timer);
        mediaQuery.removeEventListener("change", handler);
      };
    }
  }, []);

  if (isKrishana) {
    if (isDesktop && !prefersReducedMotion) {
      return <RadialScrollGallery items={krishanaGalleryItems} />;
    }

    return (
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950/5 border-y border-slate-200/10"
      >
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-950/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-500 shadow-sm backdrop-blur-sm dark:border-cyan-400/30">
              {messages.gallery.badge}
            </span>
            <h2 className="font-sans text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              {messages.gallery.heading}
            </h2>
            <p className="text-sm leading-7 text-[var(--muted-foreground)] sm:text-base max-w-2xl mx-auto">
              {messages.gallery.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {krishanaGalleryItems.map((item) => (
              <KrishanaGalleryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--primary)]/12 bg-[var(--card)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--primary)] shadow-sm">
            {messages.gallery.badge}
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {messages.gallery.heading}
          </h2>
          <p className="text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
            {messages.gallery.subtitle}
          </p>
        </div>

        <div className="hidden lg:block">
          <div
            className="flex h-[420px] gap-4"
            onMouseLeave={() => setActiveIndex(DEFAULT_ACTIVE_INDEX)}
          >
            {galleryItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  animate={{ flexGrow: isActive ? 3.6 : 1 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "glow-card group relative basis-0 cursor-pointer overflow-hidden rounded-[30px] border bg-[var(--card)] text-left shadow-[0_24px_46px_rgba(76,38,18,0.12)] transition-[border-color,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    isActive
                      ? "border-[var(--accent)]/55 shadow-[0_28px_56px_rgba(128,0,32,0.18)]"
                      : "border-[var(--border)]/55 hover:border-[var(--primary)]/45",
                  )}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className={cn(
                      "object-cover object-center transition-transform duration-700",
                      isActive ? "scale-[1.04]" : "scale-100",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-[rgba(24,12,8,0.94)] via-[rgba(24,12,8,0.42)] to-[rgba(24,12,8,0.10)] transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-88 group-hover:opacity-95",
                    )}
                  />
                  <div className="absolute inset-0 ring-1 ring-white/10" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-[var(--primary)]/84 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary-foreground)] shadow-md">
                    {item.category}
                  </div>
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.28,
                      y: isActive ? 0 : 18,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-x-0 bottom-0 space-y-2 p-6 text-white"
                  >
                    <h3 className="font-serif text-2xl font-extrabold">
                      {item.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-6 text-white/84">
                      {item.caption}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-5 md:grid lg:hidden">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} priority={index < 2} />
          ))}
        </div>

        <div className="md:hidden">
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
            {galleryItems.map((item, index) => (
              <div key={item.id} className="min-w-[84%] snap-start">
                <GalleryCard item={item} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

