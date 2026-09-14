import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Course } from "@/lib/types";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group flex flex-col justify-between rounded-lg border p-6 transition duration-200 ${
        course.is_featured
          ? "border-brand bg-brand-50/60"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {course.software ? (
            <span className="badge bg-zinc-100 text-brand">{course.software}</span>
          ) : (
            <span />
          )}
          {course.is_featured && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-berry">
              <span className="h-1.5 w-1.5 rounded-full bg-berry" />
              Current Course
            </span>
          )}
        </div>

        <h3 className="mt-4 text-base leading-snug font-semibold text-ink">{course.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
          {course.short_description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-200/70 pt-4 text-sm">
        <span className="font-semibold text-ink">
          {course.enrollment_open ? formatPrice(course.price_inr) : (
            <span className="text-xs font-medium text-zinc-500">Enrollment opening soon</span>
          )}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
          View course
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
