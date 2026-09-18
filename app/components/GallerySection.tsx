"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  src: string;
}

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "akal",
      title: "Akal University, Talwandi Sabo, Bathinda, Punjab",
      description:
        "First offline NSSO UNIT LEVEL DATA WORKSHOP, where Dr. Navneet Kaur from World Bank joined to teach the fundamentals of NSSO data.",
      src: "/gallery/akal-university.jpg",
    },
    {
      id: "vishwakarma",
      title: "Vishwakarma University, Pune",
      description:
        "Special training series with Prof. Surajit Das, Centre for Economic Studies and Planning, School of Social Sciences.",
      src: "/gallery/vishwakarma-university.jpg",
    },
    {
      id: "workshop-session",
      title: "Hands-on STATA Computer Lab",
      description:
        "Scholars practicing live econometric data parsing, .do file writing, and diagnostic testing.",
      src: "/gallery/workshop-session.jpg",
    },
    {
      id: "cohort-group",
      title: "Batch Valedictory & Cohort Meet",
      description:
        "Participants and faculty celebrating the completion of our intensive Econometrics and Data Extraction program.",
      src: "/gallery/cohort-group.jpg",
    },
    {
      id: "lecture-hall",
      title: "National Econometrics Seminar Lecture",
      description:
        "Interactive lecture on multiple regression, Gauss-Markov assumptions, and model specification.",
      src: "/gallery/lecture-hall.jpg",
    },
    {
      id: "stata-lab",
      title: "Interactive Methodology Forum",
      description:
        "One-on-one thesis guidance and empirical research consultation for doctoral scholars.",
      src: "/gallery/stata-lab.jpg",
    },
  ];

  return (
    <section id="gallery" className="border-b border-zinc-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
            Gallery &amp; Events
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
            Workshops &amp; Academic Engagements
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-600">
            Snapshots from our offline university workshops, campus seminars, and live computer lab sessions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-103"
                />
              </div>

              <div className="p-4">
                <h4 className="text-xs font-semibold text-zinc-900 leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-[11px] text-zinc-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-zinc-900">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-5">
              <h3 className="text-sm font-bold text-zinc-900">{activePhoto.title}</h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
