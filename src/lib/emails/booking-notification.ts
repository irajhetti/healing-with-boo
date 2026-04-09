import { esc } from "./escape";

export function buildNotificationEmail(data: {
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  notes: string | null;
}): { subject: string; html: string } {
  const d = {
    reference: esc(data.reference),
    guestName: esc(data.guestName),
    guestEmail: esc(data.guestEmail),
    guestPhone: esc(data.guestPhone),
    serviceName: esc(data.serviceName),
    date: esc(data.date),
    time: esc(data.time),
    duration: esc(data.duration),
    price: esc(data.price),
    notes: data.notes ? esc(data.notes) : null,
  };

  return {
    subject: `New booking — ${esc(data.guestName)} (${esc(data.serviceName)})`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#2d3b2d;padding:20px 32px;">
      <h1 style="margin:0;color:#e8dfd4;font-size:18px;font-weight:normal;">New Booking</h1>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;width:100px;">Reference</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;font-weight:bold;">${d.reference}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Client</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.guestName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Email</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">
            <a href="mailto:${d.guestEmail}" style="color:#2d3b2d;">${d.guestEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Phone</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">
            <a href="tel:${d.guestPhone}" style="color:#2d3b2d;">${d.guestPhone}</a>
          </td>
        </tr>
        <tr><td colspan="2" style="padding:8px 0;border-bottom:1px solid #eee;"></td></tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Treatment</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.serviceName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Date</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Time</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.time}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Duration</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.duration}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Paid</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;font-weight:bold;">${d.price}</td>
        </tr>
        ${d.notes ? `
        <tr><td colspan="2" style="padding:8px 0;border-bottom:1px solid #eee;"></td></tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Notes</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.notes}</td>
        </tr>
        ` : ""}
      </table>
    </div>
  </div>
</body>
</html>`,
  };
}
