import Image from "next/image";
import Link from "next/link";
import { currentSite } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]/40 bg-[var(--card)] text-[var(--foreground)] transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/nalanda/logo.jpeg"
                alt={`${currentSite.name} Logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-[var(--primary)] object-cover shadow-sm"
              />
              <h3 className="text-lg font-serif font-extrabold text-[var(--primary)]">
                {currentSite.name}
              </h3>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-[var(--muted-foreground)]">
              An ancient academic legacy meets modern innovation. Explore 12
              premium skill-based learning and certification programs, gain
              verified credentials, and accelerate your career pathway.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[var(--muted-foreground)]">
              <li>
                <Link href="/#about" className="transition-colors hover:text-[var(--primary)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="transition-colors hover:text-[var(--primary)]">
                  Programs &amp; Internships
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-[var(--primary)]">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#certification" className="transition-colors hover:text-[var(--primary)]">
                  Certification
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-[var(--primary)]">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition-colors hover:text-[var(--primary)]">
                  Contact Admissions
                </Link>
              </li>
              <li>
                <a
                  href={currentSite.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--primary)] text-green-600 dark:text-green-400 font-bold"
                >
                  WhatsApp Group
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Admissions Help
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[var(--muted-foreground)]">
              <li>Email: {currentSite.contact.email}</li>
              <li>Phone: {currentSite.contact.phone}</li>
              <li className="mt-1 text-[10px] font-normal leading-relaxed text-[var(--muted-foreground)]/70">
                {currentSite.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)]/20 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]/60">
          {"\u00A9"} {new Date().getFullYear()} {currentSite.name}. All rights
          reserved. {"\u2022"} Heritage Academic Initiative
        </div>
      </div>
    </footer>
  );
}
