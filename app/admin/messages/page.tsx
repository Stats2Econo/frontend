import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import type { ContactMessage } from "@/lib/types";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { deleteMessage, setMessageRead } from "../actions";
import { PageHeader } from "../ui";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(300);
  const messages = (data as ContactMessage[] | null) ?? [];

  return (
    <div className="max-w-4xl">
      <PageHeader title="Messages" description="Enquiries sent through the “Let’s Connect” form on the homepage." />

      <ul className="space-y-3">
        {messages.map((m) => (
          <li key={m.id} className={`card p-5 ${m.is_read ? "" : "border-l-4 border-l-brand"}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-ink">
                    {[m.first_name, m.last_name].filter(Boolean).join(" ") || "Anonymous"}
                  </span>
                  {!m.is_read && <span className="badge bg-brand-50 text-brand">New</span>}
                  <span className="text-xs text-zinc-400">{formatDateTime(m.created_at)}</span>
                </div>
                <a href={`mailto:${m.email}${m.subject ? `?subject=${encodeURIComponent(`Re: ${m.subject}`)}` : ""}`} className="text-xs text-brand hover:underline">
                  {m.email}
                </a>
                {m.subject && <div className="mt-2 text-sm font-medium text-zinc-800">{m.subject}</div>}
                {m.message && <p className="mt-1 text-sm whitespace-pre-line text-zinc-600">{m.message}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <form action={setMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="is_read" value={String(!m.is_read)} />
                  <SubmitButton className="btn-secondary btn-sm" pendingText="…">
                    {m.is_read ? "Mark unread" : "Mark read"}
                  </SubmitButton>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <SubmitButton className="btn-danger btn-sm" pendingText="…" confirmMessage="Delete this message?">
                    Delete
                  </SubmitButton>
                </form>
              </div>
            </div>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="card flex flex-col items-center gap-2 px-6 py-12 text-center text-sm text-zinc-500">
            <Mail className="h-5 w-5 text-zinc-300" />
            No messages yet.
          </li>
        )}
      </ul>
    </div>
  );
}
