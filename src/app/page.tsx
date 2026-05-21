import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Phone,
  ShieldCheck,
  Users,
  Compass,
  Target,
  Zap,
  CheckCircle,
  FileCode,
  Globe,
  Coins,
  FileCheck,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Button } from "@/components/ui/Button";
import { CompleteRegistrationLink } from "@/components/auth/CompleteRegistrationLink";
import { currentSite } from "@/config/site";
import { courses } from "@/data/courses";
import { CourseImage } from "@/components/ui/CourseImage";

export default async function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <HeroSection />

      <section className="border-b border-[var(--border)]/20 bg-[var(--card)] py-10 transition-colors">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="relative shrink-0">
              <Image
                src="/nalanda/logo.jpeg"
                alt="Nalanda logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border-2 border-[var(--primary)] object-cover shadow-md"
              />
              <span className="absolute bottom-0 right-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-[var(--card)] bg-green-500 text-[9px] font-bold text-white">
                {"\u2713"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--secondary)]">
                Bridging Eras of Learning
              </h3>
              <p className="mt-1 max-w-xl text-xs text-[var(--muted-foreground)]">
                We synthesize the holistic learning frameworks of historical
                Nalanda University with the rigorous project-driven skill demand
                of today&apos;s digital global economies.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4.5">
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                12
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                Learning Tracks
              </span>
            </div>
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                100%
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                Verified Certificate
              </span>
            </div>
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                Live
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                Expert Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/50 py-20 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Header */}
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              Heritage-Led Academy
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              About Nalanda Foundation
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              Ancient learning values synthesized dynamically with modern, career-focused, and project-driven education.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="glow-card relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-extrabold text-[var(--foreground)] mb-3">Our Mission</h3>
              <p className="text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
                To build a comprehensive educational system where young minds acquire practical industry skills, digital literacy, and professional confidence through active, mentor-supported, and project-based learning. We aim to make skill-based career growth accessible to every motivated learner.
              </p>
            </div>

            {/* Vision Card */}
            <div className="glow-card relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)] mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-extrabold text-[var(--foreground)] mb-3">Our Vision</h3>
              <p className="text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
                To nurture future-ready professionals who possess both verified academic credentials and industry-grade portfolios. We envision a community where students bridge the gap between classroom-based abstract theories and real-world execution, powered by the heritage of robust mentoring.
              </p>
            </div>
          </div>

          {/* Why Nalanda Cards */}
          <div className="space-y-8 pt-4">
            <h3 className="font-serif text-xl font-extrabold text-center text-[var(--foreground)]">Why Nalanda Foundation?</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Heritage-Led Learning",
                  desc: "Inspired by historical frameworks to provide deep learning, rigorous mentorship, and holistic career outlooks.",
                },
                {
                  title: "Practical Skill Development",
                  desc: "Say goodbye to abstract rote-learning. Build production-grade code, actual design projects, and live portfolios.",
                },
                {
                  title: "Certification Support",
                  desc: "Receive recognized, blockchain-verifiable digital learning credentials upon successful course track completion.",
                },
                {
                  title: "Helpline & Coordinators",
                  desc: "Dedicated WhatsApp groups, student helplines, and cohort support to assist you during every learning module.",
                },
                {
                  title: "Affordable Program Access",
                  desc: "Premium, top-tier mentorship programs made extremely accessible today at just ₹599 to empower student demographics.",
                },
                {
                  title: "Tailored For Careers",
                  desc: "Every track is built specifically to address current market trends, internships demands, and career-readiness.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glow-card rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-[var(--primary)] shrink-0" />
                    <h4 className="font-serif text-sm font-extrabold text-[var(--foreground)]">{item.title}</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Cards */}
          <div className="space-y-8 pt-4">
            <div className="text-center space-y-2">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                Our Core Values
              </span>
              <h3 className="font-serif text-xl font-extrabold text-[var(--foreground)]">The Pillars We Build Upon</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Knowledge",
                  desc: "Delivering deep, structured, and comprehensive insights rather than simple surface learning.",
                  icon: BookOpen,
                  color: "text-amber-500 bg-amber-500/10",
                },
                {
                  title: "Service",
                  desc: "Committed to guiding every student on their educational journey with responsive, dedicated support.",
                  icon: Users,
                  color: "text-red-500 bg-red-500/10",
                },
                {
                  title: "Growth",
                  desc: "Ensuring every cohort member achieves clear, quantifiable development in practical skill sets.",
                  icon: Zap,
                  color: "text-yellow-500 bg-yellow-500/10",
                },
                {
                  title: "Integrity",
                  desc: "Upholding high academic, verification, and mentorship standards across every single track.",
                  icon: ShieldCheck,
                  color: "text-emerald-500 bg-emerald-500/10",
                },
              ].map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="glow-card rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 text-center shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-md"
                  >
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${val.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-sm font-extrabold text-[var(--foreground)] mb-2">{val.title}</h4>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] p-6 text-[#FAF6EE] shadow-xl lg:flex-row md:p-10">
          <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

          <div className="min-w-0 flex-1 space-y-3 text-center lg:text-left">
            <span className="inline-block rounded-full bg-green-600/90 px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE] shadow-sm">
              Admissions Support Desk
            </span>
            <h2 className="flex items-center justify-center gap-2.5 font-serif text-xl font-bold md:text-3xl lg:justify-start">
              <MessageSquare className="h-7 w-7 shrink-0 animate-bounce text-[#FAF0D9]" />
              Join the Official Nalanda WhatsApp Community
            </h2>
            <p className="max-w-2xl text-xs leading-relaxed text-[#FAF0D9]/90 md:text-sm">
              Unlock instant support! Connect with batch coordinators, clear
              admission queries, secure slot reminders, and receive course
              calendar updates before learning models go live.
            </p>
          </div>

          <Button
            asChild
            className="h-[52px] w-full rounded-2xl bg-[#FAF0D9] px-10 text-xs font-extrabold uppercase tracking-wider text-[#800020] shadow-xl transition-all hover:scale-[1.04] hover:bg-white hover:text-[#6B1D2F] active:scale-[0.98] lg:w-auto"
          >
            <a
              href={currentSite.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Official Group Now
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            Premium Features
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            A Transformed Educational Paradigm
          </h2>
          <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
            Acquire future-ready technical skills built on an enduring legacy of
            academic depth, mentorship integrity, and certification weight.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--muted)]/60 text-[var(--primary)] shadow-inner transition-transform duration-300 group-hover:scale-110">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
              Pedagogic Excellence
            </h3>
            <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              Curriculums mapped dynamically by seasoned educational directors to
              bridge the gap between abstract textbook theories and
              production-grade code.
            </p>
          </div>

          <div className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--muted)]/60 text-[var(--secondary)] shadow-inner transition-transform duration-300 group-hover:scale-110">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
              Verified Credentials
            </h3>
            <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              Every successfully completed course stream automatically triggers a
              secure, blockchain-verifiable digital credential link to validate
              your portfolio.
            </p>
          </div>

          <div className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--muted)]/60 text-[var(--accent)] shadow-inner transition-transform duration-300 group-hover:scale-110">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
              Interactive Support
            </h3>
            <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              Unlock access to cohort leaders and core technical support
              coordinates on WhatsApp instantly upon starting your registration
              setup.
            </p>
          </div>

          <div className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--muted)]/60 text-green-600 shadow-inner transition-transform duration-300 group-hover:scale-110">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
              Subsidized Pricing
            </h3>
            <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              Get full access to live lecture credentials, codebases, and
              templates for just {"\u20B9"}599 (crossed out from {"\u20B9"}999)
              as a student stimulus effort today.
            </p>
          </div>
        </div>
      </section>

      <section id="programs" className="scroll-mt-24 mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            Featured Programs
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            Explore 12 Skill-Based Internship &amp; Certification Programs
          </h2>
          <p className="mx-auto max-w-xl text-xs text-[var(--muted-foreground)] sm:text-sm">
            Enroll in premium tracks designed to help students build practical
            skills, work under live mentors, and secure high-value resume
            portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((program) => (
            <div
              key={program.id}
              className="glow-card group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary)] hover:shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <CourseImage
                  src={program.image}
                  alt={program.title}
                  category={program.category}
                  fill
                  priority={program.id === "program-1" || program.id === "program-2"}
                />
                <div className="absolute inset-0 bg-black/35 transition-all duration-300 group-hover:bg-black/20 z-10" />
                <span className="absolute left-4 top-4 rounded-lg bg-[var(--primary)] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--primary-foreground)] shadow-md z-20">
                  {program.category}
                </span>
                <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-md bg-[#FAF0D9]/90 px-2.5 py-1 text-[9px] font-bold tracking-wider text-[var(--primary)] shadow-sm dark:bg-[#221113]/90 dark:text-[var(--accent)] z-20">
                  <BookOpen className="h-3 w-3" />
                  {program.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between space-y-6 p-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-extrabold leading-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
                    {program.title}
                  </h3>
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {program.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded px-2 py-0.5 text-[8px] font-bold text-[var(--primary)] border border-[var(--border)]/30 bg-[var(--muted)]/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-[var(--border)]/30 pt-3">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[var(--primary)]">
                        {"\u20B9"}
                        {program.price}
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--muted-foreground)] line-through">
                        {"\u20B9"}
                        {program.originalPrice}
                      </span>
                    </div>
                    <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                      40% OFF
                    </span>
                  </div>

                  <Button
                    asChild
                    className="flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-[var(--primary)] text-[11px] font-bold text-[var(--primary-foreground)] shadow-md transition-all active:scale-[0.98]"
                  >
                    <Link href={`/programs/${program.slug}`}>
                      View Details &amp; Enroll
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mx-auto flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[var(--primary)] px-8 font-extrabold text-[var(--primary)] shadow-sm transition-all hover:scale-[1.03] hover:bg-[var(--muted)]/30 active:scale-[0.98]"
          >
            <Link href="/programs">
              Browse All 12 Programs
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/20 py-20 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Header */}
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              Our Learning Ecosystem
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              Our Learning Services
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              Structured programs, mentorship guidance, blockchain-verifiable certification support, and practical career pathway building.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Skill-Based Internship Programs",
                desc: "Structured, flexible, and fully digital internships built specifically around in-demand tracks.",
                icon: FileCode,
              },
              {
                title: "Certification Support",
                desc: "Get secure, verifiable, and shareable digital certificate credentials directly linked to your profile.",
                icon: Award,
              },
              {
                title: "Project-Based Learning",
                desc: "Focus on creating end-to-end, production-ready systems that demonstrate hands-on mastery.",
                icon: BookOpen,
              },
              {
                title: "Mentorship & Guidance",
                desc: "Access structured curriculum direction, active guidelines, and live coordinator interactions.",
                icon: Users,
              },
              {
                title: "WhatsApp Community Support",
                desc: "Join real-time cohort channels to connect with advisors, peers, and track organizers instantly.",
                icon: MessageSquare,
              },
              {
                title: "Career Portfolio Building",
                desc: "Convert abstract concepts into tangible Github repositories, Figma canvases, and case studies.",
                icon: Globe,
              },
              {
                title: "Digital Literacy Training",
                desc: "Empowering non-technical demographics with essential computational, word-processing, and internet tools.",
                icon: ShieldCheck,
              },
              {
                title: "Affordable Student Programs",
                desc: "Ensuring top-quality education does not demand massive financial strain through highly subsidized fees (₹599).",
                icon: Coins,
              },
            ].map((svc, index) => {
              const Icon = svc.icon;
              return (
                <div
                  key={index}
                  className="glow-card group flex flex-col justify-between rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
                      {svc.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Process Section */}
          <div className="border-t border-[var(--border)]/30 pt-16 space-y-12">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                Workflow Guide
              </span>
              <h3 className="font-serif text-2xl font-extrabold text-[var(--foreground)] mt-2">How It Works</h3>
              <p className="mt-3 text-xs text-[var(--muted-foreground)] sm:text-sm">
                Follow our simple, highly structured process to kickstart your practical learning.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Register",
                  desc: "Complete your basic profile details safely in just 2 minutes.",
                },
                {
                  step: "02",
                  title: "Choose Programs",
                  desc: "Select from our 12 featured skill tracks built for student growth.",
                },
                {
                  step: "03",
                  title: "Pay Fee",
                  desc: "Process the highly subsidized student fee (₹599) via secure Razorpay.",
                },
                {
                  step: "04",
                  title: "Join WhatsApp Group",
                  desc: "Gain instant entry into active academic coordinator channels.",
                },
                {
                  step: "05",
                  title: "Learn & Build",
                  desc: "Access robust templates, build portfolios, and clear doubts.",
                },
                {
                  step: "06",
                  title: "Get Certificate Support",
                  desc: "Claim your verified completion credentials directly.",
                },
              ].map((st, index) => (
                <div
                  key={index}
                  className="glow-card relative rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60"
                >
                  <span className="absolute right-6 top-4 font-serif text-3xl font-extrabold text-[var(--primary)]/15 select-none">
                    {st.step}
                  </span>
                  <h4 className="font-serif text-sm font-extrabold text-[var(--foreground)] mb-2 mt-4">{st.title}</h4>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/50 py-20 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Header */}
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              Verified Credentials
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              Certification Highlights
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              Complete structured programs and build verified learning credentials for your academic and career profile.
            </p>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Verified Program Completion",
                desc: "Every certificate triggers a secure, blockchain-verifiable credential link that anyone can open to confirm your participation details.",
                icon: Award,
              },
              {
                title: "Skill Track Recognition",
                desc: "Get certified across 12 dynamic tracks spanning IT, Computer Sciences, Graphic Design, content creation, robotics, and digital literacy.",
                icon: FileCheck,
              },
              {
                title: "Portfolio Support",
                desc: "We focus on real outputs. Your certificate reflects hands-on milestones, code repositories, or design files rather than simple theory tests.",
                icon: Briefcase,
              },
              {
                title: "Resume Value",
                desc: "Boost your employment credentials! Add structured, verified training items from Nalanda Foundation directly onto your resume and LinkedIn.",
                icon: Compass,
              },
              {
                title: "Community Learning Proof",
                desc: "Validate active cohort engagement, peer collaboration milestones, and interactive helpline support interactions.",
                icon: Users,
              },
              {
                title: "Practical Project Exposure",
                desc: "Certification proof showing you completed end-to-end, production-grade templates and solved active industry problems.",
                icon: BookOpen,
              },
            ].map((hl, index) => {
              const Icon = hl.icon;
              return (
                <div
                  key={index}
                  className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">{hl.title}</h3>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">{hl.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Verification Pipeline */}
          <div className="border-t border-[var(--border)]/30 pt-16 space-y-12">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                Verification Pipeline
              </span>
              <h3 className="font-serif text-2xl font-extrabold text-[var(--foreground)] mt-2">The Verification Journey</h3>
              <p className="mt-3 text-xs text-[var(--muted-foreground)] sm:text-sm">
                Follow this structured sequence to complete training modules and claim verified status.
              </p>
            </div>

            <div className="relative mx-auto max-w-4xl space-y-6">
              {[
                {
                  step: "01",
                  title: "Register & Profile Setup",
                  desc: "Create your student account securely to initialize your records in the Nalanda Database.",
                },
                {
                  step: "02",
                  title: "Enroll in Program Track",
                  desc: "Enroll in your preferred skill specialization track at the highly subsidized student fee (₹599).",
                },
                {
                  step: "03",
                  title: "Complete Learning Activities",
                  desc: "Engage with guided curriculum modules, explore code templates, and utilize coordinator support channels.",
                },
                {
                  step: "04",
                  title: "Submit Assigned Projects",
                  desc: "Build and submit your practical track projects to demonstrate hands-on competency.",
                },
                {
                  step: "05",
                  title: "Claim Certificate Support",
                  desc: "Acquire your digital, shareable, and verifiable program completion credentials directly.",
                },
              ].map((st, index) => (
                <div
                  key={index}
                  className="glow-card flex items-start gap-4 rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60"
                >
                  <span className="font-serif text-2xl font-extrabold text-[var(--primary)] shrink-0 select-none">
                    {st.step}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-extrabold text-[var(--foreground)] mb-1">{st.title}</h4>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Announcement Box */}
          <div className="mx-auto max-w-3xl pt-8">
            <div className="flex gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 dark:bg-amber-950/10">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5 dark:text-amber-400" />
              <div>
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Important Announcement
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400/90 sm:text-sm">
                  Course content, interactive code playgrounds, support tickets, and specific certificate access details will be fully activated inside your student dashboard immediately upon completing enrollment in your chosen track.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] p-8 text-center text-[#FAF6EE] shadow-xl md:p-12">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="font-serif text-3xl font-extrabold sm:text-4xl">Elevate Your Career Portfolio Today</h3>
              <p className="text-xs text-[#FAF0D9]/90 md:text-sm">
                Join active cohort structures and acquire highly shareable, secure verification credentials for just ₹599.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button
                  asChild
                  className="h-12 rounded-xl bg-[#FAF0D9] px-8 text-xs font-bold uppercase tracking-wider text-[#800020] hover:bg-white hover:text-[#6B1D2F]"
                >
                  <Link href="/programs">Explore Programs</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-xl border-white text-white hover:bg-white/10"
                >
                  <CompleteRegistrationLink registeredChildren="Go to Dashboard">
                    Complete Registration
                  </CompleteRegistrationLink>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <TestimonialsSection />

      <GallerySection />

      <section id="contact" className="scroll-mt-24 border-t border-[var(--border)]/40 bg-[var(--card)] px-4 py-16 transition-colors sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="space-y-2.5 text-center md:text-left">
            <h3 className="flex items-center justify-center gap-2.5 font-serif text-xl font-extrabold text-[var(--foreground)] md:justify-start">
              <Phone className="h-5.5 w-5.5 text-[var(--secondary)]" />
              Official Admissions &amp; Academic Helpline
            </h3>
            <p className="max-w-xl text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              Facing difficulties during registration, payments validation, or
              have generic learning batch queries? Reach our team directly for
              instant guidance.
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border border-[var(--border)]/60 bg-[var(--background)] p-5 text-center text-xs shadow-sm sm:flex-row sm:gap-8 sm:text-left">
            <div>
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Helpline Phone
              </span>
              <span className="text-sm font-extrabold text-[var(--primary)]">
                {currentSite.contact.phone}
              </span>
            </div>
            <div className="border-t border-[var(--border)]/40 pt-3 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Helpline Email
              </span>
              <span className="text-sm font-extrabold text-[var(--primary)]">
                {currentSite.contact.email}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
