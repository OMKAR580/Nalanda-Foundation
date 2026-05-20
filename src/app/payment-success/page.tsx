"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, ArrowRight, Loader2, PhoneCall } from "lucide-react";
import { currentSite } from "@/config/site";

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const courseId = searchParams.get("course_id");
  const errorMsg = searchParams.get("error");

  const [verifying, setVerifying] = useState(true);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyEnrollment() {
      if (status === "error") {
        setVerifiedSuccess(false);
        setVerificationError(errorMsg || "Payment verification failed.");
        setVerifying(false);
        return;
      }

      if (!courseId) {
        setVerifiedSuccess(false);
        setVerificationError("No Course/Program ID was provided for verification.");
        setVerifying(false);
        return;
      }

      try {
        const res = await fetch(`/api/enrollments/status?courseId=${encodeURIComponent(courseId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.enrolled) {
            setVerifiedSuccess(true);
          } else {
            setVerifiedSuccess(false);
            setVerificationError("We could not find an active database enrollment for this program. Your payment might still be processing or failed.");
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          setVerifiedSuccess(false);
          setVerificationError(errData.error || "Failed to communicate with our enrollment confirmation servers.");
        }
      } catch (err) {
        console.error("Error confirming enrollment on success page:", err);
        setVerifiedSuccess(false);
        setVerificationError("A network error occurred while verifying your enrollment status.");
      } finally {
        setVerifying(false);
      }
    }

    verifyEnrollment();
  }, [status, courseId, errorMsg]);

  if (verifying) {
    return (
      <div className="text-center max-w-md mx-auto p-8 border border-[#D6C7B2] rounded-2xl bg-[#FFFDF9] shadow-lg flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-[#800020] animate-spin" />
        <h2 className="text-lg font-bold text-[#2E1E1E] font-serif">Verifying Enrollment Status...</h2>
        <p className="text-xs text-[#5C4D4D] leading-relaxed">
          Please wait while we confirm your payment signatures and activate your academic profile in our secure database.
        </p>
      </div>
    );
  }

  if (!verifiedSuccess) {
    return (
      <div className="text-center max-w-md mx-auto p-8 border border-[#D6C7B2] rounded-2xl bg-[#FFFDF9] shadow-lg space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center border border-red-200">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-extrabold text-[#2E1E1E]">Payment Verification Failed</h1>
          <p className="text-xs text-[#5C4D4D] leading-relaxed">
            Although the payment window completed, we could not confirm a valid database enrollment for this program.
          </p>
        </div>

        {verificationError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-left">
            <span className="text-[10px] font-bold text-red-800 uppercase block mb-1">Details</span>
            <span className="text-xxs font-medium text-red-700 block break-words leading-relaxed">{verificationError}</span>
          </div>
        )}

        <div className="p-4 bg-[#FAF6EE] border border-dashed border-[#D6C7B2] rounded-xl flex items-start gap-3 text-left">
          <PhoneCall className="h-5 w-5 text-[#C35237] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-[#800020]">Helpline Support</h4>
            <p className="text-[10px] text-[#5C4D4D] mt-0.5 leading-relaxed">
              If your bank account was debited, do not worry. Call admissions at <strong>{currentSite.contact.phone}</strong> or email <strong>{currentSite.contact.email}</strong> to manually verify your transaction.
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Link href="/dashboard" className="w-full block">
            <Button className="w-full text-xs h-10 bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE] font-bold rounded-lg shadow-sm">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/programs" className="w-full block">
            <Button variant="outline" className="w-full text-xs h-10 border-[#800020] text-[#800020] hover:bg-[#FAF0D9]/50 font-bold rounded-lg">
              Browse Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md mx-auto p-8 border border-[#D6C7B2] rounded-2xl bg-[#FFFDF9] shadow-lg space-y-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
          <CheckCircle2 className="h-10 w-10 text-green-600 animate-bounce" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#2E1E1E]">Payment Successful!</h1>
        <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded">
          Verified Enrollment Activated
        </span>
      </div>

      <p className="text-xs text-[#5C4D4D] leading-relaxed">
        Thank you for enrolling in Nalanda Foundation! Your payment signature was successfully authenticated. Your student profile now has verified active access to this program track.
      </p>

      <div className="p-4 bg-[#FAF0D9]/50 border border-[#D97706]/20 rounded-xl text-left">
        <h4 className="font-bold text-xs text-[#800020] font-serif">What to do next?</h4>
        <p className="text-[10px] text-[#5C4D4D] mt-1 leading-relaxed">
          1. Go to your <strong>Dashboard</strong> to join the official WhatsApp student announcement group.<br />
          2. Course study contents and task guides will activate as final admissions conclude.
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <Link href="/dashboard" className="w-full block">
          <Button className="w-full text-xs h-10 bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE] font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5">
            Go to Student Dashboard <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Link href="/programs" className="w-full block">
          <Button variant="outline" className="w-full text-xs h-10 border-[#800020] text-[#800020] hover:bg-[#FAF0D9]/50 font-bold rounded-lg">
            Explore Other Streams
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] bg-[#FAF6EE] py-16 px-4 flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center max-w-md mx-auto p-8 border border-[#D6C7B2] rounded-2xl bg-[#FFFDF9] shadow-lg flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-10 w-10 text-[#800020] animate-spin" />
          <h2 className="text-lg font-bold text-[#2E1E1E] font-serif">Loading...</h2>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
