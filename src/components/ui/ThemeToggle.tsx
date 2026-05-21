"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { captureEvent } from "@/lib/analytics/posthog";

type ThemeMode = "light" | "dark";
const THEME_CHANGE_EVENT = "nalanda-theme-change";

function getThemeFromDocument(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(nextTheme: ThemeMode) {
  document.documentElement.classList.toggle("dark", nextTheme === "dark");
  document.documentElement.style.colorScheme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === "theme") {
      onStoreChange();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeFromDocument,
    () => "light",
  );

  const toggleTheme = () => {
    try {
      const nextTheme = theme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      captureEvent("theme_toggled", { theme: nextTheme });
    } catch (e) {
      console.error("Failed to update theme", e);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6C7B2]/40 bg-[#FFFDF9] text-[#5C4D4D] transition-all hover:bg-[#FAF0D9]/50 hover:text-[#800020] dark:border-[#4D262B] dark:bg-[#221113] dark:text-[#D3C4C6] dark:hover:bg-[#2E1517] dark:hover:text-[#EAB308] shadow-sm relative group cursor-pointer"
      aria-label="Toggle Theme"
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? (
        <Moon className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="h-4.5 w-4.5 transition-transform group-hover:rotate-45" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}
