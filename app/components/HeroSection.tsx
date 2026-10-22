"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Code2,
  Database,
  Globe2,
  GraduationCap,
  MonitorPlay,
  Pause,
  Play,
  Quote,
} from "lucide-react";
import { formatPrice, getCourseImage } from "@/lib/format";
import type { Course } from "@/lib/types";

/* 1. Original Mission Pillars + Stats in Salesforce 5-Card Frosted Row */
const VISION_PILLARS = [
  {
    icon: Globe2,
    title: "Equal Opportunity",
    desc: "Affordable access to quality training, with special fee concessions available for scholars and students from developing nations.",
  },
  {
    icon: BookOpen,
    title: "Theoretical Intuition",
    desc: "Moving beyond rote software buttons to understand the mathematical proofs, assumptions, and econometric logic behind every estimator.",
  },
  {
    icon: Database,
    title: "Empirical Datasets",
    desc: "Direct exposure to national surveys like NSSO and PLFS, learning unit-level data parsing, multipliers, and publication-ready .do files.",
  },
  {
    icon: Code2,
    title: "STATA & R Applied",
    desc: "Every course is crafted from the ground up—moving methodically from mathematical foundations to live code execution.",
  },
  {
    icon: GraduationCap,
    title: "600+ Trained",
    desc: "Over 10+ years of teaching students, doctoral scholars, and faculty across 65+ universities and 20+ countries.",
  },
];

/* 2. Authentic Testimonials from Original Website */
const TRUST_STORIES = [
  {
    quote:
      "I found this course comprehensive as compared to others that focus only on working on the STATA platform. This course has been designed from scratch to the why and how of the statistical technique. Above all, I find that Mr. Aslam to be genuinely driven by the cause of providing quality learning.",
    name: "Dr. Baishali Lahiri",
    role: "Consultant to International Labour Organization (ILO), New Delhi",
    badge: "ILO · New Delhi",
    avatar: "/testimonials/baishali.jpg",
    photo: "/gallery/lecture-hall.jpg",
  },
  {
    quote:
      "The NSSO data extraction workshop simplified what used to take weeks of tedious trial and error. Learning fixed-width text parsing and multiplier weighting gave our research team complete independence.",
    name: "Research Scholar",
    role: "Centre for Economic Studies and Planning (CESP), JNU",
    badge: "CESP · JNU",
    avatar: null,
    photo: "/gallery/akal-university.jpg",
  },
  {
    quote:
      "Dr. Aslam's lectures on Time Series and Panel Data Econometrics bridge the math with practical STATA do-files seamlessly. Highly recommended for researchers preparing empirical manuscripts.",
    name: "Assistant Professor in Economics",
    role: "Central University",
    badge: "Central University",
    avatar: null,
    photo: "/gallery/vishwakarma-university.jpg",
  },
];

export default function HeroSection({ courses = [] }: { courses?: Course[] }) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const marqueeCourses = courses.length > 0 ? [...courses, ...courses] : [];

  const nudgeScroll = (dir: "left" | "right") => {
    if (!scrollerRef.current) return;
    setIsPaused(true);
    scrollerRef.current.scrollBy({
      left: dir === "left" ? -380 : 380,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#13261b] via-[#1f3b29] to-[#2d4a35] pb-40 text-white">
      {/* Subtle atmospheric radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[#62a86a]/15 blur-[130px]"
      />

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 1: ORIGINAL HERO TEXT & INSTRUCTOR CREDENTIALS
         ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-12 text-center md:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c0392b]" />
          Instructor-Led Live Online Courses
        </div>

        <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
          Enhance Your Research &amp; Data Analysis Skills
          <br className="hidden sm:block" />
          <span className="text-[#a8d5b5]"> with Statistical Software</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          Hands-on training in Basic &amp; Advanced Econometrics, NSSO Unit-Level
          Data extraction, Time Series Analysis, and applied modeling using{" "}
          <strong className="font-semibold text-white">STATA</strong> and{" "}
          <strong className="font-semibold text-white">R</strong>.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/65">
          <span className="font-semibold text-white/95">Dr. Mohamad Aslam</span>
          <span>·</span>
          <span>Former Post-Doctoral Fellow, IISER Mohali</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 2: ORIGINAL MISSION TEXT + 5 GLASSMORPHIC PILLAR CARDS
         ═══════════════════════════════════════════════════════════════════ */}
      <div id="mission" className="relative mx-auto max-w-6xl px-6 pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {VISION_PILLARS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#a8d5b5]/50 hover:bg-white/[0.11] hover:shadow-xl"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#a8d5b5] ring-1 ring-white/20 transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-base font-bold tracking-tight text-white">
                  {title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Original Mission Paragraph */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
          Stats2Econo was founded on the belief that research skills should be accessible to every student, at any level, from anywhere. Statistical and econometric analyses are essential for solving real-world challenges, including socio-economic, geographical, psychological, and environmental issues.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#courses"
            className="inline-flex items-center gap-2 rounded-md bg-[#c0392b] px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#a93226]"
          >
            View Courses
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/our-journey"
            className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-semibold text-[#13261b] shadow-md transition-colors hover:bg-[#e9f5ec]"
          >
            Read More About Our Journey
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 3: INFINITE SCROLLING COURSES WITH NEW ARTWORK
         ═══════════════════════════════════════════════════════════════════ */}
      {marqueeCourses.length > 0 && (
        <div id="courses" className="relative mt-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
              Course Overview
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Instructor-led live sessions in STATA &amp; R
            </h2>
          </div>

          {/* Full-bleed horizontal infinite track */}
          <div
            ref={scrollerRef}
            className="mt-10 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className={`animate-marquee gap-6 px-6 ${isPaused ? "paused" : ""}`}>
              {marqueeCourses.map((course, idx) => {
                const isDummy = course.id.startsWith("dummy-");
                const imageSrc = getCourseImage(course);

                return (
                  <Link
                    key={`${course.id}-${idx}`}
                    href={isDummy ? "/courses" : `/courses/${course.slug}`}
                    className="group flex w-[340px] shrink-0 flex-col justify-between rounded-2xl bg-white p-2.5 text-[#1a2b20] shadow-xl ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 sm:w-[370px]"
                  >
                    {/* Top Image Banner Frame */}
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-[#13261b]">
                      <Image
                        src={imageSrc}
                        alt={course.title}
                        fill
                        sizes="370px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20"
                      />

                      <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                        <span className="rounded-md bg-white/95 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#13261b] shadow-xs">
                          {course.software || "STATA & R"}
                        </span>
                        {course.is_featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#c0392b] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            Current Batch
                          </span>
                        )}
                      </div>

                      <h3 className="absolute inset-x-3.5 bottom-3 text-sm font-bold leading-snug text-white drop-shadow-xs line-clamp-2 sm:text-base">
                        {course.title}
                      </h3>
                    </div>

                    {/* White card bottom caption bar */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600">
                        {course.short_description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] font-medium text-zinc-500">
                        {course.mode && (
                          <span className="inline-flex items-center gap-1">
                            <MonitorPlay className="h-3.5 w-3.5 text-[#2d4a35]" />
                            {course.mode}
                          </span>
                        )}
                        {course.duration && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-[#2d4a35]" />
                            {course.duration}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
                        <span className="text-base font-bold text-[#13261b]">
                          {formatPrice(course.price_inr)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2d4a35] transition-transform group-hover:translate-x-0.5">
                          View course <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Salesforce-style Circular Carousel Controls: ( ← ) ( ⏸ ) ( → ) */}
          <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-6">
            <Link
              href="/courses"
              className="text-xs font-semibold text-[#a8d5b5] hover:underline"
            >
              View all {courses.length} courses →
            </Link>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => nudgeScroll("left")}
                aria-label="Scroll courses left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? "Play auto-scroll" : "Pause auto-scroll"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => nudgeScroll("right")}
                aria-label="Scroll courses right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 4: PARTICIPANT EXPERIENCES (Salesforce Framed Trust Cards)
         ═══════════════════════════════════════════════════════════════════ */}
      <div id="testimonials" className="relative mx-auto mt-24 max-w-6xl px-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
            Testimonials
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Participant Experiences
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
            More than 600 participants have taken our courses from various institutes and multiple nations.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRUST_STORIES.map((story) => (
            <div
              key={story.name}
              className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-2.5 text-[#1a2b20] shadow-2xl"
            >
              <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl bg-zinc-900 p-5 text-white">
                <Image
                  src={story.photo}
                  alt={story.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-35"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0f1f15] via-[#0f1f15]/75 to-transparent"
                />

                <div className="relative flex items-center justify-between">
                  <Quote className="h-6 w-6 text-[#a8d5b5]" />
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                    {story.badge}
                  </span>
                </div>

                <blockquote className="relative mt-4 text-xs leading-relaxed text-white/95 italic">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3 px-3 py-3.5">
                {story.avatar ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200">
                    <Image src={story.avatar} alt={story.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2d4a35] text-xs font-bold text-white">
                    {story.badge.slice(0, 3)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-zinc-900">{story.name}</div>
                  <div className="truncate text-[11px] text-zinc-500">{story.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 5: THE CONVEX ARCH ENDING
         ═══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 left-0"
        style={{ lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 1440 110"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "110px" }}
        >
          <path
            d="M0,110 L0,18 C360,102 1080,102 1440,18 L1440,110 Z"
            fill="#f7f9f7"
          />
        </svg>
      </div>
    </section>
  );
}