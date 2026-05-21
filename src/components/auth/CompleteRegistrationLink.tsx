"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

interface CompleteRegistrationLinkProps {
  children: ReactNode;
  registeredChildren?: ReactNode;
}

type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & CompleteRegistrationLinkProps;

export function CompleteRegistrationLink({
  children,
  registeredChildren,
  ...props
}: LinkProps) {
  const { hasLoadedStatus, isAuthLoaded, isSignedIn, status } = useRegistrationStatus();
  const { messages } = useLanguage();
  const hasResolvedSignedInState = isAuthLoaded && isSignedIn;
  const isRegistrationStatusPending = hasResolvedSignedInState && !hasLoadedStatus;
  const isRegisteredUser = status.authenticated && status.registered;
  const resolvedRegisteredChildren = registeredChildren ?? messages.common.goToDashboard;
  const href = hasResolvedSignedInState
    ? isRegisteredUser
      ? "/dashboard"
      : isRegistrationStatusPending
        ? "/dashboard"
        : "/registration"
    : "/sign-in?redirect_url=/registration";
  const label =
    isRegisteredUser || isRegistrationStatusPending
      ? resolvedRegisteredChildren
      : children;
  const shouldTrackRegistrationCta =
    !isRegisteredUser && !isRegistrationStatusPending;

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);

        if (event.defaultPrevented || !shouldTrackRegistrationCta) {
          return;
        }

        captureEvent("registration_cta_clicked", {
          source: "homepage_certification",
        });
      }}
    >
      {label}
    </Link>
  );
}
