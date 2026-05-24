import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Basic email regex — validates structure without being overly strict
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 200 || message.length > 3000) {
      return NextResponse.json({ error: "Input exceeds maximum length." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error("Email credentials not configured in environment variables.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from:    `"Portfolio Contact" <${gmailUser}>`,
      to:      gmailUser,
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f0c1a;color:#e2e8f0;border-radius:12px;border:1px solid rgba(249,115,22,0.3)">
          <h2 style="color:#f97316;font-size:1.3rem;margin-bottom:8px">📬 New Portfolio Message</h2>
          <hr style="border-color:rgba(249,115,22,0.2);margin-bottom:20px"/>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#94a3b8;width:80px;vertical-align:top">Name</td>
              <td style="padding:8px 0;font-weight:600;color:#fcd34d">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Email</td>
              <td style="padding:8px 0">
                <a href="mailto:${escapeHtml(email)}" style="color:#60a5fa">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Message</td>
              <td style="padding:8px 0;white-space:pre-wrap;color:#e2e8f0">${escapeHtml(message)}</td>
            </tr>
          </table>
          <hr style="border-color:rgba(249,115,22,0.2);margin-top:20px"/>
          <p style="font-size:0.75rem;color:#64748b;margin-top:12px">
            Sent from your portfolio — sanyamsachan.dev · Hit reply to respond directly.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
