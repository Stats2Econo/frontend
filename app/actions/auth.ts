"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { safeNext } from "@/lib/auth";
import type { FormState } from "@/lib/types";

const text = (formData: FormData, key: string, max = 320) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/** Send people to onboarding until their profile is complete, like the Google callback does. */
function afterSignIn(profileCompleted: boolean | null | undefined, next: string) {
  return profileCompleted ? next : `/onboarding?next=${encodeURIComponent(next)}`;
}

export async function signInWithPassword(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const next = safeNext(text(formData, "next"));

  if (!EMAIL_PATTERN.test(email)) return { error: "Please enter a valid email address." };
  if (!password) return { error: "Please enter your password." };
  if (!isSupabaseConfigured) return { error: "Sign-in is not available right now." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    if (error?.code === "email_not_confirmed") {
      return { error: "Please confirm your email address first. Check your inbox for the link." };
    }
    return { error: "Incorrect email or password." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_completed")
    .eq("id", data.user.id)
    .maybeSingle();

  redirect(afterSignIn(profile?.profile_completed, next));
}

export async function signUpWithPassword(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const fullName = text(formData, "full_name", 200);
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");
  const next = safeNext(text(formData, "next"));

  if (!fullName) return { error: "Please enter your full name." };
  if (!EMAIL_PATTERN.test(email)) return { error: "Please enter a valid email address." };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Your password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  }
  if (password !== confirm) return { error: "The two passwords do not match." };
  if (!isSupabaseConfigured) return { error: "Registration is not available right now." };

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      // Where the confirmation link lands (only used when email confirmation is enabled).
      emailRedirectTo: origin ? `${origin}/auth/callback?next=${encodeURIComponent(next)}` : undefined,
    },
  });

  if (error) {
    if (error.code === "weak_password") {
      return { error: "That password is too weak. Try a longer one with a mix of characters." };
    }
    return { error: "Could not create your account. Please try again." };
  }

  // With email confirmation on, an already-registered address comes back with no identities
  // (to avoid leaking which emails exist) and no session.
  if (data.user && data.user.identities?.length === 0) {
    return { error: "An account with this email already exists. Please sign in instead." };
  }

  if (!data.session) {
    return { ok: true, message: "Almost there! We've sent a confirmation link to your email. Open it to finish creating your account." };
  }

  redirect(afterSignIn(false, next));
}
