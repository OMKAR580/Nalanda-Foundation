"use client";

import { RegistrationStatusProvider } from "@/components/auth/RegistrationStatusProvider";

export function AuthGuardian({ children }: { children: React.ReactNode }) {
  return <RegistrationStatusProvider>{children}</RegistrationStatusProvider>;
}
