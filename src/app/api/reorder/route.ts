import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function PUT(req: Request) {
  const { items } = await req.json();

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "items must be an array" }, { status: 400 });
  }

  const errors: string[] = [];

  for (const item of items) {
    const { error } = await getSupabaseAdmin()
      .from("portfolio")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);

    if (error) errors.push(error.message);
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(", ") }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
