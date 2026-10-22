import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Database, GraduationCap, Sparkles } from "lucide-react";
import { getPublishedCourses } from "@/lib/courses";
import { DUMMY_COURSES } from "./dummy";
import CourseCard from "../../components/CourseCard";

export const metadata: Metadata = { title: "Courses" };

const HIGHLIGHTS = [
  { icon: GraduationCap, label: "600+ participants trained" },
  { icon: BookOpen, label: "10+ years teaching experience" },
  { icon: Code2, label: "IISER Mohali post-doctoral faculty" },
  { icon: Database, label: "NSSO & PLFS micro-data expertise" },
];

export default async function CoursesPage() {
  const liveCourses = await getPublishedCourses();
  const courses = liveCourses.length > 0 ? liveCourses : DUMMY_COURSES;
  const isDummy = liveCourses.length === 0;

  return (
    <div className="flex-1 bg-[#f4f7f4]">
      {/* ── Deep Forest Hero Banner with Convex Arch ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#13261b] via-[#1f3b29] to-[#2d4a35] pt-16 pb-28 text-white md:pt-20 md:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-[#62a86a]/15 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a8d5b5]/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
            <Sparkles className="h-3.5 w-3.5 text-[#f59e0b]" />
            Academic Curriculum · STATA &amp; R
          </div>

          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Instructor-Led Live Online Courses
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Rigorous theory and hands-on practice in statistics, econometrics, and national survey micro-data using{" "}
            <strong className="font-semibold text-white">STATA</strong> and{" "}
            <strong className="font-semibold text-white">R</strong>, taught live by{" "}
            <strong className="font-semibold text-white">Dr. Mohamad Aslam</strong>.
          </p>

          {/* 4 Frosted Glass Trust Pills */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-xs font-medium text-white backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#a8d5b5]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Convex curve into the #f4f7f4 course grid */}
        <div aria-hidden className="absolute right-0 bottom-0 left-0" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            <path d="M0,80 L0,14 C360,76 1080,76 1440,14 L1440,80 Z" fill="#f4f7f4" />
          </svg>
        </div>
      </section>

      {/* ── Courses Grid on Warm Sage Canvas ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {isDummy && (
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3.5 text-sm text-amber-800 shadow-2xs">
              <strong className="font-semibold">Preview mode:</strong> Showing sample curriculum. Live courses from Supabase will automatically replace these when published.
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#1a2b20] sm:text-2xl">
                Available Programs &amp; Workshops
              </h2>
              <p className="mt-0.5 text-xs text-zinc-600 sm:text-sm">
                Showing <strong className="font-semibold text-zinc-900">{courses.length}</strong> published programs
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Dark Forest Consultation Banner ── */}
      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#13261b] via-[#2d4a35] to-[#13261b] px-8 py-12 text-center text-white shadow-xl sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Not sure which course fits your research thesis?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Write to Dr. Mohamad Aslam directly — he will recommend the right starting point based on your quantitative background and empirical research goals.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/#connect"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c0392b] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#a93226]"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Read FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}