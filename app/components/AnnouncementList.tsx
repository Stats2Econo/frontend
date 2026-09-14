import Link from "next/link";
import { Megaphone, Pin } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Announcement } from "@/lib/types";

export default function AnnouncementList({
  announcements,
  showCourse = true,
  emptyText = "No announcements yet.",
}: {
  announcements: Announcement[];
  showCourse?: boolean;
  emptyText?: string;
}) {
  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-sm text-zinc-500">
        <Megaphone className="h-5 w-5 text-zinc-300" />
        {emptyText}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-100">
      {announcements.map((a) => (
        <li key={a.id} className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {a.is_pinned && (
              <span className="badge gap-1 bg-berry/10 text-berry">
                <Pin className="h-3 w-3" /> Pinned
              </span>
            )}
            {showCourse &&
              (a.courses ? (
                <Link href={`/dashboard/courses/${a.courses.slug}`} className="badge bg-brand-50 text-brand hover:underline">
                  {a.courses.title}
                </Link>
              ) : (
                <span className="badge bg-zinc-100 text-zinc-600">All students</span>
              ))}
            <span className="text-zinc-400">{formatDate(a.created_at)}</span>
          </div>
          <h3 className="mt-1.5 text-sm font-semibold text-ink">{a.title}</h3>
          {a.body && (
            <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-zinc-600">{a.body}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
