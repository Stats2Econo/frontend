import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, Clock, FileText, MonitorPlay } from "lucide-react";
import { getCourseBySlug, isUserEnrolled } from "@/lib/courses";
import { getProfile } from "@/lib/auth";
import { formatDate, formatPrice } from "@/lib/format";
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

  const facts = [
    { icon: MonitorPlay, label: "Mode", value: course.mode },
    { icon: FileText, label: "Software", value: course.software },
    { icon: Clock, label: "Schedule", value: course.schedule },
    { icon: Clock, label: "Duration", value: course.duration },
    {
      icon: CalendarDays,
      label: "Dates",
      value: course.start_date
        ? `${formatDate(course.start_date)}${course.end_date ? ` – ${formatDate(course.end_date)}` : ""}`
        : "",
    },
  ].filter((f) => f.value);

  return (
    <div className="flex-1 bg-white">
      <section className="border-b border-zinc-200 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand">
            <ArrowLeft className="h-3.5 w-3.5" /> All courses
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {course.software && <span className="badge bg-white text-brand ring-1 ring-zinc-200">{course.software}</span>}
            {course.is_featured && <span className="badge bg-berry/10 text-berry">Current Course</span>}
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">{course.short_description}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          {course.overview && (
            <section>
              <h2 className="text-lg font-semibold text-ink">Course overview</h2>
              <div className="mt-3 text-sm leading-relaxed whitespace-pre-line text-zinc-700 sm:text-base">
                {course.overview}
              </div>
            </section>
          )}

          {course.syllabus.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-ink">What you will learn</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3">
                {course.syllabus.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6 shadow-xs">
            <div className="text-xs font-medium text-zinc-500">Course fee</div>
            <div className="mt-1 text-3xl font-semibold text-ink">{formatPrice(course.price_inr)}</div>
            {course.price_inr > 0 && <div className="text-xs text-zinc-500">Inclusive of all taxes</div>}

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
              <dl className="mt-6 space-y-3 border-t border-zinc-100 pt-5 text-sm">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                    <div>
                      <dt className="text-xs text-zinc-500">{label}</dt>
                      <dd className="font-medium text-zinc-800">{value}</dd>
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
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <FileText className="h-4 w-4" /> Download brochure
              </a>
            )}
          </div>
          <p className="mt-4 px-1 text-xs leading-relaxed text-zinc-500">
            Payments are processed securely by Razorpay. See our{" "}
            <Link href="/terms-of-use-and-refund-policy" className="text-brand hover:underline">
              refund policy
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
