import { esc } from "./escape";

export function buildConfirmationEmail(data: {
  reference: string;
  guestName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
}): { subject: string; html: string } {
  const d = {
    reference: esc(data.reference),
    guestName: esc(data.guestName),
    serviceName: esc(data.serviceName),
    date: esc(data.date),
    time: esc(data.time),
    duration: esc(data.duration),
    price: esc(data.price),
  };

  return {
    subject: `Booking confirmed — ${data.serviceName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#2d3b2d;padding:28px 32px;">
      <h1 style="margin:0;color:#e8dfd4;font-size:22px;font-weight:normal;">Healing with Boo</h1>
    </div>
    <div style="padding:32px;">
      <p style="color:#3a3a3a;font-size:16px;line-height:1.6;margin:0 0 20px;">
        Hey ${d.guestName},
      </p>
      <p style="color:#3a3a3a;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Your session is booked and confirmed. Looking forward to seeing you.
      </p>

      <div style="background:#f5f0eb;border-radius:8px;padding:20px 24px;margin:0 0 24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Reference</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;font-weight:bold;text-align:right;">${d.reference}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Treatment</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;text-align:right;">${d.serviceName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Date</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;text-align:right;">${d.date}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Time</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;text-align:right;">${d.time}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Duration</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;text-align:right;">${d.duration}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:13px;">Paid</td>
            <td style="padding:6px 0;color:#3a3a3a;font-size:14px;font-weight:bold;text-align:right;">${d.price}</td>
          </tr>
        </table>
      </div>

      <div style="border-left:3px solid #2d3b2d;padding-left:16px;margin:0 0 24px;">
        <p style="color:#3a3a3a;font-size:14px;line-height:1.6;margin:0 0 4px;">
          <strong>Location</strong>
        </p>
        <p style="color:#666;font-size:14px;line-height:1.6;margin:0;">
          22 Churchill Road, Boscombe BH1 4ES
        </p>
      </div>

      <p style="color:#666;font-size:13px;line-height:1.6;margin:0 0 8px;">
        Please arrive about 10 minutes before your session.
      </p>
      <p style="color:#666;font-size:13px;line-height:1.6;margin:0 0 24px;">
        Need to reschedule? That's fine — just give at least 24 hours notice. Message Leah on
        <a href="https://wa.me/447425018335" style="color:#2d3b2d;">WhatsApp</a>
        or call <a href="tel:+447425018335" style="color:#2d3b2d;">07425 018335</a>.
      </p>

      <p style="color:#3a3a3a;font-size:14px;line-height:1.6;margin:0;">
        See you soon,<br>Leah x
      </p>
    </div>
  </div>
</body>
</html>`,
  };
}
