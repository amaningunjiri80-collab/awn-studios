import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  return key;
}

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      getSupabaseUrl(),
      process.env.SUPABASE_SERVICE_ROLE_KEY || getSupabaseAnonKey()
    );
  }
  return _supabaseAdmin;
}

export type Tables = {
  portfolio: PortfolioItem;
  projects: ProjectItem;
  services: ServiceItem;
  testimonials: TestimonialItem;
  bookings: BookingItem;
  contacts: ContactItem;
};

export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  alt_text: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  hero_image: string;
  gallery: string[];
  description: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  included: string[];
  turnaround: string;
  cta: string;
  created_at: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  business: string;
  quote: string;
  image: string;
  created_at: string;
}

export interface BookingItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  shoot_type: string;
  date: string;
  location: string;
  message: string;
  created_at: string;
}

export interface ContactItem {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  project_type: string;
  budget: string;
  message: string;
  created_at: string;
}
