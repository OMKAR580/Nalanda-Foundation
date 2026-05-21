import posthog from "posthog-js";
import {
  type AnalyticsProperties,
  POSTHOG_HOST,
  POSTHOG_PROJECT_TOKEN,
  isPostHogConfigured,
  sanitizeAnalyticsProperties,
} from "@/lib/analytics/posthog-shared";

let hasInitialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || !isPostHogConfigured()) {
    return false;
  }

  if (!hasInitialized) {
    posthog.init(POSTHOG_PROJECT_TOKEN, {
      api_host: POSTHOG_HOST,
      autocapture: false,
      capture_pageleave: false,
      capture_pageview: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
    });

    hasInitialized = true;
  }

  return true;
}

export function captureEvent(
  eventName: string,
  properties?: AnalyticsProperties
) {
  if (!initPostHog()) {
    return;
  }

  posthog.capture(eventName, sanitizeAnalyticsProperties(properties));
}

export function identifyUser(clerkUserId?: string | null) {
  if (!clerkUserId || !initPostHog()) {
    return;
  }

  posthog.identify(clerkUserId);
}

export function resetAnalyticsUser() {
  if (!initPostHog()) {
    return;
  }

  posthog.reset();
}
