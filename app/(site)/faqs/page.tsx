import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = { title: "FAQs" };

type Faq = { question: string; answer: React.ReactNode };

const FAQS: Faq[] = [
  {
    question: "Who are these courses for?",
    answer:
      "Students, research scholars, faculty members and working professionals in economics and allied streams who want practical, applied skills in statistics and econometrics. You don’t need to be excellent at math or statistics to begin — patience and consistent effort matter more.",
  },
  {
    question: "What will I learn?",
    answer:
      "For every method, we teach the theory first and then the application with software. We explain the answers during demonstrations, use graphical explanations and real examples, and encourage you to solve real problems independently.",
  },
  {
    question: "How are the courses delivered?",
    answer:
      "Our courses and workshops run online, with individual support during practical sessions to help you overcome errors. We also hold offline workshops for educational institutes from time to time.",
  },
  {
    question: "How do I enroll in a course?",
    answer: (
      <>
        <Link href="/register" className="font-medium text-brand hover:underline">
          Create an account
        </Link>
        , browse the{" "}
        <Link href="/courses" className="font-medium text-brand hover:underline">
          courses
        </Link>
        , and pay online from the course page. Once enrolled, the course appears in your dashboard.
      </>
    ),
  },
  {
    question: "Where do I find my courses and payments?",
    answer:
      "After logging in, open your dashboard. It lists your enrolled courses, announcements, payment history and profile.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "STATS2ECONO is registered as STATS2ECONO APPLIED RESEARCH Pvt. Ltd and issues certificates to participants.",
  },
  {
    question: "Can I get a refund?",
    answer: (
      <>
        Fees are not refundable, adjustable or transferable once you’ve been admitted to a program. A refund applies only
        if a program is called off. See the full{" "}
        <Link href="/terms-of-use-and-refund-policy" className="font-medium text-brand hover:underline">
          Terms of Use and Refund Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I share my login with a colleague?",
    answer:
      "No. Your password is unique to you, and sharing it or allowing someone else to use it can lead to your access being suspended without refund.",
  },
];

export default function FaqsPage() {
  return (
    <div className="flex-1 bg-[#fafafa]">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="eyebrow">Help</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-700">
          Quick answers about our courses, enrollment and policies.
        </p>

        <div className="mt-10 space-y-3">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-3 leading-relaxed text-zinc-700">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
