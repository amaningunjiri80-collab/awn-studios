# AWN Archive — Setup Guide

## 1. Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a project
2. In the Supabase dashboard, open **SQL Editor**
3. Copy the entire contents of `src/lib/supabase-schema.sql` and paste it into the SQL editor
4. Click **Run** — this creates all 7 tables, RLS policies, and seed data

## 2. Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
# Supabase (from Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (for email)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site
CONTACT_EMAIL=hello@awnarchive.com
```

Get the values from: Supabase dashboard → **Project Settings** → **API**

## 3. Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Create a new bucket called `awn-archive`
3. Set it to **public**
4. Go to **Policies** and add a policy allowing public read access (or use the SQL from step 1 which handles RLS)

## 4. Email (Resend)

1. Go to [resend.com](https://resend.com) and create an account
2. Add and verify a domain
3. Create an API key
4. Add `RESEND_API_KEY` to `.env.local`
5. Set `CONTACT_EMAIL` to your verified sender email

## 5. Instagram (Optional)

The site works without this — it falls back to placeholder images.

If you want a real Instagram feed:
1. Create a Facebook app with Instagram Basic Display
2. Get an access token
3. Add to `.env.local`:
   ```env
   INSTAGRAM_ACCESS_TOKEN=your-token
   INSTAGRAM_USER_ID=awn_studios
   ```

## 6. Start

```bash
npm run dev
```

Admin panel: http://localhost:3000/admin
Password: `AWNARCHIVE2026`
