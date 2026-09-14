import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { requireProfile } from "@/lib/auth";
import { getMyAnnouncements, getMyEnrollments } from "@/lib/student";
import AnnouncementList from "../../components/AnnouncementList";
import EnrolledCourseCard from "./EnrolledCourseCard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const profile = await requireProfile("/dashboard");
  const [enrollments, announcements] = await Promise.all([
    getMyEnrollments(profile.id),
    getMyAnnouncements(5),
  ]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <section>
        <SectionHeader title="My courses" href="/dashboard/courses" />
        {enrollments.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {enrollments.slice(0, 4).map((e) => (
              <EnrolledCourseCard key={e.id} course={e.courses!} enrolledAt={e.created_at} />
            ))}
          </div>
        ) : (
          <div className="card mt-4 flex flex-col items-center px-6 py-12 text-center">
            <BookOpen className="h-6 w-6 text-zinc-300" />
            <p className="mt-3 text-sm font-medium text-ink">You haven&apos;t registered for a course yet</p>
            <p className="mt-1 text-sm text-zinc-500">Browse our live courses to get started.</p>
            <Link href="/courses" className="btn-primary mt-5">
              Browse courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      <aside className="space-y-8">
        <section>
          <SectionHeader title="Latest announcements" href="/dashboard/announcements" />
          <div className="card mt-4 overflow-hidden">
            <AnnouncementList announcements={announcements} />
          </div>
        </section>

        <section>
          <SectionHeader title="Profile" href="/dashboard/profile" linkText="Edit" />
          <dl className="card mt-4 divide-y divide-zinc-100 text-sm">
            {[
              ["Email", profile.email],
              ["Phone", profile.phone],
              ["Institution", profile.institution],
              ["Location", [profile.city, profile.state, profile.country].filter(Boolean).join(", ")],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-5 py-3">
                <dt className="text-zinc-500">{label}</dt>
                <dd className="truncate text-right font-medium text-zinc-800">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>
    </div>
  );
}

function SectionHeader({ title, href, linkText = "View all" }: { title: string; href: string; linkText?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <Link href={href} className="text-xs font-medium text-brand hover:underline">
        {linkText}
      </Link>
    </div>
  );
}
