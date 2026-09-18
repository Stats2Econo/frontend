import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Pin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { deleteAnnouncement } from "../actions";
import AnnouncementForm from "./AnnouncementForm";
import { PageHeader } from "../ui";

export const metadata: Metadata = { title: "Announcements" };

export default async function AdminAnnouncementsPage(props: PageProps<"/admin/announcements">) {
  const searchParams = await props.searchParams;
  const editId = typeof searchParams.edit === "string" ? searchParams.edit : null;

  const supabase = await createClient();
  const [{ data: announcementData }, { data: courseData }] = await Promise.all([
    supabase
      .from("announcements")
      .select("*, courses(title, slug)")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase.from("courses").select("id, title").order("sort_order"),
  ]);
  const announcements = (announcementData as Announcement[] | null) ?? [];
  const courses = (courseData as { id: string; title: string }[] | null) ?? [];
  const editing = editId ? announcements.find((a) => a.id === editId) : undefined;

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Post updates to all students or to the students of one course. They appear on student dashboards."
      />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_420px]">
        <section className="card overflow-hidden">
          <ul className="divide-y divide-zinc-100">
            {announcements.map((a) => (
              <li key={a.id} className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-start ${a.id === editId ? "bg-brand-50/60" : ""}`}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    {a.courses ? (
                      <span className="badge bg-brand-50 text-brand">{a.courses.title}</span>
                    ) : (
                      <span className="badge bg-zinc-100 text-zinc-600">All students</span>
                    )}
                    {a.is_pinned && <span className="badge gap-1 bg-berry/10 text-berry"><Pin className="h-3 w-3" />Pinned</span>}
                    {a.show_on_homepage && <span className="badge gap-1 bg-leaf-50 text-green-800"><Globe className="h-3 w-3" />Homepage</span>}
                    <span className="text-zinc-400">{formatDate(a.created_at)}</span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold text-ink">{a.title}</h3>
                  {a.body && <p className="mt-1 text-sm whitespace-pre-line text-zinc-600">{a.body}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link href={`/admin/announcements?edit=${a.id}`} className="btn-secondary btn-sm">Edit</Link>
                  <form action={deleteAnnouncement}>
                    <input type="hidden" name="id" value={a.id} />
                    <SubmitButton className="btn-danger btn-sm" pendingText="…" confirmMessage="Delete this announcement?">
                      Delete
                    </SubmitButton>
                  </form>
                </div>
              </li>
            ))}
            {announcements.length === 0 && (
              <li className="px-5 py-12 text-center text-sm text-zinc-500">No announcements yet.</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink">{editing ? "Edit announcement" : "New announcement"}</h2>
          <AnnouncementForm key={editing?.id ?? "new"} courses={courses} announcement={editing} />
        </section>
      </div>
    </div>
  );
}
