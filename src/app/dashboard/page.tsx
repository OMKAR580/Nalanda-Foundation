import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getUserEnrollments, getUserPayments, getStudentRegistration } from "@/lib/supabase/server";
import { courses } from "@/data/courses";
import { CourseImage } from "@/components/ui/CourseImage";
import { currentSite } from "@/config/site";
import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  FileText,
  Phone,
  Award,
  Sparkles,
  HelpCircle,
  Mail,
  User,
  ArrowRight,
  Lightbulb
} from "lucide-react";

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

  if (!user) {
    redirect("/sign-in");
  }

  // Check registration status in Supabase
  let registrationData = null;
  let dbError = null;

  try {
    const { data, error } = await getStudentRegistration(user.id);
    if (error) {
      dbError = error;
    } else {
      registrationData = data;
    }
  } catch (error: unknown) {
    console.error("Error loading registration data in dashboard:", error);
    dbError = error;
  }

  // Render a clean error state if Supabase connection fails
  if (dbError) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full text-center space-y-6 bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl shadow-xl">
          <div className="h-16 w-16 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-serif text-[var(--primary)]">Database Connection Notice</h1>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              We encountered a connection issue while validating your student profile data from Supabase. This could be due to network delays or service updates.
            </p>
          </div>

          <div className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-left space-y-2.5 text-xs">
            <h3 className="font-bold flex items-center gap-1.5 text-[var(--foreground)]">
              <HelpCircle className="h-4 w-4 text-[var(--accent)]" /> Instant Verification Steps:
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-[var(--muted-foreground)] pl-1">
              <li>Refresh your page to establish a new database handshake.</li>
              <li>Reach our coordinators via the official WhatsApp Community.</li>
              <li>Contact our helpdesk at <strong className="text-[var(--primary)]">{currentSite.contact.email}</strong>.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="/dashboard" className="flex-1">
              <Button className="w-full h-11 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold">
                Retry Verification
              </Button>
            </a>
            <a href={currentSite.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full h-11 border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]/20 rounded-xl font-bold flex items-center justify-center gap-1.5">
                <MessageSquare className="h-4.5 w-4.5 text-green-500" /> WhatsApp Support
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to registration page if not completed
  if (!registrationData || !registrationData.registration_completed) {
    redirect("/registration");
  }

  // Fetch enrollments and payments from Supabase
  let dbEnrollments: DBEnrollment[] = [];
  let dbPayments: DBPayment[] = [];

  try {
    const [enrollmentsRes, paymentsRes] = await Promise.all([
      getUserEnrollments(user.id),
      getUserPayments(user.id)
    ]);
    dbEnrollments = (enrollmentsRes.data as DBEnrollment[]) || [];
    dbPayments = (paymentsRes.data as DBPayment[]) || [];
  } catch (error) {
    console.error("Failed to fetch dashboard data from Supabase:", error);
  }

  // Match dbEnrollments with local course data
  const enrolledPrograms = dbEnrollments
    .map(enrollment => {
      const program = courses.find(c => c.id === enrollment.course_id || c.slug === enrollment.course_slug);
      return program ? { ...program, enrollmentStatus: enrollment.status } : null;
    })
    .filter((c): c is (typeof courses[number] & { enrollmentStatus: string }) => c !== null);

  const preferredPrograms = Array.isArray(registrationData.internship_programs)
    ? registrationData.internship_programs
    : [];

  const recommendedCourse = courses.find(c => c.title === registrationData.first_preference) || courses[0];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Banner Card */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[var(--card)] border border-[var(--border)]/60 rounded-3xl p-6 md:p-8 shadow-md gap-6 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--primary)]/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--primary-foreground)] bg-[var(--primary)] px-3.5 py-0.5 rounded-full shadow-sm">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" /> Nalanda Learning Panel Verified
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] font-serif">
              Welcome back, {registrationData.full_name || user.firstName || 'Student'}!
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              Your academic profile is successfully logged. Track your enrolled programs, billing transactions, and active courses inside this secure workspace.
            </p>
          </div>
          <Link href="/programs" className="flex-shrink-0 w-full md:w-auto z-10">
            <Button className="w-full md:w-auto bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] font-bold shadow-md h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.98]">
              Browse More Programs <ArrowRight className="h-4.5 w-4.5" />
            </Button>
          </Link>
        </div>

        {/* WhatsApp Group Invite Card */}
        <div className="bg-gradient-to-r from-[var(--primary)] via-[#C35237] to-[var(--accent)] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/5 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-lg md:text-2xl font-bold font-serif flex items-center justify-center md:justify-start gap-2.5">
              <MessageSquare className="h-6.5 w-6.5 text-[#FAF0D9] animate-pulse" />
              Join the Official Batch WhatsApp Group
            </h2>
            <p className="text-xs text-[#FAF0D9]/90 max-w-xl leading-relaxed">
              Stay connected with mentor timetables, project submission links, class coordinates, and batch directories. This is our primary immediate channel.
            </p>
          </div>
          <a
            href={currentSite.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto"
          >
            <Button className="w-full md:w-auto bg-[#FAF0D9] hover:bg-white text-[#800020] hover:text-[#6B1D2F] font-extrabold h-12 px-8 rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-[0.98]">
              Join WhatsApp Group
            </Button>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Columns (Learning, timeline, profiles) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Onboarding Journey Checklist */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-serif flex items-center gap-2 text-[var(--primary)]">
                <CheckCircle2 className="h-5 w-5 text-[var(--secondary)]" />
                Student Onboarding Journey
              </h2>
              <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden glass-panel">
                <CardContent className="p-0">
                  <div className="divide-y divide-[var(--border)]/30">
                    <div className="p-4 sm:p-5 flex items-center gap-4 bg-[var(--muted)]/10">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-[var(--foreground)]">Profile Registration</h4>
                        <p className="text-xs text-[var(--muted-foreground)]">Your details have been successfully verified.</p>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex items-center gap-4">
                      <div className={"h-8 w-8 rounded-full flex items-center justify-center shrink-0 " + (enrolledPrograms.length > 0 ? "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400" : "bg-[var(--primary)]/10 text-[var(--primary)] glow-pulse-saffron")}>
                        {enrolledPrograms.length > 0 ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-[var(--foreground)]">Program Enrollment</h4>
                        <p className="text-xs text-[var(--muted-foreground)]">Select and enroll in your primary certification track.</p>
                      </div>
                      {enrolledPrograms.length === 0 && (
                        <Link href="/programs"><Button size="sm" variant="outline" className="text-xs h-8 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">Enroll Now</Button></Link>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 flex items-center gap-4 opacity-60">
                      <div className="h-8 w-8 rounded-full border-2 border-[var(--border)] flex items-center justify-center shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-[var(--foreground)]">Batch Allocation</h4>
                        <p className="text-xs text-[var(--muted-foreground)]">Awaiting cohort assignment from administration.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Active Enrolled Programs */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-serif flex items-center gap-2 text-[var(--primary)]">
                <BookOpen className="h-5 w-5 text-[var(--secondary)]" />
                My Enrolled Programs & Courses
              </h2>

              <div className="space-y-4">
                {enrolledPrograms.length > 0 ? (
                  enrolledPrograms.map((program) => (
                    <Card key={program.id} className="border border-[var(--border)]/60 bg-[var(--card)] hover:shadow-md hover:border-[var(--primary)]/30 transition-all rounded-2xl overflow-hidden shadow-sm">
                      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center p-5 sm:p-6 gap-6">
                        <div className="h-20 w-28 rounded-xl flex-shrink-0 border border-[var(--border)]/50 relative overflow-hidden">
                          <CourseImage
                            src={program.image}
                            alt={program.title}
                            category={program.category}
                            fill
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[var(--secondary)] px-2.5 py-0.5 rounded bg-[var(--muted)]/40 border border-[var(--border)]/30">
                            {program.category}
                          </span>
                          <h3 className="font-extrabold text-base text-[var(--foreground)] truncate">{program.title}</h3>
                          <p className="text-[10px] text-[var(--muted-foreground)]">
                            Duration: {program.duration} | Mode: {program.mode}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2.5 text-green-700 dark:text-green-400 text-xs font-semibold">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span>Active Enrollment Verified ({program.enrollmentStatus})</span>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto text-right">
                          <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--background)] border border-[var(--border)]/70 px-4 py-1.5 rounded-full inline-block uppercase">
                            Active
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl shadow-sm">
                    <CardContent className="p-8 text-center flex flex-col items-center space-y-4">
                      <div className="h-14 w-14 rounded-full bg-[var(--muted)]/50 flex items-center justify-center text-[var(--muted-foreground)] shadow-inner">
                        <BookOpen className="h-7 w-7 opacity-75" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-serif font-extrabold text-base text-[var(--foreground)]">No Enrolled Programs Yet</h3>
                        <p className="text-xs text-[var(--muted-foreground)] max-w-sm mx-auto leading-relaxed">
                          Your core academic registration details have been verified! Explore the learning catalog to purchase and enroll in your selected internship tracks.
                        </p>
                      </div>
                      <Link href="/programs">
                        <Button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] font-bold rounded-xl h-10 px-6 shadow-md transition-all hover:scale-[1.03] active:scale-[0.98]">
                          Explore & Enroll Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            {/* Personalized Recommendation (Only if not enrolled) */}
            {enrolledPrograms.length === 0 && recommendedCourse && (
              <section className="space-y-4">
                <h2 className="text-lg font-bold font-serif flex items-center gap-2 text-[var(--primary)]">
                  <Lightbulb className="h-5 w-5 text-[var(--accent)]" />
                  Recommended For You
                </h2>
                <Card className="border border-[var(--accent)]/30 bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden glow-card group relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="h-16 w-16 text-[var(--accent)]" />
                  </div>
                  <CardContent className="flex flex-col sm:flex-row items-center p-6 gap-6 relative z-10">
                    <div className="h-24 w-32 rounded-xl border border-[var(--border)] shadow-inner relative overflow-hidden">
                      <CourseImage
                        src={recommendedCourse.image}
                        alt={recommendedCourse.title}
                        category={recommendedCourse.category}
                        fill
                      />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#FAF6EE] bg-[#C35237] px-2.5 py-0.5 rounded shadow-sm">
                        Top Match
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-[var(--foreground)]">{recommendedCourse.title}</h3>
                      <p className="text-xs text-[var(--muted-foreground)]">Based on your first preference during registration.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Link href={`/programs/${recommendedCourse.slug || recommendedCourse.id}`}>
                        <Button className="bg-[var(--accent)] hover:bg-[#B45309] text-white font-bold h-10 px-6 rounded-xl shadow-md transition-all">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Academic Noticeboard */}
            <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4.5 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-serif font-bold text-sm tracking-wide">Academic Noticeboard</h3>
              </div>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1.5 border-l-2 border-[var(--accent)] pl-4">
                  <span className="text-[9px] font-bold text-[var(--secondary)] uppercase tracking-wider">Latest Update</span>
                  <h4 className="font-extrabold text-sm text-[var(--foreground)]">Cohort Allocations in Progress</h4>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Course content, live lecture links, and project repositories will activate dynamically upon final batch assignment. Keep an eye on your WhatsApp group!
                  </p>
                </div>
                <div className="space-y-1.5 border-l-2 border-[var(--border)] pl-4">
                  <span className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">System Update</span>
                  <h4 className="font-bold text-sm text-[var(--foreground)]">Portal Upgrades Completed</h4>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    The registration portal has been upgraded for enhanced security and faster processing times.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Registration Summary Sheet */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-serif flex items-center gap-2 text-[var(--primary)]">
                <FileText className="h-5 w-5 text-[var(--secondary)]" />
                My Verified Profile Summary
              </h2>

              <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                <CardContent className="p-6 space-y-6 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><User className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">Full Student Name</span>
                        <span className="text-sm font-semibold text-[var(--foreground)] mt-0.5 block">{registrationData.full_name}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><Mail className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">Registered Email</span>
                        <span className="text-sm font-semibold text-[var(--foreground)] mt-0.5 block truncate">{registrationData.email}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><Phone className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">Contact & WhatsApp</span>
                        <span className="text-sm font-semibold text-[var(--foreground)] mt-0.5 block">
                          {registrationData.mobile_number} {registrationData.whatsapp_number ? `/ ${registrationData.whatsapp_number}` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><Award className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">College / University</span>
                        <span className="text-sm font-semibold text-[var(--foreground)] mt-0.5 block truncate">{registrationData.college_name}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><Award className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">Degree & Specialization</span>
                        <span className="text-sm font-semibold text-[var(--foreground)] mt-0.5 block truncate">
                          {registrationData.degree} ({registrationData.department_stream || "N/A"})
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[var(--muted)]/40 flex items-center justify-center text-[var(--primary)] flex-shrink-0"><Sparkles className="h-4.5 w-4.5" /></div>
                      <div>
                        <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px]">Primary Track Preference</span>
                        <span className="text-sm font-bold text-[var(--primary)] mt-0.5 block font-serif">{registrationData.first_preference}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)]/30">
                    <span className="block font-bold text-[var(--muted-foreground)] uppercase tracking-wider text-[9px] mb-2.5">Chosen Program Preferences</span>
                    <div className="flex flex-wrap gap-2">
                      {preferredPrograms.map((title: string) => (
                        <span key={title} className="px-3 py-1 text-[10px] font-bold rounded-lg bg-[var(--background)] text-[var(--primary)] border border-[var(--border)]">
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column (Billing, Academic Info, Helpdesk) */}
          <div className="space-y-8">

            {/* Academic Certificate Status */}
            <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <div className="bg-[var(--muted)]/30 border-b border-[var(--border)]/30 p-4.5 flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="font-serif font-extrabold text-sm text-[var(--primary)]">Academic Status</h3>
              </div>
              <CardContent className="p-4.5 text-xs space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]/20">
                  <span className="text-[var(--muted-foreground)]">Registration verification</span>
                  <span className="font-bold text-green-700 dark:text-green-400">Verified ✅</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[var(--border)]/20">
                  <span className="text-[var(--muted-foreground)]">Digital certificate</span>
                  <span className="font-semibold text-[var(--primary)]">Issued on completion</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[var(--muted-foreground)]">Program Duration</span>
                  <span className="font-semibold text-[var(--foreground)]">4 to 8 Weeks</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact Card */}
            <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <div className="bg-[var(--muted)]/30 border-b border-[var(--border)]/30 p-4.5 flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--secondary)]" />
                <h3 className="font-serif font-extrabold text-sm text-[var(--primary)]">Emergency Reference</h3>
              </div>
              <CardContent className="p-4.5 text-xs space-y-3">
                <div>
                  <span className="text-[var(--muted-foreground)] block uppercase tracking-wider text-[9px] font-bold">Contact Name</span>
                  <span className="font-bold text-sm text-[var(--foreground)] block mt-0.5">{registrationData.emergency_contact_name}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block uppercase tracking-wider text-[9px] font-bold">Relationship</span>
                  <span className="font-semibold text-[var(--muted-foreground)] block mt-0.5">{registrationData.emergency_contact_relationship}</span>
                </div>
                <div>
                  <span className="text-[var(--muted-foreground)] block uppercase tracking-wider text-[9px] font-bold">Emergency Phone</span>
                  <span className="font-bold text-[var(--primary)] block mt-0.5">{registrationData.emergency_contact_number}</span>
                </div>
              </CardContent>
            </Card>

            {/* Billing & Transactions */}
            <Card className="border border-[var(--border)]/60 bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              <div className="bg-[var(--muted)]/30 border-b border-[var(--border)]/30 p-4.5 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="font-serif font-extrabold text-sm text-[var(--primary)]">Billing & Payments</h3>
              </div>
              <CardContent className="p-4.5">
                <div className="space-y-4">
                  {dbPayments.length > 0 ? (
                    dbPayments.map((payment) => {
                      const programName = courses.find(c => c.id === payment.course_id)?.title || 'Internship Track Purchase';
                      return (
                        <div key={payment.id} className="flex justify-between items-start border-b border-[var(--border)]/20 last:border-b-0 pb-3 last:pb-0">
                          <div className="min-w-0 pr-2 space-y-0.5">
                            <div className="font-bold text-xs text-[var(--foreground)] truncate">{programName}</div>
                            <div className="text-[9px] text-[var(--muted-foreground)] truncate">Order: {payment.razorpay_order_id}</div>
                            <div className="text-[9px] text-[var(--muted-foreground)]">
                              {new Date(payment.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-extrabold text-xs text-[var(--primary)]">₹{payment.amount}</div>
                            <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase mt-1 bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400">
                              Captured
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-[var(--muted-foreground)] py-6 flex flex-col items-center justify-center space-y-2">
                      <CreditCard className="h-7 w-7 opacity-50" />
                      <p className="text-[10px] font-semibold">No transactions recorded yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Support Desk Card */}
            <Card className="border border-[var(--border)] bg-[var(--muted)]/20 rounded-2xl border-dashed">
              <CardContent className="p-5 text-center space-y-3">
                <h4 className="font-bold text-xs text-[var(--primary)] uppercase tracking-wider">Academic Help Desk</h4>
                <p className="text-[10px] text-[var(--muted-foreground)] leading-relaxed">
                  For program swap requests, technical problems, or receipt logs:
                </p>
                <div className="text-[10px] font-bold text-[var(--foreground)] space-y-1 bg-[var(--card)] p-2.5 rounded-xl border border-[var(--border)]/40 shadow-inner">
                  <div>Email: {currentSite.contact.email}</div>
                  <div>Phone: {currentSite.contact.phone}</div>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
