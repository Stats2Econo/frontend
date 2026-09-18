import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime, formatPaise } from "@/lib/format";
import type { Payment } from "@/lib/types";
import PaymentStatus from "@/app/components/PaymentStatus";
import { EmptyRow, PageHeader, Table, Td, Th } from "../ui";

export const metadata: Metadata = { title: "Payments" };

const FILTERS = [
  ["paid", "Paid"],
  ["created", "Pending"],
  ["failed", "Failed"],
  ["all", "All"],
] as const;

export default async function AdminPaymentsPage(props: PageProps<"/admin/payments">) {
  const searchParams = await props.searchParams;
  const status = typeof searchParams.status === "string" ? searchParams.status : "paid";

  const supabase = await createClient();
  let query = supabase.from("payments").select("*").order("created_at", { ascending: false }).limit(500);
  if (status !== "all") query = query.eq("status", status);
  const { data } = await query;
  const payments = (data as Payment[] | null) ?? [];
  const total = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Razorpay orders created from the website. Pending orders are checkouts that were opened but not completed."
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-md bg-zinc-100 p-1 text-xs font-medium">
          {FILTERS.map(([key, label]) => (
            <Link
              key={key}
              href={`/admin/payments?status=${key}`}
              className={`rounded px-3 py-1.5 ${status === key ? "bg-white text-brand shadow-xs" : "text-zinc-600 hover:text-zinc-900"}`}
            >
              {label}
            </Link>
          ))}
        </div>
        {total > 0 && (
          <div className="text-sm text-zinc-600">
            Total collected: <span className="font-semibold text-ink tabular-nums">{formatPaise(total)}</span>
          </div>
        )}
      </div>

      <Table minWidth={960}>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Student</Th>
            <Th>Course</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Razorpay order / payment</Th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <Td className="whitespace-nowrap text-zinc-500">{formatDateTime(p.created_at)}</Td>
              <Td>
                {p.user_id ? (
                  <Link href={`/admin/users/${p.user_id}`} className="text-brand hover:underline">{p.user_email}</Link>
                ) : (
                  p.user_email
                )}
              </Td>
              <Td>{p.course_title}</Td>
              <Td className="tabular-nums">{formatPaise(p.amount)}</Td>
              <Td><PaymentStatus status={p.status} /></Td>
              <Td className="font-mono text-xs text-zinc-500">
                <div>{p.razorpay_order_id}</div>
                <div>{p.razorpay_payment_id ?? "—"}</div>
              </Td>
            </tr>
          ))}
          {payments.length === 0 && <EmptyRow colSpan={6}>No payments found.</EmptyRow>}
        </tbody>
      </Table>
    </div>
  );
}
