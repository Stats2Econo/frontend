import type { Metadata } from "next";
import { getPublishedCourses } from "@/lib/courses";
import CourseCard from "../../components/CourseCard";

export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <section className="flex-1 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Courses</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Instructor-led live online courses
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Theory and hands-on practice in statistics and econometrics using STATA and R, taught
            live by Dr. Mohamad Aslam.
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="card mt-12 p-10 text-center text-sm text-zinc-500">
            New courses will be announced soon.
          </p>
        )}
      </div>
    </section>
  );
}
