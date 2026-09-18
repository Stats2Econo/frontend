import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { formatDate, formatDateTime, formatPaise } from "@/lib/format";
import type { Course, Enrollment, Payment, Profile } from "@/lib/types";
import Avatar from "@/app/components/ui/Avatar";
import SubmitButton from "@/app/components/ui/SubmitButton";
import PaymentStatus from "@/app/components/PaymentStatus";
import { setEnrollmentStatus, setUserRole } from "../../actions";
import EnrollForm from "../EnrollForm";
import { EmptyRow, Table, Td, Th } from "../../ui";

export const metadata: Metadata = { title: "Student" };

type EnrollmentRow = Enrollment & { courses: Pick<Course, "id" | "title" | "slug"> | null };

export default async function AdminUserPage(props: PageProps<"/admin/users/[id]">) {
  const { id } = await props.params;
  const me = await requireAdmin();
  const supabase = await createClient();

  const [{ data: profileData }, { data: enrollmentData }, { data: paymentData }, { data: courseData }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle(),
    supabase.from("enrollments").select("*, courses(id, title, slug)").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("payments").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("courses").select("id, title").order("sort_order"),
  ]);

  const user = profileData as Profile | null;
  if (!user) notFound();
  const enrollments = (enrollmentData as EnrollmentRow[] | null) ?? [];
  const payments = (paymentData as Payment[] | null) ?? [];
  const courses = (courseData as { id: string; title: string }[] | null) ?? [];

  const details: [string, string | null][] = [
    ["Phone", user.phone],
    ["WhatsApp", user.whatsapp],
    ["Date of birth", user.date_of_birth ? formatDate(user.date_of_birth) : null],
    ["Gender", user.gender],
    ["Occupation", user.occupation],
    ["Institution", user.institution],
    ["Department / designation", user.designation],
    ["Highest qualification", user.highest_qualification],
    [
      "Address",
      [user.address_line1, user.address_line2, user.city, user.state, user.pincode, user.country]
        .filter(Boolean)
        .join(", ") || null,
    ],
    ["Joined", formatDateTime(user.created_at)],
    ["Last updated", formatDateTime(user.updated_at)],
  ];

  const whatsapp = (user.whatsapp || user.phone)?.replace(/\D/g, "");

  return (
    <div className="max-w-5xl">
      <Link href="/admin/users" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand">
        <ArrowLeft className="h-3.5 w-3.5" /> Students
      </Link>

      <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <Avatar name={user.full_name} email={user.email} src={user.avatar_url} size={64} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold text-ink">{user.full_name ?? "—"}</h1>
            {user.role === "admin" && <span className="badge bg-ink text-white">Admin</span>}
            {!user.profile_completed && <span className="badge bg-amber-50 text-amber-800">Profile incomplete</span>}
          </div>
          <div className="mt-1 text-sm text-zinc-500">{user.email}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={`mailto:${user.email}`} className="btn-secondary btn-sm"><Mail className="h-3.5 w-3.5" />Email</a>
            {user.phone && <a href={`tel:${user.phone}`} className="btn-secondary btn-sm"><Phone className="h-3.5 w-3.5" />Call</a>}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp.length === 10 ? `91${whatsapp}` : whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm">
                <MessageCircle className="h-3.5 w-3.5" />WhatsApp
              </a>
            )}
          </div>
        </div>
        {user.id !== me.id && (
          <form action={setUserRole}>
            <input type="hidden" name="user_id" value={user.id} />
            <input type="hidden" name="role" value={user.role === "admin" ? "student" : "admin"} />
            <SubmitButton
              className={user.role === "admin" ? "btn-danger btn-sm" : "btn-secondary btn-sm"}
              pendingText="…"
              confirmMessage={
                user.role === "admin"
                  ? "Remove admin access for this user?"
                  : "Give this user full admin access? They will be able to manage all courses, students and payments."
              }
            >
              {user.role === "admin" ? "Remove admin" : "Make admin"}
            </SubmitButton>
          </form>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="card">
          <h2 className="border-b border-zinc-100 px-5 py-3 text-sm font-semibold text-ink">Profile</h2>
          <dl className="divide-y divide-zinc-100 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[140px_1fr] gap-3 px-5 py-2.5">
                <dt className="text-zinc-500">{label}</dt>
                <dd className="text-zinc-800">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="space-y-6">
          <section>
            <h2 className="mb-3 text-sm font-semibold text-ink">Enrollments</h2>
            <div className="card divide-y divide-zinc-100">
              {enrollments.map((e) => (
                <div key={e.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/courses/${e.course_id}?tab=students`} className="text-sm font-medium text-brand hover:underline">
                      {e.courses?.title ?? "Deleted course"}
                    </Link>
                    <div className="text-xs text-zinc-500 capitalize">
                      {e.source} · {formatDate(e.created_at)}
                    </div>
                  </div>
                  {e.status === "active" ? (
                    <span className="badge bg-leaf-50 text-green-800">Active</span>
                  ) : (
                    <span className="badge bg-red-50 text-red-700">Revoked</span>
                  )}
                  <form action={setEnrollmentStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="status" value={e.status === "active" ? "revoked" : "active"} />
                    <SubmitButton
                      className={e.status === "active" ? "btn-danger btn-sm" : "btn-secondary btn-sm"}
                      pendingText="…"
                      confirmMessage={e.status === "active" ? "Revoke access to this course?" : undefined}
                    >
                      {e.status === "active" ? "Revoke" : "Restore"}
                    </SubmitButton>
                  </form>
                </div>
              ))}
              {enrollments.length === 0 && <p className="px-5 py-6 text-center text-sm text-zinc-500">Not enrolled in any course.</p>}
              <div className="bg-zinc-50/60 px-5 py-4">
                <div className="mb-2 text-xs font-medium text-zinc-600">Enroll manually</div>
                <EnrollForm courses={courses} userId={user.id} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-ink">Payments</h2>
            <Table minWidth={480}>
              <thead>
                <tr><Th>Date</Th><Th>Course</Th><Th>Amount</Th><Th>Status</Th></tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <Td className="whitespace-nowrap text-zinc-500">{formatDateTime(p.created_at)}</Td>
                    <Td>{p.course_title}</Td>
                    <Td className="tabular-nums">{formatPaise(p.amount)}</Td>
                    <Td><PaymentStatus status={p.status} /></Td>
                  </tr>
                ))}
                {payments.length === 0 && <EmptyRow colSpan={4}>No payments.</EmptyRow>}
              </tbody>
            </Table>
          </section>
        </div>
      </div>
    </div>
  );
}
