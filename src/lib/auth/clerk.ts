import { cookies } from "next/headers";
import { fapiUrlFromPublishableKey } from "@clerk/backend/proxy";
import {
  createPublicKey,
  verify,
  type JsonWebKey as NodeJsonWebKey,
} from "node:crypto";

interface ClerkJwk extends NodeJsonWebKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

interface ClerkJwksResponse {
  keys: ClerkJwk[];
}

type JwtPayload = Record<string, unknown> & {
  azp?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  nbf?: number;
  sid?: string;
  sub?: string;
};

export interface VerifiedClerkSession {
  claims: JwtPayload;
  sessionId: string | null;
  userId: string;
}

const ASCII_PRINTABLE_PATTERN = /^[\x20-\x7E]+$/;

export function getClerkConfigIssue(): string | null {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? "";
  const secretKey = process.env.CLERK_SECRET_KEY?.trim() ?? "";

  if (!publishableKey) {
    return "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing.";
  }

  if (!/^(pk_test_|pk_live_)/.test(publishableKey)) {
    return "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY does not look like a valid Clerk publishable key.";
  }

  if (!secretKey) {
    return "CLERK_SECRET_KEY is missing.";
  }

  if (!ASCII_PRINTABLE_PATTERN.test(secretKey)) {
    return "CLERK_SECRET_KEY contains non-ASCII placeholder characters instead of a real Clerk secret key.";
  }

  if (!/^(sk_test_|sk_live_)/.test(secretKey)) {
    return "CLERK_SECRET_KEY does not look like a valid Clerk secret key.";
  }

  return null;
}

export function getSignInUrl(redirectPath = "/registration") {
  return `/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`;
}

export function normalizeRedirectPath(
  rawRedirect: string | null | undefined,
  requestOrigin: string | undefined,
  fallback = "/registration"
) {
  if (!rawRedirect) {
    return fallback;
  }

  const trimmed = rawRedirect.trim();
  if (!trimmed) {
    return fallback;
  }

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const redirectUrl = new URL(trimmed);
    if (requestOrigin && redirectUrl.origin === requestOrigin) {
      return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}` || fallback;
    }

    if (redirectUrl.hostname === "localhost" || redirectUrl.hostname === "127.0.0.1") {
      return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}` || fallback;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function getClerkFrontendApiUrl() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

  if (!publishableKey || !/^(pk_test_|pk_live_)/.test(publishableKey)) {
    return null;
  }

  try {
    return fapiUrlFromPublishableKey(publishableKey);
  } catch {
    return null;
  }
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64");
}

function decodeJwtSegment<T>(segment: string) {
  return JSON.parse(decodeBase64Url(segment).toString("utf8")) as T;
}

async function fetchClerkJwks() {
  const frontendApiUrl = getClerkFrontendApiUrl();
  if (!frontendApiUrl) {
    return null;
  }

  const response = await fetch(`${frontendApiUrl}/.well-known/jwks.json`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const jwks = (await response.json()) as ClerkJwksResponse;
  return Array.isArray(jwks.keys) ? jwks.keys : null;
}

export async function verifyClerkSessionToken(token: string) {
  const fail = (reason: string) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("Clerk session verification failed:", reason);
    }

    return null;
  };

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return fail("token_not_jwt");
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = decodeJwtSegment<{ alg?: string; kid?: string; typ?: string }>(encodedHeader);
    const payload = decodeJwtSegment<JwtPayload>(encodedPayload);

    if (header.alg !== "RS256" || !header.kid) {
      return fail("unexpected_header");
    }

    if (typeof payload.sub !== "string" || !payload.sub) {
      return fail("missing_subject");
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== "number" || payload.exp <= currentTimeInSeconds) {
      return fail("expired_or_missing_exp");
    }

    if (typeof payload.nbf === "number" && payload.nbf > currentTimeInSeconds + 60) {
      return fail("not_yet_valid");
    }

    const expectedIssuer = getClerkFrontendApiUrl();
    if (expectedIssuer && payload.iss !== expectedIssuer) {
      return fail("issuer_mismatch");
    }

    const jwks = await fetchClerkJwks();
    const signingKey = jwks?.find((key) => key.kid === header.kid);
    if (!signingKey) {
      return fail("signing_key_missing");
    }

    const publicKey = createPublicKey({
      format: "jwk",
      key: signingKey,
    });

    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const signature = decodeBase64Url(encodedSignature);
    const isValid = verify(
      "RSA-SHA256",
      Buffer.from(signingInput, "utf8"),
      publicKey,
      signature
    );

    if (!isValid) {
      return fail("signature_invalid");
    }

    return {
      claims: payload,
      sessionId: typeof payload.sid === "string" ? payload.sid : null,
      userId: payload.sub,
    } satisfies VerifiedClerkSession;
  } catch {
    return fail("unexpected_exception");
  }
}

function getSessionTokenFromCookieStore(cookieStore: {
  get: (name: string) => { value: string } | undefined;
  getAll?: () => Array<{ name: string; value: string }>;
}) {
  const primaryToken = cookieStore.get("__session")?.value;
  if (primaryToken) {
    return primaryToken;
  }

  if (typeof cookieStore.getAll !== "function") {
    return null;
  }

  const fallbackToken = cookieStore
    .getAll()
    .find((cookie) => cookie.name === "__session" || cookie.name.startsWith("__session_"));

  return fallbackToken?.value ?? null;
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();
  return token || null;
}

function getSessionTokenFromCookieHeader(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return null;
  }

  for (const cookiePart of cookieHeader.split(";")) {
    const trimmed = cookiePart.trim();
    if (trimmed.startsWith("__session=")) {
      return decodeURIComponent(trimmed.slice("__session=".length));
    }
  }

  return null;
}

export async function getVerifiedClerkSession() {
  const cookieStore = await cookies();
  const token = getSessionTokenFromCookieStore(cookieStore);

  if (!token) {
    return null;
  }

  return verifyClerkSessionToken(token);
}

export async function getVerifiedClerkSessionFromRequest(
  request: Request & {
    cookies?: {
      get: (name: string) => { value: string } | undefined;
      getAll?: () => Array<{ name: string; value: string }>;
    };
  }
) {
  const bearerToken = getBearerToken(request);
  if (bearerToken) {
    return verifyClerkSessionToken(bearerToken);
  }

  if (request.cookies) {
    const cookieToken = getSessionTokenFromCookieStore(request.cookies);
    if (cookieToken) {
      return verifyClerkSessionToken(cookieToken);
    }
  }

  const headerToken = getSessionTokenFromCookieHeader(request);
  if (headerToken) {
    return verifyClerkSessionToken(headerToken);
  }

  return null;
}
