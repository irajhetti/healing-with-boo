"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { ServiceCategory } from "@prisma/client";
import type { ServiceWithCategory } from "@/app/(public)/booking/actions";
import {
  createCheckoutSession,
  createCashBooking,
  getMemberDiscountCodes,
  checkConsultationStatus,
  getAuthUserProfile,
} from "@/app/(public)/booking/actions";
import { registerUser } from "@/app/(public)/(auth)/register/actions";
import type { DiscountValidationResult, MemberDiscountCode } from "@/app/(public)/booking/actions";
import { getAvailableSlots, getAvailableDates } from "@/lib/availability";
import { BookingSteps } from "./BookingSteps";
import { ServicePicker } from "./ServicePicker";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { DiscountCodeInput } from "./DiscountCodeInput";
import { BookingSummary } from "./BookingSummary";

type Props = {
  services: Record<ServiceCategory, ServiceWithCategory[]>;
};

type AuthProfile = { name: string; email: string; phone: string };

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
  const [notes, setNotes] = useState("");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountResult, setDiscountResult] =
    useState<DiscountValidationResult | null>(null);
  const [memberCodes, setMemberCodes] = useState<MemberDiscountCode[]>([]);
  const [step4Loaded, setStep4Loaded] = useState(false);
  const [showConsultationPrompt, setShowConsultationPrompt] = useState(false);

  // Auth state
  const [authProfile, setAuthProfile] = useState<AuthProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState<string | null>(null);
  // Missing fields from profile
  const [missingName, setMissingName] = useState("");
  const [missingPhone, setMissingPhone] = useState("");

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
    loadStep4Data();
  }

  async function loadStep4Data() {
    if (step4Loaded) return;
    setStep4Loaded(true);

    const profile = await getAuthUserProfile();
    setAuthProfile(profile);
    setAuthChecked(true);

    if (profile) {
      getMemberDiscountCodes().then(setMemberCodes);
      checkConsultationStatus().then((status) => {
        if (status.signedIn && !status.consultationComplete) {
          setShowConsultationPrompt(true);
        }
      });
    }
  }

  async function handleAuthSuccess() {
    const profile = await getAuthUserProfile();
    setAuthProfile(profile);
    setAuthError(null);
    if (profile) {
      getMemberDiscountCodes().then(setMemberCodes);
      checkConsultationStatus().then((status) => {
        if (status.signedIn && !status.consultationComplete) {
          setShowConsultationPrompt(true);
        }
      });
    }
  }

  function handleBack() {
    setError(null);
    if (step > 1) setStep(step - 1);
  }

  // Build contact info from auth profile + any missing field overrides
  function getContactInfo() {
    if (!authProfile) return null;
    return {
      name: authProfile.name || missingName,
      email: authProfile.email,
      phone: authProfile.phone || missingPhone,
    };
  }

  async function handleSubmit() {
    if (!selectedService || !selectedDate || !selectedTime) return;
    const contact = getContactInfo();
    if (!contact) return;

    setError(null);
    startTransition(async () => {
      const formData = {
        serviceId: selectedService.id,
        date: selectedDate,
        time: selectedTime,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: notes || undefined,
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

  const profileComplete =
    authProfile !== null &&
    (authProfile.name || missingName.length >= 2) &&
    (authProfile.phone || missingPhone.length >= 10);

  const canProceed =
    (step === 1 && selectedService) ||
    (step === 2 && selectedDate) ||
    (step === 3 && selectedTime) ||
    (step === 4 && profileComplete);

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
              {/* Auth section */}
              {!authChecked ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : !authProfile ? (
                /* Not signed in — inline auth form */
                <InlineAuth
                  mode={authMode}
                  onModeChange={setAuthMode}
                  error={authError}
                  isPending={isPending}
                  onLogin={(email, password) => {
                    setAuthError(null);
                    startTransition(async () => {
                      const result = await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                      });
                      if (result?.error) {
                        setAuthError("Incorrect email or password.");
                      } else {
                        await handleAuthSuccess();
                      }
                    });
                  }}
                  onRegister={(data) => {
                    setAuthError(null);
                    startTransition(async () => {
                      const regResult = await registerUser(data);
                      if (regResult.error) {
                        setAuthError(regResult.error);
                        return;
                      }
                      const signInResult = await signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: false,
                      });
                      if (signInResult?.error) {
                        setAuthError("Account created but sign-in failed. Please try logging in.");
                        setAuthMode("login");
                        return;
                      }
                      await handleAuthSuccess();
                    });
                  }}
                />
              ) : (
                /* Signed in */
                <>
                  {/* Profile summary or missing fields */}
                  {!authProfile.name || !authProfile.phone ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary text-[24px]">
                          check_circle
                        </span>
                        <p className="font-label font-medium text-on-surface">
                          Signed in as {authProfile.email}
                        </p>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4">
                        Just need a couple more details:
                      </p>
                      {!authProfile.name && (
                        <div>
                          <label className="block font-label text-sm font-medium text-on-surface mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={missingName}
                            onChange={(e) => setMissingName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      )}
                      {!authProfile.phone && (
                        <div>
                          <label className="block font-label text-sm font-medium text-on-surface mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={missingPhone}
                            onChange={(e) => setMissingPhone(e.target.value)}
                            placeholder="Your phone number"
                            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container border border-outline-variant/20">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          person
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label font-medium text-on-surface text-sm">
                          Booking as {authProfile.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {authProfile.email} · {authProfile.phone}
                        </p>
                      </div>
                      <a
                        href="/members/profile"
                        className="text-xs text-primary font-medium hover:underline shrink-0"
                      >
                        Edit profile
                      </a>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="mt-6">
                    <label className="block font-label text-sm font-medium text-on-surface mb-2">
                      Notes for Leah{" "}
                      <span className="text-on-surface-variant font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Anything you'd like Leah to know about this session..."
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary/60 resize-none"
                    />
                  </div>

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
            ) : authProfile ? (
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
            ) : null}
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

/* ── Inline Auth Component ── */

function InlineAuth({
  mode,
  onModeChange,
  error,
  isPending,
  onLogin,
  onRegister,
}: {
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  error: string | null;
  isPending: boolean;
  onLogin: (email: string, password: string) => void;
  onRegister: (data: { name: string; email: string; phone: string; password: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const inputClass =
    "w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-sm focus:outline-none focus:border-primary/60";

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-on-surface mb-2">
        Sign in to continue
      </h3>
      <p className="text-sm text-on-surface-variant mb-6">
        You need an account to book a session. This lets you manage your bookings, preferences, and discount codes.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-container rounded-lg p-1">
        <button
          type="button"
          onClick={() => onModeChange("login")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "login"
              ? "bg-surface text-on-surface shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => onModeChange("register")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "register"
              ? "bg-surface text-on-surface shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="space-y-4">
        {mode === "register" && (
          <>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className={inputClass}
              />
            </div>
          </>
        )}

        <div>
          <label className="block font-label text-sm font-medium text-on-surface mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-label text-sm font-medium text-on-surface mb-2">
            Password
            {mode === "register" && (
              <span className="text-on-surface-variant font-normal ml-1">(min 8 characters)</span>
            )}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "register" ? "Create a password" : "Your password"}
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-sm text-error">{error}</p>
        )}

        <button
          type="button"
          disabled={isPending || !email || !password || (mode === "register" && (!name || !phone))}
          onClick={() => {
            if (mode === "login") {
              onLogin(email, password);
            } else {
              onRegister({ name, email, phone, password });
            }
          }}
          className="w-full py-3 rounded-lg bg-primary text-on-primary font-label font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Please wait..."
            : mode === "login"
              ? "Sign In"
              : "Create Account"}
        </button>
      </div>
    </div>
  );
}
