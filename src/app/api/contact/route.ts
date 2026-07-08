import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@awnarchive.com";
const FROM_EMAIL = "onboarding@resend.dev";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, business, email, phone, project_type, budget, message } = body;

  const supabaseAdmin = getSupabaseAdmin();
  const { data: dbEntry, error: dbError } = await supabaseAdmin
    .from("contacts")
    .insert([{ name, business, email, phone, project_type, budget, message, email_status: "pending" }])
    .select()
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  let emailSent = false;
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `AWN Archive <${FROM_EMAIL}>`,
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject: `New Contact: ${name}${business ? ` — ${business}` : ""}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Business:</strong> ${business || "N/A"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Project Type:</strong> ${project_type || "N/A"}</p>
            <p><strong>Budget:</strong> ${budget || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p>${message || "N/A"}</p>
          `,
        }),
      });

      if (res.ok) emailSent = true;
      const result = await res.json();

      await supabaseAdmin
        .from("contacts")
        .update({ email_status: emailSent ? "sent" : "failed" })
        .eq("id", dbEntry.id);
    } catch {
      await supabaseAdmin
        .from("contacts")
        .update({ email_status: "failed" })
        .eq("id", dbEntry.id);
    }
  }

  return NextResponse.json({
    success: true,
    id: dbEntry.id,
    email_sent: emailSent,
  });
}
