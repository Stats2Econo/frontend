import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Announcement, Course } from "@/lib/types";

export async function getPublishedCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return (data as Course[] | null) ?? [];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
  return (data as Course | null) ?? null;
}

export async function getHomepageAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*, courses(title, slug)")
    .eq("show_on_homepage", true)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(6);
  return (data as Announcement[] | null) ?? [];
}

/** Active enrollment status for the given user and course. */
export async function isUserEnrolled(userId: string, courseId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("status")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();
  return data?.status === "active";
}
