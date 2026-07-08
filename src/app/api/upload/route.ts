import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "uncategorized";
    const title = (formData.get("title") as string) || "";
    const alt_text = (formData.get("alt_text") as string) || "";
    const location = (formData.get("location") as string) || "";
    const year = (formData.get("year") as string) || "";
    const description = (formData.get("description") as string) || "";
    const featured = formData.get("featured") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "webp"];
    if (!ext || !allowed.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file type .${ext}. Allowed: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 100MB.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `${category}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("awn-archive")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabaseAdmin.storage
      .from("awn-archive")
      .getPublicUrl(filePath);

    const publicUrl = urlData?.publicUrl || "";

    const { data: dbEntry, error: dbError } = await supabaseAdmin
      .from("portfolio")
      .insert([
        {
          url: publicUrl,
          title,
          category,
          alt_text,
          location,
          year,
          description,
          featured,
          sort_order: 0,
        },
      ])
      .select()
      .single();

    if (dbError) console.error("DB insert error:", dbError);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      id: dbEntry?.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
