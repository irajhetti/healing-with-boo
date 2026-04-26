"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getMemberProfile,
  updateMemberProfile,
  changePassword,
  getConsultationForm,
  saveConsultationAnswers,
} from "../actions";
import type { ConsultationFormQuestion } from "../actions";

export default function MembersProfilePage() {
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getMemberProfile>> | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [questions, setQuestions] = useState<ConsultationFormQuestion[]>([]);
  const [consultationAnswers, setConsultationAnswers] = useState<Record<string, string>>({});
  const [consultationSaved, setConsultationSaved] = useState(false);
  const [consultationError, setConsultationError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const [p, q] = await Promise.all([getMemberProfile(), getConsultationForm()]);
      setProfile(p);
      setQuestions(q);
      const answers: Record<string, string> = {};
      for (const question of q) {
        answers[question.id] = question.answer ?? "";
      }
      setConsultationAnswers(answers);
    });
  }, []);

  function handleProfileSave(form: FormData) {
    setProfileError(null);
    startTransition(async () => {
      const result = await updateMemberProfile({
        name: form.get("name") as string,
        phone: form.get("phone") as string,
        pressurePref: form.get("pressurePref") as string,
        healthNotes: form.get("healthNotes") as string,
      });
      if (result.error) {
        setProfileError(result.error);
        return;
      }
      setProfile(await getMemberProfile());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  function handlePasswordChange(form: FormData) {
    const newPassword = form.get("newPassword") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords don't match." });
      return;
    }

    startTransition(async () => {
      const result = await changePassword({
        currentPassword: form.get("currentPassword") as string,
        newPassword,
      });
      if (result.error) {
        setPasswordMsg({ type: "error", text: result.error });
      } else {
        setPasswordMsg({ type: "success", text: "Password updated." });
        setTimeout(() => setPasswordMsg(null), 3000);
      }
    });
  }

  if (!profile) return <p className="text-on-surface-variant">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">Your Profile</h1>
      <p className="text-on-surface-variant mb-10">Manage your account details and healing preferences.</p>

      {/* Profile Form */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8 mb-8">
        <h2 className="font-label font-medium text-on-surface text-lg mb-6">Personal Information</h2>
        <form action={handleProfileSave} className="space-y-5">
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
            <input
              name="name"
              type="text"
              defaultValue={profile.name}
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 bg-surface-container border-b-2 border-outline-variant/10 rounded-t-lg text-on-surface-variant cursor-not-allowed"
            />
            <p className="text-xs text-on-surface-variant mt-1">Contact us to change your email address.</p>
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              defaultValue={profile.phone}
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>

          <h3 className="font-label font-medium text-on-surface text-base pt-4">Healing Preferences</h3>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Massage Pressure</label>
            <select
              name="pressurePref"
              defaultValue={profile.pressurePref}
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            >
              <option>Light</option>
              <option>Medium</option>
              <option>Firm</option>
              <option>Extra Firm</option>
            </select>
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Health Notes</label>
            <textarea
              name="healthNotes"
              rows={3}
              defaultValue={profile.healthNotes}
              placeholder="Any conditions, injuries, or things Leah should know about..."
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface resize-none"
            />
          </div>

          {profileError && (
            <p className="text-sm text-red-500">{profileError}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-on-primary font-label font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
            {saved && <span className="text-green-600 text-sm">Saved!</span>}
          </div>
        </form>
      </section>

      {/* Consultation Form */}
      {questions.length > 0 && (
        <section id="consultation" className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">assignment</span>
            <h2 className="font-label font-medium text-on-surface text-lg">Consultation Questions</h2>
          </div>
          <p className="text-sm text-on-surface-variant mb-6">
            Help Leah prepare for your sessions by answering these questions.
          </p>

          <div className="space-y-5">
            {questions.map((q) => (
              <div key={q.id}>
                <label className="block font-label text-sm font-medium text-on-surface mb-2">
                  {q.label}
                  {q.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {q.type === "SHORT_TEXT" && (
                  <input
                    type="text"
                    value={consultationAnswers[q.id] || ""}
                    onChange={(e) => setConsultationAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  />
                )}

                {q.type === "LONG_TEXT" && (
                  <textarea
                    rows={3}
                    value={consultationAnswers[q.id] || ""}
                    onChange={(e) => setConsultationAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface resize-none"
                  />
                )}

                {q.type === "DROPDOWN" && q.options && (
                  <select
                    value={consultationAnswers[q.id] || ""}
                    onChange={(e) => setConsultationAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  >
                    <option value="">Select...</option>
                    {q.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {q.type === "YES_NO" && (
                  <div className="flex gap-2">
                    {["Yes", "No"].map((label) => {
                      const val = label === "Yes" ? "true" : "false";
                      const isSelected = consultationAnswers[q.id] === val;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setConsultationAnswers((prev) => ({ ...prev, [q.id]: val }))}
                          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/50"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {consultationError && (
            <p className="text-sm text-red-500 mt-4">{consultationError}</p>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setConsultationError(null);
                startTransition(async () => {
                  const result = await saveConsultationAnswers(
                    Object.entries(consultationAnswers).map(([questionId, answer]) => ({
                      questionId,
                      answer,
                    }))
                  );
                  if (result.error) {
                    setConsultationError(result.error);
                  } else {
                    setConsultationSaved(true);
                    setTimeout(() => setConsultationSaved(false), 3000);
                  }
                });
              }}
              className="bg-primary text-on-primary font-label font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Answers"}
            </button>
            {consultationSaved && <span className="text-green-600 text-sm">Saved!</span>}
          </div>
        </section>
      )}

      {/* Change Password */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8">
        <h2 className="font-label font-medium text-on-surface text-lg mb-6">Change Password</h2>
        <form action={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              required
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">New Password</label>
            <input
              name="newPassword"
              type="password"
              required
              minLength={8}
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Confirm New Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>

          {passwordMsg && (
            <p className={`text-sm ${passwordMsg.type === "error" ? "text-red-500" : "text-green-600"}`}>
              {passwordMsg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-on-primary font-label font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
