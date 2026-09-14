import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProfile, safeNext } from "@/lib/auth";
import ProfileForm from "../../components/ProfileForm";

export const metadata: Metadata = { title: "Complete your profile" };

export default async function OnboardingPage(props: PageProps<"/onboarding">) {
  const searchParams = await props.searchParams;
  const next = safeNext(typeof searchParams.next === "string" ? searchParams.next : null);

  const profile = await getProfile();
  if (!profile) redirect(`/login?next=${encodeURIComponent(next)}`);
  if (profile.profile_completed) redirect(next);

  return (
    <section className="flex-1 bg-[#fafafa] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="eyebrow">Welcome{profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Complete your profile
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-600">
          We use these details for course registration, certificates and to keep in touch about
          your classes. Fields marked <span className="text-berry">*</span> are required.
        </p>
        <div className="card mt-8 p-6 sm:p-8">
          <ProfileForm profile={profile} mode="onboarding" next={next} />
        </div>
      </div>
    </section>
  );
}
