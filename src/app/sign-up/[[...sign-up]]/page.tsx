import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ClerkAuthGate } from "@/components/auth/ClerkAuthGate";
import { getClerkConfigIssue, normalizeRedirectPath } from "@/lib/auth/clerk";

interface SignUpPageProps {
  searchParams: Promise<{
    redirect_url?: string | string[];
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? undefined;
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const requestOrigin = host ? `${protocol}://${host}` : undefined;
  const rawRedirect =
    typeof params.redirect_url === "string" ? params.redirect_url : params.redirect_url?.[0];
  const redirectTarget = normalizeRedirectPath(rawRedirect, requestOrigin, "/registration");

  if (rawRedirect && rawRedirect !== redirectTarget) {
    redirect(`/sign-up?redirect_url=${encodeURIComponent(redirectTarget)}`);
  }

  return (
    <ClerkAuthGate
      mode="sign-up"
      redirectTarget={redirectTarget}
      configIssue={getClerkConfigIssue()}
    />
  );
}
