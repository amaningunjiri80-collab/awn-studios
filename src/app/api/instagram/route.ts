import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || "";
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID || "";

export async function GET() {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
    const placeholders = Array.from({ length: 9 }, (_, i) => ({
      id: `placeholder-${i}`,
      media_url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=600&q=80`,
      permalink: "https://instagram.com/awn_studios",
      caption: "Follow @awn_studios on Instagram",
    }));
    return NextResponse.json({ data: placeholders, source: "placeholder" });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: cached } = await supabaseAdmin
      .from("instagram_cache")
      .select("*")
      .order("fetched_at", { ascending: false })
      .limit(1)
      .single();

    if (cached) {
      const age = Date.now() - new Date(cached.fetched_at).getTime();
      if (age < 30 * 60 * 1000) {
        return NextResponse.json({ data: cached.data, source: "cache" });
      }
    }

    const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,media_url,permalink,caption,media_type&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=9`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error.message);
    }

    await supabaseAdmin.from("instagram_cache").upsert(
      { data: json.data, fetched_at: new Date().toISOString() },
      { onConflict: "id" }
    );

    return NextResponse.json({ data: json.data, source: "live" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Instagram fetch failed";
    console.error("Instagram API error:", message);

    const supabaseAdmin = getSupabaseAdmin();
    const { data: fallback } = await supabaseAdmin
      .from("instagram_cache")
      .select("*")
      .order("fetched_at", { ascending: false })
      .limit(1)
      .single();

    if (fallback) {
      return NextResponse.json({ data: fallback.data, source: "fallback" });
    }

    const placeholders = Array.from({ length: 9 }, (_, i) => ({
      id: `placeholder-${i}`,
      media_url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=600&q=80`,
      permalink: "https://instagram.com/awn_studios",
      caption: "Follow @awn_studios on Instagram",
    }));
    return NextResponse.json({ data: placeholders, source: "placeholder" });
  }
}
