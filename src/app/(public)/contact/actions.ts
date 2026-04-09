"use server";

import { getResendClient, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";
import { buildContactEmail } from "@/lib/emails/contact-form";
import { contactFormSchema } from "@/lib/validations/contact";

export async function submitContactForm(formData: FormData) {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const { name, email, subject, message } = parsed.data;

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
