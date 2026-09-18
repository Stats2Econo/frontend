import type { Metadata } from "next";
import { requireProfile } from "@/lib/auth";
import { getMyPayments } from "@/lib/student";
import { formatDateTime, formatPaise } from "@/lib/format";
import PaymentStatus from "../../../components/PaymentStatus";

export const metadata: Metadata = { title: "Payments" };

export default async function PaymentsPage() {
  const profile = await requireProfile("/dashboard/payments");
  const payments = await getMyPayments(profile.id);

  return (
    <div>
      <h2 className="text-base font-semibold text-ink">Payment history</h2>
      <div className="card mt-4 overflow-x-auto">
        {payments.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-zinc-500">No payments yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Payment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-3 whitespace-nowrap text-zinc-600">{formatDateTime(p.created_at)}</td>
                  <td className="px-5 py-3 font-medium text-zinc-800">{p.course_title}</td>
                  <td className="px-5 py-3 text-zinc-800">{formatPaise(p.amount)}</td>
                  <td className="px-5 py-3"><PaymentStatus status={p.status} /></td>
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">{p.razorpay_payment_id ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
