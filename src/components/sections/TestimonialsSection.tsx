"use client";

import React from "react";
import { CircularTestimonials } from "@/components/ui/CircularTestimonials";
import { useLanguage } from "@/hooks/useLanguage";

export function TestimonialsSection() {
  const { messages } = useLanguage();

  return (
    <section className="relative border-y border-[var(--border)]/40 bg-[var(--card)] px-4 py-16 transition-colors sm:px-6 lg:px-8">
      {/* Heritage-inspired background details */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center mb-12">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            {messages.testimonials.badge}
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {messages.testimonials.heading}
          </h2>
          <p className="mx-auto max-w-xl text-xs text-[var(--muted-foreground)] sm:text-sm">
            {messages.testimonials.subtitle}
          </p>
        </div>

        <CircularTestimonials />
      </div>
    </section>
  );
}
