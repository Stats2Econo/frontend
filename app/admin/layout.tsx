import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import Avatar from "../components/ui/Avatar";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin · Stats2Econo" },
  robots: { index: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa] lg:flex-row">
      <aside className="border-b border-zinc-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-60 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex h-16 items-center justify-between gap-3 px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/tab_img.png" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-sm font-semibold text-ink">
              Stats2Econo <span className="font-sans font-normal text-zinc-400">Admin</span>
            </span>
          </Link>
          <Link href="/" className="text-zinc-400 hover:text-brand lg:hidden" aria-label="View website">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <AdminNav />

        <div className="mt-auto hidden border-t border-zinc-100 p-4 lg:block">
          <div className="flex items-center gap-3">
            <Avatar name={admin.full_name} email={admin.email} src={admin.avatar_url} size={32} />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-ink">{admin.full_name}</div>
              <div className="truncate text-xs text-zinc-500">{admin.email}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Link href="/" className="btn-secondary btn-sm flex-1">
              View site
            </Link>
            <form action="/auth/signout" method="post" className="flex-1">
              <button className="btn-secondary btn-sm w-full">Sign out</button>
            </form>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
