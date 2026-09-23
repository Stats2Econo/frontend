import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUser, safeNext } from "@/lib/auth";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const next = safeNext(typeof searchParams.next === "string" ? searchParams.next : null);
  const hasError = typeof searchParams.error === "string";

  if (await getUser()) redirect(next);

  return (
    <section className="flex flex-1 items-center justify-center bg-[#fafafa] px-6 py-16">
      <div className="card w-full max-w-md p-8 text-center shadow-xs sm:p-10">
        <Image src="/tab_img.png" alt="" width={48} height={48} className="mx-auto h-12 w-12" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Welcome to Stats2Econo</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in to register for courses, access study material and follow announcements.
        </p>

        {hasError && (
          <p role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            We couldn&apos;t sign you in. Please try again.
          </p>
        )}

        <div className="mt-8">
          <GoogleSignInButton next={next} />
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          New here?{" "}
          <Link href={`/register?next=${encodeURIComponent(next)}`} className="font-medium text-brand hover:underline">
            Create an account
          </Link>
        </p>

        <p className="mt-8 text-xs leading-relaxed text-zinc-500">
          By continuing you agree to our{" "}
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
