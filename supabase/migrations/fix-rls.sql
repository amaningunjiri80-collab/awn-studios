-- Run this in Supabase Dashboard > SQL Editor
-- Creates the instagram_cache table if missing and disables RLS

CREATE TABLE IF NOT EXISTS public.instagram_cache (
  id serial PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '[]'::jsonb,
  fetched_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.instagram_cache DISABLE ROW LEVEL SECURITY;
