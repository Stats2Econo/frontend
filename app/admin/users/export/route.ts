import { NextResponse } from "next/server";
import { getProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

const COLUMNS: (keyof Profile)[] = [
  "full_name", "email", "phone", "whatsapp", "date_of_birth", "gender", "occupation", "institution",
  "designation", "highest_qualification", "address_line1", "address_line2", "city", "state",
  "country", "pincode", "role", "profile_completed", "created_at",
];

function csvCell(value: unknown) {
  const s = value == null ? "" : String(value);
  // Prevent spreadsheet formula injection and escape quotes.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const me = await getProfile();
  if (me?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await createClient();
  const rows: Profile[] = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    rows.push(...((data as Profile[]) ?? []));
    if (!data || data.length < pageSize) break;
  }

  const csv = [
    COLUMNS.join(","),
    ...rows.map((row) => COLUMNS.map((col) => csvCell(row[col])).join(",")),
  ].join("\r\n");

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="stats2econo-students-${date}.csv"`,
    },
  });
}
