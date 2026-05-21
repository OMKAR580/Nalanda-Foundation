"use client";

import { useLanguageContext } from "@/i18n/LanguageProvider";

export function useLanguage() {
  return useLanguageContext();
}
