"use client";

import { useActionState } from "react";
import { enrollStudent } from "../actions";
import SubmitButton from "@/app/components/ui/SubmitButton";
import FormMessage from "@/app/components/ui/FormMessage";

export default function EnrollForm({
  courses,
  userId,
  fixedCourseId,
}: {
  courses: { id: string; title: string }[];
  /** Enroll this user (user detail page). Otherwise the form asks for an email. */
  userId?: string;
  fixedCourseId?: string;
}) {
  const [state, action] = useActionState(enrollStudent, undefined);

  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        {userId ? (
          <input type="hidden" name="user_id" value={userId} />
        ) : (
          <label className="block flex-1">
            <span className="label">Student email</span>
            <input name="email" type="email" required placeholder="student@gmail.com" className="input" />
          </label>
        )}
        {fixedCourseId ? (
          <input type="hidden" name="course_id" value={fixedCourseId} />
        ) : (
          <label className="block flex-1">
            <span className="label">Course</span>
            <select name="course_id" required defaultValue="" className="input">
              <option value="" disabled>Select a course…</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </label>
        )}
        <SubmitButton pendingText="Enrolling…">Enroll</SubmitButton>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
