"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // TODO: Send email or save to database
  console.log("Contact form submission:", { name, email, subject, message });

  return { success: true, message: "Thank you for your message. We'll be in touch soon." };
}
