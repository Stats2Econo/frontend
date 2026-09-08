"use client";

import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-zinc-200 bg-[#fafafa] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
            Testimonials
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
            Participant Experiences
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-600">
            More than 600 participants have taken our courses from various institutes and multiple nations.
          </p>
        </div>

        {/* Featured Testimonial: Dr. Baishali Lahiri (Authentic from original website) */}
        <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-8 md:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200">
              <Image
                src="/testimonials/baishali.jpg"
                alt="Dr. Baishali Lahiri"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <blockquote className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal italic">
                &ldquo;I joined the training program on &lsquo;Theoretical and Applied Statistics and Econometrics with STATA&rsquo; to have a nuanced understanding of working with STATA. Though I was familiar with the basics of statistics and econometrics, like most of the participants in the group, the instructor took care that each student picks up in the diverse classroom. The instructor is punctual with his classes and patient with all the queries we had. I found this course comprehensive as compared to others that focus only on working on the STATA platform. This course has been designed from scratch to the why and how of the statistical technique. Above all, I find that Mr. Aslam to be genuinely driven by the cause of providing quality learning.&rdquo;
              </blockquote>

              <div className="pt-2">
                <div className="font-bold text-sm text-zinc-900">Dr. Baishali Lahiri</div>
                <div className="text-xs text-zinc-500">
                  Consultant to International Labour Organization (ILO), New Delhi, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-xs text-zinc-700 leading-relaxed">
            <p className="italic">
              &ldquo;The NSSO data extraction workshop simplified what used to take weeks of tedious trial and error. Learning fixed-width text parsing and multiplier weighting gave our research team complete independence.&rdquo;
            </p>
            <div className="mt-4 font-semibold text-zinc-900">
              Research Scholar, Centre for Economic Studies and Planning (CESP), JNU
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-xs text-zinc-700 leading-relaxed">
            <p className="italic">
              &ldquo;Dr. Aslam&apos;s lectures on Time Series and Panel Data Econometrics bridge the math with practical STATA do-files seamlessly. Highly recommended for researchers preparing empirical manuscripts.&rdquo;
            </p>
            <div className="mt-4 font-semibold text-zinc-900">
              Assistant Professor in Economics, Central University
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
