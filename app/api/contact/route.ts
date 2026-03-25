import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      // With onboarding@resend.dev, Resend only allows sending TO your
      // own account email. Use CONTACT_TO_EMAIL env var to configure it,
      // fallback to the form submitter's email so you at least see replies.
      const toEmail = process.env.CONTACT_TO_EMAIL || email;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <no-reply@nusarithm.id>",
          to: [toEmail],
          reply_to: email,
          subject: `[Portfolio] Message from ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
              <h2 style="color:#FF6B35;margin-bottom:4px">New Contact Form Message</h2>
              <hr style="border:1px solid #eee;margin-bottom:16px"/>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="background:#f5f5f5;padding:12px;border-radius:6px;white-space:pre-wrap">${message}</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Resend error:", res.status, body);
        // Still return success so the user isn't blocked — message is logged below
      }
    }

    // Always log to server console as a reliable fallback
    console.log("📬 Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
