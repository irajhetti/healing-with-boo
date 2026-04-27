"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getBusinessHours,
  updateBusinessHours,
  getBlockedDates,
  addBlockedDate,
  removeBlockedDate,
  getSchedulingSettings,
  updateSchedulingSettings,
} from "../actions/availability";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type HoursRow = { dayOfWeek: number; open: string | null; close: string | null };
type BlockedRow = { id: string; date: Date; reason: string | null; openOverride: string | null; closeOverride: string | null };
type RulesRow = { bufferMinutes: number; slotIncrement: number; bookingHorizonDays: number };

export default function AvailabilityPage() {
  const [hours, setHours] = useState<HoursRow[]>([]);
  const [blocked, setBlocked] = useState<BlockedRow[]>([]);
  const [rules, setRules] = useState<RulesRow | null>(null);
  const [rulesSaved, setRulesSaved] = useState(false);
  const [rulesError, setRulesError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  // New blocked date form
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");

  useEffect(() => {
    startTransition(async () => {
      const [h, b, r] = await Promise.all([
        getBusinessHours(),
        getBlockedDates(),
        getSchedulingSettings(),
      ]);
      setHours(h.map((row) => ({ dayOfWeek: row.dayOfWeek, open: row.open, close: row.close })));
      setBlocked(b);
      setRules(r);
    });
  }, []);

  function updateRule<K extends keyof RulesRow>(key: K, value: number) {
    setRules((prev) => (prev ? { ...prev, [key]: value } : prev));
    setRulesSaved(false);
    setRulesError(null);
  }

  function saveRules() {
    if (!rules) return;
    setRulesError(null);
    startTransition(async () => {
      const result = await updateSchedulingSettings(rules);
      if (result.error) {
        setRulesError(result.error);
        return;
      }
      setRulesSaved(true);
      setTimeout(() => setRulesSaved(false), 3000);
    });
  }

  function updateDay(dayOfWeek: number, field: "open" | "close", value: string) {
    setHours((prev) =>
      prev.map((h) => (h.dayOfWeek === dayOfWeek ? { ...h, [field]: value || null } : h))
    );
    setSaved(false);
  }

  function toggleClosed(dayOfWeek: number) {
    setHours((prev) =>
      prev.map((h) => {
        if (h.dayOfWeek !== dayOfWeek) return h;
        return h.open ? { ...h, open: null, close: null } : { ...h, open: "09:00", close: "17:00" };
      })
    );
    setSaved(false);
  }

  function saveHours() {
    startTransition(async () => {
      await updateBusinessHours(hours);
      setSaved(true);
    });
  }

  function handleAddBlocked() {
    if (!newDate) return;
    startTransition(async () => {
      await addBlockedDate({ date: newDate, reason: newReason || undefined });
      const b = await getBlockedDates();
      setBlocked(b);
      setNewDate("");
      setNewReason("");
    });
  }

  function handleRemoveBlocked(id: string) {
    startTransition(async () => {
      await removeBlockedDate(id);
      const b = await getBlockedDates();
      setBlocked(b);
    });
  }

  return (
    <>
      <h1 className="font-headline text-2xl font-bold text-on-surface mb-8">
        Availability
      </h1>

      {/* Weekly Hours */}
      <section className="bg-surface-container rounded-xl p-6 mb-8">
        <h2 className="font-headline text-lg font-bold text-on-surface mb-4">
          Weekly Hours
        </h2>

        <div className="space-y-3">
          {hours.map((h) => (
            <div
              key={h.dayOfWeek}
              className="flex items-center gap-4 flex-wrap"
            >
              <span className="w-24 text-sm font-medium text-on-surface">
                {DAYS[h.dayOfWeek]}
              </span>

              <button
                onClick={() => toggleClosed(h.dayOfWeek)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  h.open
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {h.open ? "Open" : "Closed"}
              </button>

              {h.open && (
                <>
                  <input
                    type="time"
                    value={h.open || ""}
                    onChange={(e) => updateDay(h.dayOfWeek, "open", e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
                  />
                  <span className="text-on-surface-variant text-sm">to</span>
                  <input
                    type="time"
                    value={h.close || ""}
                    onChange={(e) => updateDay(h.dayOfWeek, "close", e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={saveHours}
            disabled={isPending}
            className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Hours"}
          </button>
          {saved && (
            <span className="text-green-600 text-sm">Saved!</span>
          )}
        </div>
      </section>

      {/* Blocked Dates */}
      <section className="bg-surface-container rounded-xl p-6">
        <h2 className="font-headline text-lg font-bold text-on-surface mb-4">
          Blocked Dates
        </h2>
        <p className="text-on-surface-variant text-sm mb-4">
          Days off, holidays, or sick days. These dates will be unavailable for
          booking.
        </p>

        {/* Add form */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
          <input
            type="text"
            placeholder="Reason (optional)"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface flex-1 min-w-[150px]"
          />
          <button
            onClick={handleAddBlocked}
            disabled={!newDate || isPending}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            Block Date
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">
          {blocked.length === 0 && (
            <p className="text-on-surface-variant text-sm">
              No blocked dates.
            </p>
          )}
          {blocked.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between bg-surface rounded-lg px-4 py-3"
            >
              <div>
                <span className="text-sm font-medium text-on-surface">
                  {new Date(b.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {b.reason && (
                  <span className="text-xs text-on-surface-variant ml-2">
                    — {b.reason}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleRemoveBlocked(b.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Scheduling Rules */}
      <section className="bg-surface-container rounded-xl p-6 mt-8">
        <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
          Scheduling Rules
        </h2>
        <p className="text-on-surface-variant text-sm mb-6">
          Controls how slots are offered to clients on the public booking page.
        </p>

        {rules && (
          <div className="space-y-5 max-w-md">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Buffer between sessions (minutes)
              </label>
              <input
                type="number"
                min={0}
                max={60}
                value={rules.bufferMinutes}
                onChange={(e) => updateRule("bufferMinutes", parseInt(e.target.value) || 0)}
                className="w-32 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
              />
              <p className="text-xs text-on-surface-variant mt-1">
                Time after each booking before the next can start. Default 15.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Slot interval (minutes)
              </label>
              <input
                type="number"
                min={5}
                max={60}
                value={rules.slotIncrement}
                onChange={(e) => updateRule("slotIncrement", parseInt(e.target.value) || 5)}
                className="w-32 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
              />
              <p className="text-xs text-on-surface-variant mt-1">
                How tightly slots are spaced. 15 means clients pick :00, :15, :30, :45.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                How far ahead clients can book (days)
              </label>
              <input
                type="number"
                min={7}
                max={365}
                value={rules.bookingHorizonDays}
                onChange={(e) => updateRule("bookingHorizonDays", parseInt(e.target.value) || 7)}
                className="w-32 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
              />
              <p className="text-xs text-on-surface-variant mt-1">
                60 = roughly two months. Set higher for further-out booking.
              </p>
            </div>

            {rulesError && (
              <p className="text-sm text-red-500">{rulesError}</p>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={saveRules}
                disabled={isPending}
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Rules"}
              </button>
              {rulesSaved && (
                <span className="text-green-600 text-sm">Saved!</span>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
