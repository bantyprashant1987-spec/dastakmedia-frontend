-- Bhakts / followers of saints

create table if not exists public.bhakts (
  id uuid primary key default gen_random_uuid(),
  saint_id uuid references public.saints(id) on delete cascade,
  name text not null,
  role text,
  bio text,
  image text,
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);
