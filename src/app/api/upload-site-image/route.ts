import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const formData = await req.formData();
    const imageType = formData.get("type") as string;
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "webp"];
    if (!ext || !allowed.includes(ext)) {
      return NextResponse.json({ error: `Invalid file type .${ext}` }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `site-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
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
    if (!publicUrl) throw new Error("Failed to get public URL");

    const { data: existing } = await supabaseAdmin
      .from("site_settings")
      .select("id, hero_images")
      .single();

    if (imageType === "profile") {
      if (existing) {
        await supabaseAdmin
          .from("site_settings")
          .update({ profile_photo: publicUrl })
          .eq("id", existing.id);
      } else {
        await supabaseAdmin
          .from("site_settings")
          .insert([{ profile_photo: publicUrl, hero_images: [] }]);
      }
    } else if (imageType === "hero") {
      const currentHeroImages: string[] = existing?.hero_images || [];
      currentHeroImages.push(publicUrl);
      if (existing) {
        await supabaseAdmin
          .from("site_settings")
          .update({ hero_images: currentHeroImages })
          .eq("id", existing.id);
      } else {
        await supabaseAdmin
          .from("site_settings")
          .insert([{ hero_images: currentHeroImages }]);
      }
    } else {
      return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
