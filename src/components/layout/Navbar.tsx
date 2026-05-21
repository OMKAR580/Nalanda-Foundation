"use client";

import Image from "next/image";
import Link from "next/link";
import { currentSite } from "@/config/site";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

export function Navbar() {
  const { hasLoadedStatus, isAuthLoaded, isSignedIn, status } = useRegistrationStatus();
  const { messages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hasResolvedSignedInState = isAuthLoaded && isSignedIn;
  const isRegisteredUser = status.authenticated && status.registered;
  const isRegistrationStatusPending = hasResolvedSignedInState && !hasLoadedStatus;
  const primarySignedInHref =
    isRegisteredUser || isRegistrationStatusPending ? "/dashboard" : "/registration";
  const primarySignedInLabel =
    isRegisteredUser || isRegistrationStatusPending
      ? messages.common.dashboard
      : messages.common.completeRegistration;
  const shouldTrackRegistrationCta =
    hasResolvedSignedInState && !isRegisteredUser && !isRegistrationStatusPending;
  const navLinks = [
    { href: "/", label: messages.nav.home },
    { href: "/#about", label: messages.nav.about },
    { href: "/programs", label: messages.nav.programs },
    { href: "/#services", label: messages.nav.services },
    { href: "/#certification", label: messages.nav.certification },
    { href: "/#contact", label: messages.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)]/25 nav-glass shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-transparent shadow-none"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/nalanda/logo.jpeg"
            alt={`${currentSite.name} Logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover border-2 border-[var(--primary)] shadow-sm group-hover:rotate-12 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-base md:text-lg tracking-tight text-[var(--primary)] leading-tight">
              {currentSite.name}
            </span>
            <span className="text-[9px] font-bold text-[var(--secondary)] tracking-wider uppercase leading-none mt-0.5">
              {messages.brand.learningPortal}
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-bold text-[var(--muted-foreground)]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--primary)] relative group py-2">
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA, Theme Toggle & Clerk Profile */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-3">
            {hasResolvedSignedInState ? (
              <>
                <Link href={primarySignedInHref}>
                  <Button
                    variant="ghost"
                    className="text-xs h-9 font-bold text-[var(--primary)] hover:bg-[var(--muted)]/30 border border-transparent hover:border-[var(--border)]/60 rounded-xl transition-all"
                    onClick={() => {
                      if (shouldTrackRegistrationCta) {
                        captureEvent("registration_cta_clicked", {
                          source: "navbar",
                        });
                      }
                    }}
                  >
                    {primarySignedInLabel}
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9 border-2 border-[var(--primary)] hover:scale-105 transition-transform"
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-xs h-9 font-bold text-[var(--muted-foreground)] hover:bg-[var(--muted)]/30 rounded-xl">
                    {messages.common.signIn}
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="text-xs h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] font-bold px-5 rounded-xl shadow-md transition-all hover:scale-[1.03] active:scale-[0.98]">
                    {messages.common.register}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]/40 bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]/20 transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)]/30 bg-[var(--card)] p-4 space-y-4 animate-reveal">
          <nav className="flex flex-col gap-3 text-xs font-bold text-[var(--muted-foreground)]">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-2 transition-colors hover:text-[var(--primary)]",
                  index < navLinks.length - 1 && "border-b border-[var(--border)]/20"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]/20">
            {hasResolvedSignedInState ? (
              <div className="flex items-center justify-between">
                <Link
                  href={primarySignedInHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button
                    className="w-full text-xs h-9 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl shadow-sm"
                    onClick={() => {
                      if (shouldTrackRegistrationCta) {
                        captureEvent("registration_cta_clicked", {
                          source: "navbar",
                        });
                      }
                    }}
                  >
                    {primarySignedInLabel}
                  </Button>
                </Link>
                <div className="pl-3">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-9 w-9 border-2 border-[var(--primary)]"
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full text-xs h-9 font-bold border-[var(--border)] text-[var(--muted-foreground)] rounded-xl">
                    {messages.common.signIn}
                  </Button>
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full text-xs h-9 bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] font-bold rounded-xl shadow-sm">
                    {messages.common.register}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
