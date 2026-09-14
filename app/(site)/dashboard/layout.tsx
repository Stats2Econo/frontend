import { requireProfile } from "@/lib/auth";
import Avatar from "../../components/ui/Avatar";
import DashboardNav from "./DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireProfile("/dashboard");

  return (
    <div className="flex-1 bg-[#fafafa]">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <div className="flex items-center gap-4">
            <Avatar name={profile.full_name} email={profile.email} src={profile.avatar_url} size={52} />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {profile.full_name ?? "Student"}
              </h1>
              <p className="truncate text-sm text-zinc-500">
                {[profile.occupation, profile.institution].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
          <DashboardNav />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
