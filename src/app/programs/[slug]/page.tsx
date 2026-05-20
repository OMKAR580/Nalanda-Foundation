"use client";

import { use, useState } from "react";
import { getCourseBySlug } from "@/data/courses";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { handleCheckout } from "@/lib/razorpay/checkout";
import { notFound } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Award, Clock, Globe2, BookOpen, ChevronRight, ShieldCheck, AlertCircle, PhoneCall, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { currentSite } from "@/config/site";
import { CourseImage } from "@/components/ui/CourseImage";

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const program = getCourseBySlug(resolvedParams.slug);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [checkingRegistration, setCheckingRegistration] = useState(false);

  if (!program) {
    notFound();
  }

  const onBuyNow = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/programs/${program.slug}`);
      return;
    }

    setCheckingRegistration(true);
    try {
      // Direct verification of registration status before letting user pay
      const res = await fetch("/api/registration/status");
      if (res.ok) {
        const data = await res.json();
        if (!data.completed) {
          // If student registration is not filled/completed, force them to fill it
          alert("Important: You must complete the student registration form first before purchasing or enrolling in any program.");
          router.push("/registration");
          return;
        }
      }

      // All good. Trigger Razorpay checkout
      handleCheckout(program.id, program.title, program.price);
    } catch (err) {
      console.error("Error verifying registration status at buy time:", err);
      // Fallback checkout
      handleCheckout(program.id, program.title, program.price);
    } finally {
      setCheckingRegistration(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2E1E1E] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4D4D]">
          <Link href="/programs" className="hover:text-[#800020] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to Programs
          </Link>
          <ChevronRight className="h-3 w-3 text-[#D6C7B2]" />
          <span className="text-[#800020] truncate">{program.title}</span>
        </div>

        {/* Main detail columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Details (Left Columns) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Main Header Info */}
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FAF6EE] bg-[#C35237] px-3 py-1 rounded-md">
                {program.category} Stream
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2E1E1E] tracking-tight font-serif leading-tight">
                {program.title}
              </h1>
              <p className="text-base sm:text-lg text-[#5C4D4D] leading-relaxed">
                {program.fullDescription}
              </p>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#D6C7B2]/60">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#5C4D4D]">Program Duration</span>
                <span className="font-extrabold text-sm text-[#2E1E1E] flex items-center gap-1">
                  <Clock className="h-4 w-4 text-[#C35237]" />
                  {program.duration}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#5C4D4D]">Internship Mode</span>
                <span className="font-extrabold text-sm text-[#2E1E1E] flex items-center gap-1">
                  <Globe2 className="h-4 w-4 text-[#C35237]" />
                  Flexible
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#5C4D4D]">Skill Level</span>
                <span className="font-extrabold text-sm text-[#2E1E1E] flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-[#C35237]" />
                  {program.level}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#5C4D4D]">Certification</span>
                <span className="font-extrabold text-sm text-[#2E1E1E] flex items-center gap-1">
                  <Award className="h-4 w-4 text-[#D97706]" />
                  Verified
                </span>
              </div>
            </div>

            {/* Skills Acquired Card */}
            <div className="space-y-3">
              <h3 className="font-serif font-extrabold text-lg text-[#800020]">Key Skills You Will Acquire</h3>
              <div className="flex flex-wrap gap-2.5">
                {program.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 text-xs font-bold rounded-lg bg-[#FFFDF9] text-[#800020] border border-[#D6C7B2] shadow-inner">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Crucial Timetable Warning Banner */}
            <div className="bg-[#FAF0D9]/70 border border-[#D97706]/30 p-5 rounded-2xl flex items-start gap-4 shadow-inner">
              <div className="h-9 w-9 rounded-full bg-[#FAF0D9] flex items-center justify-center text-[#D97706] flex-shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#2E1E1E]">Academic Portal Status</h4>
                <p className="text-xs text-[#5C4D4D] leading-relaxed">
                  <strong>Important Notice:</strong> Course content will be uploaded soon after enrollment. Your official dashboard will display live lecture coordinates, tasks lists, project codebases, and student groups immediately upon concluding registration rounds.
                </p>
              </div>
            </div>

          </div>

          {/* Checkout Card (Right Column) */}
          <div className="space-y-6">
            <div className="sticky top-28 border border-[#D6C7B2] bg-[#FFFDF9] rounded-2xl overflow-hidden shadow-xl">
              <div className="h-48 w-full relative overflow-hidden">
                <CourseImage
                  src={program.image}
                  alt={program.title}
                  category={program.category}
                  fill
                  priority
                />
              </div>
              <div className="p-6 md:p-8 space-y-6">

                {/* Cost Panel */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C4D4D]">Total Program Contribution</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#800020]">₹{program.price}</span>
                    <span className="text-sm font-semibold text-[#5C4D4D] line-through">₹{program.originalPrice}</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 uppercase">
                      Save 40%
                    </span>
                  </div>
                  <span className="block text-[10px] text-green-700 font-semibold pt-1">
                    * Interactive verified certification & GST included.
                  </span>
                </div>

                {/* Primary Buy CTA */}
                <Button
                  size="lg"
                  disabled={checkingRegistration}
                  className="w-full text-sm h-12 bg-[#800020] hover:bg-[#6B1D2F] text-[#FAF6EE] font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  onClick={onBuyNow}
                >
                  {checkingRegistration ? "Processing..." : "Enroll & Pay Now"}
                </Button>

                {/* Checkout security alerts */}
                <div className="space-y-2 border-t border-[#D6C7B2]/30 pt-4.5 text-[10px] text-[#5C4D4D]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#D97706]" />
                    <span>Safe test-mode payment processed through Razorpay.</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <BookOpen className="h-4 w-4 text-[#D97706]" />
                    <span>Academic access logged automatically into your student dashboard.</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Helpline details */}
            <Card className="border border-[#D6C7B2] bg-[#FAF6EE] rounded-xl p-5 border-dashed flex items-start gap-3">
              <PhoneCall className="h-5 w-5 text-[#C35237] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs text-[#800020] uppercase tracking-wider">Need Admission Help?</h4>
                <p className="text-[10px] text-[#5C4D4D] mt-0.5 leading-relaxed">
                  Call our admissions office at <strong>{currentSite.contact.phone}</strong> if you face billing or enrollment validation problems.
                </p>
              </div>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
