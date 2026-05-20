"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AuthStatusCard } from "@/components/auth/AuthStatusCard";
import { Button } from "@/components/ui/Button";
import RegistrationForm from "./RegistrationForm";

interface RegistrationStatusPayload {
  registered: boolean;
  registration: {
    registration_completed?: boolean;
  } | null;
}

interface RegistrationGateProps {
  configIssue: string | null;
}

export default function RegistrationGate({ configIssue }: RegistrationGateProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistrationReady, setIsRegistrationReady] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

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
              : " Please sign in again and retry.";
            setErrorMessage(
              `Your browser says you are signed in, but the app server could not verify that session.${suffix}`
            );
          } else {
            setErrorMessage(
              payload?.error ||
                "We could not load your registration status from Supabase."
            );
          }

          return;
        }

        const payload = (await response.json()) as RegistrationStatusPayload;

        if (payload.registration?.registration_completed) {
          router.replace("/dashboard");
          return;
        }

        setIsRegistrationReady(true);
      } catch {
        if (!cancelled) {
          setErrorMessage(
            "We could not load your registration status. Please check your connection and retry."
          );
        }
      }
    };

    void runRegistrationCheck();

    return () => {
      cancelled = true;
    };
  }, [configIssue, isLoaded, isSignedIn, retryNonce, router]);

  if (!isLoaded || (isSignedIn && !isRegistrationReady && !errorMessage)) {
    return (
      <AuthStatusCard
        title="Checking registration..."
        description="We are validating your Clerk session and checking whether your registration is already complete."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <AuthStatusCard
        title="Redirecting..."
        description="You need to sign in before we can show the registration form."
      />
    );
  }

  if (errorMessage) {
    return (
      <AuthStatusCard
        title="Error loading registration"
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
              Retry
            </Button>
            <Button asChild variant="outline">
              <Link href="/sign-in?redirect_url=/registration">Back to Sign In</Link>
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
            Nalanda Foundation Learning & Certification Portal
          </span>
          <h1 className="mb-4 font-serif text-3xl font-extrabold tracking-tight text-[#2E1E1E] sm:text-5xl">
            Official Registration Portal
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#5C4D4D] sm:text-base">
            Please complete all details below carefully. Selected students will receive an
            official offer letter and enrollment panel on their dashboard.
          </p>
        </div>

        {configIssue ? (
          <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 shadow-sm">
            <strong className="block font-semibold">Development Clerk setup warning</strong>
            <span className="block mt-1">
              {configIssue} This page uses a verified session-cookie fallback so you can still
              continue testing the registration flow locally.
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
