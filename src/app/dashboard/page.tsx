import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  CreditCard,
  FileText,
  HelpCircle,
  Lightbulb,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { getUserEnrollments, getUserPayments } from "@/lib/supabase/server";
import { getRegistrationStatus } from "@/lib/registration/server";
import { courses } from "@/data/courses";
import { CourseImage } from "@/components/ui/CourseImage";
import { currentSite } from "@/config/site";
import { getServerLanguageContext } from "@/i18n/server";
import { AnalyticsExternalLink } from "@/components/analytics/AnalyticsExternalLink";

export const dynamic = "force-dynamic";

interface DBEnrollment {
  course_id: string;
  course_slug: string;
  status: string;
}

interface DBPayment {
  id: string;
  course_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  amount: number;
  status: string;
  created_at: string;
}

export default async function DashboardPage() {
  const user = await currentUser();
  const { messages } = await getServerLanguageContext();

  if (!user) {
    redirect("/sign-in");
  }

  let registrationData = null;
  let dbError = null;
  let isRegistered = false;

  try {
    const { status, error } = await getRegistrationStatus(user.id);
    if (error) {
      dbError = error;
    } else {
      registrationData = status.registration;
      isRegistered = status.registered;
    }
  } catch (error: unknown) {
    console.error("Error loading registration data in dashboard:", error);
    dbError = error;
  }

  if (dbError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-16 text-[var(--foreground)]">
        <div className="w-full max-w-xl space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[var(--primary)]">
              {messages.dashboard.connectionNoticeTitle}
            </h1>
            <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
              {messages.dashboard.connectionNoticeDescription}
            </p>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 text-left text-xs">
            <h3 className="flex items-center gap-1.5 font-bold text-[var(--foreground)]">
              <HelpCircle className="h-4 w-4 text-[var(--accent)]" />{" "}
              {messages.dashboard.instantVerificationTitle}
            </h3>
            <ul className="list-inside list-disc space-y-1.5 pl-1 text-[var(--muted-foreground)]">
              <li>{messages.dashboard.instantVerificationSteps[0]}</li>
              <li>{messages.dashboard.instantVerificationSteps[1]}</li>
              <li>
                {messages.dashboard.instantVerificationSteps[2]}{" "}
                <strong className="text-[var(--primary)]">
                  {currentSite.contact.email}
                </strong>
                .
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a href="/dashboard" className="flex-1">
              <Button className="h-11 w-full rounded-xl bg-[var(--primary)] font-bold text-[var(--primary-foreground)]">
                {messages.dashboard.retryVerification}
              </Button>
            </a>
            <AnalyticsExternalLink
              href={currentSite.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_group_clicked"
              source="dashboard"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border-[var(--border)] font-bold text-[var(--foreground)] hover:bg-[var(--muted)]/20"
              >
                <MessageSquare className="h-4.5 w-4.5 text-green-500" />{" "}
                {messages.dashboard.whatsappSupport}
              </Button>
            </AnalyticsExternalLink>
          </div>
        </div>
      </div>
    );
  }

  if (!isRegistered || !registrationData) {
    redirect("/registration");
  }

  let dbEnrollments: DBEnrollment[] = [];
  let dbPayments: DBPayment[] = [];

  try {
    const [enrollmentsResponse, paymentsResponse] = await Promise.all([
      getUserEnrollments(user.id),
      getUserPayments(user.id),
    ]);
    dbEnrollments = (enrollmentsResponse.data as DBEnrollment[]) || [];
    dbPayments = (paymentsResponse.data as DBPayment[]) || [];
  } catch (error) {
    console.error("Failed to fetch dashboard data from Supabase:", error);
  }

  const enrolledPrograms = dbEnrollments
    .map((enrollment) => {
      const program = courses.find(
        (course) =>
          course.id === enrollment.course_id || course.slug === enrollment.course_slug
      );
      return program ? { ...program, enrollmentStatus: enrollment.status } : null;
    })
    .filter(
      (course): course is (typeof courses)[number] & { enrollmentStatus: string } =>
        course !== null
    );

  const preferredPrograms = Array.isArray(registrationData.internship_programs)
    ? registrationData.internship_programs
    : [];

  const recommendedCourse =
    courses.find((course) => course.title === registrationData.first_preference) ||
    courses[0];

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-12 font-sans text-[var(--foreground)] transition-colors sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-[var(--border)]/60 bg-[var(--card)] p-6 shadow-md transition-all duration-300 md:flex-row md:items-center md:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--primary)]/5 blur-2xl" />
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--primary)] px-3.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--primary-foreground)] shadow-sm">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" />{" "}
              {messages.dashboard.verifiedBadge}
            </span>
            <h1 className="font-serif text-2xl font-extrabold text-[var(--foreground)] sm:text-4xl">
              {messages.dashboard.welcomeBack},{" "}
              {registrationData.full_name || user.firstName || "Student"}!
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
              {messages.dashboard.welcomeDescription}
            </p>
          </div>
          <Link href="/programs" className="z-10 w-full shrink-0 md:w-auto">
            <Button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 font-bold text-[var(--primary-foreground)] shadow-md transition-all hover:scale-[1.03] hover:bg-[var(--secondary)] active:scale-[0.98] md:w-auto">
              {messages.common.browseMorePrograms} <ArrowRight className="h-4.5 w-4.5" />
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] p-6 text-white shadow-xl md:flex-row md:p-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="flex items-center justify-center gap-2.5 font-serif text-lg font-bold md:justify-start md:text-2xl">
              <MessageSquare className="h-6.5 w-6.5 animate-pulse text-[#FAF0D9]" />
              {messages.dashboard.whatsappHeading}
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-[#FAF0D9]/90">
              {messages.dashboard.whatsappDescription}
            </p>
          </div>
          <AnalyticsExternalLink
            href={currentSite.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_group_clicked"
            source="dashboard"
            className="w-full md:w-auto"
          >
            <Button className="h-12 w-full rounded-xl bg-[#FAF0D9] px-8 text-xs font-extrabold uppercase tracking-wider text-[#800020] shadow-md transition-all hover:scale-[1.03] hover:bg-white hover:text-[#6B1D2F] active:scale-[0.98] md:w-auto">
              {messages.dashboard.joinWhatsapp}
            </Button>
          </AnalyticsExternalLink>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="space-y-4">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[var(--primary)]">
                <CheckCircle2 className="h-5 w-5 text-[var(--secondary)]" />
                {messages.dashboard.onboardingHeading}
              </h2>
              <Card className="glass-panel overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-[var(--border)]/30">
                    <div className="flex items-center gap-4 bg-[var(--muted)]/10 p-4 sm:p-5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[var(--foreground)]">
                          {messages.dashboard.registrationStep}
                        </h4>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {messages.dashboard.registrationStepDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 sm:p-5">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          enrolledPrograms.length > 0
                            ? "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                            : "glow-pulse-saffron bg-[var(--primary)]/10 text-[var(--primary)]"
                        }`}
                      >
                        {enrolledPrograms.length > 0 ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[var(--foreground)]">
                          {messages.dashboard.enrollmentStep}
                        </h4>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {messages.dashboard.enrollmentStepDescription}
                        </p>
                      </div>
                      {enrolledPrograms.length === 0 ? (
                        <Link href="/programs">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-[var(--primary)] text-xs text-[var(--primary)] shadow-sm transition-all hover:bg-[var(--primary)] hover:text-white"
                          >
                            {messages.common.enrollNow}
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-4 p-4 opacity-60 sm:p-5">
                      <div className="h-8 w-8 shrink-0 rounded-full border-2 border-[var(--border)]" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[var(--foreground)]">
                          {messages.dashboard.batchStep}
                        </h4>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {messages.dashboard.batchStepDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[var(--primary)]">
                <BookOpen className="h-5 w-5 text-[var(--secondary)]" />
                {messages.dashboard.enrolledProgramsHeading}
              </h2>

              <div className="space-y-4">
                {enrolledPrograms.length > 0 ? (
                  enrolledPrograms.map((program) => (
                    <Card
                      key={program.id}
                      className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm transition-all hover:border-[var(--primary)]/30 hover:shadow-md"
                    >
                      <CardContent className="flex flex-col items-start gap-6 p-5 sm:flex-row sm:items-center sm:p-6">
                        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border)]/50">
                          <CourseImage
                            src={program.image}
                            alt={program.title}
                            category={program.category}
                            fill
                            sizes="112px"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <span className="inline-block rounded border border-[var(--border)]/30 bg-[var(--muted)]/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--secondary)]">
                            {program.category}
                          </span>
                          <h3 className="truncate text-base font-extrabold text-[var(--foreground)]">
                            {program.title}
                          </h3>
                          <p className="text-[10px] text-[var(--muted-foreground)]">
                            {messages.dashboard.durationModePrefix} {program.duration} |{" "}
                            {messages.dashboard.modePrefix} {program.mode}
                          </p>
                          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span>
                              {messages.dashboard.activeEnrollmentVerified} (
                              {program.enrollmentStatus})
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 w-full text-right sm:ml-auto sm:mt-0 sm:w-auto">
                          <span className="inline-block rounded-full border border-[var(--border)]/70 bg-[var(--background)] px-4 py-1.5 text-[10px] font-bold uppercase text-[var(--primary)]">
                            {messages.dashboard.activeStatus}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm">
                    <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--muted)]/50 text-[var(--muted-foreground)] shadow-inner">
                        <BookOpen className="h-7 w-7 opacity-75" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-base font-extrabold text-[var(--foreground)]">
                          {messages.dashboard.noProgramsTitle}
                        </h3>
                        <p className="mx-auto max-w-sm text-xs leading-relaxed text-[var(--muted-foreground)]">
                          {messages.dashboard.noProgramsDescription}
                        </p>
                      </div>
                      <Link href="/programs">
                        <Button className="h-10 rounded-xl bg-[var(--primary)] px-6 font-bold text-[var(--primary-foreground)] shadow-md transition-all hover:scale-[1.03] hover:bg-[var(--secondary)] active:scale-[0.98]">
                          {messages.dashboard.exploreAndEnroll}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            {enrolledPrograms.length === 0 && recommendedCourse ? (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[var(--primary)]">
                  <Lightbulb className="h-5 w-5 text-[var(--accent)]" />
                  {messages.dashboard.recommendedHeading}
                </h2>
                <Card className="glow-card group relative overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-[var(--card)] shadow-sm">
                  <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                    <Sparkles className="h-16 w-16 text-[var(--accent)]" />
                  </div>
                  <CardContent className="relative z-10 flex flex-col items-center gap-6 p-6 sm:flex-row">
                    <div className="relative h-24 w-32 overflow-hidden rounded-xl border border-[var(--border)] shadow-inner">
                      <CourseImage
                        src={recommendedCourse.image}
                        alt={recommendedCourse.title}
                        category={recommendedCourse.category}
                        fill
                        sizes="128px"
                      />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="inline-block rounded bg-[#C35237] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FAF6EE] shadow-sm">
                        {messages.dashboard.topMatch}
                      </span>
                      <h3 className="text-base font-extrabold text-[var(--foreground)] sm:text-lg">
                        {recommendedCourse.title}
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {messages.dashboard.basedOnPreference}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Link
                        href={`/programs/${recommendedCourse.slug || recommendedCourse.id}`}
                      >
                        <Button className="h-10 rounded-xl bg-[var(--accent)] px-6 font-bold text-white shadow-md transition-all hover:bg-[#B45309]">
                          {messages.common.viewDetails}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>
            ) : null}

            <Card className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm">
              <div className="flex items-center gap-3 bg-[var(--primary)] p-4.5 text-[var(--primary-foreground)]">
                <AlertCircle className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-serif text-sm font-bold tracking-wide">
                  {messages.dashboard.noticeboardTitle}
                </h3>
              </div>
              <CardContent className="space-y-5 p-6">
                <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--secondary)]">
                    {messages.dashboard.latestUpdate}
                  </span>
                  <h4 className="text-sm font-extrabold text-[var(--foreground)]">
                    {messages.dashboard.latestUpdateTitle}
                  </h4>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {messages.dashboard.latestUpdateDescription}
                  </p>
                </div>
                <div className="space-y-1.5 border-l-2 border-[var(--border)] pl-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {messages.dashboard.systemUpdate}
                  </span>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">
                    {messages.dashboard.systemUpdateTitle}
                  </h4>
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {messages.dashboard.systemUpdateDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            <section className="space-y-4">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[var(--primary)]">
                <FileText className="h-5 w-5 text-[var(--secondary)]" />
                {messages.dashboard.profileSummaryHeading}
              </h2>

              <Card className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm transition-all duration-300">
                <CardContent className="space-y-6 p-6 text-xs">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <User className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.fullName}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-[var(--foreground)]">
                          {registrationData.full_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <Mail className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.registeredEmail}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-semibold text-[var(--foreground)]">
                          {registrationData.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.contactWhatsapp}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-[var(--foreground)]">
                          {registrationData.mobile_number}{" "}
                          {registrationData.whatsapp_number
                            ? `/ ${registrationData.whatsapp_number}`
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <Award className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.collegeUniversity}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-semibold text-[var(--foreground)]">
                          {registrationData.college_name}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <Award className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.degreeSpecialization}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-semibold text-[var(--foreground)]">
                          {registrationData.degree} (
                          {registrationData.department_stream || "N/A"})
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]/40 text-[var(--primary)]">
                        <Sparkles className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                          {messages.dashboard.primaryTrack}
                        </span>
                        <span className="mt-0.5 block font-serif text-sm font-bold text-[var(--primary)]">
                          {registrationData.first_preference}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)]/30 pt-4">
                    <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      {messages.dashboard.chosenPrograms}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {preferredPrograms.map((title: string) => (
                        <span
                          key={title}
                          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[10px] font-bold text-[var(--primary)]"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 border-b border-[var(--border)]/30 bg-[var(--muted)]/30 p-4.5">
                <Award className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-serif text-sm font-extrabold text-[var(--primary)]">
                  {messages.dashboard.academicStatusTitle}
                </h3>
              </div>
              <CardContent className="space-y-3 p-4.5 text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border)]/20 py-1.5">
                  <span className="text-[var(--muted-foreground)]">
                    {messages.dashboard.registrationVerification}
                  </span>
                  <span className="font-bold text-green-700 dark:text-green-400">
                    {messages.dashboard.verifiedStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border)]/20 py-1.5">
                  <span className="text-[var(--muted-foreground)]">
                    {messages.dashboard.digitalCertificate}
                  </span>
                  <span className="font-semibold text-[var(--primary)]">
                    {messages.dashboard.issuedOnCompletion}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[var(--muted-foreground)]">
                    {messages.dashboard.programDuration}
                  </span>
                  <span className="font-semibold text-[var(--foreground)]">
                    4 to 8 Weeks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 border-b border-[var(--border)]/30 bg-[var(--muted)]/30 p-4.5">
                <Phone className="h-5 w-5 text-[var(--secondary)]" />
                <h3 className="font-serif text-sm font-extrabold text-[var(--primary)]">
                  {messages.dashboard.emergencyTitle}
                </h3>
              </div>
              <CardContent className="space-y-3 p-4.5 text-xs">
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {messages.dashboard.contactName}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-[var(--foreground)]">
                    {registrationData.emergency_contact_name}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {messages.dashboard.relationship}
                  </span>
                  <span className="mt-0.5 block font-semibold text-[var(--muted-foreground)]">
                    {registrationData.emergency_contact_relationship}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {messages.dashboard.emergencyPhone}
                  </span>
                  <span className="mt-0.5 block font-bold text-[var(--primary)]">
                    {registrationData.emergency_contact_number}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 border-b border-[var(--border)]/30 bg-[var(--muted)]/30 p-4.5">
                <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="font-serif text-sm font-extrabold text-[var(--primary)]">
                  {messages.dashboard.billingTitle}
                </h3>
              </div>
              <CardContent className="p-4.5">
                <div className="space-y-4">
                  {dbPayments.length > 0 ? (
                    dbPayments.map((payment) => {
                      const programName =
                        courses.find((course) => course.id === payment.course_id)?.title ||
                        messages.dashboard.internshipTrackPurchase;

                      return (
                        <div
                          key={payment.id}
                          className="flex items-start justify-between border-b border-[var(--border)]/20 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="min-w-0 space-y-0.5 pr-2">
                            <div className="truncate text-xs font-bold text-[var(--foreground)]">
                              {programName}
                            </div>
                            <div className="truncate text-[9px] text-[var(--muted-foreground)]">
                              {messages.dashboard.orderPrefix} {payment.razorpay_order_id}
                            </div>
                            <div className="text-[9px] text-[var(--muted-foreground)]">
                              {new Date(payment.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-xs font-extrabold text-[var(--primary)]">
                              {"\u20B9"}
                              {payment.amount}
                            </div>
                            <span className="mt-1 inline-block rounded bg-green-100 px-1.5 py-0.5 text-[8px] font-bold uppercase text-green-800 dark:bg-green-950/40 dark:text-green-400">
                              {messages.dashboard.capturedStatus}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 py-6 text-center text-[var(--muted-foreground)]">
                      <CreditCard className="h-7 w-7 opacity-50" />
                      <p className="text-[10px] font-semibold">
                        {messages.dashboard.noTransactions}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted)]/20">
              <CardContent className="space-y-3 p-5 text-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  {messages.dashboard.helpDeskTitle}
                </h4>
                <p className="text-[10px] leading-relaxed text-[var(--muted-foreground)]">
                  {messages.dashboard.helpDeskDescription}
                </p>
                <div className="space-y-1 rounded-xl border border-[var(--border)]/40 bg-[var(--card)] p-2.5 text-[10px] font-bold text-[var(--foreground)] shadow-inner">
                  <div>
                    {messages.dashboard.emailLabel}: {currentSite.contact.email}
                  </div>
                  <div>
                    {messages.dashboard.phoneLabel}: {currentSite.contact.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
