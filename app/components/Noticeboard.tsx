"use client";

import { useState } from "react";
import { Bell, Calendar, ArrowRight } from "lucide-react";

interface NoticeboardProps {
  className?: string;
}

export default function Noticeboard({ className = "" }: NoticeboardProps) {
  const [showNotices, setShowNotices] = useState(false);

  const notices = [
    {
      id: 1,
      title: "NSSO Unit-Level Data Extraction & Weights Handling in progress.",
      date: "Active Batch",
    },
    {
      id: 2,
      title: "Admissions open for next cohort with scholar concession.",
      date: "Upcoming",
    },
    {
      id: 3,
      title: "STATA .do scripts and sample datasets updated on student drive.",
      date: "Portal",
    },
  ];

  return (
    <aside aria-label="Academic Noticeboard" className={`w-full border-b border-zinc-200 bg-[#f8fafc] text-[#33343f] ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-3.5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left: Notice Indicator & Course Name */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2b5672]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2b5672]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d92d20] animate-pulse"></span>
              Current Course
            </span>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              <span className="font-semibold text-zinc-900">
                Econometrics Analysis Using NSSO UNIT LEVEL DATA
              </span>
              <span className="text-zinc-400 hidden sm:inline">•</span>
              <span className="text-zinc-600 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                Mon to Thu (7:00 PM – 8:30 PM IST)
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowNotices(!showNotices)}
              className="inline-flex items-center gap-1 rounded border border-zinc-300 bg-white px-2.5 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-400"
            >
              <Bell className="h-3.5 w-3.5 text-zinc-500" />
              <span>Notices ({notices.length})</span>
            </button>

            <a
              href="#connect"
              className="inline-flex items-center gap-1 rounded bg-[#2b5672] px-3.5 py-1.5 font-medium text-white transition hover:bg-[#1f4157]"
            >
              <span>Register</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Collapsible Notice Drawer */}
        {showNotices && (
          <div className="mt-3 border-t border-zinc-200/80 pt-3 text-xs animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-2 rounded border border-zinc-200 bg-white p-2.5"
                >
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                    {n.date}
                  </span>
                  <p className="text-zinc-700 leading-snug">{n.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
