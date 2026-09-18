export type Role = "student" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  date_of_birth: string | null;
  gender: string | null;
  occupation: string | null;
  institution: string | null;
  designation: string | null;
  highest_qualification: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
  role: Role;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  overview: string;
  software: string;
  mode: string;
  schedule: string;
  duration: string;
  start_date: string | null;
  end_date: string | null;
  price_inr: number;
  syllabus: string[];
  brochure_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  enrollment_open: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ContentType = "video" | "file" | "link" | "note";

export interface CourseContent {
  id: string;
  course_id: string;
  section: string;
  title: string;
  description: string;
  content_type: ContentType;
  url: string | null;
  file_path: string | null;
  body: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  payment_id: string | null;
  status: "active" | "revoked";
  source: "payment" | "manual" | "free";
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string | null;
  user_email: string;
  course_id: string | null;
  course_title: string;
  amount: number;
  currency: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  status: "created" | "paid" | "failed";
  created_at: string;
}

export interface Announcement {
  id: string;
  course_id: string | null;
  title: string;
  body: string;
  is_pinned: boolean;
  show_on_homepage: boolean;
  created_at: string;
  courses?: { title: string; slug: string } | null;
}

export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

/** Return value of form Server Actions used with useActionState. */
export interface FormState {
  ok?: boolean;
  error?: string;
  message?: string;
}
