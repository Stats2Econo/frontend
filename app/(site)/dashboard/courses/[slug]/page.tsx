import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, Download, ExternalLink, FileText, Link2, Lock, PlayCircle, StickyNote } from "lucide-react";
import { requireProfile } from "@/lib/auth";
import { getCourseBySlug, isUserEnrolled } from "@/lib/courses";
import { createClient } from "@/lib/supabase/server";
import { youtubeEmbedUrl } from "@/lib/format";
import type { Announcement, CourseContent } from "@/lib/types";
import AnnouncementList from "../../../../components/AnnouncementList";

export async function generateMetadata(props: PageProps<"/dashboard/courses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  return { title: course?.title ?? "Course" };
}

export default async function CourseContentPage(props: PageProps<"/dashboard/courses/[slug]">) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const profile = await requireProfile(`/dashboard/courses/${slug}`);
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const enrolled = await isUserEnrolled(profile.id, course.id);
  const isAdmin = profile.role === "admin";

  if (!enrolled && !isAdmin) {
    return (
      <div className="card mx-auto max-w-lg px-6 py-12 text-center">
        <Lock className="mx-auto h-6 w-6 text-zinc-300" />
        <h2 className="mt-3 text-base font-semibold text-ink">This content is for enrolled students</h2>
        <p className="mt-1 text-sm text-zinc-500">Register for {course.title} to unlock the course material.</p>
        <Link href={`/courses/${course.slug}`} className="btn-primary mt-6">
          View course
        </Link>
      </div>
    );
  }

  const supabase = await createClient();
  const [{ data: contentData }, { data: announcementData }] = await Promise.all([
    supabase
      .from("course_content")
      .select("*")
      .eq("course_id", course.id)
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("announcements")
      .select("*")
      .eq("course_id", course.id)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false }),
  ]);
  const content = (contentData as CourseContent[] | null) ?? [];
  const announcements = (announcementData as Announcement[] | null) ?? [];

  // Private files get short-lived download links (1 hour).
  const filePaths = content.filter((c) => c.content_type === "file" && c.file_path).map((c) => c.file_path!);
  const signedUrls = new Map<string, string>();
  if (filePaths.length) {
    const { data } = await supabase.storage.from("course-files").createSignedUrls(filePaths, 3600);
    data?.forEach((item) => item.path && item.signedUrl && signedUrls.set(item.path, item.signedUrl));
  }

  const sections = new Map<string, CourseContent[]>();
  for (const item of content) {
    const key = item.section || "Course material";
    sections.set(key, [...(sections.get(key) ?? []), item]);
  }

  return (
    <div>
      <Link href="/dashboard/courses" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand">
        <ArrowLeft className="h-3.5 w-3.5" /> My courses
      </Link>

      {searchParams.welcome && (
        <div className="mt-4 rounded-lg border border-leaf/30 bg-leaf-50 px-5 py-4 text-sm text-green-900">
          <strong>Payment successful — welcome aboard!</strong> Your course material is below. A receipt
          has been emailed to you by Razorpay.
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{course.title}</h2>
          {course.schedule && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
              <CalendarClock className="h-4 w-4" /> {course.schedule}
            </p>
          )}
        </div>
        {isAdmin && !enrolled && (
          <span className="badge bg-amber-50 text-amber-800">Admin preview</span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          {content.length === 0 && (
            <div className="card px-6 py-12 text-center text-sm text-zinc-500">
              Course material will appear here as soon as the instructor adds it.
            </div>
          )}

          {[...sections.entries()].map(([section, items]) => (
            <section key={section}>
              <h3 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">{section}</h3>
              <ul className="mt-3 space-y-3">
                {items.map((item) => (
                  <ContentItem key={item.id} item={item} fileUrl={item.file_path ? signedUrls.get(item.file_path) : undefined} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside>
          <h3 className="text-base font-semibold text-ink">Course announcements</h3>
          <div className="card mt-4 overflow-hidden">
            <AnnouncementList announcements={announcements} showCourse={false} />
          </div>
        </aside>
      </div>
    </div>
  );
}

const icons = { video: PlayCircle, file: FileText, link: Link2, note: StickyNote };

function ContentItem({ item, fileUrl }: { item: CourseContent; fileUrl?: string }) {
  const Icon = icons[item.content_type];
  const embed = item.content_type === "video" ? youtubeEmbedUrl(item.url) : null;

  return (
    <li className="card overflow-hidden">
      <div className="flex items-start gap-4 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
          {item.description && <p className="mt-1 text-sm text-zinc-600">{item.description}</p>}

          {item.content_type === "note" && item.body && (
            <div className="mt-3 rounded-md bg-zinc-50 p-4 text-sm leading-relaxed whitespace-pre-line text-zinc-700">
              {item.body}
            </div>
          )}

          {item.content_type === "file" && fileUrl && (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm mt-3">
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          )}

          {(item.content_type === "link" || (item.content_type === "video" && !embed)) && item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm mt-3">
              <ExternalLink className="h-3.5 w-3.5" /> {item.content_type === "video" ? "Watch video" : "Open link"}
            </a>
          )}
        </div>
      </div>
      {embed && (
        <div className="aspect-video w-full border-t border-zinc-100 bg-black">
          <iframe
            src={embed}
            title={item.title}
            className="h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </li>
  );
}
