"use client";

import Image from "next/image";
import { Quote, Globe, GraduationCap, Building2 } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#16261c] py-20 text-white md:py-28"
    >
      {/* Subtle radial dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(rgba(168, 213, 181, 0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a8d5b5]/25 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
            Global Scholarly Community
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by Scholars Across 65+ Universities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            From IITs and Central Universities in India to researchers across Germany, USA, Canada, and the ILO.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="relative flex flex-col items-center shrink-0">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-[#a8d5b5]/50 shadow-lg">
                <Image
                  src="/testimonials/baishali.jpg"
                  alt="Dr. Baishali Lahiri"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="mt-3 rounded-full bg-[#c0392b] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Featured Alumna
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <Quote className="mx-auto h-9 w-9 text-[#a8d5b5]/40 md:mx-0" />
              <blockquote className="mt-3 text-base leading-relaxed text-white/90 italic sm:text-lg">
                &ldquo;I joined the training program on &lsquo;Theoretical and Applied Statistics and Econometrics with STATA&rsquo; to have a nuanced understanding of working with STATA. The instructor took care that each student picks up in the diverse classroom, remaining punctual and patient with every query. Unlike courses that focus only on clicking buttons, this program is designed from scratch to teach the <strong className="font-semibold text-[#a8d5b5] not-italic">why and how</strong> of every statistical technique.&rdquo;
              </blockquote>

              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="text-base font-bold text-white">Dr. Baishali Lahiri</div>
                <div className="mt-0.5 text-xs font-medium text-[#a8d5b5]">
                  Consultant to International Labour Organization (ILO), New Delhi, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xs transition hover:border-white/25 hover:bg-white/8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#a8d5b5]">
                <GraduationCap className="h-4 w-4" />
                NSSO Micro-Data Workshop
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/85 italic">
                &ldquo;The NSSO data extraction workshop simplified what used to take weeks of tedious trial and error. Learning fixed-width text parsing and multiplier weighting gave our research team complete independence.&rdquo;
              </p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold text-white">
              Research Scholar · CESP, Jawaharlal Nehru University (JNU)
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xs transition hover:border-white/25 hover:bg-white/8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#a8d5b5]">
                <Building2 className="h-4 w-4" />
                Time Series &amp; Panel Econometrics
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/85 italic">
                &ldquo;Dr. Aslam&apos;s lectures on Time Series and Panel Data Econometrics bridge the mathematical proofs with practical STATA do-files seamlessly. Highly recommended for researchers preparing empirical manuscripts.&rdquo;
              </p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold text-white">
              Assistant Professor in Economics · Central University
            </div>
          </div>
        </div>

        {/* Global Footprint Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-white/10 bg-black/20 px-6 py-4 text-xs text-white/70">
          <span className="flex items-center gap-2 font-semibold text-[#a8d5b5]">
            <Globe className="h-4 w-4" /> Scholars trained from 20+ nations:
          </span>
          <span>India (IITs / JNU / DU)</span>
          <span>•</span>
          <span>Germany</span>
          <span>•</span>
          <span>United States</span>
          <span>•</span>
          <span>Canada</span>
          <span>•</span>
          <span>Netherlands</span>
          <span>•</span>
          <span>Italy &amp; France</span>
        </div>
      </div>
    </section>
  );
}