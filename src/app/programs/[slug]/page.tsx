"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Globe2,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { getCourseBySlug } from "@/data/courses";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRegistrationStatus } from "@/components/auth/RegistrationStatusProvider";
import { handleCheckout } from "@/lib/razorpay/checkout";
import { currentSite } from "@/config/site";
import { CourseImage } from "@/components/ui/CourseImage";
import { useLanguage } from "@/hooks/useLanguage";
import { captureEvent } from "@/lib/analytics/posthog";

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const program = getCourseBySlug(resolvedParams.slug);
  const { isSignedIn } = useAuth();
  const { status, refreshRegistrationStatus } = useRegistrationStatus();
  const { messages } = useLanguage();
  const router = useRouter();
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const hasTrackedProgramViewRef = useRef(false);

  if (!program) {
    notFound();
  }

  useEffect(() => {
    if (hasTrackedProgramViewRef.current) {
      return;
    }

    hasTrackedProgramViewRef.current = true;
    captureEvent("program_viewed", {
      program_slug: program.slug,
      program_category: program.category,
    });
  }, [program.category, program.slug]);

  const onBuyNow = async () => {
    setCheckoutMessage(null);
    captureEvent("enroll_clicked", {
      amount: program.price,
      program_slug: program.slug,
    });

    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/registration");
      return;
    }

    setCheckingRegistration(true);

    try {
      const latestStatus = await refreshRegistrationStatus();
      const resolvedStatus = latestStatus ?? status;

      if (!latestStatus && !resolvedStatus.authenticated) {
        setCheckoutMessage(messages.programDetail.checkoutRetryMessage);
        return;
      }

      if (!resolvedStatus.authenticated) {
        router.push("/sign-in?redirect_url=/registration");
        return;
      }

      if (!resolvedStatus.registered) {
        router.push("/registration");
        return;
      }

      await handleCheckout({
        amount: program.price,
        courseId: program.id,
        courseName: program.title,
        programSlug: program.slug,
      });
    } catch (error) {
      console.error("Error verifying registration status or starting checkout:", error);
      setCheckoutMessage(messages.programDetail.checkoutErrorMessage);
    } finally {
      setCheckingRegistration(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] px-4 py-12 font-sans text-[#2E1E1E] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4D4D]">
          <Link href="/programs" className="flex items-center gap-1 hover:text-[#800020]">
            <ArrowLeft className="h-3 w-3" /> {messages.programDetail.backToPrograms}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#D6C7B2]" />
          <span className="truncate text-[#800020]">{program.title}</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-4">
              <span className="inline-block rounded-md bg-[#C35237] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FAF6EE]">
                {program.category} {messages.programDetail.streamSuffix}
              </span>
              <h1 className="font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#2E1E1E] sm:text-5xl">
                {program.title}
              </h1>
              <p className="text-base leading-relaxed text-[#5C4D4D] sm:text-lg">
                {program.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-[#D6C7B2]/60 py-6 sm:grid-cols-4">
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase text-[#5C4D4D]">
                  {messages.programDetail.duration}
                </span>
                <span className="flex items-center gap-1 text-sm font-extrabold text-[#2E1E1E]">
                  <Clock className="h-4 w-4 text-[#C35237]" />
                  {program.duration}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase text-[#5C4D4D]">
                  {messages.programDetail.internshipMode}
                </span>
                <span className="flex items-center gap-1 text-sm font-extrabold text-[#2E1E1E]">
                  <Globe2 className="h-4 w-4 text-[#C35237]" />
                  {messages.programDetail.flexible}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase text-[#5C4D4D]">
                  {messages.programDetail.skillLevel}
                </span>
                <span className="flex items-center gap-1 text-sm font-extrabold text-[#2E1E1E]">
                  <BookOpen className="h-4 w-4 text-[#C35237]" />
                  {program.level}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-bold uppercase text-[#5C4D4D]">
                  {messages.programDetail.certification}
                </span>
                <span className="flex items-center gap-1 text-sm font-extrabold text-[#2E1E1E]">
                  <Award className="h-4 w-4 text-[#D97706]" />
                  {messages.common.verified}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-extrabold text-[#800020]">
                {messages.programDetail.skillsHeading}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {program.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[#D6C7B2] bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#800020] shadow-inner"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#D97706]/30 bg-[#FAF0D9]/70 p-5 shadow-inner">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FAF0D9] text-[#D97706]">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#2E1E1E]">
                  {messages.programDetail.portalStatusTitle}
                </h4>
                <p className="text-xs leading-relaxed text-[#5C4D4D]">
                  <strong>{messages.programDetail.importantNoticeLabel}</strong>{" "}
                  {messages.programDetail.portalStatusDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] shadow-xl">
              <div className="relative h-48 w-full overflow-hidden">
                <CourseImage
                  src={program.image}
                  alt={program.title}
                  category={program.category}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 24rem"
                />
              </div>
              <div className="space-y-6 p-6 md:p-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C4D4D]">
                    {messages.programDetail.totalContribution}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#800020]">
                      {"\u20B9"}
                      {program.price}
                    </span>
                    <span className="text-sm font-semibold text-[#5C4D4D] line-through">
                      {"\u20B9"}
                      {program.originalPrice}
                    </span>
                    <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                      {messages.common.saveFortyPercent}
                    </span>
                  </div>
                  <span className="block pt-1 text-[10px] font-semibold text-green-700">
                    {messages.programDetail.includedNote}
                  </span>
                </div>

                <Button
                  size="lg"
                  disabled={checkingRegistration}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] text-sm font-bold text-[#FAF6EE] shadow-md transition-all hover:bg-[#6B1D2F]"
                  onClick={onBuyNow}
                >
                  {checkingRegistration
                    ? messages.common.processing
                    : messages.common.enrollAndPayNow}
                </Button>

                {checkoutMessage ? (
                  <div className="rounded-xl border border-[#C35237]/20 bg-[#FAF0D9]/60 px-4 py-3 text-[11px] font-medium text-[#5C4D4D]">
                    {checkoutMessage}
                  </div>
                ) : null}

                <div className="space-y-2 border-t border-[#D6C7B2]/30 pt-4.5 text-[10px] text-[#5C4D4D]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#D97706]" />
                    <span>{messages.programDetail.paymentSecurityOne}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <BookOpen className="h-4 w-4 text-[#D97706]" />
                    <span>{messages.programDetail.paymentSecurityTwo}</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="flex items-start gap-3 rounded-xl border border-dashed border-[#D6C7B2] bg-[#FAF6EE] p-5">
              <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-[#C35237]" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#800020]">
                  {messages.programDetail.helpTitle}
                </h4>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#5C4D4D]">
                  {messages.programDetail.helpDescription.replace(
                    "{phone}",
                    currentSite.contact.phone
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
