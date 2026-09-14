"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUser, safeNext } from "@/lib/auth";
import type { FormState } from "@/lib/types";

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const optional = (formData: FormData, key: string) => text(formData, key) || null;

export async function saveProfile(_prev: FormState | undefined, formData: FormData): Promise<FormState> {
  const user = await getUser();
  if (!user) return { error: "Your session has expired. Please sign in again." };

  const profile = {
    full_name: text(formData, "full_name"),
    phone: text(formData, "phone"),
    whatsapp: optional(formData, "whatsapp"),
    date_of_birth: optional(formData, "date_of_birth"),
    gender: optional(formData, "gender"),
    occupation: text(formData, "occupation"),
    institution: text(formData, "institution"),
    designation: optional(formData, "designation"),
    highest_qualification: optional(formData, "highest_qualification"),
    address_line1: text(formData, "address_line1"),
    address_line2: optional(formData, "address_line2"),
    city: text(formData, "city"),
    state: text(formData, "state"),
    country: text(formData, "country"),
    pincode: text(formData, "pincode"),
  };

  const required: [keyof typeof profile, string][] = [
    ["full_name", "Full name"],
    ["phone", "Phone number"],
    ["occupation", "Occupation"],
    ["institution", "Institution / organisation"],
    ["address_line1", "Address"],
    ["city", "City"],
    ["state", "State"],
    ["country", "Country"],
    ["pincode", "PIN / postal code"],
  ];
  const missing = required.filter(([key]) => !profile[key]).map(([, label]) => label);
  if (missing.length) return { error: `Please fill in: ${missing.join(", ")}.` };

  const phonePattern = /^\+?[0-9][0-9\s-]{8,16}$/;
  if (!phonePattern.test(profile.phone)) return { error: "Please enter a valid phone number." };
  if (profile.whatsapp && !phonePattern.test(profile.whatsapp)) {
    return { error: "Please enter a valid WhatsApp number." };
  }
  if (!/^[A-Za-z0-9\s-]{3,10}$/.test(profile.pincode)) {
    return { error: "Please enter a valid PIN / postal code." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ ...profile, profile_completed: true })
    .eq("id", user.id);

  if (error) return { error: "Could not save your profile. Please try again." };

  revalidatePath("/", "layout");

  if (formData.get("mode") === "onboarding") {
    redirect(safeNext(text(formData, "next")));
  }
  return { ok: true, message: "Profile updated." };
}
