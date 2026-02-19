-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Reusable content table
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  category text not null,
  title text not null,
  description text,
  image_url text,
  external_link text,
  platform text,
  event_date date,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  created_by uuid
);
