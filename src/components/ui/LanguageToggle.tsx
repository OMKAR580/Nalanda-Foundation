"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", shortLabel: "EN", title: "English" },
  { code: "hi", shortLabel: "\u0939\u093f\u0902\u0926\u0940", title: "\u0939\u093f\u0902\u0926\u0940" },
] as const;

export function LanguageToggle() {
  const { language, messages, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-xl border border-[var(--border)]/50 bg-[var(--card)]/85 p-1 shadow-sm backdrop-blur-sm"
      aria-label={messages.nav.languageLabel}
      role="group"
    >
      {languages.map(({ code, shortLabel, title }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-colors sm:px-3",
            language === code
              ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/30"
          )}
          aria-pressed={language === code}
          title={title}
        >
          {shortLabel}
        </button>
      ))}
    </div>
  );
}
