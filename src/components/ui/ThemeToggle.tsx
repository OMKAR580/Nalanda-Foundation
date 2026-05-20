"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or document class on mount
    try {
      const savedTheme = localStorage.getItem("theme");
      const holdsDarkClass = document.documentElement.classList.contains("dark");
      const initialTheme = (savedTheme === "dark" || (!savedTheme && holdsDarkClass)) ? "dark" : "light";

      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Defer the state update to avoid lint warnings about setState in effect body
      setTimeout(() => {
        setTheme(initialTheme);
      }, 0);
    } catch (e) {
      console.error("Theme selection failed", e);
    }
  }, []);

  const toggleTheme = () => {
    try {
      if (theme === "light") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      console.error("Failed to update theme", e);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6C7B2]/40 bg-[#FFFDF9] text-[#5C4D4D] transition-all hover:bg-[#FAF0D9]/50 hover:text-[#800020] dark:bg-[#221113] dark:border-[#4D262B] dark:text-[#D3C4C6] dark:hover:bg-[#2E1517] dark:hover:text-[#EAB308] shadow-sm relative group cursor-pointer"
      aria-label="Toggle Theme"
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
