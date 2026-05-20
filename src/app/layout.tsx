import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { currentSite, SITE_VARIANT } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthGuardian } from "@/components/layout/AuthGuardian";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { getClerkConfigIssue } from "@/lib/auth/clerk";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${currentSite.name} | Premium Education`,
  description: currentSite.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkConfigIssue =
    process.env.NODE_ENV === "development" ? getClerkConfigIssue() : null;

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} theme-${SITE_VARIANT} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans">
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
        </body>
      </html>
    </ClerkProvider>
  );
}
