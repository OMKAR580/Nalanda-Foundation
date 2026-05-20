"use client";

import React from "react";
import { CircularTestimonials } from "@/components/ui/CircularTestimonials";

export function TestimonialsSection() {
  return (
    <section className="relative border-y border-[var(--border)]/40 bg-[var(--card)] px-4 py-16 transition-colors sm:px-6 lg:px-8">
      {/* Heritage-inspired background details */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center mb-12">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            Student Success
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            What Our Learners Say
          </h2>
          <p className="mx-auto max-w-xl text-xs text-[var(--muted-foreground)] sm:text-sm">
            Stories from students building practical skills, confidence, and career-ready portfolios.
          </p>
        </div>

        <CircularTestimonials />
      </div>
    </section>
  );
}
