"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock } from "lucide-react";

interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: (response: { error: { description?: string } }) => void): void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function EnrollButton({
  courseId,
  slug,
  title,
  isFree,
  isLoggedIn,
  profileCompleted,
  enrolled,
  enrollmentOpen,
}: {
  courseId: string;
  slug: string;
  title: string;
  isFree: boolean;
  isLoggedIn: boolean;
  profileCompleted: boolean;
  enrolled: boolean;
  enrollmentOpen: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "working" | "verifying">("idle");
  const [error, setError] = useState<string | null>(null);
  const coursePath = `/courses/${slug}`;
  const contentPath = `/dashboard/courses/${slug}`;

  if (enrolled) {
    return (
      <Link href={contentPath} className="btn-primary w-full py-2.5">
        Go to course content <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  if (!enrollmentOpen) {
    return (
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-center text-sm text-zinc-600">
        Enrollment is currently closed.
      </div>
    );
  }

  async function enroll() {
    setError(null);

    if (!isLoggedIn) {
      router.push(`/login?next=${encodeURIComponent(coursePath)}`);
      return;
    }
    if (!profileCompleted) {
      router.push(`/onboarding?next=${encodeURIComponent(coursePath)}`);
      return;
    }

    setStatus("working");
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start payment.");

      if (data.enrolled) {
        router.push(contentPath);
        router.refresh();
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) throw new Error("Could not load Razorpay. Check your connection.");

      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "Stats2Econo",
        description: title,
        image: `${window.location.origin}/tab_img.png`,
        prefill: data.prefill,
        notes: { course: title },
        theme: { color: "#2b5672" },
        modal: { ondismiss: () => setStatus("idle") },
        handler: async (response: RazorpaySuccess) => {
          setStatus("verifying");
          try {
            const verify = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verify.json();
            if (!verify.ok) throw new Error(result.error ?? "Payment verification failed.");
            router.push(`${contentPath}?welcome=1`);
            router.refresh();
          } catch (err) {
            setError(
              err instanceof Error
                ? `${err.message} If money was deducted, your access will be activated automatically within a few minutes.`
                : "Payment verification failed.",
            );
            setStatus("idle");
          }
        },
      });
      rzp.on("payment.failed", (response) => {
        setError(response.error.description ?? "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  const label = !isLoggedIn
    ? "Sign in to register"
    : isFree
      ? "Enroll for free"
      : "Register & pay";

  return (
    <div>
      <button onClick={enroll} disabled={status !== "idle"} className="btn-primary w-full py-2.5">
        {status === "idle" ? (
          <>
            {label} <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {status === "verifying" ? "Confirming payment…" : "Please wait…"}
          </>
        )}
      </button>
      {!isFree && (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
          <Lock className="h-3 w-3" /> UPI, cards, net banking & wallets
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
