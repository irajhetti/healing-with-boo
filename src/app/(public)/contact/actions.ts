"use server";

import { getResendClient, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";
import { buildContactEmail } from "@/lib/emails/contact-form";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const resend = getResendClient();
    const emailContent = buildContactEmail({ name, email, subject, message });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    return {
      success: true,
      message: "Thank you for your message. We'll be in touch soon.",
    };
  } catch (err) {
    console.error("Contact form email failed:", err);
    return {
      success: false,
      message:
        "Something went wrong. Please try again or call us directly.",
    };
  }
}
