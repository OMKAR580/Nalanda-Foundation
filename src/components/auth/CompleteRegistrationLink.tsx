"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";

interface CompleteRegistrationLinkProps {
  children: ReactNode;
  registeredChildren?: ReactNode;
}

type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & CompleteRegistrationLinkProps;

export function CompleteRegistrationLink({
  children,
  registeredChildren = "Go to Dashboard",
  ...props
}: LinkProps) {
  const { status } = useRegistrationStatus();
  const isRegisteredUser = status.authenticated && status.registered;
  const href = status.authenticated
    ? isRegisteredUser
      ? "/dashboard"
      : "/registration"
    : "/sign-in?redirect_url=/registration";

  return (
    <Link href={href} {...props}>
      {isRegisteredUser ? registeredChildren : children}
    </Link>
  );
}
