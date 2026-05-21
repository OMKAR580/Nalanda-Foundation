import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Coins,
  Compass,
  FileCheck,
  FileCode,
  Globe,
  GraduationCap,
  MessageSquare,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Button } from "@/components/ui/Button";
import { CompleteRegistrationLink } from "@/components/auth/CompleteRegistrationLink";
import { currentSite } from "@/config/site";
import { courses } from "@/data/courses";
import { CourseImage } from "@/components/ui/CourseImage";
import { getServerLanguageContext } from "@/i18n/server";

export default async function Home() {
  const { messages } = await getServerLanguageContext();

  const aboutValues = [
    {
      ...messages.home.about.values[0],
      icon: BookOpen,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      ...messages.home.about.values[1],
      icon: Users,
      color: "text-red-500 bg-red-500/10",
    },
    {
      ...messages.home.about.values[2],
      icon: Zap,
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      ...messages.home.about.values[3],
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ];

  const featureItems = [
    {
      ...messages.home.features.items[0],
      icon: GraduationCap,
      iconClassName: "text-[var(--primary)]",
    },
    {
      ...messages.home.features.items[1],
      icon: Award,
      iconClassName: "text-[var(--secondary)]",
    },
    {
      ...messages.home.features.items[2],
      icon: Users,
      iconClassName: "text-[var(--accent)]",
    },
    {
      ...messages.home.features.items[3],
      icon: ShieldCheck,
      iconClassName: "text-green-600",
    },
  ];

  const serviceItems = [
    { ...messages.home.services.items[0], icon: FileCode },
    { ...messages.home.services.items[1], icon: Award },
    { ...messages.home.services.items[2], icon: BookOpen },
    { ...messages.home.services.items[3], icon: Users },
    { ...messages.home.services.items[4], icon: MessageSquare },
    { ...messages.home.services.items[5], icon: Globe },
    { ...messages.home.services.items[6], icon: ShieldCheck },
    { ...messages.home.services.items[7], icon: Coins },
  ];

  const certificationItems = [
    { ...messages.home.certification.items[0], icon: Award },
    { ...messages.home.certification.items[1], icon: FileCheck },
    { ...messages.home.certification.items[2], icon: Briefcase },
    { ...messages.home.certification.items[3], icon: Compass },
    { ...messages.home.certification.items[4], icon: Users },
    { ...messages.home.certification.items[5], icon: BookOpen },
  ];

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
                {messages.home.bridge.title}
              </h3>
              <p className="mt-1 max-w-xl text-xs text-[var(--muted-foreground)]">
                {messages.home.bridge.description}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4.5">
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                12
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                {messages.home.bridge.learningTracks}
              </span>
            </div>
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                100%
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                {messages.home.bridge.verifiedCertificate}
              </span>
            </div>
            <div className="rounded-xl border border-[var(--border)]/40 bg-[var(--background)] px-4 py-2 shadow-sm">
              <span className="block font-serif text-xl font-extrabold text-[var(--primary)]">
                Live
              </span>
              <span className="text-[9px] font-bold uppercase text-[var(--muted-foreground)]">
                {messages.home.bridge.expertSupport}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/50 py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              {messages.home.about.badge}
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              {messages.home.about.heading}
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              {messages.home.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="glow-card relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-extrabold text-[var(--foreground)]">
                {messages.home.about.missionTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
                {messages.home.about.missionDescription}
              </p>
            </div>

            <div className="glow-card relative rounded-3xl border border-[var(--border)]/70 bg-[var(--card)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-extrabold text-[var(--foreground)]">
                {messages.home.about.visionTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
                {messages.home.about.visionDescription}
              </p>
            </div>
          </div>

          <div className="space-y-8 pt-4">
            <h3 className="text-center font-serif text-xl font-extrabold text-[var(--foreground)]">
              {messages.home.about.whyHeading}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {messages.home.about.whyItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="glow-card rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-[var(--primary)]" />
                    <h4 className="font-serif text-sm font-extrabold text-[var(--foreground)]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 pt-4">
            <div className="space-y-2 text-center">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                {messages.home.about.valuesBadge}
              </span>
              <h3 className="font-serif text-xl font-extrabold text-[var(--foreground)]">
                {messages.home.about.valuesHeading}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutValues.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="glow-card rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 text-center shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-md"
                  >
                    <div
                      className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${value.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
                      {value.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] p-6 text-[#FAF6EE] shadow-xl md:p-10 lg:flex-row">
          <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

          <div className="min-w-0 flex-1 space-y-3 text-center lg:text-left">
            <span className="inline-block rounded-full bg-green-600/90 px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE] shadow-sm">
              {messages.home.supportBanner.badge}
            </span>
            <h2 className="flex items-center justify-center gap-2.5 font-serif text-xl font-bold md:text-3xl lg:justify-start">
              <MessageSquare className="h-7 w-7 shrink-0 animate-bounce text-[#FAF0D9]" />
              {messages.home.supportBanner.heading}
            </h2>
            <p className="max-w-2xl text-xs leading-relaxed text-[#FAF0D9]/90 md:text-sm">
              {messages.home.supportBanner.description}
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
              {messages.home.supportBanner.button}
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            {messages.home.features.badge}
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {messages.home.features.heading}
          </h2>
          <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
            {messages.home.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--muted)]/60 shadow-inner transition-transform duration-300 group-hover:scale-110 ${item.iconClassName}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="programs"
        className="scroll-mt-24 mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
            {messages.home.programs.badge}
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
            {messages.home.programs.heading}
          </h2>
          <p className="mx-auto max-w-xl text-xs text-[var(--muted-foreground)] sm:text-sm">
            {messages.home.programs.subtitle}
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 z-10 bg-black/35 transition-all duration-300 group-hover:bg-black/20" />
                <span className="absolute left-4 top-4 z-20 rounded-lg bg-[var(--primary)] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--primary-foreground)] shadow-md">
                  {program.category}
                </span>
                <span className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-md bg-[#FAF0D9]/90 px-2.5 py-1 text-[9px] font-bold tracking-wider text-[var(--primary)] shadow-sm dark:bg-[#221113]/90 dark:text-[var(--accent)]">
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
                        className="rounded border border-[var(--border)]/30 bg-[var(--muted)]/40 px-2 py-0.5 text-[8px] font-bold text-[var(--primary)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-[var(--border)]/30 pt-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-lg font-extrabold text-[var(--primary)]">
                        {messages.common.feeVariesByCollege}
                      </div>
                      <p className="text-[10px] font-medium leading-relaxed text-[var(--muted-foreground)]">
                        {messages.common.programFeeConfirmedAfterCollegeSelection}
                      </p>
                    </div>
                    <span className="rounded bg-[var(--muted)]/60 px-2 py-0.5 text-[10px] font-bold text-[var(--primary)]">
                      {messages.common.collegeBasedPricing}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-[var(--primary)] text-[11px] font-bold text-[var(--primary-foreground)] shadow-md transition-all active:scale-[0.98]"
                  >
                    <Link href={`/programs/${program.slug}`}>
                      {messages.common.viewDetailsAndEnroll}
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
              {messages.home.programs.browseAll}
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </Button>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/20 py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              {messages.home.services.badge}
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              {messages.home.services.heading}
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              {messages.home.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceItems.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="glow-card group flex flex-col justify-between rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
                      {service.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-12 border-t border-[var(--border)]/30 pt-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                {messages.home.services.workflowBadge}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-extrabold text-[var(--foreground)]">
                {messages.home.services.workflowHeading}
              </h3>
              <p className="mt-3 text-xs text-[var(--muted-foreground)] sm:text-sm">
                {messages.home.services.workflowSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {messages.home.services.workflowSteps.map((step) => (
                <div
                  key={step.step}
                  className="glow-card relative rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60"
                >
                  <span className="absolute right-6 top-4 select-none font-serif text-3xl font-extrabold text-[var(--primary)]/15">
                    {step.step}
                  </span>
                  <h4 className="mb-2 mt-4 font-serif text-sm font-extrabold text-[var(--foreground)]">
                    {step.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="certification"
        className="scroll-mt-24 border-y border-[var(--border)]/20 bg-[var(--card)]/50 py-20 transition-colors"
      >
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              {messages.home.certification.badge}
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              {messages.home.certification.heading}
            </h2>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              {messages.home.certification.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificationItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="glow-card group rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-serif text-sm font-extrabold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="space-y-12 border-t border-[var(--border)]/30 pt-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[var(--border)]/40 bg-[var(--muted)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                {messages.home.certification.pipelineBadge}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-extrabold text-[var(--foreground)]">
                {messages.home.certification.pipelineHeading}
              </h3>
              <p className="mt-3 text-xs text-[var(--muted-foreground)] sm:text-sm">
                {messages.home.certification.pipelineSubtitle}
              </p>
            </div>

            <div className="relative mx-auto max-w-4xl space-y-6">
              {messages.home.certification.pipelineSteps.map((step) => (
                <div
                  key={step.step}
                  className="glow-card flex items-start gap-4 rounded-2xl border border-[var(--border)]/70 bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/60"
                >
                  <span className="shrink-0 select-none font-serif text-2xl font-extrabold text-[var(--primary)]">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="mb-1 font-serif text-sm font-extrabold text-[var(--foreground)]">
                      {step.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-3xl pt-8">
            <div className="flex gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 dark:bg-amber-950/10">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {messages.home.certification.announcementTitle}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400/90 sm:text-sm">
                  {messages.home.certification.announcementDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] p-8 text-center text-[#FAF6EE] shadow-xl md:p-12">
            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
              <h3 className="font-serif text-3xl font-extrabold sm:text-4xl">
                {messages.home.certification.ctaHeading}
              </h3>
              <p className="text-xs text-[#FAF0D9]/90 md:text-sm">
                {messages.home.certification.ctaDescription}
              </p>
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-xl bg-[#FAF0D9] px-8 text-xs font-bold uppercase tracking-wider text-[#800020] hover:bg-white hover:text-[#6B1D2F]"
                >
                  <Link href="/programs">{messages.common.explorePrograms}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-xl border-white text-white hover:bg-white/10"
                >
                  <CompleteRegistrationLink registeredChildren={messages.common.goToDashboard}>
                    {messages.common.completeRegistration}
                  </CompleteRegistrationLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <GallerySection />

      <section
        id="contact"
        className="scroll-mt-24 border-t border-[var(--border)]/40 bg-[var(--card)] px-4 py-16 transition-colors sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="space-y-2.5 text-center md:text-left">
            <h3 className="flex items-center justify-center gap-2.5 font-serif text-xl font-extrabold text-[var(--foreground)] md:justify-start">
              <Phone className="h-5.5 w-5.5 text-[var(--secondary)]" />
              {messages.home.contact.heading}
            </h3>
            <p className="max-w-xl text-[11px] leading-relaxed text-[var(--muted-foreground)] sm:text-xs">
              {messages.home.contact.description}
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border border-[var(--border)]/60 bg-[var(--background)] p-5 text-center text-xs shadow-sm sm:flex-row sm:gap-8 sm:text-left">
            <div>
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                {messages.home.contact.phoneLabel}
              </span>
              <span className="text-sm font-extrabold text-[var(--primary)]">
                {currentSite.contact.phone}
              </span>
            </div>
            <div className="border-t border-[var(--border)]/40 pt-3 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                {messages.home.contact.emailLabel}
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
