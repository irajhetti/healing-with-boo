import { esc } from "./escape";

export function buildContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { subject: string; html: string } {
  const d = {
    name: esc(data.name),
    email: esc(data.email),
    subject: esc(data.subject),
    message: esc(data.message),
  };

  return {
    subject: `Contact form — ${data.subject}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#2d3b2d;padding:20px 32px;">
      <h1 style="margin:0;color:#e8dfd4;font-size:18px;font-weight:normal;">New Message</h1>
    </div>
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;width:80px;">From</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Email</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">
            <a href="mailto:${d.email}" style="color:#2d3b2d;">${d.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;font-size:13px;">Subject</td>
          <td style="padding:8px 0;color:#3a3a3a;font-size:14px;">${d.subject}</td>
        </tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f0eb;border-radius:8px;">
        <p style="color:#3a3a3a;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${d.message}</p>
      </div>
      <p style="color:#888;font-size:12px;margin:16px 0 0;">Hit reply to respond directly to ${d.name}.</p>
    </div>
  </div>
</body>
</html>`,
  };
}
