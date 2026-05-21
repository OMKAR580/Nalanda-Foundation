"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignIn, SignUp, useAuth } from "@clerk/nextjs";
import { AuthStatusCard } from "@/components/auth/AuthStatusCard";
import { Button } from "@/components/ui/Button";
import type { RegistrationStatusPayload } from "@/lib/registration/types";

interface ClerkAuthGateProps {
  configIssue: string | null;
  mode: "sign-in" | "sign-up";
  redirectTarget: string;
}

export function ClerkAuthGate({
  configIssue,
  mode,
  redirectTarget,
}: ClerkAuthGateProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
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
              : " Please refresh once and try again.";
            setErrorMessage(
              `Clerk shows you as signed in, but the app server could not verify that session.${suffix}`
            );
          } else {
            setErrorMessage(
              payload?.error ||
                "We could not determine whether your registration is complete."
            );
          }

          return;
        }

        const payload = (await response.json()) as RegistrationStatusPayload;
        if (!payload.authenticated) {
          const suffix = configIssue
            ? ` Development setup warning: ${configIssue}`
            : " Please refresh once and try again.";
          setErrorMessage(
            `Clerk shows you as signed in, but the app server could not verify that session.${suffix}`
          );
          return;
        }

        const destination = payload.registered ? "/dashboard" : "/registration";

        router.replace(destination);
      } catch {
        if (!cancelled) {
          setErrorMessage(
            "We hit a network issue while checking your registration. Please try again."
          );
        }
      }
    };

    void runRegistrationCheck();

    return () => {
      cancelled = true;
    };
  }, [configIssue, isLoaded, isSignedIn, retryNonce, router]);

  if (!isLoaded) {
    return (
      <AuthStatusCard
        title={mode === "sign-in" ? "Loading sign in..." : "Loading sign up..."}
        description="Please wait while Clerk finishes loading your authentication state."
      />
    );
  }

  if (isSignedIn) {
    if (errorMessage) {
      return (
        <AuthStatusCard
          title="We could not continue your auth redirect"
          description={errorMessage}
          tone="error"
          actions={
            <>
              <Button
                onClick={() => {
                  setErrorMessage(null);
                  setRetryNonce((value) => value + 1);
                }}
              >
                Retry
              </Button>
              <Button asChild variant="outline">
                <Link href="/registration">Go to Registration</Link>
              </Button>
            </>
          }
        />
      );
    }

    return (
      <AuthStatusCard
        title="Checking your registration..."
        description="Your Clerk session is active. We are routing you to the correct next step now."
      />
    );
  }

  const signInUrl =
    redirectTarget === "/registration"
      ? "/sign-in"
      : `/sign-in?redirect_url=${encodeURIComponent(redirectTarget)}`;
  const signUpUrl =
    redirectTarget === "/registration"
      ? "/sign-up"
      : `/sign-up?redirect_url=${encodeURIComponent(redirectTarget)}`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 py-12">
      {configIssue ? (
        <div className="w-full max-w-xl rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 shadow-sm">
          <strong className="block font-semibold">Development Clerk setup warning</strong>
          <span className="block mt-1">
            {configIssue} The page will still render, but broken server-side Clerk keys can cause
            redirect loops or failed auth checks.
          </span>
        </div>
      ) : null}

      {mode === "sign-in" ? (
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl={signUpUrl}
          fallbackRedirectUrl={redirectTarget}
          forceRedirectUrl={redirectTarget}
        />
      ) : (
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl={signInUrl}
          fallbackRedirectUrl={redirectTarget}
          forceRedirectUrl={redirectTarget}
        />
      )}
    </div>
  );
}
