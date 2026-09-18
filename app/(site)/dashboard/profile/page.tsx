import type { Metadata } from "next";
import { requireProfile } from "@/lib/auth";
import ProfileForm from "../../../components/ProfileForm";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const profile = await requireProfile("/dashboard/profile");

  return (
    <div className="max-w-3xl">
      <h2 className="text-base font-semibold text-ink">My profile</h2>
      <p className="mt-1 text-sm text-zinc-500">Keep your contact details up to date.</p>
      <div className="card mt-4 p-6 sm:p-8">
        <ProfileForm profile={profile} mode="edit" />
      </div>
    </div>
  );
}
