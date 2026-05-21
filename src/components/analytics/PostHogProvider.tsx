"use client";

import { useAuth } from "@clerk/nextjs";
import { PostHogProvider as PostHogReactProvider } from "@posthog/react";
import posthog from "posthog-js";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import {
  captureEvent,
  identifyUser,
  initPostHog,
  resetAnalyticsUser,
} from "@/lib/analytics/posthog";

function AppAnalyticsTracker() {
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();
  const lastPathRef = useRef<string | null>(null);
  const lastIdentifiedUserRef = useRef<string | null>(null);

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!pathname || lastPathRef.current === pathname) {
      return;
    }

    lastPathRef.current = pathname;
    captureEvent("$pageview", { page_path: pathname });

    if (pathname === "/dashboard") {
      captureEvent("dashboard_viewed", { page_path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!userId) {
      if (lastIdentifiedUserRef.current) {
        resetAnalyticsUser();
        lastIdentifiedUserRef.current = null;
      }

      return;
    }

    if (lastIdentifiedUserRef.current === userId) {
      return;
    }

    identifyUser(userId);
    lastIdentifiedUserRef.current = userId;
  }, [isLoaded, userId]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <PostHogReactProvider client={posthog}>
      <AppAnalyticsTracker />
      {children}
    </PostHogReactProvider>
  );
}
