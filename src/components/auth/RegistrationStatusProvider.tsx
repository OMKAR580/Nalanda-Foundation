"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";
import {
  type RegistrationStatusPayload,
  unauthenticatedRegistrationStatus,
} from "@/lib/registration/types";

interface RegistrationStatusContextValue {
  isAuthLoaded: boolean;
  isSignedIn: boolean;
  isChecking: boolean;
  hasLoadedStatus: boolean;
  registrationError: string | null;
  status: RegistrationStatusPayload;
  refreshRegistrationStatus: () => Promise<RegistrationStatusPayload | null>;
}

const RegistrationStatusContext = createContext<RegistrationStatusContextValue | null>(null);

export function RegistrationStatusProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const isAuthLoaded = Boolean(isLoaded);
  const isAuthenticated = Boolean(isSignedIn);
  const [status, setStatus] = useState<RegistrationStatusPayload>(
    unauthenticatedRegistrationStatus
  );
  const [isChecking, setIsChecking] = useState(false);
  const [hasLoadedStatus, setHasLoadedStatus] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const hasFetchedInitialStatusRef = useRef(false);

  const loadRegistrationStatus = useCallback(
    async (signal?: AbortSignal) => {
      if (!isAuthLoaded) {
        return null;
      }

      if (!isAuthenticated) {
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
    [isAuthLoaded, isAuthenticated]
  );

  const refreshRegistrationStatus = useCallback(async () => {
    if (!isAuthLoaded) {
      return null;
    }

    if (!isAuthenticated) {
      setStatus(unauthenticatedRegistrationStatus);
      setRegistrationError(null);
      setIsChecking(false);
      setHasLoadedStatus(false);
      hasFetchedInitialStatusRef.current = false;
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
      setHasLoadedStatus(true);

      return nextStatus;
    } catch (error) {
      setRegistrationError(
        error instanceof Error
          ? error.message
          : "We could not load your registration status."
      );
      setHasLoadedStatus(true);
      return null;
    } finally {
      setIsChecking(false);
    }
  }, [isAuthLoaded, isAuthenticated, loadRegistrationStatus]);

  useEffect(() => {
    if (!isAuthLoaded) {
      return;
    }

    if (!isAuthenticated) {
      hasFetchedInitialStatusRef.current = false;
      queueMicrotask(() => {
        setStatus(unauthenticatedRegistrationStatus);
        setRegistrationError(null);
        setIsChecking(false);
        setHasLoadedStatus(false);
      });
      return;
    }

    if (hasFetchedInitialStatusRef.current) {
      return;
    }

    hasFetchedInitialStatusRef.current = true;
    const abortController = new AbortController();
    setIsChecking(true);

    void loadRegistrationStatus(abortController.signal)
      .then((nextStatus) => {
        if (!nextStatus || abortController.signal.aborted) {
          return;
        }

        setStatus(nextStatus);
        setRegistrationError(null);
        setHasLoadedStatus(true);
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
        setHasLoadedStatus(true);
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsChecking(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [isAuthLoaded, isAuthenticated, loadRegistrationStatus]);

  const resolvedStatus = isAuthenticated ? status : unauthenticatedRegistrationStatus;
  const resolvedError = isAuthenticated ? registrationError : null;
  const resolvedIsChecking = isAuthenticated ? isChecking : false;
  const resolvedHasLoadedStatus = isAuthenticated ? hasLoadedStatus : false;

  const value = useMemo<RegistrationStatusContextValue>(
    () => ({
      isAuthLoaded,
      isSignedIn: isAuthenticated,
      isChecking: resolvedIsChecking,
      hasLoadedStatus: resolvedHasLoadedStatus,
      registrationError: resolvedError,
      status: resolvedStatus,
      refreshRegistrationStatus,
    }),
    [
      isAuthLoaded,
      isAuthenticated,
      refreshRegistrationStatus,
      resolvedHasLoadedStatus,
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
