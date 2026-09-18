import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseForm from "../CourseForm";
import { PageHeader } from "../../ui";

export const metadata: Metadata = { title: "New course" };

export default function NewCoursePage() {
  return (
    <div className="max-w-4xl">
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-brand">
        <ArrowLeft className="h-3.5 w-3.5" /> Courses
      </Link>
      <PageHeader title="New course" description="You can add content and announcements after saving." />
      <CourseForm />
    </div>
  );
}
