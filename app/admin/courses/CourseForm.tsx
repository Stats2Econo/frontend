"use client";

import { useActionState, useState } from "react";
import { saveCourse } from "../actions";
import { slugify } from "@/lib/format";
import type { Course } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import FormMessage from "@/app/components/ui/FormMessage";
import { Toggle } from "../ui";

export default function CourseForm({ course }: { course?: Course }) {
  const [state, action] = useActionState(saveCourse, undefined);
  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(course));

  return (
    <form action={action} className="space-y-6">
      {course && <input type="hidden" name="id" value={course.id} />}

      <div className="card space-y-5 p-6">
        <h2 className="text-sm font-semibold text-ink">Basics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="label">Title *</span>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className="input"
            />
          </label>
          <label className="block">
            <span className="label">URL slug *</span>
            <div className="mt-1 flex rounded-md border border-zinc-300 focus-within:border-brand">
              <span className="flex items-center border-r border-zinc-200 bg-zinc-50 px-2.5 text-xs text-zinc-500">/courses/</span>
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="w-full rounded-r-md px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </label>
          <label className="block">
            <span className="label">Price (₹) *</span>
            <input name="price_inr" type="number" min={0} step={1} required defaultValue={course?.price_inr ?? 0} className="input" />
            <span className="mt-1 block text-xs text-zinc-500">Use 0 for a free course.</span>
          </label>
          <label className="block sm:col-span-2">
            <span className="label">Short description</span>
            <textarea name="short_description" rows={2} defaultValue={course?.short_description} className="input" placeholder="Shown on course cards" />
          </label>
          <label className="block sm:col-span-2">
            <span className="label">Course overview</span>
            <textarea name="overview" rows={6} defaultValue={course?.overview} className="input" placeholder="Detailed description shown on the course page" />
          </label>
          <label className="block sm:col-span-2">
            <span className="label">What students will learn</span>
            <textarea name="syllabus" rows={6} defaultValue={course?.syllabus.join("\n")} className="input font-mono text-xs" placeholder="One topic per line" />
          </label>
        </div>
      </div>

      <div className="card space-y-5 p-6">
        <h2 className="text-sm font-semibold text-ink">Schedule &amp; details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">Software</span>
            <input name="software" defaultValue={course?.software} placeholder="STATA & R" className="input" />
          </label>
          <label className="block">
            <span className="label">Mode</span>
            <input name="mode" defaultValue={course?.mode ?? "Live Online"} className="input" />
          </label>
          <label className="block">
            <span className="label">Schedule</span>
            <input name="schedule" defaultValue={course?.schedule} placeholder="Mon to Thu, 7:00 – 8:30 PM IST" className="input" />
          </label>
          <label className="block">
            <span className="label">Duration</span>
            <input name="duration" defaultValue={course?.duration} placeholder="16 weeks" className="input" />
          </label>
          <label className="block">
            <span className="label">Start date</span>
            <input name="start_date" type="date" defaultValue={course?.start_date ?? ""} className="input" />
          </label>
          <label className="block">
            <span className="label">End date</span>
            <input name="end_date" type="date" defaultValue={course?.end_date ?? ""} className="input" />
          </label>
          <label className="block">
            <span className="label">Brochure / PDF link</span>
            <input name="brochure_url" type="url" defaultValue={course?.brochure_url ?? ""} placeholder="https://" className="input" />
          </label>
          <label className="block">
            <span className="label">Display order</span>
            <input name="sort_order" type="number" defaultValue={course?.sort_order ?? 0} className="input" />
            <span className="mt-1 block text-xs text-zinc-500">Lower numbers appear first.</span>
          </label>
        </div>
      </div>

      <div className="card grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
        <Toggle name="is_published" label="Published" hint="Visible on the website" defaultChecked={course?.is_published ?? false} />
        <Toggle name="enrollment_open" label="Enrollment open" hint="Students can register & pay" defaultChecked={course?.enrollment_open ?? true} />
        <Toggle name="is_featured" label="Current course" hint="Highlighted on the homepage" defaultChecked={course?.is_featured ?? false} />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4">
        <div className="flex-1"><FormMessage state={state} /></div>
        <SubmitButton>{course ? "Save changes" : "Create course"}</SubmitButton>
      </div>
    </form>
  );
}
