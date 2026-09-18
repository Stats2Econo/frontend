"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Loader2, Paperclip } from "lucide-react";
import { saveContent } from "../../actions";
import { createClient } from "@/lib/supabase/client";
import type { ContentType, CourseContent } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import FormMessage from "@/app/components/ui/FormMessage";
import { Toggle } from "../../ui";

const TYPES: { value: ContentType; label: string; hint: string }[] = [
  { value: "video", label: "Video", hint: "YouTube links play inside the page; other links open in a new tab." },
  { value: "file", label: "File", hint: "PDFs, datasets, do-files, slides (max 50 MB). Only enrolled students can download." },
  { value: "link", label: "Link", hint: "Zoom / Google Meet class link, Google Drive folder, article…" },
  { value: "note", label: "Note", hint: "Plain text instructions or reading notes." },
];

export default function ContentForm({
  courseId,
  item,
  nextOrder,
}: {
  courseId: string;
  item?: CourseContent;
  nextOrder: number;
}) {
  const [state, action] = useActionState(saveContent, undefined);
  const [type, setType] = useState<ContentType>(item?.content_type ?? "video");
  const [filePath, setFilePath] = useState(item?.file_path ?? "");
  const [fileName, setFileName] = useState(item?.file_path?.split("/").pop()?.replace(/^\d+-/, "") ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Clear the uploaded file after an item is added successfully.
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    if (state?.ok) {
      setFilePath("");
      setFileName("");
    }
  }

  async function upload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `${courseId}/${Date.now()}-${safeName}`;
      const { error } = await createClient().storage.from("course-files").upload(path, file, {
        upsert: false,
        contentType: file.type || undefined,
      });
      if (error) throw error;
      setFilePath(path);
      setFileName(file.name);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="card space-y-4 p-5">
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="course_id" value={courseId} />
      <input type="hidden" name="file_path" value={type === "file" ? filePath : ""} />

      <div className="grid grid-cols-4 gap-1 rounded-md bg-zinc-100 p-1">
        {TYPES.map((t) => (
          <label
            key={t.value}
            className={`cursor-pointer rounded px-2 py-1.5 text-center text-xs font-medium transition ${
              type === t.value ? "bg-white text-brand shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <input
              type="radio"
              name="content_type"
              value={t.value}
              checked={type === t.value}
              onChange={() => setType(t.value)}
              className="sr-only"
            />
            {t.label}
          </label>
        ))}
      </div>
      <p className="text-xs text-zinc-500">{TYPES.find((t) => t.value === type)?.hint}</p>

      <label className="block">
        <span className="label">Title *</span>
        <input name="title" required defaultValue={item?.title} className="input" placeholder="e.g. Lecture 3 — OLS assumptions" />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="col-span-2 block">
          <span className="label">Section / module</span>
          <input name="section" defaultValue={item?.section} className="input" placeholder="e.g. Week 1" />
        </label>
        <label className="block">
          <span className="label">Order</span>
          <input name="sort_order" type="number" defaultValue={item?.sort_order ?? nextOrder} className="input" />
        </label>
      </div>

      <label className="block">
        <span className="label">Description</span>
        <textarea name="description" rows={2} defaultValue={item?.description} className="input" />
      </label>

      {(type === "video" || type === "link") && (
        <label className="block">
          <span className="label">URL *</span>
          <input name="url" type="url" required defaultValue={item?.url ?? ""} className="input" placeholder="https://" />
        </label>
      )}

      {type === "file" && (
        <div>
          <span className="label">File *</span>
          <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-zinc-300 px-3 py-3 text-sm text-zinc-600 hover:border-brand hover:bg-brand-50/40">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
            <span className="truncate">{uploading ? "Uploading…" : fileName || "Choose a file to upload"}</span>
            <input
              type="file"
              className="sr-only"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
              }}
            />
          </label>
          {uploadError && <p className="mt-1 text-xs text-red-700">{uploadError}</p>}
        </div>
      )}

      {type === "note" && (
        <label className="block">
          <span className="label">Note *</span>
          <textarea name="body" rows={6} defaultValue={item?.body ?? ""} className="input" />
        </label>
      )}

      <Toggle name="is_published" label="Visible to students" defaultChecked={item?.is_published ?? true} />

      <FormMessage state={state} />

      <div className="flex items-center justify-end gap-2">
        {item && (
          <Link href={`/admin/courses/${courseId}?tab=content`} className="btn-secondary">
            Cancel
          </Link>
        )}
        <SubmitButton>{item ? "Save item" : "Add item"}</SubmitButton>
      </div>
    </form>
  );
}
