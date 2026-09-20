"use client";

import { useActionState } from "react";
import { signUpWithPassword } from "@/app/actions/auth";
import FormMessage from "@/app/components/ui/FormMessage";
import SubmitButton from "@/app/components/ui/SubmitButton";

export default function RegisterForm({ next }: { next: string }) {
  const [state, action] = useActionState(signUpWithPassword, undefined);

  if (state?.ok) {
    return <FormMessage state={state} />;
  }

  return (
    <form action={action} className="space-y-4 text-left">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="full_name" className="label">Full name</label>
        <input id="full_name" name="full_name" required autoComplete="name" className="input" />
      </div>
      <div>
        <label htmlFor="email" className="label">Email address</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="input" />
        <p className="mt-1 text-xs text-zinc-500">At least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm_password" className="label">Confirm password</label>
        <input id="confirm_password" name="confirm_password" type="password" required minLength={8} autoComplete="new-password" className="input" />
      </div>

      <FormMessage state={state} />

      <SubmitButton pendingText="Creating account…" className="btn-primary w-full">
        Create account
      </SubmitButton>
    </form>
  );
}
