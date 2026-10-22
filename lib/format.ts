const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(rupees: number) {
  return rupees === 0 ? "Free" : inr.format(rupees);
}

/** Razorpay amounts are stored in paise. */
export function formatPaise(paise: number) {
  return inr.format(paise / 100);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Returns a YouTube embed URL for YouTube links, otherwise null. */
export function youtubeEmbedUrl(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (u.hostname.endsWith("youtube.com")) {
      id = u.searchParams.get("v") ?? u.pathname.match(/\/(?:embed|live|shorts)\/([^/?]+)/)?.[1] ?? null;
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function initials(name: string | null | undefined, email?: string) {
  const source = name?.trim() || email || "?";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
/** Maps any course (dummy or live Supabase DB row) to its banner illustration in /public/courses/ */
export function getCourseImage(course: { id?: string; slug?: string; title: string; software?: string }): string {
  const key = `${course.id ?? ""} ${course.slug ?? ""} ${course.title}`.toLowerCase();

  if (key.includes("nsso") || key.includes("plfs") || key.includes("unit-level") || key.includes("survey")) {
    return "/courses/nsso-data.png";
  }
  if (key.includes("time series") || key.includes("time-series") || key.includes("forecasting") || key.includes("arima")) {
    return "/courses/time-series-r.png";
  }
  if (key.includes("panel") || key.includes("advanced econometric")) {
    return "/courses/panel-data.png";
  }
  if (key.includes("introduction") || key.includes("statistical analysis") || key.includes("scholar")) {
    return "/courses/intro-stats.png";
  }
  if (key.includes("microeconometrics") || key.includes("causal") || key.includes("applied") || key.includes("r")) {
    return "/courses/microeconometrics-r.png";
  }
  if (key.includes("basic econometric") || course.software?.toUpperCase() === "STATA") {
    return "/courses/econometrics-stata.png";
  }
  return "/courses/econometrics-stata.png";
}