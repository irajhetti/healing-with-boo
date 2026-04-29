/**
 * Shared email shell. Wraps content in a consistent branded layout that
 * works across Gmail / Apple Mail / Outlook / mobile clients.
 *
 * Inline styles only. Table-based layout. Web-safe fonts.
 */

type ShellOptions = {
  /** Small uppercase label above the wordmark. e.g. "BOOKING CONFIRMED" */
  preheader: string;
  /** Plain-text preview shown in inbox before opening (Gmail snippet). */
  inboxPreview: string;
  /** The body markup (already escaped where needed). */
  body: string;
};

export function emailShell({ preheader, inboxPreview, body }: ShellOptions): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Healing with Boo</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,'Times New Roman',serif;color:#2a2a2a;-webkit-text-size-adjust:100%;">
  <!-- Inbox preview snippet (hidden) -->
  <div style="display:none;font-size:1px;color:#f5f0eb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${inboxPreview}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f0eb;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td align="center" style="padding:0 0 24px 0;">
              <p style="margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:3px;color:#8a7d6a;text-transform:uppercase;">
                ${preheader}
              </p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#2d3b2d;letter-spacing:0.5px;">
                Healing with Boo
              </p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border-radius:14px;border:1px solid #e8dfd0;padding:36px 32px;box-shadow:0 1px 2px rgba(45,59,45,0.04);">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 24px 8px 24px;text-align:center;">
              <p style="margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#8a7d6a;text-transform:uppercase;">
                Boo&rsquo;s Healing Bubble
              </p>
              <p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#5a5a5a;line-height:1.6;">
                22 Churchill Road, Boscombe BH1 4ES
              </p>
              <p style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#5a5a5a;line-height:1.6;">
                <a href="tel:+447425018335" style="color:#5a5a5a;text-decoration:none;">07425 018335</a>
                &nbsp;&middot;&nbsp;
                <a href="https://healingwithboo.co.uk" style="color:#5a5a5a;text-decoration:none;">healingwithboo.co.uk</a>
              </p>
              <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#a39885;line-height:1.6;">
                <a href="https://healingwithboo.co.uk/privacy" style="color:#a39885;text-decoration:none;">Privacy</a>
                &nbsp;&middot;&nbsp;
                <a href="https://healingwithboo.co.uk/terms" style="color:#a39885;text-decoration:none;">Terms</a>
                &nbsp;&middot;&nbsp;
                <a href="https://healingwithboo.co.uk/cookies" style="color:#a39885;text-decoration:none;">Cookies</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/**
 * A reusable details panel — key/value rows with subtle dividers.
 * Pass an array of [label, value] pairs.
 */
export function detailsPanel(rows: Array<[string, string]>): string {
  const html = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:12px 0;border-top:${i === 0 ? "0" : "1px solid #efe7d8"};font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a7d6a;width:35%;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:12px 0;border-top:${i === 0 ? "0" : "1px solid #efe7d8"};font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#2a2a2a;line-height:1.5;">
            ${value}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fbf8f2;border-radius:10px;border:1px solid #efe7d8;margin:24px 0;">
      <tr><td style="padding:8px 22px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${html}
        </table>
      </td></tr>
    </table>`.trim();
}

/** A reusable primary CTA button. */
export function ctaButton(href: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0;">
      <tr>
        <td align="center" style="border-radius:999px;background-color:#2d3b2d;">
          <a href="${href}" style="display:inline-block;padding:14px 32px;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;letter-spacing:0.5px;color:#f5f0eb;text-decoration:none;border-radius:999px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`.trim();
}

/** A small, soft divider for subtle section breaks. */
export function softDivider(): string {
  return `
    <p style="margin:24px 0;text-align:center;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#c9b990;letter-spacing:6px;">
      &middot;&nbsp;&middot;&nbsp;&middot;
    </p>`.trim();
}
