import type { Payment } from "@/lib/types";

const styles: Record<Payment["status"], string> = {
  paid: "bg-leaf-50 text-green-800",
  created: "bg-amber-50 text-amber-800",
  failed: "bg-red-50 text-red-700",
};

const labels: Record<Payment["status"], string> = {
  paid: "Paid",
  created: "Pending",
  failed: "Failed",
};

export default function PaymentStatus({ status }: { status: Payment["status"] }) {
  return <span className={`badge ${styles[status]}`}>{labels[status]}</span>;
}
