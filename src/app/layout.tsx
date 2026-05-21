import type { Metadata } from "next";
import "./globals.css";
import { currentSite, SITE_VARIANT } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthGuardian } from "@/components/layout/AuthGuardian";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { getClerkConfigIssue } from "@/lib/auth/clerk";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getServerLanguage } from "@/i18n/server";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";

const themeInitScript = `
  try {
    const savedTheme = localStorage.getItem("theme");
    const resolvedTheme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {}
`;

export const metadata: Metadata = {
  title: `${currentSite.name} | Premium Education`,
  description: currentSite.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLanguage = await getServerLanguage();
  const clerkConfigIssue =
    process.env.NODE_ENV === "development" ? getClerkConfigIssue() : null;

  return (
    <ClerkProvider>
      <html
        lang={initialLanguage}
        className={`theme-${SITE_VARIANT} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </head>
        <body className="min-h-full flex flex-col font-sans">
          <LanguageProvider initialLanguage={initialLanguage}>
            <PostHogProvider>
              <AuthGuardian>
                {clerkConfigIssue ? (
                  <div className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <strong className="font-semibold">Development Clerk setup warning:</strong>{" "}
                    {clerkConfigIssue} Restore the real Clerk secret key to eliminate server-side
                    auth errors and redirect loops.
                  </div>
                ) : null}
                <CursorGlow />
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </AuthGuardian>
            </PostHogProvider>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
