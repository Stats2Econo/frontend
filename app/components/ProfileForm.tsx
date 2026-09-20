"use client";

import { useActionState } from "react";
import { saveProfile } from "@/app/actions/profile";
import type { Profile } from "@/lib/types";
import SubmitButton from "./ui/SubmitButton";
import FormMessage from "./ui/FormMessage";

const OCCUPATIONS = [
  "Undergraduate Student",
  "Postgraduate Student",
  "Research Scholar (PhD / MPhil)",
  "Faculty / Academic",
  "Working Professional",
  "Other",
];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function ProfileForm({
  profile,
  mode,
  next,
}: {
  profile: Profile;
  mode: "onboarding" | "edit";
  next?: string;
}) {
  const [state, action] = useActionState(saveProfile, undefined);

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="mode" value={mode} />
      {next && <input type="hidden" name="next" value={next} />}

      <Fieldset title="Personal details">
        <Field label="Full name" required className="sm:col-span-2">
          <input name="full_name" required defaultValue={profile.full_name ?? ""} className="input" autoComplete="name" />
        </Field>
        <Field label="Email address" hint="Your sign-in email">
          <input value={profile.email} disabled className="input" />
        </Field>
        <Field label="Phone number" required>
          <input name="phone" type="tel" required defaultValue={profile.phone ?? ""} placeholder="+91 98765 43210" className="input" autoComplete="tel" />
        </Field>
        <Field label="WhatsApp number" hint="If different from phone">
          <input name="whatsapp" type="tel" defaultValue={profile.whatsapp ?? ""} className="input" />
        </Field>
        <Field label="Date of birth">
          <input name="date_of_birth" type="date" defaultValue={profile.date_of_birth ?? ""} className="input" />
        </Field>
        <Field label="Gender">
          <select name="gender" defaultValue={profile.gender ?? ""} className="input">
            <option value="">Prefer not to say</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </Field>
      </Fieldset>

      <Fieldset title="Academic / professional background">
        <Field label="Occupation" required>
          <select name="occupation" required defaultValue={profile.occupation ?? ""} className="input">
            <option value="" disabled>Select…</option>
            {OCCUPATIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Institution / organisation" required>
          <input name="institution" required defaultValue={profile.institution ?? ""} placeholder="e.g. Central University of Punjab" className="input" autoComplete="organization" />
        </Field>
        <Field label="Department / designation">
          <input name="designation" defaultValue={profile.designation ?? ""} placeholder="e.g. Department of Economics" className="input" />
        </Field>
        <Field label="Highest qualification">
          <input name="highest_qualification" defaultValue={profile.highest_qualification ?? ""} placeholder="e.g. M.A. Economics" className="input" />
        </Field>
      </Fieldset>

      <Fieldset title="Address">
        <Field label="Address line 1" required className="sm:col-span-2">
          <input name="address_line1" required defaultValue={profile.address_line1 ?? ""} className="input" autoComplete="address-line1" />
        </Field>
        <Field label="Address line 2" className="sm:col-span-2">
          <input name="address_line2" defaultValue={profile.address_line2 ?? ""} className="input" autoComplete="address-line2" />
        </Field>
        <Field label="City" required>
          <input name="city" required defaultValue={profile.city ?? ""} className="input" autoComplete="address-level2" />
        </Field>
        <Field label="State / province" required>
          <input name="state" required list="indian-states" defaultValue={profile.state ?? ""} className="input" autoComplete="address-level1" />
          <datalist id="indian-states">
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
        <Field label="Country" required>
          <input name="country" required defaultValue={profile.country ?? "India"} className="input" autoComplete="country-name" />
        </Field>
        <Field label="PIN / postal code" required>
          <input name="pincode" required defaultValue={profile.pincode ?? ""} className="input" autoComplete="postal-code" />
        </Field>
      </Fieldset>

      <div className="space-y-4 border-t border-zinc-200 pt-6">
        <FormMessage state={state} />
        <div className="flex justify-end">
          <SubmitButton pendingText="Saving…">
            {mode === "onboarding" ? "Complete profile" : "Save changes"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{title}</legend>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  required,
  hint,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="label">
        {label}
        {required && <span className="text-berry"> *</span>}
        {hint && <span className="ml-1 font-normal text-zinc-400">· {hint}</span>}
      </span>
      {children}
    </label>
  );
}
