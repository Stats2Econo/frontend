import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { FormState } from "@/lib/types";

export default function FormMessage({ state }: { state: FormState | undefined }) {
  if (!state?.error && !state?.message) return null;
  const isError = Boolean(state.error);
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-leaf/30 bg-leaf-50 text-green-900"
      }`}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{state.error ?? state.message}</span>
    </div>
  );
}
