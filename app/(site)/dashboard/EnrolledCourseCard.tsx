import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Course } from "@/lib/types";

export default function EnrolledCourseCard({ course, enrolledAt }: { course: Course; enrolledAt: string }) {
  return (
    <Link
      href={`/dashboard/courses/${course.slug}`}
      className="card group flex flex-col justify-between p-5 transition hover:border-zinc-300 hover:shadow-xs"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {course.software && <span className="badge bg-zinc-100 text-brand">{course.software}</span>}
          <span className="badge bg-leaf-50 text-green-800">Enrolled</span>
        </div>
        <h3 className="mt-3 text-sm leading-snug font-semibold text-ink">{course.title}</h3>
        {course.schedule && <p className="mt-1.5 text-xs text-zinc-500">{course.schedule}</p>}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
        <span className="text-zinc-400">Joined {formatDate(enrolledAt)}</span>
        <span className="inline-flex items-center gap-1 font-medium text-brand">
          Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
