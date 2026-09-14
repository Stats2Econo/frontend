import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/types";
import CourseCard from "./CourseCard";

export default function CourseOverviewSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="border-b border-zinc-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
            Course Overview
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
            Enhance Your Research &amp; Data Analysis Skills
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
            Instructor-led live sessions emphasizing practical do-file coding, dataset troubleshooting, and mathematical foundations.
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-lg border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500">
            New courses will be announced soon.
          </p>
        )}

        {courses.length > 6 && (
          <div className="mt-10 text-center">
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b5672] hover:underline">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
