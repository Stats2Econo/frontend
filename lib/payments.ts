import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Marks a Razorpay order as paid and grants course access.
 * Idempotent: safe to call from both the browser verification and the webhook.
 */
export async function fulfillOrder(orderId: string, paymentId: string, signature?: string) {
  const admin = createAdminClient();

  const { data: payment, error } = await admin
    .from("payments")
    .select("id, user_id, course_id, status")
    .eq("razorpay_order_id", orderId)
    .maybeSingle();

  if (error) throw error;
  if (!payment) return { ok: false as const, reason: "unknown_order" };

  if (payment.status !== "paid") {
    const { error: updateError } = await admin
      .from("payments")
      .update({
        status: "paid",
        razorpay_payment_id: paymentId,
        ...(signature ? { razorpay_signature: signature } : {}),
      })
      .eq("id", payment.id);
    if (updateError) throw updateError;
  }

  if (payment.user_id && payment.course_id) {
    const { error: enrollError } = await admin.from("enrollments").upsert(
      {
        user_id: payment.user_id,
        course_id: payment.course_id,
        payment_id: payment.id,
        status: "active",
        source: "payment",
      },
      { onConflict: "user_id,course_id" },
    );
    if (enrollError) throw enrollError;
  }

  return { ok: true as const, userId: payment.user_id, courseId: payment.course_id };
}
