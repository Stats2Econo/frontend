"use client";

import { useActionState, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

export default function LetsConnectSection() {
  const [state, formAction, isSubmitting] = useActionState(sendContactMessage, undefined);
  const [dismissedState, setDismissedState] = useState<typeof state>(undefined);
  const submitted = Boolean(state?.ok) && state !== dismissedState;

  return (
    <section id="connect" className="border-b border-zinc-200 bg-[#fafafa] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Info (Original Layout) */}
          <div className="space-y-6 text-[#33343f]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#2b5672]">
                Contact
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#33343f] sm:text-3xl">
                Let&apos;s Connect
              </h2>
            </div>

            <div className="space-y-1 text-sm text-zinc-600">
              <p>Palampur, District-Kangra</p>
              <p>Himachal Pradesh, India</p>
              <p>176061</p>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <a
                  href="mailto:instructor@stats2econo.com"
                  className="font-medium text-[#2b5672] hover:underline"
                >
                  instructor@stats2econo.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+919815008268"
                  className="font-medium text-zinc-700 hover:text-zinc-950"
                >
                  +91 9815008268
                </a>
              </div>
            </div>

            {/* Social / Direct Links */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Connect Directly
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-medium">
                <a
                  href="https://wa.me/919815008268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2b5672] hover:underline"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamad-aslam-stats2econo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2b5672] hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/c/statisticstoeconometrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2b5672] hover:underline"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form (Matching Original Fields) */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Thanks for submitting!</h3>
                <p className="text-xs text-zinc-600">
                  We have received your message and will be in touch with you shortly.
                </p>
                <button
                  onClick={() => setDismissedState(state)}
                  className="mt-3 text-xs font-medium text-[#2b5672] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                {/* Honeypot for spam bots */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-first-name" className="block text-xs font-medium text-zinc-700">First name</label>
                    <input
                      id="contact-first-name"
                      name="firstName"
                      type="text"
                      required
                      className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-xs text-zinc-900 focus:border-[#2b5672] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="block text-xs font-medium text-zinc-700">Last name</label>
                    <input
                      id="contact-last-name"
                      name="lastName"
                      type="text"
                      required
                      className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-xs text-zinc-900 focus:border-[#2b5672] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-700">Email *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-xs text-zinc-900 focus:border-[#2b5672] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-700">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-xs text-zinc-900 focus:border-[#2b5672] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700">
                    Leave us a message...
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-xs text-zinc-900 focus:border-[#2b5672] focus:outline-none"
                  />
                </div>

                {state?.error && (
                  <p role="alert" className="text-xs text-red-700">{state.error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded bg-[#2b5672] py-2.5 text-xs font-semibold text-white transition hover:bg-[#1f4157] disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
