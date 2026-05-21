export type AnalyticsLanguage = "en" | "hi";
export type AnalyticsTheme = "light" | "dark";

export interface AnalyticsProperties {
  amount?: number;
  language?: AnalyticsLanguage;
  page_path?: string;
  program_category?: string;
  program_slug?: string;
  source?: string;
  status?: string;
  theme?: AnalyticsTheme;
}

const allowedPropertyKeys = [
  "amount",
  "language",
  "page_path",
  "program_category",
  "program_slug",
  "source",
  "status",
  "theme",
] as const;

export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() ?? "";
export const POSTHOG_PROJECT_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ?? "";

export function isPostHogConfigured() {
  return POSTHOG_HOST.length > 0 && POSTHOG_PROJECT_TOKEN.length > 0;
}

export function sanitizeAnalyticsProperties(
  properties?: AnalyticsProperties
): AnalyticsProperties | undefined {
  if (!properties) {
    return undefined;
  }

  const sanitizedProperties: Partial<
    Record<(typeof allowedPropertyKeys)[number], string | number>
  > = {};

  for (const key of allowedPropertyKeys) {
    const value = properties[key];

    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === "string") {
      sanitizedProperties[key] = value.trim();
      continue;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      sanitizedProperties[key] = value;
    }
  }

  if (Object.keys(sanitizedProperties).length === 0) {
    return undefined;
  }

  return sanitizedProperties as AnalyticsProperties;
}
