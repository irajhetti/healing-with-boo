"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { getAvailableSlots } from "@/lib/availability";
import {
  searchClients,
  createAdminBooking,
  createRecurringAdminBookings,
  type ClientSearchResult,
} from "../../actions/manual-bookings";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
};

type FormState = {
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  linkUserId: string;
  priceOverride: string;
  notes: string;
  sendEmail: boolean;
  isRecurring: boolean;
  frequency: "WEEKLY" | "FORTNIGHTLY" | "MONTHLY";
  occurrences: number;
};

const initialState: FormState = {
  serviceId: "",
  date: "",
  time: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  linkUserId: "",
  priceOverride: "",
  notes: "",
  sendEmail: true,
  isRecurring: false,
  frequency: "WEEKLY",
  occurrences: 4,
};

type ResultMsg =
  | { type: "single-success"; reference: string; clientCreated: boolean; setupLink: string | null }
  | {
      type: "recurring-result";
      created: Array<{ date: string; reference: string }>;
      skipped: Array<{ date: string; reason: string }>;
      clientCreated: boolean;
      setupLink: string | null;
    }
  | { type: "error"; message: string };

export default function NewBookingForm({ services }: { services: Service[] }) {
  const [state, setState] = useState<FormState>(initialState);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ClientSearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ResultMsg | null>(null);

  const selectedService = services.find((s) => s.id === state.serviceId);

  // Load available slots when service+date both set
  useEffect(() => {
    if (!state.serviceId || !state.date) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);
    getAvailableSlots(state.serviceId, state.date)
      .then((s) => {
        if (!cancelled) setSlots(s);
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [state.serviceId, state.date]);

  // Debounced client search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const handle = setTimeout(() => {
      searchClients(searchQuery).then(setSearchResults).catch(() => setSearchResults([]));
    }, 250);
    return () => clearTimeout(handle);
  }, [searchQuery]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function selectExistingClient(c: ClientSearchResult) {
    setState((s) => ({
      ...s,
      linkUserId: c.id,
      clientName: c.name || "",
      clientEmail: c.email,
      clientPhone: c.phone || "",
    }));
    setSearchQuery("");
    setSearchResults([]);
  }

  function clearLinkedClient() {
    setState((s) => ({ ...s, linkUserId: "" }));
  }

  function handleSubmit() {
    setResult(null);

    if (!state.serviceId || !state.date || !state.time || !state.clientName.trim()) {
      setResult({ type: "error", message: "Please fill in service, date, time and client name." });
      return;
    }

    const priceOverride = state.priceOverride.trim()
      ? Math.round(parseFloat(state.priceOverride) * 100)
      : undefined;

    if (priceOverride != null && (Number.isNaN(priceOverride) || priceOverride < 0)) {
      setResult({ type: "error", message: "Price override must be a positive number (in £)." });
      return;
    }

    const payload = {
      serviceId: state.serviceId,
      date: state.date,
      time: state.time,
      client: {
        name: state.clientName.trim(),
        email: state.clientEmail.trim(),
        phone: state.clientPhone.trim(),
      },
      linkUserId: state.linkUserId,
      priceOverride,
      notes: state.notes,
      sendEmail: state.sendEmail,
    };

    startTransition(async () => {
      if (state.isRecurring) {
        const r = await createRecurringAdminBookings({
          ...payload,
          frequency: state.frequency,
          occurrences: state.occurrences,
        });
        setResult({
          type: "recurring-result",
          created: r.created,
          skipped: r.skipped,
          clientCreated: r.clientCreated,
          setupLink: r.setupLink,
        });
      } else {
        const r = await createAdminBooking(payload);
        if (r.ok) {
          setResult({
            type: "single-success",
            reference: r.reference,
            clientCreated: r.clientCreated,
            setupLink: r.setupLink,
          });
        } else {
          setResult({ type: "error", message: r.error });
        }
      }
    });
  }

  function bookAnother() {
    setState(initialState);
    setSlots([]);
    setSearchQuery("");
    setSearchResults([]);
    setResult(null);
  }

  if (result?.type === "single-success") {
    return (
      <SuccessPanel
        title={`Booking ${result.reference} created`}
        clientCreated={result.clientCreated}
        setupLink={result.setupLink}
        onAnother={bookAnother}
      />
    );
  }

  if (result?.type === "recurring-result") {
    return (
      <div>
        <h1 className="font-headline text-2xl font-medium text-on-surface mb-2">Recurring booking summary</h1>
        <p className="text-sm text-on-surface-variant mb-6">
          Created {result.created.length} of {result.created.length + result.skipped.length}.
        </p>

        {result.created.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
            <p className="font-medium text-green-800 mb-3">Created</p>
            <ul className="space-y-1 text-sm text-green-900">
              {result.created.map((c) => (
                <li key={c.reference}>
                  {c.date} &mdash; <span className="font-mono">{c.reference}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.skipped.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <p className="font-medium text-amber-800 mb-3">Skipped</p>
            <ul className="space-y-1 text-sm text-amber-900">
              {result.skipped.map((s) => (
                <li key={s.date}>
                  {s.date} &mdash; {s.reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.clientCreated && result.setupLink && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-4">
            <p className="font-medium text-purple-800 mb-2">Lite client account created</p>
            <p className="text-sm text-purple-900 break-all">
              Set-up link (also emailed): <span className="font-mono">{result.setupLink}</span>
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={bookAnother}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90"
          >
            New booking
          </button>
          <Link
            href="/iws-admin/bookings"
            className="bg-surface-container px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-surface-container-high"
          >
            Back to bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-2xl font-medium text-on-surface">New booking</h1>
        <Link
          href="/iws-admin/bookings"
          className="text-sm text-on-surface-variant hover:text-on-surface"
        >
          Cancel
        </Link>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Service + slot */}
        <section className="bg-surface-container rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-on-surface">Session</h2>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Service</label>
            <select
              value={state.serviceId}
              onChange={(e) => update("serviceId", e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
            >
              <option value="">Select a service...</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — £{(s.price / 100).toFixed(2)} ({s.duration}min)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Date</label>
              <input
                type="date"
                value={state.date}
                onChange={(e) => update("date", e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Time</label>
              <select
                value={state.time}
                onChange={(e) => update("time", e.target.value)}
                disabled={slots.length === 0 && !slotsLoading}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface disabled:opacity-50"
              >
                <option value="">
                  {slotsLoading
                    ? "Loading..."
                    : !state.serviceId || !state.date
                      ? "Pick service + date first"
                      : slots.length === 0
                        ? "No slots available"
                        : "Select a time..."}
                </option>
                {slots.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Client */}
        <section className="bg-surface-container rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-on-surface">Client</h2>

          {state.linkUserId ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Linked to existing client</p>
                <p className="text-xs text-green-700">{state.clientEmail}</p>
              </div>
              <button
                onClick={clearLinkedClient}
                className="text-xs text-green-700 underline hover:no-underline"
              >
                Unlink
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Search existing</label>
              <input
                type="text"
                placeholder="Type a name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
              />
              {searchResults.length > 0 && (
                <ul className="mt-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden">
                  {searchResults.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => selectExistingClient(c)}
                        className="w-full text-left px-3 py-2.5 hover:bg-surface-container border-b border-outline-variant/10 last:border-0"
                      >
                        <p className="text-sm font-medium text-on-surface">{c.name || c.email}</p>
                        <p className="text-xs text-on-surface-variant">
                          {c.email} {c.phone ? `· ${c.phone}` : ""} · {c.bookingsCount} booking
                          {c.bookingsCount === 1 ? "" : "s"}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Name</label>
              <input
                type="text"
                value={state.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                disabled={!!state.linkUserId}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Phone</label>
              <input
                type="tel"
                value={state.clientPhone}
                onChange={(e) => update("clientPhone", e.target.value)}
                disabled={!!state.linkUserId}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Email (optional)</label>
            <input
              type="email"
              value={state.clientEmail}
              onChange={(e) => update("clientEmail", e.target.value)}
              disabled={!!state.linkUserId}
              placeholder="If provided, a lite account will be created automatically"
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface disabled:opacity-60"
            />
          </div>
        </section>

        {/* Pricing + notes */}
        <section className="bg-surface-container rounded-xl p-5 space-y-4">
          <h2 className="font-medium text-on-surface">Details</h2>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Price override (£) {selectedService && <span className="text-on-surface-variant font-normal">— default £{(selectedService.price / 100).toFixed(2)}</span>}
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={state.priceOverride}
              onChange={(e) => update("priceOverride", e.target.value)}
              placeholder={selectedService ? (selectedService.price / 100).toFixed(2) : ""}
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Notes (optional)</label>
            <textarea
              value={state.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={2}
              placeholder="Anything Leah needs to remember about this booking..."
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.sendEmail}
              onChange={(e) => update("sendEmail", e.target.checked)}
              className="rounded"
            />
            <span className="text-on-surface">Send confirmation email to client</span>
          </label>
        </section>

        {/* Recurring */}
        <section className="bg-surface-container rounded-xl p-5 space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={state.isRecurring}
              onChange={(e) => update("isRecurring", e.target.checked)}
              className="rounded"
            />
            <span className="text-on-surface">Recurring (regulars)</span>
          </label>

          {state.isRecurring && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Frequency</label>
                <select
                  value={state.frequency}
                  onChange={(e) => update("frequency", e.target.value as FormState["frequency"])}
                  className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="FORTNIGHTLY">Fortnightly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">How many?</label>
                <input
                  type="number"
                  min="1"
                  max="26"
                  value={state.occurrences}
                  onChange={(e) => update("occurrences", parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>
              <p className="col-span-2 text-xs text-on-surface-variant">
                Will create up to {state.occurrences} bookings starting from {state.date || "the chosen date"}. Conflicts are skipped — you'll see a summary after.
              </p>
            </div>
          )}
        </section>

        {result?.type === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            {result.message}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Creating..." : state.isRecurring ? "Create recurring" : "Create booking"}
          </button>
          <Link
            href="/iws-admin/bookings"
            className="bg-surface-container px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-surface-container-high"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

function SuccessPanel({
  title,
  clientCreated,
  setupLink,
  onAnother,
}: {
  title: string;
  clientCreated: boolean;
  setupLink: string | null;
  onAnother: () => void;
}) {
  return (
    <div>
      <h1 className="font-headline text-2xl font-medium text-on-surface mb-6">{title}</h1>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
        <p className="font-medium text-green-800">Booking saved.</p>
        <p className="text-sm text-green-900 mt-1">
          Confirmation email is in flight (if requested + email provided).
        </p>
      </div>

      {clientCreated && setupLink && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-4">
          <p className="font-medium text-purple-800 mb-2">Lite client account created</p>
          <p className="text-sm text-purple-900 break-all">
            Set-up link (also emailed):{" "}
            <span className="font-mono">{setupLink}</span>
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onAnother}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90"
        >
          Another booking
        </button>
        <Link
          href="/iws-admin/bookings"
          className="bg-surface-container px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-surface-container-high"
        >
          Back to bookings
        </Link>
      </div>
    </div>
  );
}
