"use client";

import { useActionState } from "react";
import { signInWithPassword } from "@/app/actions/auth";
import FormMessage from "@/app/components/ui/FormMessage";
import SubmitButton from "@/app/components/ui/SubmitButton";

export default function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState(signInWithPassword, undefined);

  return (
    <form action={action} className="space-y-4 text-left">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="label">Email address</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>

      <FormMessage state={state} />

      <SubmitButton pendingText="Signing in…" className="btn-primary w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
