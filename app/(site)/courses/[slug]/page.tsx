import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getCourseBySlug, isUserEnrolled } from "@/lib/courses";
import { getProfile } from "@/lib/auth";
import { formatDate, formatPrice, getCourseImage } from "@/lib/format";
import EnrollButton from "./EnrollButton";

export async function generateMetadata(props: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  return course ? { title: course.title, description: course.short_description } : {};
}

export default async function CoursePage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course || !course.is_published) notFound();

  const profile = await getProfile();
  const enrolled = profile ? await isUserEnrolled(profile.id, course.id) : false;
  const imageSrc = getCourseImage(course);

  const facts = [
    { icon: MonitorPlay, label: "Delivery Mode", value: course.mode },
    { icon: FileText, label: "Statistical Software", value: course.software },
    { icon: Clock, label: "Live Schedule", value: course.schedule },
    { icon: Clock, label: "Total Duration", value: course.duration },
    {
      icon: CalendarDays,
      label: "Batch Dates",
      value: course.start_date
        ? `${formatDate(course.start_date)}${course.end_date ? ` – ${formatDate(course.end_date)}` : ""}`
        : "",
    },
  ].filter((f) => f.value);

  return (
    <div className="flex-1 bg-[#f4f7f4]">
      {/* ═══════════════════════════════════════════════════════════════════
          DARK FOREST HERO WITH COURSE ARTWORK SHOWCASE
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#13261b] via-[#1f3b29] to-[#2d4a35] pb-24 pt-10 text-white md:pb-28 md:pt-14">
        {/* Atmospheric glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#62a86a]/15 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xs transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all courses
          </Link>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Course Title, Badges & Meta Pills */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                {course.software && (
                  <span className="rounded-md bg-white px-3 py-1 text-xs font-bold tracking-wide text-[#13261b] shadow-xs">
                    {course.software}
                  </span>
                )}
                {course.is_featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c0392b] px-3 py-1 text-xs font-semibold text-white shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Current Course
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full border border-[#a8d5b5]/30 bg-white/10 px-3 py-1 text-xs font-medium text-[#a8d5b5]">
                  <Sparkles className="h-3 w-3" /> Live Instructor-Led
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                {course.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {course.short_description}
              </p>

              {/* Quick Highlight Strip */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {facts.slice(0, 3).map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs backdrop-blur-xs"
                  >
                    <Icon className="h-4 w-4 text-[#a8d5b5]" />
                    <div>
                      <span className="text-white/60">{label}: </span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Framed Course Illustration Banner */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2.5 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0f1f15]">
                  <Image
                    src={imageSrc}
                    alt={course.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white/90">
                    <span className="rounded bg-black/50 px-2.5 py-1 backdrop-blur-xs">
                      Dr. Mohamad Aslam · Stats2Econo
                    </span>
                    <span className="rounded bg-[#2d4a35]/90 px-2.5 py-1 font-semibold text-[#a8d5b5]">
                      Certificate Included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Convex Arch into the Sage Content Area */}
        <div aria-hidden className="absolute right-0 bottom-0 left-0" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 70"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "70px" }}
          >
            <path d="M0,70 L0,12 C360,66 1080,66 1440,12 L1440,70 Z" fill="#f4f7f4" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN 2-COLUMN BODY: SYLLABUS & OVERVIEW + STICKY ENROLLMENT CARD
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:py-14 lg:grid-cols-[1fr_370px]">
        {/* Left Content Column */}
        <div className="space-y-8">
          {/* Course Overview Card */}
          {course.overview && (
            <section className="rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-xs sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2d4a35]/10 text-[#2d4a35]">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[#2d4a35]">
                    About This Program
                  </div>
                  <h2 className="text-xl font-bold text-[#1a2b20]">Course Overview</h2>
                </div>
              </div>
              <div className="mt-5 text-sm leading-relaxed whitespace-pre-line text-zinc-700 sm:text-base">
                {course.overview}
              </div>
            </section>
          )}

          {/* What You Will Learn (Bento Module Cards) */}
          {course.syllabus.length > 0 && (
            <section className="rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-xs sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2d4a35] text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[#2d4a35]">
                      Curriculum &amp; Modules
                    </div>
                    <h2 className="text-xl font-bold text-[#1a2b20]">What you will learn</h2>
                  </div>
                </div>
                <span className="rounded-full bg-[#f2f6f3] px-3 py-1 text-xs font-semibold text-[#2d4a35]">
                  {course.syllabus.length} Key Topics
                </span>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-3.5">
                {course.syllabus.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 rounded-xl border border-zinc-200/70 bg-[#f9fbf9] p-4 transition hover:border-[#2d4a35]/40 hover:bg-white hover:shadow-xs"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2d4a35] font-mono text-xs font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5 text-sm font-medium leading-relaxed text-zinc-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Methodology & Instructor Guarantee Banner */}
          <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#192e20] via-[#2d4a35] to-[#192e20] p-7 text-white shadow-md sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#a8d5b5]">
                  <GraduationCap className="h-4 w-4" /> Taught Live by Dr. Mohamad Aslam
                </div>
                <h3 className="text-lg font-bold text-white">
                  From Mathematical Proof to Reproducible Code
                </h3>
                <p className="max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm">
                  Every session combines theoretical derivations with live software execution, individual error troubleshooting, and a verified certificate from STATS2ECONO APPLIED RESEARCH Pvt. Ltd.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-center backdrop-blur-xs">
                <Award className="h-7 w-7 text-[#a8d5b5]" />
                <span className="mt-1.5 text-xs font-bold text-white">Official Certificate</span>
                <span className="text-[10px] text-white/70">Issued upon completion</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar: Executive Enrollment Card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
            {/* Top Accent Strip */}
            <div className="bg-gradient-to-r from-[#13261b] via-[#2d4a35] to-[#c0392b] px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase">
              Course Registration
            </div>

            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-medium text-zinc-500">Course Fee</div>
                  <div className="mt-1 text-3xl font-bold tracking-tight text-[#13261b]">
                    {formatPrice(course.price_inr)}
                  </div>
                </div>
                {course.enrollment_open ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                    Admissions Open
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                    Batch Closed
                  </span>
                )}
              </div>

              {course.price_inr > 0 && (
                <div className="mt-1 text-xs text-zinc-500">
                  Inclusive of all taxes · Scholar concessions applied
                </div>
              )}

              <div className="mt-6">
                <EnrollButton
                  courseId={course.id}
                  slug={course.slug}
                  title={course.title}
                  isFree={course.price_inr === 0}
                  isLoggedIn={Boolean(profile)}
                  profileCompleted={Boolean(profile?.profile_completed)}
                  enrolled={enrolled}
                  enrollmentOpen={course.enrollment_open}
                />
              </div>

              {facts.length > 0 && (
                <dl className="mt-6 space-y-3.5 border-t border-zinc-100 pt-5 text-sm">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f2f6f3] text-[#2d4a35]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs text-zinc-500">{label}</dt>
                        <dd className="font-semibold text-zinc-900">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              )}

              {course.brochure_url && (
                <a
                  href={course.brochure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2d4a35]/30 bg-[#f2f6f3] px-4 py-2.5 text-xs font-bold text-[#2d4a35] transition hover:bg-[#e4ede6]"
                >
                  <FileText className="h-4 w-4" /> Download Course Brochure (PDF)
                </a>
              )}
            </div>

            <div className="border-t border-zinc-100 bg-zinc-50/70 px-6 py-3.5">
              <p className="flex items-center gap-2 text-[11px] leading-relaxed text-zinc-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#2d4a35]" />
                <span>
                  Secured by Razorpay. View{" "}
                  <Link href="/terms-of-use-and-refund-policy" className="font-medium text-[#2d4a35] hover:underline">
                    refund policy
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}