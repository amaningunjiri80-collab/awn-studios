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

      if (existing) {
        const updates: Record<string, unknown> = {};
        if (project.project_date) updates.project_date = project.project_date;
        const { error: updateError } = await supabaseAdmin
          .from("projects")
          .update(updates)
          .eq("id", existing.id);

        if (updateError) {
          console.error(`Failed to update ${project.slug}:`, updateError.message);
          continue;
        }
        count++;
        continue;
      }

      const { heroImage: _heroImage, ...cleanProject } = project;
      const { error } = await supabaseAdmin
        .from("projects")
        .insert([{ ...cleanProject, published: true, hero_image: _heroImage }]);

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
