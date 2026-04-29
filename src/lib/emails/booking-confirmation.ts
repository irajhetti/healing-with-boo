import { esc } from "./escape";
import { emailShell, detailsPanel } from "./shell";

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

  const body = `
    <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;color:#2d3b2d;line-height:1.3;">
      Hello ${d.guestName},
    </h1>
    <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#3a3a3a;line-height:1.7;">
      Your session is confirmed. I'm looking forward to seeing you.
    </p>

    ${detailsPanel([
      ["Reference", `<span style="font-family:Menlo,Consolas,monospace;font-size:13px;letter-spacing:1px;">${d.reference}</span>`],
      ["Treatment", d.serviceName],
      ["Date", d.date],
      ["Time", d.time],
      ["Duration", d.duration],
      ["Paid", `<strong>${d.price}</strong>`],
    ])}

    <p style="margin:20px 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      Before you arrive
    </p>
    <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
      Try to come 10 minutes before your session so we can settle in. We&apos;re at <strong>22 Churchill Road, Boscombe BH1 4ES</strong>.
    </p>

    <p style="margin:0 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      Need to reschedule?
    </p>
    <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
      That's okay &mdash; just give me at least 24 hours&apos; notice. WhatsApp or call <a href="tel:+447425018335" style="color:#2d3b2d;">07425 018335</a>.
    </p>

    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#2d3b2d;font-style:italic;">
      See you soon,<br>Leah&nbsp;x
    </p>`.trim();

  return {
    subject: `Booking confirmed — ${data.serviceName}`,
    html: emailShell({
      preheader: "Booking confirmed",
      inboxPreview: `Your ${data.serviceName} session on ${data.date} at ${data.time} is confirmed.`,
      body,
    }),
  };
}
