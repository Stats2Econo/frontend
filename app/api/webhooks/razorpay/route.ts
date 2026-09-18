import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { fulfillOrder } from "@/lib/payments";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Razorpay → Settings → Webhooks. Subscribe to: payment.captured, order.paid, payment.failed.
 * Grants access even if the student closed the browser before verification finished.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const payment = event?.payload?.payment?.entity;

  try {
    if ((event.event === "payment.captured" || event.event === "order.paid") && payment?.order_id) {
      await fulfillOrder(payment.order_id, payment.id);
    } else if (event.event === "payment.failed" && payment?.order_id) {
      await createAdminClient()
        .from("payments")
        .update({ status: "failed", razorpay_payment_id: payment.id })
        .eq("razorpay_order_id", payment.order_id)
        .eq("status", "created");
    }
  } catch (err) {
    console.error("razorpay webhook failed", err);
    // Non-2xx makes Razorpay retry later.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
