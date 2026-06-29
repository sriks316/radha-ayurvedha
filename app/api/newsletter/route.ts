import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter API — subscribe (POST) / unsubscribe (DELETE).
 *
 * Plug in your own email service (Mailchimp, Resend, ConvertKit, etc.) below.
 * For now, this is a stub that logs the action and returns 200.
 */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ─── TODO: integrate your email service here ──────────────────────────────
    // Example with Resend:
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID! });
    //
    // Example with Mailchimp:
    //   await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
    //     email_address: email, status: "subscribed"
    //   });
    // ─────────────────────────────────────────────────────────────────────────

    console.log(`[newsletter] Subscribed: ${email}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ─── TODO: call your email service unsubscribe endpoint here ─────────────
    console.log(`[newsletter] Unsubscribed: ${email}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
