"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { captureEvent } from "@/lib/analytics/posthog";

interface AnalyticsExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children: ReactNode;
  eventName: string;
  source: string;
}

export function AnalyticsExternalLink({
  children,
  eventName,
  onClick,
  source,
  ...props
}: AnalyticsExternalLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        captureEvent(eventName, { source });
      }}
    >
      {children}
    </a>
  );
}
