"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse positions
  const mouseCoords = useRef({ x: 0, y: 0 });
  const glowCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Detect if desktop & not touch-device
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isWideScreen = window.innerWidth >= 1024;
      setIsDesktop(!hasTouch && isWideScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseMoveEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
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
  }, [isDesktop, isVisible, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

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
