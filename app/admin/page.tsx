import Link from "next/link";
import { BookOpen, IndianRupee, Mail, UserCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatDateTime, formatPaise } from "@/lib/format";
import type { Payment, Profile } from "@/lib/types";
import PaymentStatus from "../components/PaymentStatus";
import { EmptyRow, PageHeader, Table, Td, Th } from "./ui";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const count = { count: "exact" as const, head: true };
  const [users, completed, enrollments, courses, unread, paid, recentPayments, recentUsers] = await Promise.all([
    supabase.from("profiles").select("*", count),
    supabase.from("profiles").select("*", count).eq("profile_completed", true),
    supabase.from("enrollments").select("*", count).eq("status", "active"),
    supabase.from("courses").select("*", count).eq("is_published", true),
    supabase.from("contact_messages").select("*", count).eq("is_read", false),
    supabase.from("payments").select("amount").eq("status", "paid"),
    supabase.from("payments").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const revenue = ((paid.data as { amount: number }[] | null) ?? []).reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Registered users", value: users.count ?? 0, sub: `${completed.count ?? 0} completed profiles`, icon: Users, href: "/admin/users" },
    { label: "Active enrollments", value: enrollments.count ?? 0, sub: "across all courses", icon: UserCheck, href: "/admin/users" },
    { label: "Revenue", value: formatPaise(revenue), sub: `${paid.data?.length ?? 0} successful payments`, icon: IndianRupee, href: "/admin/payments" },
    { label: "Published courses", value: courses.count ?? 0, sub: `${unread.count ?? 0} unread messages`, icon: BookOpen, href: "/admin/courses" },
  ];

  return (
    <div>
      <PageHeader title="Overview" description="A snapshot of students, enrollments and payments." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href} className="card p-5 transition hover:border-zinc-300">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
              {label}
              <Icon className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-ink tabular-nums">{value}</div>
            <div className="mt-1 text-xs text-zinc-500">{sub}</div>
          </Link>
        ))}
      </div>

      {(unread.count ?? 0) > 0 && (
        <Link href="/admin/messages" className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Mail className="h-4 w-4" /> You have {unread.count} unread contact message{unread.count === 1 ? "" : "s"}.
        </Link>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 2xl:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Recent payments</h2>
            <Link href="/admin/payments" className="text-xs font-medium text-brand hover:underline">View all</Link>
          </div>
          <Table minWidth={560}>
            <thead>
              <tr><Th>Date</Th><Th>Student</Th><Th>Course</Th><Th>Amount</Th><Th>Status</Th></tr>
            </thead>
            <tbody>
              {((recentPayments.data as Payment[] | null) ?? []).map((p) => (
                <tr key={p.id}>
                  <Td className="whitespace-nowrap text-zinc-500">{formatDateTime(p.created_at)}</Td>
                  <Td>{p.user_id ? <Link href={`/admin/users/${p.user_id}`} className="text-brand hover:underline">{p.user_email}</Link> : p.user_email}</Td>
                  <Td className="text-zinc-700">{p.course_title}</Td>
                  <Td className="tabular-nums">{formatPaise(p.amount)}</Td>
                  <Td><PaymentStatus status={p.status} /></Td>
                </tr>
              ))}
              {!recentPayments.data?.length && <EmptyRow colSpan={5}>No payments yet.</EmptyRow>}
            </tbody>
          </Table>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">New sign-ups</h2>
            <Link href="/admin/users" className="text-xs font-medium text-brand hover:underline">View all</Link>
          </div>
          <Table minWidth={560}>
            <thead>
              <tr><Th>Name</Th><Th>Email</Th><Th>Institution</Th><Th>Joined</Th></tr>
            </thead>
            <tbody>
              {((recentUsers.data as Profile[] | null) ?? []).map((u) => (
                <tr key={u.id}>
                  <Td><Link href={`/admin/users/${u.id}`} className="font-medium text-brand hover:underline">{u.full_name ?? "—"}</Link></Td>
                  <Td className="text-zinc-600">{u.email}</Td>
                  <Td className="text-zinc-600">{u.institution ?? <span className="text-amber-700">Profile incomplete</span>}</Td>
                  <Td className="whitespace-nowrap text-zinc-500">{formatDate(u.created_at)}</Td>
                </tr>
              ))}
              {!recentUsers.data?.length && <EmptyRow colSpan={4}>No users yet.</EmptyRow>}
            </tbody>
          </Table>
        </section>
      </div>
    </div>
  );
}
