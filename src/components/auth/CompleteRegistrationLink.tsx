"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

interface CompleteRegistrationLinkProps {
  children: ReactNode;
}

type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & CompleteRegistrationLinkProps;

export function CompleteRegistrationLink({ children, ...props }: LinkProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const href = isLoaded && isSignedIn ? "/registration" : "/sign-in?redirect_url=/registration";

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
