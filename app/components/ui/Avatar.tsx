import { initials } from "@/lib/format";

export default function Avatar({
  name,
  email,
  src,
  size = 32,
}: {
  name: string | null | undefined;
  email?: string;
  src?: string | null;
  size?: number;
}) {
  if (src) {
    return (
      // Google avatars are small remote images; a plain img avoids image-domain config.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand"
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.38) }}
    >
      {initials(name, email)}
    </span>
  );
}
