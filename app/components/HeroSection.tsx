"use client";

import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="border-b border-zinc-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Subtle Tag */}
        <div className="inline-block rounded border border-zinc-200 bg-[#f8fafc] px-3 py-1 text-xs font-medium tracking-wide text-zinc-600">
          Instructor-Led Live Online Courses
        </div>

        {/* Main Headline */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#33343f] sm:text-5xl sm:leading-tight">
          Enhance Your Research &amp; Data Analysis Skills with Statistical Software
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-3xl text-base text-zinc-600 sm:text-lg leading-relaxed font-normal">
          Hands-on training in Basic &amp; Advanced Econometrics, NSSO Unit-Level Data extraction, Time Series Analysis, and applied modeling using <strong className="font-medium text-zinc-900">STATA</strong> and <strong className="font-medium text-zinc-900">R</strong>.
        </p>

        {/* Lead Mentor info */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-600">
          <span className="font-medium text-zinc-900">Led by Dr. Mohamad Aslam</span>
          <span>•</span>
          <span>Former Post-Doctoral Fellow, IISER Mohali</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#courses"
            className="inline-flex items-center gap-2 rounded bg-[#2b5672] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f4157]"
          >
            <span>View Courses</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#connect"
            className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-400"
          >
            <span>Let&apos;s Connect</span>
          </a>
        </div>

        {/* Minimal Stats */}
        <div className="mt-14 border-t border-zinc-100 pt-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#2b5672]">600+</div>
              <div className="mt-1 text-xs text-zinc-500 font-medium">Participants Trained</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2b5672]">10+ Years</div>
              <div className="mt-1 text-xs text-zinc-500 font-medium">Teaching Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2b5672]">STATA &amp; R</div>
              <div className="mt-1 text-xs text-zinc-500 font-medium">Applied Software Labs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2b5672]">NSSO &amp; PLFS</div>
              <div className="mt-1 text-xs text-zinc-500 font-medium">Micro-Level Datasets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
