"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDesktopPointer = useMediaQuery(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
  );

  // Mouse positions
  const mouseCoords = useRef({ x: 0, y: 0 });
  const glowCoords = useRef({ x: 0, y: 0 });
  const visibilityRef = useRef(false);
  const isEnabled = isDesktopPointer && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      visibilityRef.current = false;
      const resetVisibility = requestAnimationFrame(() => {
        glowCoords.current = { x: 0, y: 0 };
        mouseCoords.current = { x: 0, y: 0 };
        setIsVisible(false);
      });

      return () => {
        cancelAnimationFrame(resetVisibility);
      };
    }

    if (glowRef.current) {
      glowRef.current.style.transform = "translate3d(0px, 0px, 0)";
      glowCoords.current = { x: 0, y: 0 };
      mouseCoords.current = { x: 0, y: 0 };
    }

    const resetPointerState = requestAnimationFrame(() => {
      setIsVisible(false);
    });

    return () => {
      cancelAnimationFrame(resetPointerState);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!visibilityRef.current) {
        visibilityRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibilityRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // 2. requestAnimationFrame animation loop for 60fps smoothing (lerp)
    let animationFrameId: number;

    const tick = () => {
      if (!glowRef.current) return;

      // Linear interpolation: delay/smoothing factor (0.1 means 10% movement per frame)
      const ease = 0.08;

      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;

      const currentX = glowCoords.current.x;
      const currentY = glowCoords.current.y;

      const nextX = currentX + (targetX - currentX) * ease;
      const nextY = currentY + (targetY - currentY) * ease;

      glowCoords.current = { x: nextX, y: nextY };

      // Translate 3D for GPU acceleration
      glowRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none fixed left-0 top-0 z-50 -ml-28 -mt-28 h-56 w-56 rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_var(--accent)_45%,_transparent_75%)] opacity-20 blur-xl transition-opacity duration-500 will-change-transform dark:opacity-25 dark:bg-[radial-gradient(circle,_var(--accent)_0%,_var(--secondary)_45%,_transparent_75%)] ${
        isVisible ? "opacity-20 dark:opacity-25" : "opacity-0"
      }`}
    />
  );
}

// Custom types
interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}
