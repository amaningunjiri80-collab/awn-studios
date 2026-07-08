-- AWN Archive Database Schema
-- Run this in your Supabase SQL editor

-- Portfolio images table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT DEFAULT '',
  category TEXT NOT NULL,
  location TEXT DEFAULT '',
  year TEXT DEFAULT '',
  description TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT '',
  client TEXT DEFAULT '',
  location TEXT DEFAULT '',
  year TEXT DEFAULT '',
  hero_image TEXT DEFAULT '',
  gallery TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  included TEXT[] DEFAULT '{}',
  turnaround TEXT DEFAULT '',
  cta TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT DEFAULT '',
  quote TEXT NOT NULL,
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table (from SEO pages)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  shoot_type TEXT DEFAULT '',
  date TEXT DEFAULT '',
  location TEXT DEFAULT '',
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  message TEXT DEFAULT '',
  email_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram cache table
CREATE TABLE IF NOT EXISTS instagram_cache (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Service role all portfolio" ON portfolio USING (true) WITH CHECK (true);
CREATE POLICY "Service role all projects" ON projects USING (true) WITH CHECK (true);
CREATE POLICY "Service role all services" ON services USING (true) WITH CHECK (true);
CREATE POLICY "Service role all testimonials" ON testimonials USING (true) WITH CHECK (true);
CREATE POLICY "Service role all bookings" ON bookings USING (true) WITH CHECK (true);
CREATE POLICY "Service role all contacts" ON contacts USING (true) WITH CHECK (true);

-- Insert default services
INSERT INTO services (title, description, included, turnaround, cta) VALUES
('Photography', 'Premium photography across sports, music, fashion, events, and more. Every frame is crafted with intention and editorial quality.', ARRAY['Professional editing', 'High-resolution files', 'Print-ready formats', 'Online gallery', 'Usage rights'], '3-5 business days', 'Book Photography'),
('Videography', 'Cinematic video production for events, brand campaigns, and creative projects.', ARRAY['4K Cinema quality', 'Professional grading', 'Sound design', 'Drone capabilities', 'Multi-camera setup'], '1-2 weeks', 'Book Videography'),
('Content Creation', 'Strategic content production for brands and businesses.', ARRAY['Strategy session', 'Content calendar', 'Photo & video', 'Editing & retouching', 'Platform optimization'], 'Varies by scope', 'Book Content'),
('Branding', 'Visual identity development that communicates your story.', ARRAY['Brand strategy', 'Logo design', 'Visual identity', 'Brand guidelines', 'Asset package'], '2-4 weeks', 'Book Branding'),
('Sports Media', 'Specialized sports photography and videography.', ARRAY['Game day coverage', 'Athlete portraits', 'Action sequences', 'Team branding', 'Media kit delivery'], '48 hours', 'Book Sports Media'),
('Event Coverage', 'Comprehensive event documentation from start to finish.', ARRAY['Full day coverage', 'Second shooter option', 'Edited gallery', 'Same-day previews', 'Photo booth option'], '5-7 business days', 'Book Event Coverage'),
('Creative Direction', 'Art direction and creative strategy for campaigns.', ARRAY['Concept development', 'Mood boards', 'Production planning', 'On-set direction', 'Post-production oversight'], 'Varies by project', 'Book Creative Direction'),
('Website Design', 'Custom website design and development for creatives.', ARRAY['Custom design', 'Responsive development', 'SEO optimization', 'CMS integration', 'Performance optimization'], '3-6 weeks', 'Book Website Design');

-- Insert default testimonials
INSERT INTO testimonials (name, business, quote, image) VALUES
('Marcus Johnson', 'Summit Entertainment', 'AWN Archive brought a level of creativity and professionalism that transformed our event coverage. The images didn''t just document the night — they told a story.', ''),
('Sarah Chen', 'Chen Creative Agency', 'Working with AWN Archive was a game-changer for our brand campaign. The attention to detail exceeded every expectation.', ''),
('David Osei', 'Osei Marketing Group', 'I''ve worked with dozens of photographers, and AWN Archive stands alone. The ability to capture not just an image but an entire feeling — that''s rare.', ''),
('Rebecca Torres', 'Torres Events', 'The sports media package from AWN completely elevated our team''s brand. Professional, fast, and exceptionally talented.', '');
