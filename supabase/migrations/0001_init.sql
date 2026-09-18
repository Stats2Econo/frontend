-- =============================================================================
-- Stats2Econo — initial schema
-- Run this whole file once in Supabase → SQL Editor → New query → Run.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Shared helpers
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- PROFILES — one row per auth user, created automatically on first Google login
-- -----------------------------------------------------------------------------
create table public.profiles (
  id                    uuid primary key references auth.users (id) on delete cascade,
  email                 text not null default '',
  full_name             text,
  avatar_url            text,
  phone                 text,
  whatsapp              text,
  date_of_birth         date,
  gender                text,
  occupation            text,
  institution           text,
  designation           text,
  highest_qualification text,
  address_line1         text,
  address_line2         text,
  city                  text,
  state                 text,
  country               text default 'India',
  pincode               text,
  role                  text not null default 'student' check (role in ('student', 'admin')),
  profile_completed     boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index profiles_created_at_idx on public.profiles (created_at desc);

-- Admin check used by every policy. SECURITY DEFINER so it can read profiles
-- without recursing into the profiles RLS policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- Create the profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Students may edit their own profile but never their role or email.
-- (Requests without a logged-in user — SQL editor, server secret key — are trusted.)
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null and not public.is_admin() then
    new.role  := old.role;
    new.email := old.email;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_protect_columns
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- -----------------------------------------------------------------------------
-- COURSES
-- -----------------------------------------------------------------------------
create table public.courses (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text not null,
  short_description text not null default '',
  overview          text not null default '',
  software          text not null default '',
  mode              text not null default 'Live Online',
  schedule          text not null default '',
  duration          text not null default '',
  start_date        date,
  end_date          date,
  price_inr         integer not null default 0 check (price_inr >= 0),
  syllabus          text[] not null default '{}',
  brochure_url      text,
  is_published      boolean not null default false,
  is_featured       boolean not null default false,
  enrollment_open   boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger courses_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- PAYMENTS — one row per Razorpay order
-- -----------------------------------------------------------------------------
create table public.payments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references public.profiles (id) on delete set null,
  user_email          text not null default '',
  course_id           uuid references public.courses (id) on delete set null,
  course_title        text not null default '',
  amount              integer not null,            -- in paise
  currency            text not null default 'INR',
  razorpay_order_id   text not null unique,
  razorpay_payment_id text unique,
  razorpay_signature  text,
  status              text not null default 'created' check (status in ('created', 'paid', 'failed')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index payments_user_idx on public.payments (user_id);
create index payments_created_at_idx on public.payments (created_at desc);

create trigger payments_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- ENROLLMENTS — which user has access to which course
-- -----------------------------------------------------------------------------
create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  course_id   uuid not null references public.courses (id) on delete cascade,
  payment_id  uuid references public.payments (id) on delete set null,
  status      text not null default 'active' check (status in ('active', 'revoked')),
  source      text not null default 'payment' check (source in ('payment', 'manual', 'free')),
  created_at  timestamptz not null default now(),
  unique (user_id, course_id)
);

create index enrollments_course_idx on public.enrollments (course_id);

create or replace function public.is_enrolled(p_course_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.enrollments
    where course_id = p_course_id
      and user_id = (select auth.uid())
      and status = 'active'
  );
$$;

-- -----------------------------------------------------------------------------
-- COURSE CONTENT — videos, files, links and notes unlocked after enrollment
-- -----------------------------------------------------------------------------
create table public.course_content (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses (id) on delete cascade,
  section       text not null default '',
  title         text not null,
  description   text not null default '',
  content_type  text not null check (content_type in ('video', 'file', 'link', 'note')),
  url           text,
  file_path     text,
  body          text,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index course_content_course_idx on public.course_content (course_id, sort_order);

create trigger course_content_updated_at
  before update on public.course_content
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- ANNOUNCEMENTS — course_id NULL means "all registered students"
-- -----------------------------------------------------------------------------
create table public.announcements (
  id                uuid primary key default gen_random_uuid(),
  course_id         uuid references public.courses (id) on delete cascade,
  title             text not null,
  body              text not null default '',
  is_pinned         boolean not null default false,
  show_on_homepage  boolean not null default false,
  created_by        uuid references public.profiles (id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index announcements_created_at_idx on public.announcements (created_at desc);

create trigger announcements_updated_at
  before update on public.announcements
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- CONTACT MESSAGES — from the "Let's Connect" form on the homepage
-- -----------------------------------------------------------------------------
create table public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null default '',
  last_name   text not null default '',
  email       text not null,
  subject     text not null default '',
  message     text not null default '',
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles         enable row level security;
alter table public.courses          enable row level security;
alter table public.payments         enable row level security;
alter table public.enrollments      enable row level security;
alter table public.course_content   enable row level security;
alter table public.announcements    enable row level security;
alter table public.contact_messages enable row level security;

-- PROFILES
create policy "profiles: read own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

create policy "profiles: update own or admin" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or public.is_admin())
  with check (id = (select auth.uid()) or public.is_admin());

-- COURSES
create policy "courses: public reads published" on public.courses
  for select to anon, authenticated
  using (is_published or public.is_admin());

create policy "courses: admin insert" on public.courses
  for insert to authenticated with check (public.is_admin());
create policy "courses: admin update" on public.courses
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "courses: admin delete" on public.courses
  for delete to authenticated using (public.is_admin());

-- PAYMENTS (written only by the server with the secret key)
create policy "payments: read own or admin" on public.payments
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

-- ENROLLMENTS
create policy "enrollments: read own or admin" on public.enrollments
  for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

create policy "enrollments: admin insert" on public.enrollments
  for insert to authenticated with check (public.is_admin());
create policy "enrollments: admin update" on public.enrollments
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "enrollments: admin delete" on public.enrollments
  for delete to authenticated using (public.is_admin());

-- COURSE CONTENT
create policy "content: enrolled students or admin" on public.course_content
  for select to authenticated
  using (public.is_admin() or (is_published and public.is_enrolled(course_id)));

create policy "content: admin insert" on public.course_content
  for insert to authenticated with check (public.is_admin());
create policy "content: admin update" on public.course_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "content: admin delete" on public.course_content
  for delete to authenticated using (public.is_admin());

-- ANNOUNCEMENTS
create policy "announcements: homepage is public" on public.announcements
  for select to anon
  using (show_on_homepage);

create policy "announcements: students see relevant" on public.announcements
  for select to authenticated
  using (
    show_on_homepage
    or public.is_admin()
    or course_id is null
    or public.is_enrolled(course_id)
  );

create policy "announcements: admin insert" on public.announcements
  for insert to authenticated with check (public.is_admin());
create policy "announcements: admin update" on public.announcements
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "announcements: admin delete" on public.announcements
  for delete to authenticated using (public.is_admin());

-- CONTACT MESSAGES
create policy "messages: anyone can send" on public.contact_messages
  for insert to anon, authenticated
  with check (
    char_length(email) between 3 and 320
    and char_length(message) <= 5000
    and char_length(subject) <= 300
    and is_read = false
  );

create policy "messages: admin read" on public.contact_messages
  for select to authenticated using (public.is_admin());
create policy "messages: admin update" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "messages: admin delete" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- Table privileges (RLS above still decides which rows are visible)
grant select on public.courses, public.announcements to anon;
grant insert on public.contact_messages to anon;
grant select, insert, update, delete on
  public.profiles, public.courses, public.payments, public.enrollments,
  public.course_content, public.announcements, public.contact_messages
  to authenticated;

-- =============================================================================
-- STORAGE — private bucket for course files (PDFs, datasets, do-files…)
-- Files are stored as  <course_id>/<file name>
-- =============================================================================
insert into storage.buckets (id, name, public, file_size_limit)
values ('course-files', 'course-files', false, 52428800)
on conflict (id) do nothing;

create or replace function public.can_read_course_file(object_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.enrollments
    where course_id::text = split_part(object_name, '/', 1)
      and user_id = (select auth.uid())
      and status = 'active'
  );
$$;

create policy "course-files: admin full access" on storage.objects
  for all to authenticated
  using (bucket_id = 'course-files' and public.is_admin())
  with check (bucket_id = 'course-files' and public.is_admin());

create policy "course-files: enrolled students read" on storage.objects
  for select to authenticated
  using (bucket_id = 'course-files' and public.can_read_course_file(name));
