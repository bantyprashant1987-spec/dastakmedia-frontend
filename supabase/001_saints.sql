-- Core saints table (Maharaj Ji, future saints)

create table if not exists public.saints (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  description text,
  philosophy text,
  hero_image text,
  created_at timestamp with time zone default now()
);
