"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";

const faqs = [
  {
    question: "What should I wear?",
    answer: "Wear comfortable, loose-fitting clothing. For massage sessions, you will be asked to undress to your level of comfort and will be properly draped with sheets throughout. For shamanic healing sessions, you remain fully clothed.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "I am always happy to reschedule with enough notice, life is nuts sometimes and I fully understand, but getting my business head on, I do need to still charge if it's less than 24 hours notice.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, there is free on-street parking available on nearby residential streets. The closest car park is a 2-minute walk away. We are also well served by public transport, with Boscombe bus stops just a short walk from the studio.",
  },
  {
    question: "Do you offer home visits?",
    answer: "Yes, home visits are available within a 10-mile radius of Boscombe, Bournemouth. An additional travel fee applies depending on distance. Please contact us to discuss your requirements and arrange a home visit booking.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await submitContactForm(formData);
    if (result.success) {
      setSubmitted(true);
      setMessage(result.message);
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">Connect</p>
        <h1 className="font-headline text-3xl md:text-3xl text-on-surface mb-4">Get in Touch</h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          Whether you have a question about our services, want to discuss your healing needs, or are ready to book — we would love to hear from you.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-surface-container rounded-2xl p-10 text-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <h2 className="font-headline text-2xl text-on-surface mb-3">Message Sent</h2>
                <p className="text-on-surface-variant">{message}</p>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Subject</label>
                  <select
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Question">Booking Question</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-on-primary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phone */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-0.5">call</span>
                <div>
                  <p className="font-label font-medium text-on-surface mb-1">Phone</p>
                  <a href="tel:+447425018335" className="text-secondary hover:underline">07425 018 335</a>
                  <p className="text-xs text-on-surface-variant mt-1">Call or text</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-0.5">mail</span>
                <div>
                  <p className="font-label font-medium text-on-surface mb-1">Email</p>
                  <a href="mailto:zonedoutbeauty@gmail.com" className="text-secondary hover:underline">zonedoutbeauty@gmail.com</a>
                  <p className="text-xs text-on-surface-variant mt-1">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-0.5">location_on</span>
                <div>
                  <p className="font-label font-medium text-on-surface mb-1">Location</p>
                  <p className="text-on-surface-variant text-sm">Boscombe BH1 4ES</p>
                  <p className="text-on-surface-variant text-xs mt-1">Full address shared in your booking confirmation</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2xl mt-0.5">schedule</span>
                <div className="w-full">
                  <p className="font-label font-medium text-on-surface mb-3">Business Hours</p>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Monday</td>
                        <td className="py-1.5 text-on-surface text-right">2:00 PM — 8:00 PM</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Tuesday</td>
                        <td className="py-1.5 text-on-surface text-right">4:00 PM — 8:00 PM</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Wednesday</td>
                        <td className="py-1.5 text-on-surface text-right">11:00 AM — 8:30 PM</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Thursday</td>
                        <td className="py-1.5 text-on-surface text-right">10:30 AM — 9:30 PM</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Friday</td>
                        <td className="py-1.5 text-on-surface text-right">3:00 PM — 8:30 PM</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10">
                        <td className="py-1.5 text-on-surface-variant">Saturday</td>
                        <td className="py-1.5 text-on-surface text-right">10:00 AM — 5:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-on-surface-variant">Sunday</td>
                        <td className="py-1.5 text-on-surface text-right">Closed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-20">
          <div className="rounded-2xl overflow-hidden bg-surface-container-high h-64 md:h-80 flex items-center justify-center relative">
            <div className="text-center">
              <span className="material-symbols-outlined text-outline text-5xl mb-3 block">map</span>
              <p className="font-headline text-xl text-on-surface">Boscombe BH1 4ES</p>
              <p className="text-sm text-on-surface-variant mt-1">Full address shared once your booking is confirmed</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="font-headline text-2xl text-on-surface mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-label font-medium text-on-surface list-none">
                  {faq.question}
                  <span className="material-symbols-outlined text-outline transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-on-surface-variant leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
