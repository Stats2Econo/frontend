"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Shield, User, X } from "lucide-react";
import Avatar from "./ui/Avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Our Journey", href: "/our-journey" },
  { name: "FAQs", href: "/faqs" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
];

export interface HeaderUser {
  name: string | null;
  email: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

export default function Header({ user }: { user: HeaderUser | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when navigating
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Stats2Econo home">
          <Image
            src="/image.png"
            alt="Stats2Econo"
            width={286}
            height={30}
            priority
            className="h-auto w-44 sm:w-52"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 ${
                isActive(link.href) ? "text-brand" : "text-zinc-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1 pr-2.5 pl-1 text-sm text-zinc-700 transition hover:border-zinc-300"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <Avatar name={user.name} email={user.email} src={user.avatarUrl} size={28} />
                <span className="hidden max-w-32 truncate font-medium sm:inline">
                  {user.name?.split(" ")[0] ?? "Account"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="animate-fade-in absolute right-0 mt-2 w-60 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg"
                >
                  <div className="border-b border-zinc-100 px-4 py-3">
                    <div className="truncate text-sm font-semibold text-ink">{user.name ?? "Student"}</div>
                    <div className="truncate text-xs text-zinc-500">{user.email}</div>
                  </div>
                  <div className="py-1 text-sm">
                    <MenuLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
                      Dashboard
                    </MenuLink>
                    <MenuLink href="/dashboard/profile" icon={<User className="h-4 w-4" />}>
                      My Profile
                    </MenuLink>
                    {user.isAdmin && (
                      <MenuLink href="/admin" icon={<Shield className="h-4 w-4" />}>
                        Admin Panel
                      </MenuLink>
                    )}
                  </div>
                  <form action="/auth/signout" method="post" className="border-t border-zinc-100 py-1">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      <LogOut className="h-4 w-4 text-zinc-400" />
                      Sign out
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn-primary rounded-full px-5">
              Login
            </Link>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-6 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive(link.href) ? "bg-brand-50 text-brand" : "text-zinc-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function MenuLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50"
    >
      <span className="text-zinc-400">{icon}</span>
      {children}
    </Link>
  );
}
