"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { type LucideIcon } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export interface HeroVisualBadge {
  label: string;
  icon: LucideIcon;
  positionClass: string;
  depth: number;
}

const INTERACTIVE_DESKTOP_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const ANIMATED_MOBILE_SAFE_QUERY = "(min-width: 768px)";

export function HeroVisual({ badges }: { badges: HeroVisualBadge[] }) {
  const prefersReducedMotion = useReducedMotion();
  const isInteractiveDesktop = useMediaQuery(INTERACTIVE_DESKTOP_QUERY);
  const canRunAmbientAnimation = useMediaQuery(ANIMATED_MOBILE_SAFE_QUERY);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const imageFloatRef = useRef<HTMLDivElement>(null);
  const auraShellRef = useRef<HTMLDivElement>(null);
  const auraCoreRef = useRef<HTMLDivElement>(null);
  const motifShellRef = useRef<HTMLDivElement>(null);
  const motifCoreRef = useRef<HTMLDivElement>(null);
  const primaryBlobRef = useRef<HTMLDivElement>(null);
  const secondaryBlobRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const badgeShellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const badgeChipRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (prefersReducedMotion || !canRunAmbientAnimation) {
      return;
    }

    const context = gsap.context(() => {
      if (stageRef.current) {
        gsap.set(stageRef.current, {
          transformPerspective: 1800,
          transformStyle: "preserve-3d",
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        repeat: -1,
        yoyo: true,
      });

      timeline
        .to(stageRef.current, { y: -16, duration: 4.1 }, 0)
        .to(frameRef.current, { scale: 1.015, duration: 4.6 }, 0)
        .to(imageFloatRef.current, { y: -10, scale: 1.018, duration: 4.6 }, 0)
        .to(auraCoreRef.current, { scale: 1.08, opacity: 0.95, duration: 4.8 }, 0)
        .to(primaryBlobRef.current, { x: 18, y: -12, duration: 5.3 }, 0)
        .to(secondaryBlobRef.current, { x: -16, y: 16, duration: 5.7 }, 0)
        .to(shadowRef.current, { scaleX: 1.08, opacity: 0.52, duration: 4.6 }, 0)
        .to(motifCoreRef.current, { rotation: 5, duration: 6.2 }, 0);

      badgeChipRefs.current.forEach((badge, index) => {
        if (!badge) {
          return;
        }

        gsap.to(badge, {
          y: index % 2 === 0 ? -9 : 9,
          duration: 3.4 + index * 0.35,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      if (shineRef.current) {
        gsap.fromTo(
          shineRef.current,
          { xPercent: -160, opacity: 0 },
          {
            xPercent: 160,
            opacity: 0.72,
            duration: 3.8,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 1.5,
          },
        );
      }
    }, containerRef);

    return () => {
      context.revert();
    };
  }, [canRunAmbientAnimation, prefersReducedMotion]);

  useEffect(() => {
    if (!isInteractiveDesktop || prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const stage = stageRef.current;
    const imageParallax = imageParallaxRef.current;
    const auraShell = auraShellRef.current;
    const motifShell = motifShellRef.current;

    if (!container || !stage || !imageParallax || !auraShell || !motifShell) {
      return;
    }

    const rotateXTo = gsap.quickTo(stage, "rotationX", {
      duration: 0.55,
      ease: "power3.out",
    });
    const rotateYTo = gsap.quickTo(stage, "rotationY", {
      duration: 0.55,
      ease: "power3.out",
    });
    const imageXTo = gsap.quickTo(imageParallax, "x", {
      duration: 0.65,
      ease: "power3.out",
    });
    const imageYTo = gsap.quickTo(imageParallax, "y", {
      duration: 0.65,
      ease: "power3.out",
    });
    const auraXTo = gsap.quickTo(auraShell, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const auraYTo = gsap.quickTo(auraShell, "y", {
      duration: 0.7,
      ease: "power3.out",
    });
    const motifXTo = gsap.quickTo(motifShell, "x", {
      duration: 0.75,
      ease: "power3.out",
    });
    const motifYTo = gsap.quickTo(motifShell, "y", {
      duration: 0.75,
      ease: "power3.out",
    });

    const badgeSetters = badgeShellRefs.current.map((badge, index) => {
      if (!badge) {
        return null;
      }

      return {
        depth: badges[index]?.depth ?? 1,
        xTo: gsap.quickTo(badge, "x", {
          duration: 0.75,
          ease: "power3.out",
        }),
        yTo: gsap.quickTo(badge, "y", {
          duration: 0.75,
          ease: "power3.out",
        }),
      };
    });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

      rotateXTo(-normalizedY * 7);
      rotateYTo(normalizedX * 9);
      imageXTo(normalizedX * 18);
      imageYTo(normalizedY * 14);
      auraXTo(-normalizedX * 26);
      auraYTo(-normalizedY * 20);
      motifXTo(-normalizedX * 12);
      motifYTo(-normalizedY * 10);

      badgeSetters.forEach((setter) => {
        if (!setter) {
          return;
        }

        setter.xTo(normalizedX * setter.depth * 11);
        setter.yTo(normalizedY * setter.depth * 9);
      });
    };

    const resetParallax = () => {
      rotateXTo(0);
      rotateYTo(0);
      imageXTo(0);
      imageYTo(0);
      auraXTo(0);
      auraYTo(0);
      motifXTo(0);
      motifYTo(0);

      badgeSetters.forEach((setter) => {
        setter?.xTo(0);
        setter?.yTo(0);
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", resetParallax);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", resetParallax);
      resetParallax();
    };
  }, [badges, isInteractiveDesktop, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="group/hero relative mx-auto w-full max-w-[620px] select-none lg:max-w-[640px]"
    >
      <div
        ref={auraShellRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] z-0"
      >
        <div
          ref={auraCoreRef}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(128,0,32,0.30)_0%,_rgba(195,82,55,0.22)_28%,_rgba(217,119,6,0.18)_48%,_transparent_76%)] blur-[58px] dark:bg-[radial-gradient(circle,_rgba(195,82,55,0.30)_0%,_rgba(217,119,6,0.24)_35%,_rgba(128,0,32,0.18)_54%,_transparent_78%)]"
        />
      </div>

      <div
        ref={primaryBlobRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[14%] h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(128,0,32,0.28),_transparent_72%)] blur-[34px]"
      />
      <div
        ref={secondaryBlobRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[14%] right-[1%] h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(217,119,6,0.24),_transparent_72%)] blur-[38px]"
      />

      <div
        ref={motifShellRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      >
        <div
          ref={motifCoreRef}
          className="hero-stage-motif flex h-[72%] w-[72%] items-center justify-center rounded-full border border-[var(--primary)]/10"
        >
          <svg
            width="300"
            height="300"
            viewBox="0 0 180 180"
            className="h-full w-full text-[var(--primary)]/12 dark:text-[var(--accent)]/12"
            fill="none"
          >
            <circle cx="90" cy="90" r="78" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="90" cy="90" r="58" stroke="currentColor" strokeWidth="1" />
            <circle cx="90" cy="90" r="36" stroke="currentColor" strokeWidth="1" />
            <path
              d="M90 14V166M14 90H166M35 35L145 145M145 35L35 145"
              stroke="currentColor"
              strokeWidth="0.9"
            />
          </svg>
        </div>
      </div>

      {badges.map(({ icon: Icon, label, positionClass }, index) => (
        <div
          key={label}
          ref={(element) => {
            badgeShellRefs.current[index] = element;
          }}
          className={cn(
            "pointer-events-none absolute z-[5] hidden lg:block",
            positionClass,
          )}
        >
          <div
            ref={(element) => {
              badgeChipRefs.current[index] = element;
            }}
            className="hero-visual-badge rounded-full border border-[var(--accent)]/25 bg-[rgba(255,253,249,0.82)] px-4 py-2.5 text-[11px] font-bold text-[var(--primary)] shadow-[0_16px_30px_rgba(76,38,18,0.14)] backdrop-blur-xl dark:bg-[rgba(34,17,19,0.84)]"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Icon className="h-4 w-4 text-[var(--accent)]" />
              {label}
            </span>
          </div>
        </div>
      ))}

      <div
        ref={shadowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[88%] z-[1] h-14 w-[76%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(61,27,12,0.34)_0%,_rgba(61,27,12,0.12)_42%,_transparent_76%)] opacity-40 blur-2xl dark:bg-[radial-gradient(circle,_rgba(217,119,6,0.18)_0%,_rgba(23,10,12,0.22)_48%,_transparent_78%)]"
      />

      <div ref={stageRef} className="relative z-[4] will-change-transform">
        <div className="hero-stage-border rounded-[2rem] p-[1.5px]">
          <div
            ref={frameRef}
            className="hero-stage-glass relative overflow-hidden rounded-[calc(2rem-1px)] px-4 pb-4 pt-4 shadow-[0_26px_68px_rgba(109,42,18,0.18)] transition-[box-shadow,border-color] duration-500 group-hover/hero:shadow-[0_30px_84px_rgba(128,0,32,0.24)] sm:px-5 sm:pb-5 sm:pt-5"
          >
            <div
              ref={shineRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-[-40%] w-[42%] bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.05)_20%,rgba(255,247,224,0.72)_52%,rgba(255,255,255,0.06)_82%,transparent_100%)] mix-blend-screen"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[10px] rounded-[1.7rem] border border-white/20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[20px] rounded-[1.35rem] border border-[var(--primary)]/8"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),transparent_34%,rgba(217,119,6,0.07)_92%)]"
            />

            <div
              ref={imageParallaxRef}
              className="relative transition-transform duration-500 group-hover/hero:scale-[1.02]"
            >
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/18 bg-[linear-gradient(165deg,rgba(255,253,249,0.9),rgba(255,244,225,0.76))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:bg-[linear-gradient(165deg,rgba(47,19,21,0.95),rgba(31,12,14,0.9))] sm:p-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_46%),linear-gradient(160deg,transparent_44%,rgba(217,119,6,0.10)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[10px] rounded-[1.25rem] border border-[var(--primary)]/10"
                />
                <div ref={imageFloatRef} className="relative z-10">
                  <Image
                    src="/nalanda/hero-nalanda-3d.png"
                    alt="Premium Nalanda Foundation 3D hero illustration representing career-ready learning."
                    width={980}
                    height={980}
                    priority
                    sizes="(max-width: 1023px) 92vw, 46vw"
                    className="h-auto w-full object-contain [filter:drop-shadow(0_24px_44px_rgba(109,42,18,0.18))] dark:[filter:drop-shadow(0_26px_52px_rgba(217,119,6,0.12))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
