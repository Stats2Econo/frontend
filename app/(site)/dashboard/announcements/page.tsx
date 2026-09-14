import type { Metadata } from "next";
import { requireProfile } from "@/lib/auth";
import { getMyAnnouncements } from "@/lib/student";
import AnnouncementList from "../../../components/AnnouncementList";

export const metadata: Metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  await requireProfile("/dashboard/announcements");
  const announcements = await getMyAnnouncements();

  return (
    <div className="max-w-3xl">
      <h2 className="text-base font-semibold text-ink">Announcements</h2>
      <p className="mt-1 text-sm text-zinc-500">Updates for all students and for the courses you are enrolled in.</p>
      <div className="card mt-4 overflow-hidden">
        <AnnouncementList announcements={announcements} />
      </div>
    </div>
  );
}
