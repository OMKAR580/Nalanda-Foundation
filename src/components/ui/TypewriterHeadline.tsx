"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const TYPING_SPEED = 90;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 2200;

export function TypewriterHeadline({ words }: { words: readonly string[] }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle hydration mismatch safely
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(words[0]);
      return;
    }

    const currentWord = words[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, prefersReducedMotion, isMounted, words]);

  const isKrishana = process.env.NEXT_PUBLIC_SITE_VARIANT === "krishana";

  if (!isMounted) {
    return (
      <span className="inline-flex min-h-[1.2em]">
        <span className={cn(
          "bg-clip-text text-transparent bg-gradient-to-r",
          isKrishana
            ? "from-slate-900 via-sky-600 via-cyan-500 to-emerald-500 dark:from-slate-100 dark:via-cyan-400 dark:to-emerald-400"
            : "from-[#670917] via-[#C35237] to-[#D08E2F]"
        )}>
          {words[0]}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex min-h-[1.2em]">
      <span className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        isKrishana
          ? "from-slate-900 via-sky-600 via-cyan-500 to-emerald-500 dark:from-slate-100 dark:via-cyan-400 dark:to-emerald-400"
          : "from-[#670917] via-[#C35237] to-[#D08E2F]"
      )}>
        {text}
      </span>
      <span
        className={cn(
          "ml-1",
          isKrishana
            ? "text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            : "text-[#D08E2F]",
          text === words[wordIndex] && !isDeleting ? "animate-pulse" : ""
        )}
      >
        |
      </span>
    </span>
  );
}
