"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MissionSection() {
  return (
    <section id="mission" className="border-b border-zinc-200 bg-[#fafafa] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Tag */}
        <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
          Our Mission
        </div>

        {/* Heading */}
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
          Empowering Researchers with Applied Econometric Rigor
        </h2>

        {/* Mission Body (Original Website Text) */}
        <div className="mt-6 space-y-4 text-base text-zinc-700 leading-relaxed font-normal">
          <p>
            Stats2Econo was founded on the belief that research skills should be accessible to every student, at any level, from anywhere. Statistical and econometric analyses are essential for solving real-world challenges, including socio-economic, geographical, psychological, and environmental issues.
          </p>
          <p>
            Our mission is to equip students, scholars, and professionals with both theoretical knowledge and hands-on applied skills. Every course is crafted from the ground up—moving methodically from mathematical foundations to live code execution on empirical datasets.
          </p>
        </div>

        {/* 3 Minimal Pillars */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Equal Opportunity</h3>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Affordable access to quality training, with special fee concessions available for scholars and students from developing nations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Theoretical Intuition</h3>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Moving beyond rote software buttons to understand the mathematical proofs, assumptions, and econometric logic behind every estimator.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Empirical Datasets</h3>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Direct exposure to national surveys like NSSO and PLFS, learning unit-level data parsing, multipliers, and publication-ready .do files.
            </p>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-8">
          <Link
            href="/our-journey"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2b5672] hover:underline"
          >
            <span>Read More About Our Journey</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
