"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ServiceCategory } from "@prisma/client";
import type { ServiceWithCategory } from "@/app/(public)/booking/actions";
import {
  createCheckoutSession,
  createCashBooking,
  getMemberDiscountCodes,
  checkConsultationStatus,
} from "@/app/(public)/booking/actions";
import type { DiscountValidationResult, MemberDiscountCode } from "@/app/(public)/booking/actions";
import { getAvailableSlots, getAvailableDates } from "@/lib/availability";
import { BookingSteps } from "./BookingSteps";
import { ServicePicker } from "./ServicePicker";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { ContactForm } from "./ContactForm";
import { DiscountCodeInput } from "./DiscountCodeInput";
import { BookingSummary } from "./BookingSummary";

type Props = {
  services: Record<ServiceCategory, ServiceWithCategory[]>;
};

export function BookingWizard({ services }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] =
    useState<ServiceWithCategory | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [datesLoading, setDatesLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountResult, setDiscountResult] =
    useState<DiscountValidationResult | null>(null);
  const [memberCodes, setMemberCodes] = useState<MemberDiscountCode[]>([]);
  const [memberCodesLoaded, setMemberCodesLoaded] = useState(false);
  const [showConsultationPrompt, setShowConsultationPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleServiceSelect(service: ServiceWithCategory) {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableSlots([]);
  }

  async function handleGoToDate() {
    if (!selectedService) return;
    setDatesLoading(true);
    setStep(2);
    const dates = await getAvailableDates(selectedService.id);
    setAvailableDates(dates);
    setDatesLoading(false);
  }

  async function handleDateSelect(date: string) {
    if (!selectedService) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setSlotsLoading(true);
    setStep(3);
    const slots = await getAvailableSlots(selectedService.id, date);
    setAvailableSlots(slots);
    setSlotsLoading(false);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep(4);

    // Load member discount codes + consultation status once when entering step 4
    if (!memberCodesLoaded) {
      setMemberCodesLoaded(true);
      getMemberDiscountCodes().then(setMemberCodes);
      checkConsultationStatus().then((status) => {
        if (status.signedIn && !status.consultationComplete) {
          setShowConsultationPrompt(true);
        }
      });
    }
  }

  function handleContactChange(field: string, value: string) {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  }

  function handleBack() {
    setError(null);
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setError(null);
    startTransition(async () => {
      const formData = {
        serviceId: selectedService.id,
        date: selectedDate,
        time: selectedTime,
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        notes: contactInfo.notes || undefined,
        discountCode: discountCode || undefined,
      };

      if (paymentMethod === "card") {
        const result = await createCheckoutSession(formData);
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        const result = await createCashBooking(formData);
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.reference) {
          router.push(`/booking/confirmation?ref=${result.reference}`);
        }
      }
    });
  }

  const canProceed =
    (step === 1 && selectedService) ||
    (step === 2 && selectedDate) ||
    (step === 3 && selectedTime) ||
    (step === 4 &&
      contactInfo.name.length >= 2 &&
      contactInfo.email.includes("@") &&
      contactInfo.phone.length >= 10);

  return (
    <div>
      <BookingSteps current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <ServicePicker
              services={services}
              selected={selectedService}
              onSelect={handleServiceSelect}
            />
          )}

          {step === 2 && (
            datesLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <DatePicker
                availableDates={availableDates}
                selected={selectedDate}
                onSelect={handleDateSelect}
              />
            )
          )}

          {step === 3 && (
            <TimePicker
              slots={availableSlots}
              selected={selectedTime}
              onSelect={handleTimeSelect}
              loading={slotsLoading}
            />
          )}

          {step === 4 && selectedService && (
            <>
              <ContactForm
                name={contactInfo.name}
                email={contactInfo.email}
                phone={contactInfo.phone}
                notes={contactInfo.notes}
                onChange={handleContactChange}
              />

              {/* Consultation prompt */}
              {showConsultationPrompt && (
                <div className="mt-6 p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                    assignment
                  </span>
                  <div>
                    <p className="font-label font-medium text-on-surface text-sm">
                      Complete your consultation form
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Help Leah prepare for your session by filling out a few health questions.
                    </p>
                    <a
                      href="/members/profile#consultation"
                      className="text-xs text-primary font-medium mt-2 inline-block hover:underline"
                    >
                      Fill it out now &rarr;
                    </a>
                  </div>
                </div>
              )}

              {/* Discount Code */}
              <DiscountCodeInput
                serviceId={selectedService.id}
                memberCodes={memberCodes}
                onApply={(code, result) => {
                  setDiscountCode(code);
                  setDiscountResult(result);
                }}
                onClear={() => {
                  setDiscountCode(null);
                  setDiscountResult(null);
                }}
                appliedCode={discountCode}
                discountResult={discountResult}
              />

              {/* Payment Method */}
              <div className="mt-8">
                <h3 className="font-headline text-lg font-bold text-on-surface mb-4">
                  How would you like to pay?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/20 hover:border-outline-variant/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-primary">
                      credit_card
                    </span>
                    <div>
                      <p className="font-label font-medium text-on-surface text-sm">
                        Pay now by card
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Secure payment via Stripe
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "cash"
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant/20 hover:border-outline-variant/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-primary">
                      payments
                    </span>
                    <div>
                      <p className="font-label font-medium text-on-surface text-sm">
                        Pay cash on the day
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Pay when you arrive
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-1 font-label text-sm text-on-surface-variant hover:text-on-surface transition-colors ${
                step === 1 ? "invisible" : ""
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={step === 1 ? handleGoToDate : undefined}
                disabled={!canProceed}
                className={`px-6 py-3 rounded-lg font-label font-bold text-sm transition-all ${
                  canProceed
                    ? "bg-primary text-on-primary hover:opacity-90 active:scale-95"
                    : "bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed || isPending}
                className={`px-8 py-3 rounded-lg font-label font-bold text-sm transition-all ${
                  canProceed && !isPending
                    ? "bg-secondary text-on-secondary hover:brightness-110 active:scale-95"
                    : "bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : paymentMethod === "card" ? (
                  "Proceed to Payment"
                ) : (
                  "Confirm Booking"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <BookingSummary
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              discountResult={discountResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
