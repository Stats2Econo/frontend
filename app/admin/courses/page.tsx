import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import type { Course } from "@/lib/types";
import { EmptyRow, PageHeader, Table, Td, Th } from "../ui";

export const metadata: Metadata = { title: "Courses" };

type Row = Course & { enrollments: { count: number }[] };

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*, enrollments(count)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  const courses = (data as Row[] | null) ?? [];

  return (
    <div>
      <PageHeader
        title="Courses"
        description="Create, edit and publish courses. Open a course to manage its content and students."
        action={
          <Link href="/admin/courses/new" className="btn-primary">
            <Plus className="h-4 w-4" /> New course
          </Link>
        }
      />
      <Table>
        <thead>
          <tr>
            <Th>Course</Th>
            <Th>Status</Th>
            <Th>Price</Th>
            <Th>Enrollment</Th>
            <Th>Students</Th>
            <Th>Order</Th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-50/60">
              <Td>
                <Link href={`/admin/courses/${c.id}`} className="font-medium text-brand hover:underline">
                  {c.title}
                </Link>
                <div className="mt-0.5 text-xs text-zinc-500">/{c.slug}</div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1.5">
                  {c.is_published ? (
                    <span className="badge bg-leaf-50 text-green-800">Published</span>
                  ) : (
                    <span className="badge bg-zinc-100 text-zinc-600">Draft</span>
                  )}
                  {c.is_featured && <span className="badge bg-berry/10 text-berry">Featured</span>}
                </div>
              </Td>
              <Td className="tabular-nums">{formatPrice(c.price_inr)}</Td>
              <Td className="text-zinc-600">{c.enrollment_open ? "Open" : "Closed"}</Td>
              <Td className="tabular-nums">{c.enrollments?.[0]?.count ?? 0}</Td>
              <Td className="text-zinc-500 tabular-nums">{c.sort_order}</Td>
            </tr>
          ))}
          {courses.length === 0 && <EmptyRow colSpan={6}>No courses yet. Create your first course.</EmptyRow>}
        </tbody>
      </Table>
    </div>
  );
}
