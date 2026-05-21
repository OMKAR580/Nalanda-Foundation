"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AuthStatusCard } from "@/components/auth/AuthStatusCard";
import { Button } from "@/components/ui/Button";
import type { RegistrationStatusPayload } from "@/lib/registration/types";
import RegistrationForm from "./RegistrationForm";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

interface RegistrationGateProps {
  configIssue: string | null;
}

export default function RegistrationGate({ configIssue }: RegistrationGateProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { messages } = useLanguage();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistrationReady, setIsRegistrationReady] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);
  const hasTrackedRegistrationStartRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      router.replace("/sign-in?redirect_url=/registration");
      return;
    }

    let cancelled = false;

    const runRegistrationCheck = async () => {
      try {
        const response = await fetch("/api/registration/status", {
          cache: "no-store",
        });

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;

          if (response.status === 401) {
            const suffix = configIssue
              ? ` Development setup warning: ${configIssue}`
              : ` ${messages.registrationGate.signedInVerificationSuffix}`;

            setErrorMessage(
              `${messages.registrationGate.signedInVerificationPrefix}${suffix}`
            );
          } else {
            setErrorMessage(
              payload?.error || messages.registrationGate.statusLoadError
            );
          }

          return;
        }

        const payload = (await response.json()) as RegistrationStatusPayload;

        if (!payload.authenticated) {
          const suffix = configIssue
            ? ` Development setup warning: ${configIssue}`
            : ` ${messages.registrationGate.signedInVerificationSuffix}`;

          setErrorMessage(
            `${messages.registrationGate.signedInVerificationPrefix}${suffix}`
          );
          return;
        }

        if (payload.registered) {
          router.replace("/dashboard");
          return;
        }

        setIsRegistrationReady(true);
      } catch {
        if (!cancelled) {
          setErrorMessage(messages.registrationGate.networkError);
        }
      }
    };

    void runRegistrationCheck();

    return () => {
      cancelled = true;
    };
  }, [configIssue, isLoaded, isSignedIn, messages, retryNonce, router]);

  useEffect(() => {
    if (!isRegistrationReady || hasTrackedRegistrationStartRef.current) {
      return;
    }

    hasTrackedRegistrationStartRef.current = true;
    captureEvent("registration_started", { page_path: "/registration" });
  }, [isRegistrationReady]);

  if (!isLoaded || (isSignedIn && !isRegistrationReady && !errorMessage)) {
    return (
      <AuthStatusCard
        title={messages.registrationGate.checkingTitle}
        description={messages.registrationGate.checkingDescription}
      />
    );
  }

  if (!isSignedIn) {
    return (
      <AuthStatusCard
        title={messages.registrationGate.redirectingTitle}
        description={messages.registrationGate.redirectingDescription}
      />
    );
  }

  if (errorMessage) {
    return (
      <AuthStatusCard
        title={messages.registrationGate.errorTitle}
        description={errorMessage}
        tone="error"
        actions={
          <>
            <Button
              onClick={() => {
                setErrorMessage(null);
                setIsRegistrationReady(false);
                setRetryNonce((value) => value + 1);
              }}
            >
              {messages.common.retry}
            </Button>
            <Button asChild variant="outline">
              <Link href="/sign-in?redirect_url=/registration">
                {messages.common.backToSignIn}
              </Link>
            </Button>
          </>
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] px-4 py-12 font-sans text-[#2E1E1E] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#800020] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FAF6EE] shadow-sm">
            {messages.registrationGate.portalBadge}
          </span>
          <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-tight text-[#2E1E1E] sm:text-5xl">
            {messages.registrationGate.heading}
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#5C4D4D] sm:text-base">
            {messages.registrationGate.description}
          </p>
        </div>

        {configIssue ? (
          <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 shadow-sm">
            <strong className="block font-semibold">
              {messages.registrationGate.devWarningTitle}
            </strong>
            <span className="mt-1 block">
              {configIssue} {messages.registrationGate.devWarningDescription}
            </span>
          </div>
        ) : null}

        <RegistrationForm
          initialEmail={user?.primaryEmailAddress?.emailAddress || ""}
          initialName={user?.fullName || ""}
        />
      </div>
    </div>
  );
}
