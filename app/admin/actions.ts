"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";
import type { ContentType, FormState } from "@/lib/types";

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const nullable = (fd: FormData, key: string) => str(fd, key) || null;
const bool = (fd: FormData, key: string) => fd.get(key) === "on";
const int = (fd: FormData, key: string, fallback = 0) => {
  const n = Number.parseInt(str(fd, key), 10);
  return Number.isFinite(n) ? n : fallback;
};

function dbError(error: { message: string; code?: string }): FormState {
  if (error.code === "23505") return { error: "That value is already in use (duplicate)." };
  return { error: error.message };
}

function revalidateCourses(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/courses/${slug}`);
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------
export async function saveCourse(_prev: FormState | undefined, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = str(fd, "id");

  const title = str(fd, "title");
  const slug = slugify(str(fd, "slug") || title);
  if (!title) return { error: "Title is required." };
  if (!slug) return { error: "Slug is required." };

  const price = int(fd, "price_inr", -1);
  if (price < 0) return { error: "Price must be 0 or more." };

  const course = {
    title,
    slug,
    short_description: str(fd, "short_description"),
    overview: str(fd, "overview"),
    software: str(fd, "software"),
    mode: str(fd, "mode") || "Live Online",
    schedule: str(fd, "schedule"),
    duration: str(fd, "duration"),
    start_date: nullable(fd, "start_date"),
    end_date: nullable(fd, "end_date"),
    price_inr: price,
    syllabus: str(fd, "syllabus").split("\n").map((l) => l.trim()).filter(Boolean),
    brochure_url: nullable(fd, "brochure_url"),
    is_published: bool(fd, "is_published"),
    is_featured: bool(fd, "is_featured"),
    enrollment_open: bool(fd, "enrollment_open"),
    sort_order: int(fd, "sort_order"),
  };

  const supabase = await createClient();

  if (id) {
    const { error } = await supabase.from("courses").update(course).eq("id", id);
    if (error) return dbError(error);
    revalidateCourses(slug);
    revalidatePath(`/admin/courses/${id}`);
    return { ok: true, message: "Course saved." };
  }

  const { data, error } = await supabase.from("courses").insert(course).select("id").single();
  if (error) return dbError(error);
  revalidateCourses(slug);
  redirect(`/admin/courses/${data.id}?created=1`);
}

export async function deleteCourse(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const supabase = await createClient();

  // Remove uploaded files for this course first.
  const { data: files } = await supabase.storage.from("course-files").list(id, { limit: 1000 });
  if (files?.length) {
    await supabase.storage.from("course-files").remove(files.map((f) => `${id}/${f.name}`));
  }

  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCourses();
  redirect("/admin/courses");
}

// ---------------------------------------------------------------------------
// Course content
// ---------------------------------------------------------------------------
export async function saveContent(_prev: FormState | undefined, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = str(fd, "id");
  const courseId = str(fd, "course_id");
  const contentType = str(fd, "content_type") as ContentType;

  const item = {
    course_id: courseId,
    section: str(fd, "section"),
    title: str(fd, "title"),
    description: str(fd, "description"),
    content_type: contentType,
    url: nullable(fd, "url"),
    file_path: nullable(fd, "file_path"),
    body: nullable(fd, "body"),
    sort_order: int(fd, "sort_order"),
    is_published: bool(fd, "is_published"),
  };

  if (!item.title) return { error: "Title is required." };
  if ((contentType === "video" || contentType === "link") && !item.url) {
    return { error: "Please add a URL." };
  }
  if (contentType === "file" && !item.file_path) return { error: "Please upload a file." };
  if (contentType === "note" && !item.body) return { error: "Please write the note." };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("course_content").update(item).eq("id", id)
    : await supabase.from("course_content").insert(item);
  if (error) return dbError(error);

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/dashboard", "layout");
  if (id) redirect(`/admin/courses/${courseId}?tab=content`);
  return { ok: true, message: "Content added." };
}

export async function deleteContent(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const courseId = str(fd, "course_id");
  const supabase = await createClient();

  const { data } = await supabase.from("course_content").select("file_path").eq("id", id).maybeSingle();
  if (data?.file_path) await supabase.storage.from("course-files").remove([data.file_path]);

  await supabase.from("course_content").delete().eq("id", id);
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/dashboard", "layout");
}

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------
export async function saveAnnouncement(_prev: FormState | undefined, fd: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const id = str(fd, "id");
  const returnTo = str(fd, "return_to") || "/admin/announcements";

  const announcement = {
    title: str(fd, "title"),
    body: str(fd, "body"),
    course_id: nullable(fd, "course_id"),
    is_pinned: bool(fd, "is_pinned"),
    show_on_homepage: bool(fd, "show_on_homepage"),
  };
  if (!announcement.title) return { error: "Title is required." };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("announcements").update(announcement).eq("id", id)
    : await supabase.from("announcements").insert({ ...announcement, created_by: admin.id });
  if (error) return dbError(error);

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  if (id) redirect(returnTo);
  return { ok: true, message: "Announcement published." };
}

export async function deleteAnnouncement(fd: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("announcements").delete().eq("id", str(fd, "id"));
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

// ---------------------------------------------------------------------------
// Enrollments & users
// ---------------------------------------------------------------------------
export async function enrollStudent(_prev: FormState | undefined, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const supabase = await createClient();

  let userId = str(fd, "user_id");
  const email = str(fd, "email").toLowerCase();
  const courseId = str(fd, "course_id");
  if (!courseId) return { error: "Choose a course." };

  if (!userId) {
    if (!email) return { error: "Enter the student's email." };
    const { data } = await supabase.from("profiles").select("id").ilike("email", email).maybeSingle();
    if (!data) return { error: "No registered user with that email. Ask them to sign in with Google first." };
    userId = data.id;
  }

  const { error } = await supabase
    .from("enrollments")
    .upsert(
      { user_id: userId, course_id: courseId, status: "active", source: "manual" },
      { onConflict: "user_id,course_id" },
    );
  if (error) return dbError(error);

  revalidatePath("/admin", "layout");
  revalidatePath("/dashboard", "layout");
  return { ok: true, message: "Student enrolled." };
}

export async function setEnrollmentStatus(fd: FormData) {
  await requireAdmin();
  const status = str(fd, "status") === "active" ? "active" : "revoked";
  const supabase = await createClient();
  await supabase.from("enrollments").update({ status }).eq("id", str(fd, "id"));
  revalidatePath("/admin", "layout");
  revalidatePath("/dashboard", "layout");
}

export async function setUserRole(fd: FormData) {
  const admin = await requireAdmin();
  const userId = str(fd, "user_id");
  if (userId === admin.id) return; // never demote yourself
  const role = str(fd, "role") === "admin" ? "admin" : "student";
  const supabase = await createClient();
  await supabase.from("profiles").update({ role }).eq("id", userId);
  revalidatePath(`/admin/users/${userId}`);
  revalidatePath("/admin/users");
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------
export async function setMessageRead(fd: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ is_read: str(fd, "is_read") === "true" }).eq("id", str(fd, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(fd: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin", "layout");
}
