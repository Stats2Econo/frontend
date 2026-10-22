import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MonitorPlay, Tag } from "lucide-react";
import { formatPrice, getCourseImage } from "@/lib/format";
import type { Course } from "@/lib/types";

/* Map software name → a consistent accent colour */
const SOFTWARE_COLOUR: Record<string, { bg: string; text: string }> = {
  STATA: { bg: "bg-blue-50/95", text: "text-blue-800" },
  R:     { bg: "bg-emerald-50/95", text: "text-emerald-800" },
};

export default function CourseCard({ course }: { course: Course }) {
  const colour = SOFTWARE_COLOUR[course.software] ?? { bg: "bg-zinc-100/95", text: "text-zinc-800" };
  const isDummy = course.id.startsWith("dummy-");
  const imageSrc = getCourseImage(course);

  return (
    <Link
      href={isDummy ? "/courses" : `/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
    >
      {/* ── Card illustration banner with real course artwork ── */}
      <div className="relative h-48 w-full overflow-hidden bg-[#13261b]">
        <Image
          src={imageSrc}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle bottom gradient so badges & edges stay crisp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
        />

        {/* Featured badge */}
        {course.is_featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#c0392b] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
            Current Batch
          </span>
        )}

        {/* Software badge */}
        <span
          className={`absolute right-3 top-3 rounded-md px-2.5 py-0.5 text-[11px] font-bold shadow-sm backdrop-blur-xs ${colour.bg} ${colour.text}`}
        >
          {course.software}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold leading-snug text-ink group-hover:text-[#2d4a35] transition-colors sm:text-base">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
          {course.short_description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
          {course.mode && (
            <span className="flex items-center gap-1">
              <MonitorPlay className="h-3.5 w-3.5 text-zinc-400" />
              {course.mode}
            </span>
          )}
          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              {course.duration}
            </span>
          )}
          {course.schedule && (
            <span className="flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-zinc-400" />
              {course.schedule}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Footer: price + CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
          <div>
            {course.enrollment_open ? (
              <span className="text-base font-bold text-ink">
                {formatPrice(course.price_inr)}
              </span>
            ) : (
              <div>
                <div className="text-base font-bold text-ink">
                  {formatPrice(course.price_inr)}
                </div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                  Enrolment opening soon
                </div>
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d4a35] transition-transform group-hover:translate-x-0.5">
            View course
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}