"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import { currentSite } from "@/config/site";
import {
  HeroVisual,
  type HeroVisualBadge,
} from "@/components/sections/HeroVisual";
import { TypewriterHeadline } from "@/components/ui/TypewriterHeadline";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

interface HeroCopyBadge {
  label: string;
  icon: LucideIcon;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export function HeroSection() {
  const { hasLoadedStatus, isAuthLoaded, isSignedIn, status } = useRegistrationStatus();
  const { messages } = useLanguage();
  const hasResolvedSignedInState = isAuthLoaded && isSignedIn;
  const isRegistrationStatusPending = hasResolvedSignedInState && !hasLoadedStatus;
  const isRegisteredUser = status.authenticated && status.registered;
  const registrationHref = hasResolvedSignedInState
    ? isRegisteredUser
      ? "/dashboard"
      : isRegistrationStatusPending
        ? "/dashboard"
        : "/registration"
    : "/sign-in?redirect_url=/registration";
  const registrationLabel = isRegisteredUser || isRegistrationStatusPending
    ? messages.common.goToDashboard
    : messages.common.completeRegistration;
  const prefersReducedMotion = useReducedMotion();
  const enableEntryMotion = !prefersReducedMotion;
  const heroVisualBadges: HeroVisualBadge[] = [
    {
      label: messages.hero.visualBadges[0],
      icon: ShieldCheck,
      positionClass: "-left-8 top-[18%]",
      depth: 1.25,
    },
    {
      label: messages.hero.visualBadges[1],
      icon: Award,
      positionClass: "left-[4%] bottom-[15%]",
      depth: 0.95,
    },
    {
      label: messages.hero.visualBadges[2],
      icon: Sparkles,
      positionClass: "right-0 top-[16%]",
      depth: 1.15,
    },
    {
      label: messages.hero.visualBadges[3],
      icon: BriefcaseBusiness,
      positionClass: "right-[4%] bottom-[12%]",
      depth: 0.9,
    },
  ];
  const heroCopyBadges: HeroCopyBadge[] = [
    {
      label: messages.hero.copyBadges[0],
      icon: ShieldCheck,
    },
    {
      label: messages.hero.copyBadges[1],
      icon: ShieldCheck,
    },
    {
      label: messages.hero.copyBadges[2],
      icon: Award,
    },
    {
      label: messages.hero.copyBadges[3],
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]/30 px-4 sm:px-6 lg:px-8 -mt-16 pt-16">
      <div
        aria-hidden="true"
        className="heritage-pattern absolute inset-0 opacity-78"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(128,0,32,0.16),_transparent_68%)] dark:bg-[radial-gradient(circle_at_top,_rgba(195,82,55,0.18),_transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-6 h-64 w-64 rounded-full bg-[var(--primary)]/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-12 h-64 w-64 rounded-full bg-[var(--accent)]/9 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-16 hidden scale-[0.7] text-[var(--primary)]/5 2xl:block"
      >
        <svg width="180" height="180" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M60 8V112M8 60H112M22 22L98 98M98 22L22 98"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-8 pt-4 pb-8 sm:pt-6 sm:pb-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,40rem)_minmax(320px,34rem)] lg:justify-between lg:gap-8 lg:pt-8 lg:pb-12">
        <motion.div
          initial={enableEntryMotion ? "hidden" : false}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
              },
            },
          }}
          className="max-w-[40rem] space-y-5 self-center text-center lg:text-left"
        >
          <motion.div
            variants={revealUp}
            className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start"
          >
            {heroCopyBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="hero-copy-badge inline-flex items-center gap-1 rounded-full border border-[var(--primary)]/12 bg-[var(--card)]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--primary)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:text-[var(--secondary)]"
              >
                <Icon className="h-3 w-3 text-[var(--accent)]" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={revealUp} className="space-y-4">
            <h1 className="text-[clamp(3.2rem,5.2vw,4.8rem)] font-extrabold leading-[1.0] tracking-tight text-[var(--foreground)]">
              <motion.span
                initial={enableEntryMotion ? { opacity: 0, y: -16 } : false}
                animate={enableEntryMotion ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.08 }}
                className="block font-serif text-[var(--foreground)]"
              >
                {messages.hero.titlePrefix}
              </motion.span>
              <span className="mt-2 block font-serif leading-[1.2] pb-2">
                <TypewriterHeadline
                  key={messages.hero.typewriterWords.join("|")}
                  words={messages.hero.typewriterWords}
                />
              </span>
            </h1>
            <p className="mx-auto max-w-[37.5rem] text-[15px] leading-[1.6] text-[var(--muted-foreground)] sm:text-base sm:leading-[1.7] lg:mx-0">
              {messages.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={revealUp}
            className="flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="premium-hover-border group h-[54px] w-full rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#670917_0%,#8C2036_45%,#D08E2F_100%)] px-7 text-sm font-bold text-[var(--primary-foreground)] shadow-[0_20px_42px_rgba(128,0,32,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(128,0,32,0.28)] sm:w-auto"
            >
              <Link href="/programs">
                {messages.common.explorePrograms}
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="premium-hover-border group h-[54px] w-full rounded-2xl border-[1.5px] border-[var(--primary)]/32 bg-[var(--card)]/82 px-7 text-sm font-bold text-[var(--primary)] shadow-[0_16px_30px_rgba(76,38,18,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/85 hover:bg-[var(--card)] dark:border-[var(--accent)]/32 dark:text-[var(--accent)] sm:w-auto"
            >
              <Link
                href={registrationHref}
                onClick={() => {
                  if (!isRegisteredUser && !isRegistrationStatusPending) {
                    captureEvent("registration_cta_clicked", {
                      source: "hero",
                    });
                  }
                }}
              >
                {registrationLabel}
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={revealUp}
            className="flex flex-col items-center gap-1.5 text-center lg:items-start lg:text-left"
          >
            <a
              href={currentSite.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                captureEvent("whatsapp_group_clicked", { source: "homepage" });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-green-700 transition-colors hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500/45" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <MessageSquare className="h-4 w-4" />
              {messages.hero.whatsappCta}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={enableEntryMotion ? { opacity: 0, x: 26 } : false}
          animate={enableEntryMotion ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.18 }}
          className="lg:justify-self-end"
        >
          <HeroVisual badges={heroVisualBadges} />
        </motion.div>
      </div>
    </section>
  );
}
