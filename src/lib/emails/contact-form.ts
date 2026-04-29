import { esc } from "./escape";
import { emailShell, detailsPanel } from "./shell";

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

  const body = `
    <h1 style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:normal;color:#2d3b2d;line-height:1.3;">
      New message from the website
    </h1>
    <p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.6;">
      <strong>${d.name}</strong> sent you a message via the contact form.
    </p>

    ${detailsPanel([
      ["From", `<strong>${d.name}</strong>`],
      ["Email", `<a href="mailto:${d.email}" style="color:#2d3b2d;text-decoration:none;">${d.email}</a>`],
      ["Subject", d.subject],
    ])}

    <p style="margin:0 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      Message
    </p>
    <div style="background-color:#fbf8f2;border-left:3px solid #2d3b2d;border-radius:0 8px 8px 0;padding:18px 20px;margin:0 0 20px 0;">
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#2a2a2a;line-height:1.7;white-space:pre-wrap;">${d.message}</p>
    </div>

    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#8a7d6a;line-height:1.6;">
      Hit reply to respond directly to ${d.name}.
    </p>`.trim();

  return {
    subject: `Contact form — ${data.subject}`,
    html: emailShell({
      preheader: "Contact form",
      inboxPreview: `${data.name}: ${data.subject}`,
      body,
    }),
  };
}
