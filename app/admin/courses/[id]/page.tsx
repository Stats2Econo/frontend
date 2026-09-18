import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, Link2, PlayCircle, StickyNote } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import type { Announcement, Course, CourseContent, Enrollment, Profile } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import AnnouncementList from "@/app/components/AnnouncementList";
import { deleteAnnouncement, deleteContent, deleteCourse, setEnrollmentStatus } from "../../actions";
import CourseForm from "../CourseForm";
import ContentForm from "./ContentForm";
import EnrollForm from "../../users/EnrollForm";
import AnnouncementForm from "../../announcements/AnnouncementForm";
import { EmptyRow, PageHeader, Table, Tabs, Td, Th } from "../../ui";

export const metadata: Metadata = { title: "Edit course" };

const contentIcons = { video: PlayCircle, file: FileText, link: Link2, note: StickyNote };

export default async function AdminCoursePage(props: PageProps<"/admin/courses/[id]">) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const tab = typeof searchParams.tab === "string" ? searchParams.tab : "details";
  const editId = typeof searchParams.edit === "string" ? searchParams.edit : null;

  const supabase = await createClient();
  const { data: courseData } = await supabase.from("courses").select("*").eq("id", id).maybeSingle();
  const course = courseData as Course | null;
  if (!course) notFound();

  const base = `/admin/courses/${id}`;
  const tabs = [
    { key: "details", label: "Details", href: base },
    { key: "content", label: "Content", href: `${base}?tab=content` },
    { key: "students", label: "Students", href: `${base}?tab=students` },
    { key: "announcements", label: "Announcements", href: `${base}?tab=announcements` },
  ];

  return (
    <div className="max-w-5xl">
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand">
        <ArrowLeft className="h-3.5 w-3.5" /> Courses
      </Link>
      <PageHeader
        title={course.title}
        description={course.is_published ? "Published" : "Draft — not visible on the website"}
        action={
          <div className="flex gap-2">
            <Link href={`/dashboard/courses/${course.slug}`} className="btn-secondary btn-sm">
              Preview content
            </Link>
            {course.is_published && (
              <Link href={`/courses/${course.slug}`} target="_blank" className="btn-secondary btn-sm">
                View page <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        }
      />

      {searchParams.created && (
        <div className="mb-6 rounded-lg border border-leaf/30 bg-leaf-50 px-4 py-3 text-sm text-green-900">
          Course created. Next, add study material in the <Link href={`${base}?tab=content`} className="font-medium underline">Content</Link> tab.
        </div>
      )}

      <Tabs tabs={tabs} active={tab} />

      {tab === "details" && (
        <>
          <CourseForm course={course} />
          <div className="mt-10 rounded-lg border border-red-200 bg-white p-6">
            <h2 className="text-sm font-semibold text-red-800">Delete course</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Permanently removes the course, its content, uploaded files, announcements and enrollments.
              Payment records are kept. Consider unpublishing instead.
            </p>
            <form action={deleteCourse} className="mt-4">
              <input type="hidden" name="id" value={course.id} />
              <SubmitButton
                className="btn-danger"
                pendingText="Deleting…"
                confirmMessage={`Delete "${course.title}" permanently? This cannot be undone.`}
              >
                Delete course
              </SubmitButton>
            </form>
          </div>
        </>
      )}

      {tab === "content" && <ContentTab course={course} editId={editId} />}
      {tab === "students" && <StudentsTab course={course} />}
      {tab === "announcements" && <AnnouncementsTab course={course} />}
    </div>
  );
}

async function ContentTab({ course, editId }: { course: Course; editId: string | null }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("course_content")
    .select("*")
    .eq("course_id", course.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  const items = (data as CourseContent[] | null) ?? [];
  const editing = editId ? items.find((i) => i.id === editId) : undefined;
  const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 10 : 10;

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px]">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Course material ({items.length})</h2>
        <ul className="card divide-y divide-zinc-100">
          {items.map((item) => {
            const Icon = contentIcons[item.content_type];
            return (
              <li key={item.id} className={`flex items-start gap-3 p-4 ${item.id === editId ? "bg-brand-50/60" : ""}`}>
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-ink">{item.title}</span>
                    {!item.is_published && <span className="badge bg-zinc-100 text-zinc-600">Hidden</span>}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500">
                    {[item.section, item.content_type, `order ${item.sort_order}`].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/admin/courses/${course.id}?tab=content&edit=${item.id}`} className="btn-secondary btn-sm">
                    Edit
                  </Link>
                  <form action={deleteContent}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="course_id" value={course.id} />
                    <SubmitButton className="btn-danger btn-sm" pendingText="…" confirmMessage={`Delete "${item.title}"?`}>
                      Delete
                    </SubmitButton>
                  </form>
                </div>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-zinc-500">
              No content yet. Add videos, files, links (e.g. Zoom / Google Meet) or notes.
            </li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">{editing ? "Edit item" : "Add item"}</h2>
        <ContentForm key={editing?.id ?? "new"} courseId={course.id} item={editing} nextOrder={nextOrder} />
      </section>
    </div>
  );
}

type EnrollmentRow = Enrollment & { profiles: Pick<Profile, "id" | "full_name" | "email" | "phone" | "institution"> | null };

async function StudentsTab({ course }: { course: Course }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("*, profiles(id, full_name, email, phone, institution)")
    .eq("course_id", course.id)
    .order("created_at", { ascending: false });
  const rows = (data as EnrollmentRow[] | null) ?? [];
  const active = rows.filter((r) => r.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-ink">Enroll a student manually</h2>
        <p className="mt-1 text-xs text-zinc-500">For offline payments or scholarships. The student must have signed in once.</p>
        <div className="mt-4">
          <EnrollForm courses={[{ id: course.id, title: course.title }]} fixedCourseId={course.id} />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-ink">{active} active student{active === 1 ? "" : "s"}</h2>
        <Table>
          <thead>
            <tr><Th>Student</Th><Th>Phone</Th><Th>Institution</Th><Th>Source</Th><Th>Enrolled</Th><Th>Status</Th><Th /></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <Td>
                  <Link href={`/admin/users/${r.user_id}`} className="font-medium text-brand hover:underline">
                    {r.profiles?.full_name ?? "—"}
                  </Link>
                  <div className="text-xs text-zinc-500">{r.profiles?.email}</div>
                </Td>
                <Td className="whitespace-nowrap text-zinc-600">{r.profiles?.phone ?? "—"}</Td>
                <Td className="text-zinc-600">{r.profiles?.institution ?? "—"}</Td>
                <Td className="text-zinc-600 capitalize">{r.source}</Td>
                <Td className="whitespace-nowrap text-zinc-500">{formatDate(r.created_at)}</Td>
                <Td>
                  {r.status === "active" ? (
                    <span className="badge bg-leaf-50 text-green-800">Active</span>
                  ) : (
                    <span className="badge bg-red-50 text-red-700">Revoked</span>
                  )}
                </Td>
                <Td className="text-right">
                  <form action={setEnrollmentStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value={r.status === "active" ? "revoked" : "active"} />
                    <SubmitButton
                      className={r.status === "active" ? "btn-danger btn-sm" : "btn-secondary btn-sm"}
                      pendingText="…"
                      confirmMessage={r.status === "active" ? "Revoke this student's access to the course?" : undefined}
                    >
                      {r.status === "active" ? "Revoke" : "Restore"}
                    </SubmitButton>
                  </form>
                </Td>
              </tr>
            ))}
            {rows.length === 0 && <EmptyRow colSpan={7}>No students enrolled yet.</EmptyRow>}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

async function AnnouncementsTab({ course }: { course: Course }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("course_id", course.id)
    .order("created_at", { ascending: false });
  const announcements = (data as Announcement[] | null) ?? [];

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px]">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Announcements for this course</h2>
        <div className="card overflow-hidden">
          {announcements.length === 0 ? (
            <AnnouncementList announcements={[]} />
          ) : (
            <ul className="divide-y divide-zinc-100">
              {announcements.map((a) => (
                <li key={a.id} className="flex items-start gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink">{a.title}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">{formatDate(a.created_at)}{a.is_pinned ? " · Pinned" : ""}</div>
                    {a.body && <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{a.body}</p>}
                  </div>
                  <form action={deleteAnnouncement}>
                    <input type="hidden" name="id" value={a.id} />
                    <SubmitButton className="btn-danger btn-sm" pendingText="…" confirmMessage="Delete this announcement?">
                      Delete
                    </SubmitButton>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          To edit an announcement, use the <Link href="/admin/announcements" className="text-brand hover:underline">Announcements</Link> page.
        </p>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">New announcement</h2>
        <AnnouncementForm
          courses={[{ id: course.id, title: course.title }]}
          fixedCourseId={course.id}
          returnTo={`/admin/courses/${course.id}?tab=announcements`}
        />
      </section>
    </div>
  );
}
