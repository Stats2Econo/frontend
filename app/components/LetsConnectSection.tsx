"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

export default function LetsConnectSection() {
  const [state, formAction, isSubmitting] = useActionState(sendContactMessage, undefined);
  const [dismissedState, setDismissedState] = useState<typeof state>(undefined);
  const submitted = Boolean(state?.ok) && state !== dismissedState;

  return (
    <section id="connect" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-[#f4f7f4] shadow-lg lg:grid lg:grid-cols-12">
          
          {/* Left Column: Deep Forest Info Panel */}
          <div className="flex flex-col justify-between bg-gradient-to-br from-[#2d4a35] to-[#192b1e] p-8 text-white sm:p-12 lg:col-span-5">
            <div>
              <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#a8d5b5]">
                Direct Academic Enquiry
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Let&apos;s Connect
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Have questions about syllabus prerequisites, institutional workshops, or scholar fee concessions? Reach out to Dr. Mohamad Aslam directly.
              </p>

              <div className="mt-8 space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#a8d5b5]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">Registered Office</div>
                    <p className="mt-0.5 text-white/70">Palampur, District Kangra, Himachal Pradesh, India — 176061</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#a8d5b5]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">Email Instructor</div>
                    <a href="mailto:instructor@stats2econo.com" className="mt-0.5 block text-[#a8d5b5] hover:underline">
                      instructor@stats2econo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#a8d5b5]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">Phone &amp; WhatsApp</div>
                    <a href="tel:+919815008268" className="mt-0.5 block text-white/80 hover:text-white">
                      +91 9815008268
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Pills */}
            <div className="mt-10 border-t border-white/15 pt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Connect on Socials
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href="https://wa.me/919815008268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#a8d5b5]" /> WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamad-aslam-stats2econo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#a8d5b5]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/c/statisticstoeconometrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#a8d5b5]">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="bg-white p-8 sm:p-12 lg:col-span-7">
            <h3 className="text-xl font-bold text-[#1a2b20]">Send us a message</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Fill out the form below and we will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900">Message Received!</h4>
                <p className="text-xs text-zinc-600">
                  Thank you for reaching out. Dr. Aslam&apos;s team will respond shortly.
                </p>
                <button
                  onClick={() => setDismissedState(state)}
                  className="mt-3 text-xs font-semibold text-[#2d4a35] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={formAction} className="mt-6 space-y-4">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-first-name" className="label">First name *</label>
                    <input id="contact-first-name" name="firstName" type="text" required className="input" />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="label">Last name *</label>
                    <input id="contact-last-name" name="lastName" type="text" required className="input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="label">Email address *</label>
                    <input id="contact-email" name="email" type="email" required className="input" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="label">Subject</label>
                    <input id="contact-subject" name="subject" type="text" placeholder="e.g. STATA Course Enquiry" className="input" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="label">Your message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your research topic or course interest..."
                    className="input"
                  />
                </div>

                {state?.error && (
                  <p role="alert" className="text-xs font-medium text-red-700">{state.error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#2d4a35] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3527] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending message..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}