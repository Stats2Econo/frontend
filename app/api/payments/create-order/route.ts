import { NextResponse, type NextRequest } from "next/server";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createRazorpayOrder } from "@/lib/razorpay";
import type { Course } from "@/lib/types";

export async function POST(request: NextRequest) {
  const profile = await getProfile();
  if (!profile) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }
  if (!profile.profile_completed) {
    return NextResponse.json({ error: "Please complete your profile first." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const courseId = typeof body?.courseId === "string" ? body.courseId : null;
  if (!courseId) {
    return NextResponse.json({ error: "Invalid course." }, { status: 400 });
  }

  // Price always comes from the database, never from the browser.
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("id, title, price_inr, is_published, enrollment_open")
    .eq("id", courseId)
    .maybeSingle<Pick<Course, "id" | "title" | "price_inr" | "is_published" | "enrollment_open">>();

  if (!course || !course.is_published) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }
  if (!course.enrollment_open) {
    return NextResponse.json({ error: "Enrollment for this course is closed." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("enrollments")
    .select("status")
    .eq("user_id", profile.id)
    .eq("course_id", course.id)
    .maybeSingle();

  if (existing?.status === "active") {
    return NextResponse.json({ enrolled: true });
  }
  if (existing?.status === "revoked") {
    return NextResponse.json(
      { error: "Your access to this course was revoked. Please contact the instructor." },
      { status: 403 },
    );
  }

  if (course.price_inr === 0) {
    const { error } = await admin.from("enrollments").insert({
      user_id: profile.id,
      course_id: course.id,
      status: "active",
      source: "free",
    });
    if (error) {
      return NextResponse.json({ error: "Could not enroll. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ enrolled: true });
  }

  const amount = course.price_inr * 100;
  try {
    const order = await createRazorpayOrder({
      amount,
      receipt: `s2e_${Date.now()}`,
      notes: { user_id: profile.id, course_id: course.id, email: profile.email },
    });

    const { error } = await admin.from("payments").insert({
      user_id: profile.id,
      user_email: profile.email,
      course_id: course.id,
      course_title: course.title,
      amount,
      currency: "INR",
      razorpay_order_id: order.id,
      status: "created",
    });
    if (error) throw error;

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      prefill: {
        name: profile.full_name ?? "",
        email: profile.email,
        contact: profile.phone ?? "",
      },
    });
  } catch (err) {
    console.error("create-order failed", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 500 });
  }
}
