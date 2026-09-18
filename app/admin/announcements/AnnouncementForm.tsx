"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveAnnouncement } from "../actions";
import type { Announcement } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import FormMessage from "@/app/components/ui/FormMessage";
import { Toggle } from "../ui";

export default function AnnouncementForm({
  courses,
  announcement,
  fixedCourseId,
  returnTo = "/admin/announcements",
}: {
  courses: { id: string; title: string }[];
  announcement?: Announcement;
  fixedCourseId?: string;
  returnTo?: string;
}) {
  const [state, action] = useActionState(saveAnnouncement, undefined);

  return (
    <form action={action} className="card space-y-4 p-5">
      {announcement && <input type="hidden" name="id" value={announcement.id} />}
      <input type="hidden" name="return_to" value={returnTo} />

      {fixedCourseId ? (
        <input type="hidden" name="course_id" value={fixedCourseId} />
      ) : (
        <label className="block">
          <span className="label">Audience</span>
          <select name="course_id" defaultValue={announcement?.course_id ?? ""} className="input">
            <option value="">All registered students</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>Students of: {c.title}</option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="label">Title *</span>
        <input name="title" required defaultValue={announcement?.title} className="input" />
      </label>

      <label className="block">
        <span className="label">Message</span>
        <textarea name="body" rows={5} defaultValue={announcement?.body} className="input" />
      </label>

      <div className="space-y-3">
        <Toggle name="is_pinned" label="Pin to top" defaultChecked={announcement?.is_pinned} />
        <Toggle
          name="show_on_homepage"
          label="Also show on the homepage noticeboard"
          hint="Visible to everyone, including visitors who are not logged in"
          defaultChecked={announcement?.show_on_homepage}
        />
      </div>

      <FormMessage state={state} />

      <div className="flex justify-end gap-2">
        {announcement && (
          <Link href={returnTo} className="btn-secondary">Cancel</Link>
        )}
        <SubmitButton pendingText="Publishing…">{announcement ? "Save" : "Publish"}</SubmitButton>
      </div>
    </form>
  );
}
