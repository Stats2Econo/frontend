"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/image.png"
            alt="Stats2Econo"
            width={286}
            height={32}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 ${
                pathname === link.href ? "text-black" : "text-zinc-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
