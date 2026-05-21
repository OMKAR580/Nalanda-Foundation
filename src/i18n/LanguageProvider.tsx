"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LANGUAGE,
  getMessages,
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_STORAGE_KEY,
  resolveLanguage,
  type Language,
  type Messages,
} from "@/i18n/translations";
import { captureEvent } from "@/lib/analytics/posthog";

interface LanguageContextValue {
  language: Language;
  messages: Messages;
  setLanguage: (language: Language) => void;
}

const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const LanguageContext = createContext<LanguageContextValue | null>(null);

function syncLanguagePreference(language: Language) {
  document.documentElement.lang = language;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {}

  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; path=/; max-age=${LANGUAGE_COOKIE_MAX_AGE}; samesite=lax`;
}

export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(
    resolveLanguage(initialLanguage)
  );

  useEffect(() => {
    syncLanguagePreference(language);
  }, [language]);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) {
        return;
      }

      setLanguageState(nextLanguage);
      syncLanguagePreference(nextLanguage);
      captureEvent("language_toggled", { language: nextLanguage });
      startTransition(() => {
        router.refresh();
      });
    },
    [language, router]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      messages: getMessages(language),
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguageContext must be used within a LanguageProvider.");
  }

  return context;
}
