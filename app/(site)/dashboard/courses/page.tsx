import type { Metadata } from "next";
import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyEnrollments } from "@/lib/student";
import EnrolledCourseCard from "../EnrolledCourseCard";

export const metadata: Metadata = { title: "My Courses" };

export default async function MyCoursesPage() {
  const profile = await requireProfile("/dashboard/courses");
  const enrollments = await getMyEnrollments(profile.id);

  return (
    <div>
      <h2 className="text-base font-semibold text-ink">My courses</h2>
      {enrollments.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((e) => (
            <EnrolledCourseCard key={e.id} course={e.courses!} enrolledAt={e.created_at} />
          ))}
        </div>
      ) : (
        <div className="card mt-4 px-6 py-12 text-center text-sm text-zinc-500">
          No courses yet.{" "}
          <Link href="/courses" className="font-medium text-brand hover:underline">
            Browse courses
          </Link>
        </div>
      )}
    </div>
  );
}
