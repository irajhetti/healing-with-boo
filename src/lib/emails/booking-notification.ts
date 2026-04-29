import { esc } from "./escape";
import { emailShell, detailsPanel } from "./shell";

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

  const rows: Array<[string, string]> = [
    ["Reference", `<span style="font-family:Menlo,Consolas,monospace;font-size:13px;letter-spacing:1px;">${d.reference}</span>`],
    ["Client", `<strong>${d.guestName}</strong>`],
    ["Email", d.guestEmail ? `<a href="mailto:${d.guestEmail}" style="color:#2d3b2d;text-decoration:none;">${d.guestEmail}</a>` : "&mdash;"],
    ["Phone", d.guestPhone ? `<a href="tel:${d.guestPhone}" style="color:#2d3b2d;text-decoration:none;">${d.guestPhone}</a>` : "&mdash;"],
    ["Treatment", d.serviceName],
    ["Date", d.date],
    ["Time", d.time],
    ["Duration", d.duration],
    ["Paid", `<strong>${d.price}</strong>`],
  ];
  if (d.notes) rows.push(["Notes", `<em>${d.notes}</em>`]);

  const body = `
    <h1 style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:normal;color:#2d3b2d;line-height:1.3;">
      You have a new booking
    </h1>
    <p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#3a3a3a;line-height:1.6;">
      <strong>${d.guestName}</strong> just booked <strong>${d.serviceName}</strong> for ${d.date} at ${d.time}.
    </p>

    ${detailsPanel(rows)}

    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#8a7d6a;line-height:1.6;">
      View this booking in the
      <a href="https://healingwithboo.co.uk/iws-admin/bookings" style="color:#2d3b2d;text-decoration:underline;">admin panel</a>.
    </p>`.trim();

  return {
    subject: `New booking — ${esc(data.guestName)} (${esc(data.serviceName)})`,
    html: emailShell({
      preheader: "New booking",
      inboxPreview: `${data.guestName} booked ${data.serviceName} for ${data.date} at ${data.time}.`,
      body,
    }),
  };
}
