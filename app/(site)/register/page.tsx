import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, safeNext } from "@/lib/auth";
import GoogleSignInButton from "../login/GoogleSignInButton";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage(props: PageProps<"/register">) {
  const searchParams = await props.searchParams;
  const next = safeNext(typeof searchParams.next === "string" ? searchParams.next : null);

  if (await getUser()) redirect(next);

  return (
    <section className="flex flex-1 items-center justify-center bg-[#fafafa] px-6 py-16">
      <div className="card w-full max-w-md p-8 text-center shadow-xs sm:p-10">
        <Image src="/tab_img.png" alt="" width={48} height={48} className="mx-auto h-12 w-12" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Register to enrol in courses, access study material and follow announcements.
        </p>

        <div className="mt-8">
          <RegisterForm next={next} />
        </div>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-zinc-400">
          <span className="h-px flex-1 bg-zinc-200" />
          or
          <span className="h-px flex-1 bg-zinc-200" />
        </div>

        <GoogleSignInButton next={next} />

        <p className="mt-6 text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-medium text-brand hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-xs leading-relaxed text-zinc-500">
          By registering you agree to our{" "}
          <a href="/terms-of-use-and-refund-policy" className="text-brand hover:underline">
            Terms of Use &amp; Refund Policy
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-brand hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
