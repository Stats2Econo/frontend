"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { FormState } from "@/lib/types";

export async function sendContactMessage(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const get = (key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);

  // Hidden honeypot field: real visitors leave it empty.
  if (get("company", 200)) return { ok: true };

  const message = {
    first_name: get("firstName", 100),
    last_name: get("lastName", 100),
    email: get("email", 320),
    subject: get("subject", 300),
    message: get("message", 5000),
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!isSupabaseConfigured) return { error: "The contact form is not available right now." };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(message);
  if (error) return { error: "Could not send your message. Please email us instead." };

  return { ok: true };
}
