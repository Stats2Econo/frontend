"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Overview", href: "/dashboard" },
  { name: "My Courses", href: "/dashboard/courses" },
  { name: "Announcements", href: "/dashboard/announcements" },
  { name: "Payments", href: "/dashboard/payments" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="-mb-px mt-6 flex gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const active =
          tab.href === "/dashboard" ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              active
                ? "border-brand text-brand"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
