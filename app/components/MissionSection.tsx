"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Database, Globe2, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Globe2,
    num: "01",
    title: "Equal Opportunity",
    desc: "Affordable access to quality training, with 50–70% fee concessions available for scholars and students from developing nations.",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Theoretical Intuition",
    desc: "Moving beyond rote software buttons to master the mathematical proofs, assumptions, and econometric logic behind every estimator.",
  },
  {
    icon: Database,
    num: "03",
    title: "Empirical Datasets",
    desc: "Direct exposure to national surveys like NSSO, PLFS, IHDS & DHS—learning unit-level data parsing, multipliers, and publication-ready .do files.",
  },
];

export default function MissionSection() {
  return (
    <section id="mission" className="relative overflow-hidden border-b border-[#dce6df] bg-[#f2f6f3] py-20 md:py-28">
      {/* Subtle decorative background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#2d4a35]/8 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* Top 2-Column Editorial Split */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2d4a35]/20 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#2d4a35] shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#c0392b]" />
              Our Academic Mission
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1a2b20] sm:text-4xl lg:leading-[1.18]">
              Empowering Researchers with Applied Econometric Rigor
            </h2>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-zinc-700 lg:col-span-6">
            <p>
              Stats2Econo was founded on the belief that research skills should be accessible to every student, at any level, from anywhere. Statistical and econometric analyses are essential for solving real-world socio-economic, geographical, and policy challenges.
            </p>
            <p>
              Every course is crafted from the ground up—moving methodically from mathematical foundations to live code execution on empirical micro-datasets.
            </p>
          </div>
        </div>

        {/* 3 Rich Bento Pillars */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, num, title, desc }) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2d4a35]/15 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2d4a35]/40 hover:shadow-lg"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2d4a35] via-[#62a86a] to-[#c0392b] opacity-80" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2d4a35] text-white shadow-sm transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#2d4a35]/15">{num}</span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#1a2b20]">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">{desc}</p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-4">
                <span className="text-xs font-semibold text-[#2d4a35]">Core Methodology Pillar</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Strip linking to Our Journey */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#1e3527] via-[#2d4a35] to-[#1e3527] px-8 py-7 text-white shadow-md sm:flex-row">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
              Since 2011 · Panjab University &amp; JNU Roots
            </div>
            <p className="mt-1 text-base font-semibold text-white sm:text-lg">
              Discover how a small Chandigarh study group grew into 65+ universities across 20+ nations.
            </p>
          </div>
          <Link
            href="/our-journey"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-[#1e3527] shadow-xs transition hover:bg-[#a8d5b5]"
          >
            <span>Explore Our Journey</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}