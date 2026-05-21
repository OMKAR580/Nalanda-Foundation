"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  PhoneCall,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { currentSite } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { courses } from "@/data/courses";
import { captureEvent } from "@/lib/analytics/posthog";

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const courseId = searchParams.get("course_id");
  const errorMsg = searchParams.get("error");
  const { messages } = useLanguage();

  const [verifying, setVerifying] = useState(true);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const hasTrackedVerifiedPaymentRef = useRef(false);

  useEffect(() => {
    async function verifyEnrollment() {
      if (status === "error") {
        setVerifiedSuccess(false);
        setVerificationError(
          errorMsg || messages.paymentSuccess.paymentVerificationError
        );
        setVerifying(false);
        return;
      }

      if (!courseId) {
        setVerifiedSuccess(false);
        setVerificationError(messages.paymentSuccess.noCourseId);
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/enrollments/status?courseId=${encodeURIComponent(courseId)}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.enrolled) {
            const matchingCourse = courses.find((course) => course.id === courseId);

            if (!hasTrackedVerifiedPaymentRef.current) {
              hasTrackedVerifiedPaymentRef.current = true;
              captureEvent("payment_verified", {
                amount: matchingCourse?.price,
                program_slug: matchingCourse?.slug ?? courseId,
                status: "verified",
              });
            }

            setVerifiedSuccess(true);
          } else {
            setVerifiedSuccess(false);
            setVerificationError(messages.paymentSuccess.activeEnrollmentMissing);
          }
        } else {
          const payload = await response.json().catch(() => ({}));
          setVerifiedSuccess(false);
          setVerificationError(
            payload.error || messages.paymentSuccess.communicationFailed
          );
        }
      } catch (error) {
        console.error("Error confirming enrollment on success page:", error);
        setVerifiedSuccess(false);
        setVerificationError(messages.paymentSuccess.networkVerificationError);
      } finally {
        setVerifying(false);
      }
    }

    void verifyEnrollment();
  }, [courseId, errorMsg, messages, status]);

  if (verifying) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] p-8 text-center shadow-lg">
        <Loader2 className="h-10 w-10 animate-spin text-[#800020]" />
        <h2 className="font-serif text-lg font-bold text-[#2E1E1E]">
          {messages.paymentSuccess.verifyingTitle}
        </h2>
        <p className="text-xs leading-relaxed text-[#5C4D4D]">
          {messages.paymentSuccess.verifyingDescription}
        </p>
      </div>
    );
  }

  if (!verifiedSuccess) {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] p-8 text-center shadow-lg">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-200 bg-red-50">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-extrabold text-[#2E1E1E]">
            {messages.paymentSuccess.paymentVerificationFailed}
          </h1>
          <p className="text-xs leading-relaxed text-[#5C4D4D]">
            {messages.paymentSuccess.paymentVerificationFailedDescription}
          </p>
        </div>

        {verificationError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-left">
            <span className="mb-1 block text-[10px] font-bold uppercase text-red-800">
              {messages.paymentSuccess.detailsLabel}
            </span>
            <span className="block break-words text-xxs font-medium leading-relaxed text-red-700">
              {verificationError}
            </span>
          </div>
        ) : null}

        <div className="flex items-start gap-3 rounded-xl border border-dashed border-[#D6C7B2] bg-[#FAF6EE] p-4 text-left">
          <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-[#C35237]" />
          <div>
            <h4 className="text-xs font-bold text-[#800020]">
              {messages.paymentSuccess.helplineTitle}
            </h4>
            <p className="mt-0.5 text-[10px] leading-relaxed text-[#5C4D4D]">
              {messages.paymentSuccess.helplinePrefix}{" "}
              <strong>{currentSite.contact.phone}</strong>{" "}
              {messages.paymentSuccess.helplineMiddle}{" "}
              <strong>{currentSite.contact.email}</strong>{" "}
              {messages.paymentSuccess.helplineSuffix}
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Link href="/dashboard" className="block w-full">
            <Button className="h-10 w-full rounded-lg bg-[#800020] text-xs font-bold text-[#FAF6EE] shadow-sm hover:bg-[#6B1D2F]">
              {messages.common.goToDashboard}
            </Button>
          </Link>
          <Link href="/programs" className="block w-full">
            <Button
              variant="outline"
              className="h-10 w-full rounded-lg border-[#800020] text-xs font-bold text-[#800020] hover:bg-[#FAF0D9]/50"
            >
              {messages.common.browsePrograms}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] p-8 text-center shadow-lg">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-200 bg-green-50">
          <CheckCircle2 className="h-10 w-10 animate-bounce text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-2xl font-extrabold text-[#2E1E1E] sm:text-3xl">
          {messages.paymentSuccess.paymentSuccessful}
        </h1>
        <span className="inline-block rounded border border-green-200 bg-green-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-green-700">
          {messages.paymentSuccess.successBadge}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[#5C4D4D]">
        {messages.paymentSuccess.successDescription}
      </p>

      <div className="rounded-xl border border-[#D97706]/20 bg-[#FAF0D9]/50 p-4 text-left">
        <h4 className="font-serif text-xs font-bold text-[#800020]">
          {messages.paymentSuccess.nextStepsTitle}
        </h4>
        <p className="mt-1 text-[10px] leading-relaxed text-[#5C4D4D]">
          1. {messages.paymentSuccess.nextStepOne}
          <br />
          2. {messages.paymentSuccess.nextStepTwo}
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <Link href="/dashboard" className="block w-full">
          <Button className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#800020] text-xs font-bold text-[#FAF6EE] shadow-sm hover:bg-[#6B1D2F]">
            {messages.common.goToStudentDashboard}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Link href="/programs" className="block w-full">
          <Button
            variant="outline"
            className="h-10 w-full rounded-lg border-[#800020] text-xs font-bold text-[#800020] hover:bg-[#FAF0D9]/50"
          >
            {messages.common.exploreOtherStreams}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  const { messages } = useLanguage();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#FAF6EE] px-4 py-16">
      <Suspense
        fallback={
          <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 rounded-2xl border border-[#D6C7B2] bg-[#FFFDF9] p-8 text-center shadow-lg">
            <Loader2 className="h-10 w-10 animate-spin text-[#800020]" />
            <h2 className="font-serif text-lg font-bold text-[#2E1E1E]">
              {messages.common.loading}
            </h2>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
