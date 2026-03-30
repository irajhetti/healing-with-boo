"use client";

import { useState } from "react";
import Link from "next/link";

const massageServices = [
  { id: "deep-tissue", name: "Deep Tissue Massage", duration: "60 min", price: 55, category: "Massage Therapy" },
  { id: "therapeutic", name: "Therapeutic Massage", duration: "60 min", price: 50, category: "Massage Therapy" },
  { id: "relaxation", name: "Relaxation Massage", duration: "60 min", price: 45, category: "Massage Therapy" },
  { id: "hot-stone", name: "Hot Stone Massage", duration: "75 min", price: 65, category: "Massage Therapy" },
];

const shamanicServices = [
  { id: "energy-clearing", name: "Energy Clearing", duration: "60 min", price: 55, category: "Shamanic Healing" },
  { id: "soul-retrieval", name: "Soul Retrieval", duration: "90 min", price: 85, category: "Shamanic Healing" },
  { id: "power-animal", name: "Power Animal Retrieval", duration: "60 min", price: 55, category: "Shamanic Healing" },
  { id: "shamanic-journey", name: "Shamanic Journey", duration: "75 min", price: 65, category: "Shamanic Healing" },
  { id: "combined", name: "Combined Healing Session", duration: "120 min", price: 95, category: "Shamanic Healing" },
];

const timeSlots = ["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const availableDays = [3, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26, 28];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof massageServices[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en-GB", { month: "long", year: "numeric" });

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="material-symbols-outlined text-primary text-7xl mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <h1 className="font-headline text-3xl text-on-surface mb-4">Booking Confirmed!</h1>
          <p className="text-on-surface-variant mb-2">Thank you, {formData.name}. Your session has been booked.</p>
          <p className="text-on-surface-variant mb-6">
            Your reference number: <span className="font-bold text-primary">HWB-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
          </p>
          <div className="bg-surface-container rounded-xl p-6 mb-8 text-left">
            <h3 className="font-label font-medium text-on-surface mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm text-on-surface-variant">
              <p><span className="font-medium text-on-surface">Service:</span> {selectedService?.name}</p>
              <p><span className="font-medium text-on-surface">Date:</span> {selectedDate} {monthName}</p>
              <p><span className="font-medium text-on-surface">Time:</span> {selectedTime}</p>
              <p><span className="font-medium text-on-surface">Price:</span> £{selectedService?.price}</p>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant mb-6">A confirmation email has been sent to {formData.email}</p>
          <Link
            href="/"
            className="inline-block bg-primary text-on-primary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">Appointments</p>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">Book a Session</h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          Choose your healing experience and find a time that works for you.
        </p>
      </section>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-12 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step > s
                  ? "bg-primary text-on-primary"
                  : step === s
                  ? "bg-primary text-on-primary"
                  : "bg-transparent border-2 border-outline-variant text-outline"
              }`}
            >
              {step > s ? (
                <span className="material-symbols-outlined text-lg">check</span>
              ) : (
                s
              )}
            </div>
            {s < 3 && (
              <div className={`w-16 md:w-24 h-0.5 ${step > s ? "bg-primary" : "bg-outline-variant"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Step 1 — Select Service */}
        {step === 1 && (
          <div>
            <h2 className="font-headline text-2xl text-on-surface mb-2">Select a Service</h2>
            <p className="text-on-surface-variant mb-8">Choose the healing experience that speaks to you.</p>

            <h3 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Massage Therapy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {massageServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    selectedService?.id === service.id
                      ? "border-primary bg-surface-container-low"
                      : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-label font-medium text-on-surface">{service.name}</p>
                      <p className="text-sm text-on-surface-variant mt-1">{service.duration}</p>
                    </div>
                    <p className="font-headline text-lg text-primary">£{service.price}</p>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Shamanic Healing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {shamanicServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    selectedService?.id === service.id
                      ? "border-primary bg-surface-container-low"
                      : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-label font-medium text-on-surface">{service.name}</p>
                      <p className="text-sm text-on-surface-variant mt-1">{service.duration}</p>
                    </div>
                    <p className="font-headline text-lg text-primary">£{service.price}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => selectedService && setStep(2)}
                disabled={!selectedService}
                className="bg-secondary text-on-secondary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="font-headline text-2xl text-on-surface mb-2">Choose Date & Time</h2>
            <p className="text-on-surface-variant mb-8">Select your preferred appointment slot.</p>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                  else setCurrentMonth(currentMonth - 1);
                }}
                className="p-2 rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 className="font-headline text-xl text-on-surface">{monthName}</h3>
              <button
                onClick={() => {
                  if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                  else setCurrentMonth(currentMonth + 1);
                }}
                className="p-2 rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-8">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-label font-medium text-on-surface-variant py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isAvailable = availableDays.includes(day);
                const isSelected = selectedDate === day;
                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    disabled={!isAvailable}
                    className={`py-2.5 rounded-lg text-sm font-label transition-colors ${
                      isSelected
                        ? "bg-primary text-on-primary"
                        : isAvailable
                        ? "bg-surface-container-low text-on-surface hover:bg-primary/10"
                        : "text-outline-variant cursor-not-allowed"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            <h3 className="font-label font-medium text-on-surface mb-4">Available Times</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-lg text-sm font-label font-medium transition-colors ${
                    selectedTime === time
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:border-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="border border-outline-variant text-on-surface font-label font-medium px-8 py-3 rounded-full hover:bg-surface-container transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => selectedDate && selectedTime && setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="bg-secondary text-on-secondary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Your Details */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="font-headline text-2xl text-on-surface mb-2">Your Details</h2>
              <p className="text-on-surface-variant mb-8">Tell us a bit about yourself so we can prepare for your session.</p>

              <div className="space-y-6">
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                    placeholder="07xxx xxxxxx"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-medium text-on-surface mb-2">Additional Notes</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface resize-none"
                    placeholder="Any health conditions, preferences, or questions..."
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  onClick={() => setStep(2)}
                  className="border border-outline-variant text-on-surface font-label font-medium px-8 py-3 rounded-full hover:bg-surface-container transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!formData.name || !formData.email}
                  className="bg-secondary text-on-secondary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-surface-container rounded-xl p-6">
                <h3 className="font-headline text-lg text-on-surface mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Service</span>
                    <span className="font-medium text-on-surface">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Duration</span>
                    <span className="font-medium text-on-surface">{selectedService?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Date</span>
                    <span className="font-medium text-on-surface">{selectedDate} {monthName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Time</span>
                    <span className="font-medium text-on-surface">{selectedTime}</span>
                  </div>
                  <div className="border-t border-outline-variant/30 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-on-surface">Total</span>
                      <span className="font-headline text-xl text-primary">£{selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
