import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Announcement, Course, Enrollment, Payment } from "@/lib/types";

export type EnrollmentWithCourse = Enrollment & { courses: Course | null };

export async function getMyEnrollments(userId: string): Promise<EnrollmentWithCourse[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false });
  return ((data as EnrollmentWithCourse[] | null) ?? []).filter((e) => e.courses);
}

/** Announcements visible to the student (RLS filters to global + enrolled courses). */
export async function getMyAnnouncements(limit = 50): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*, courses(title, slug)")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Announcement[] | null) ?? [];
}

export async function getMyPayments(userId: string): Promise<Payment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as Payment[] | null) ?? [];
}
