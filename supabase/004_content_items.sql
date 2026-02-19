-- Events / Satsang / Initiatives

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,         -- event | satsang
  category text not null,     -- dastak-zindagi | maharaj-ki-rasoi
  title text not null,
  description text,
  image_url text,
  external_link text,
  platform text,
  event_date date,
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);
