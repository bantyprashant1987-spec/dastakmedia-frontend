-- Image gallery for saints

create table if not exists public.saint_gallery (
  id uuid primary key default gen_random_uuid(),
  saint_id uuid references public.saints(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamp with time zone default now()
);
