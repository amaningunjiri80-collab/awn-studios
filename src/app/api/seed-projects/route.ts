import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import projectsData from "@/data/projects.json";

export async function POST() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    let count = 0;

    for (const project of projectsData) {
      const { data: existing } = await supabaseAdmin
        .from("projects")
        .select("id")
        .eq("slug", project.slug)
        .single();

      if (existing) continue;

      const { error } = await supabaseAdmin
        .from("projects")
        .insert([{ ...project, published: true, hero_image: project.heroImage }]);

      if (error) {
        console.error(`Failed to insert ${project.slug}:`, error.message);
        continue;
      }
      count++;
    }

    return NextResponse.json({ success: true, count });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
