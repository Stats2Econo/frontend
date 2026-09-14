import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Profile } from "@/lib/types";

/** The verified auth user for this request, or null. Deduplicated per request. */
export const getUser = cache(async () => {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
});

/** The current user's profile row, or null when logged out. */
export const getProfile = cache(async (): Promise<Profile | null> => {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  return (data as Profile | null) ?? null;
});

function loginUrl(next: string) {
  return `/login?next=${encodeURIComponent(next)}`;
}

/** Require a logged-in user with a completed profile. */
export async function requireProfile(next: string): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect(loginUrl(next));
  if (!profile.profile_completed) {
    redirect(`/onboarding?next=${encodeURIComponent(next)}`);
  }
  return profile;
}

/** Require an admin. Non-admins are sent to their dashboard. */
export async function requireAdmin(): Promise<Profile> {
  const profile = await getProfile();
  if (!profile) redirect(loginUrl("/admin"));
  if (profile.role !== "admin") redirect("/dashboard");
  return profile;
}

/** Only allow same-site relative redirects. */
export function safeNext(value: string | null | undefined, fallback = "/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}
