import { esc } from "./escape";

export function buildAdminBookingEmail(data: {
  reference: string;
  guestName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  setupLink: string | null;
}): { subject: string; html: string } {
  const d = {
    reference: esc(data.reference),
    guestName: esc(data.guestName),
    serviceName: esc(data.serviceName),
    date: esc(data.date),
    time: esc(data.time),
    duration: esc(data.duration),
    price: esc(data.price),
    setupLink: data.setupLink ? esc(data.setupLink) : null,
  };

  const setupBlock = d.setupLink
    ? `
      <div style="margin:28px 0;padding:18px 20px;background:#f5f0eb;border-radius:8px;">
        <p style="margin:0 0 12px 0;font-size:14px;color:#333;">Want to manage your bookings online? Set up a password using the link below.</p>
        <p style="margin:0;">
          <a href="${d.setupLink}" style="display:inline-block;background:#2d3b2d;color:#f5f0eb;padding:10px 20px;border-radius:20px;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:14px;">Set up your account</a>
        </p>
        <p style="margin:10px 0 0 0;font-size:12px;color:#666;">This link is valid for 7 days.</p>
      </div>`
    : "";

  return {
    subject: `Booking confirmed — ${data.serviceName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#2d3b2d;padding:28px 32px;">
      <h1 style="color:#f5f0eb;margin:0;font-size:24px;font-weight:normal;">Your booking is confirmed</h1>
    </div>
    <div style="padding:32px;color:#333;line-height:1.6;">
      <p>Hi ${d.guestName},</p>
      <p>Leah has booked you in. Here are the details:</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:8px 0;color:#666;width:120px;">Reference</td><td style="padding:8px 0;font-family:monospace;">${d.reference}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Session</td><td style="padding:8px 0;">${d.serviceName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${d.date}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Time</td><td style="padding:8px 0;">${d.time}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Duration</td><td style="padding:8px 0;">${d.duration}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Price</td><td style="padding:8px 0;">${d.price}</td></tr>
      </table>
      <p style="font-size:14px;color:#666;">Boo's Healing Bubble &mdash; 22 Churchill Road, Boscombe.</p>
      ${setupBlock}
      <p style="font-size:13px;color:#666;">Need to change anything? Reply to this email or message Leah directly.</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };
}
