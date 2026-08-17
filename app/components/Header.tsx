"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Our Journey", href: "/our-journey" },
  { name: "FAQs", href: "/faqs" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
            S2E
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Stats2Econo
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                pathname === link.href
                  ? "text-black dark:text-white"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
