import { esc } from "./escape";
import { emailShell, detailsPanel, ctaButton } from "./shell";

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
    <p style="margin:24px 0 8px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      Optional &middot; Online access
    </p>
    <p style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
      Want to manage your bookings online? You can set up a quick password and view your visit history any time.
    </p>
    ${ctaButton(d.setupLink, "Set up your account")}
    <p style="margin:0 0 20px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#8a7d6a;line-height:1.5;">
      This link is valid for 7 days. If you&apos;d rather not, just ignore it &mdash; your booking is confirmed either way.
    </p>`
    : "";

  const body = `
    <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;color:#2d3b2d;line-height:1.3;">
      Hello ${d.guestName},
    </h1>
    <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#3a3a3a;line-height:1.7;">
      I&apos;ve booked you in. Here are the details so you have them on hand.
    </p>

    ${detailsPanel([
      ["Reference", `<span style="font-family:Menlo,Consolas,monospace;font-size:13px;letter-spacing:1px;">${d.reference}</span>`],
      ["Treatment", d.serviceName],
      ["Date", d.date],
      ["Time", d.time],
      ["Duration", d.duration],
      ["Price", `<strong>${d.price}</strong>`],
    ])}

    <p style="margin:20px 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      The space
    </p>
    <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
      Boo&apos;s Healing Bubble is at <strong>22 Churchill Road, Boscombe BH1 4ES</strong>. Try to come 10 minutes before your session so we can settle in.
    </p>

    <p style="margin:0 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
      Need to change anything?
    </p>
    <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#3a3a3a;line-height:1.7;">
      Reply to this email or message me on <a href="tel:+447425018335" style="color:#2d3b2d;">07425 018335</a>. I just need 24 hours&apos; notice for changes.
    </p>

    ${setupBlock}

    <p style="margin:20px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#2d3b2d;font-style:italic;">
      See you soon,<br>Leah&nbsp;x
    </p>`.trim();

  return {
    subject: `Booking confirmed — ${data.serviceName}`,
    html: emailShell({
      preheader: "Booking confirmed",
      inboxPreview: `Leah has booked you in for ${data.serviceName} on ${data.date} at ${data.time}.`,
      body,
    }),
  };
}
