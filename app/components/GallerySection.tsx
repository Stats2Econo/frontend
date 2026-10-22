"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MapPin, Expand } from "lucide-react";

interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  src: string;
}

export default function GallerySection() {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "akal",
      tag: "Bathinda, Punjab",
      title: "Akal University Offline NSSO Workshop",
      description:
        "First offline NSSO UNIT LEVEL DATA WORKSHOP, where Dr. Navneet Kaur from World Bank joined to teach the fundamentals of NSSO data.",
      src: "/gallery/akal-university.jpg",
    },
    {
      id: "vishwakarma",
      tag: "Pune, Maharashtra",
      title: "Vishwakarma University Training Series",
      description:
        "Special training series with Prof. Surajit Das, Centre for Economic Studies and Planning, School of Social Sciences.",
      src: "/gallery/vishwakarma-university.jpg",
    },
    {
      id: "workshop-session",
      tag: "Live STATA Lab",
      title: "Hands-on STATA Computer Lab",
      description:
        "Scholars practicing live econometric data parsing, .do file writing, and diagnostic testing.",
      src: "/gallery/workshop-session.jpg",
    },
    {
      id: "cohort-group",
      tag: "Cohort Valedictory",
      title: "Batch Valedictory & Cohort Meet",
      description:
        "Participants and faculty celebrating the completion of our intensive Econometrics and Data Extraction program.",
      src: "/gallery/cohort-group.jpg",
    },
    {
      id: "lecture-hall",
      tag: "Campus Seminar",
      title: "National Econometrics Seminar Lecture",
      description:
        "Interactive lecture on multiple regression, Gauss-Markov assumptions, and model specification.",
      src: "/gallery/lecture-hall.jpg",
    },
    {
      id: "stata-lab",
      tag: "Doctoral Guidance",
      title: "Interactive Methodology Forum",
      description:
        "One-on-one thesis guidance and empirical research consultation for doctoral scholars.",
      src: "/gallery/stata-lab.jpg",
    },
  ];

  return (
    <section id="gallery" className="border-b border-zinc-200 bg-[#f7f9f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#2d4a35]">
              Gallery &amp; Field Engagements
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1a2b20] sm:text-4xl">
              Workshops &amp; Academic Seminars
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-600">
            Snapshots from our offline university workshops, campus seminars, and live computer lab sessions across India.
          </p>
        </div>

        {/* Immersive Photo Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Rich dark gradient overlay like JourneyHero */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300"
              />

              {/* Top Location Pill & Expand Icon */}
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  <MapPin className="h-3 w-3 text-[#a8d5b5]" />
                  {item.tag}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h4 className="text-base font-bold leading-snug text-white">
                  {item.title}
                </h4>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-zinc-950">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2d4a35]/10 px-2.5 py-0.5 text-xs font-semibold text-[#2d4a35]">
                {activePhoto.tag}
              </span>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">{activePhoto.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}