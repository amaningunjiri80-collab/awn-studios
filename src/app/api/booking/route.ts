import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@awnarchive.com";
const FROM_EMAIL = "onboarding@resend.dev";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, shoot_type, date, location, message } = body;

  const supabaseAdmin = getSupabaseAdmin();
  const { data: dbEntry, error: dbError } = await supabaseAdmin
    .from("bookings")
    .insert([{ name, email, phone, shoot_type, date, location, message }])
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
          subject: `New Booking: ${name} — ${shoot_type || "Inquiry"}`,
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Shoot Type:</strong> ${shoot_type || "N/A"}</p>
            <p><strong>Date:</strong> ${date || "N/A"}</p>
            <p><strong>Location:</strong> ${location || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p>${message || "N/A"}</p>
          `,
        }),
      });

      if (res.ok) emailSent = true;
      const result = await res.json();
      console.log("Email send result:", result);
    } catch (err) {
      console.error("Email send failed:", err);
    }
  }

  return NextResponse.json({
    success: true,
    id: dbEntry.id,
    email_sent: emailSent,
  });
}
