"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  type RegistrationStatusPayload,
  unauthenticatedRegistrationStatus,
} from "@/lib/registration/types";

interface RegistrationStatusContextValue {
  isAuthLoaded: boolean;
  isChecking: boolean;
  registrationError: string | null;
  status: RegistrationStatusPayload;
  refreshRegistrationStatus: () => Promise<RegistrationStatusPayload | null>;
}

const RegistrationStatusContext = createContext<RegistrationStatusContextValue | null>(null);

export function RegistrationStatusProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const [status, setStatus] = useState<RegistrationStatusPayload>(
    unauthenticatedRegistrationStatus
  );
  const [isChecking, setIsChecking] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const loadRegistrationStatus = useCallback(
    async (signal?: AbortSignal) => {
      if (!isLoaded) {
        return null;
      }

      if (!isSignedIn) {
        return unauthenticatedRegistrationStatus;
      }

      const response = await fetch("/api/registration/status", {
        cache: "no-store",
        signal,
      });

      const payload = (await response.json().catch(() => null)) as
        | (RegistrationStatusPayload & { error?: string })
        | null;

      if (!response.ok) {
        throw new Error(payload?.error || "We could not load your registration status.");
      }

      return {
        authenticated: Boolean(payload?.authenticated),
        registered: Boolean(payload?.registered),
        registration: payload?.registration ?? null,
      } satisfies RegistrationStatusPayload;
    },
    [isLoaded, isSignedIn]
  );

  const refreshRegistrationStatus = useCallback(async () => {
    if (!isLoaded) {
      return null;
    }

    if (!isSignedIn) {
      setStatus(unauthenticatedRegistrationStatus);
      setRegistrationError(null);
      setIsChecking(false);
      return unauthenticatedRegistrationStatus;
    }

    setIsChecking(true);

    try {
      const nextStatus = await loadRegistrationStatus();

      if (!nextStatus) {
        return null;
      }

      setStatus(nextStatus);
      setRegistrationError(null);

      return nextStatus;
    } catch (error) {
      setRegistrationError(
        error instanceof Error
          ? error.message
          : "We could not load your registration status."
      );
      return null;
    } finally {
      setIsChecking(false);
    }
  }, [isLoaded, isSignedIn, loadRegistrationStatus]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => {
      setIsChecking(true);

      void loadRegistrationStatus(abortController.signal)
        .then((nextStatus) => {
          if (!nextStatus || abortController.signal.aborted) {
            return;
          }

          setStatus(nextStatus);
          setRegistrationError(null);
        })
        .catch((error: unknown) => {
          if (
            abortController.signal.aborted ||
            (error instanceof Error && error.name === "AbortError")
          ) {
            return;
          }

          setRegistrationError(
            error instanceof Error
              ? error.message
              : "We could not load your registration status."
          );
        })
        .finally(() => {
          if (!abortController.signal.aborted) {
            setIsChecking(false);
          }
        });
    }, 0);

    return () => {
      abortController.abort();
      window.clearTimeout(timeoutId);
    };
  }, [isLoaded, isSignedIn, loadRegistrationStatus, pathname]);

  const resolvedStatus = isSignedIn ? status : unauthenticatedRegistrationStatus;
  const resolvedError = isSignedIn ? registrationError : null;
  const resolvedIsChecking = isSignedIn ? isChecking : false;

  const value = useMemo<RegistrationStatusContextValue>(
    () => ({
      isAuthLoaded: isLoaded,
      isChecking: resolvedIsChecking,
      registrationError: resolvedError,
      status: resolvedStatus,
      refreshRegistrationStatus,
    }),
    [
      isLoaded,
      refreshRegistrationStatus,
      resolvedError,
      resolvedIsChecking,
      resolvedStatus,
    ]
  );

  return (
    <RegistrationStatusContext.Provider value={value}>
      {children}
    </RegistrationStatusContext.Provider>
  );
}

export function useRegistrationStatus() {
  const context = useContext(RegistrationStatusContext);

  if (!context) {
    throw new Error(
      "useRegistrationStatus must be used within a RegistrationStatusProvider."
    );
  }

  return context;
}
