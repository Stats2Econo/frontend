import type { Metadata } from "next";
import Link from "next/link";
import { Download, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import type { Profile } from "@/lib/types";
import Avatar from "@/app/components/ui/Avatar";
import { EmptyRow, PageHeader, Table, Td, Th } from "../ui";

export const metadata: Metadata = { title: "Students" };

const PAGE_SIZE = 50;

type Row = Profile & { enrollments: { count: number }[] };

export default async function AdminUsersPage(props: PageProps<"/admin/users">) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q.trim() : "";
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page = Math.max(1, Number(searchParams.page) || 1);

  const supabase = await createClient();
  let query = supabase
    .from("profiles")
    .select("*, enrollments(count)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (q) {
    // Strip characters that have meaning in PostgREST filter syntax.
    const term = q.replace(/[,()*%\\]/g, " ");
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%,institution.ilike.%${term}%,city.ilike.%${term}%`,
    );
  }
  if (filter === "incomplete") query = query.eq("profile_completed", false);
  if (filter === "admins") query = query.eq("role", "admin");

  const { data, count } = await query;
  const users = (data as Row[] | null) ?? [];
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const qs = (params: Record<string, string | number>) => {
    const merged = { q, filter, page, ...params };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v && !(k === "filter" && v === "all") && !(k === "page" && v === 1)) sp.set(k, String(v));
    });
    const s = sp.toString();
    return s ? `?${s}` : "";
  };

  return (
    <div>
      <PageHeader
        title="Students"
        description={`${total} registered user${total === 1 ? "" : "s"}`}
        action={
          <a href="/admin/users/export" download className="btn-secondary">
            <Download className="h-4 w-4" /> Export CSV
          </a>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
          <input name="q" defaultValue={q} placeholder="Search name, email, phone, institution…" className="input mt-0 pl-9" />
        </form>
        <div className="flex gap-1 rounded-md bg-zinc-100 p-1 text-xs font-medium">
          {[
            ["all", "All"],
            ["incomplete", "Incomplete profiles"],
            ["admins", "Admins"],
          ].map(([key, label]) => (
            <Link
              key={key}
              href={`/admin/users${qs({ filter: key, page: 1 })}`}
              className={`rounded px-3 py-1.5 ${filter === key ? "bg-white text-brand shadow-xs" : "text-zinc-600 hover:text-zinc-900"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <Table minWidth={900}>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Occupation / institution</Th>
            <Th>Location</Th>
            <Th>Courses</Th>
            <Th>Joined</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-zinc-50/60">
              <Td>
                <Link href={`/admin/users/${u.id}`} className="flex items-center gap-3">
                  <Avatar name={u.full_name} email={u.email} src={u.avatar_url} size={32} />
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-medium text-brand hover:underline">
                      {u.full_name ?? "—"}
                      {u.role === "admin" && <span className="badge bg-ink text-white">Admin</span>}
                    </span>
                    <span className="block truncate text-xs text-zinc-500">{u.email}</span>
                  </span>
                </Link>
              </Td>
              <Td className="whitespace-nowrap text-zinc-600">{u.phone ?? "—"}</Td>
              <Td className="text-zinc-600">
                {u.profile_completed ? (
                  <>
                    <div>{u.occupation}</div>
                    <div className="text-xs text-zinc-500">{u.institution}</div>
                  </>
                ) : (
                  <span className="badge bg-amber-50 text-amber-800">Profile incomplete</span>
                )}
              </Td>
              <Td className="text-zinc-600">{[u.city, u.state].filter(Boolean).join(", ") || "—"}</Td>
              <Td className="tabular-nums">{u.enrollments?.[0]?.count ?? 0}</Td>
              <Td className="whitespace-nowrap text-zinc-500">{formatDate(u.created_at)}</Td>
            </tr>
          ))}
          {users.length === 0 && <EmptyRow colSpan={6}>No users found.</EmptyRow>}
        </tbody>
      </Table>

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
          <span>Page {page} of {pages}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={`/admin/users${qs({ page: page - 1 })}`} className="btn-secondary btn-sm">Previous</Link>}
            {page < pages && <Link href={`/admin/users${qs({ page: page + 1 })}`} className="btn-secondary btn-sm">Next</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
