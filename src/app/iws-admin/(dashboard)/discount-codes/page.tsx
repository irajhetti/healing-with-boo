"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getAllDiscountCodes,
  createDiscountCode,
  updateDiscountCode,
  toggleDiscountCodeActive,
  getDiscountCodeUsages,
  getClientsForAssignment,
} from "../actions/discount-codes";

type DiscountCode = Awaited<ReturnType<typeof getAllDiscountCodes>>[number];
type Usage = Awaited<ReturnType<typeof getDiscountCodeUsages>>[number];
type Client = Awaited<ReturnType<typeof getClientsForAssignment>>[number];

function formatAmount(type: string, amount: number) {
  return type === "PERCENTAGE" ? `${amount}%` : `£${(amount / 100).toFixed(0)}`;
}

function getCodeStatus(code: DiscountCode): {
  label: string;
  color: string;
} {
  if (!code.active) return { label: "Disabled", color: "bg-red-100 text-red-800" };
  if (code.expiresAt && new Date(code.expiresAt) < new Date())
    return { label: "Expired", color: "bg-yellow-100 text-yellow-800" };
  if (code.maxUses !== null && code.usedCount >= code.maxUses)
    return { label: "Exhausted", color: "bg-yellow-100 text-yellow-800" };
  return { label: "Active", color: "bg-green-100 text-green-800" };
}

export default function DiscountCodesPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [usages, setUsages] = useState<Record<string, Usage[]>>({});
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      setCodes(await getAllDiscountCodes());
    });
  }, []);

  function handleCreate(form: FormData) {
    setError(null);
    const maxUsesRaw = form.get("maxUses") as string;
    const expiresAtRaw = form.get("expiresAt") as string;
    const userIdRaw = form.get("userId") as string;

    startTransition(async () => {
      try {
        await createDiscountCode({
          code: form.get("code") as string,
          discountType: form.get("discountType") as "PERCENTAGE" | "FIXED",
          amount:
            (form.get("discountType") as string) === "PERCENTAGE"
              ? parseInt(form.get("amount") as string)
              : Math.round(parseFloat(form.get("amount") as string) * 100),
          maxUses: maxUsesRaw ? parseInt(maxUsesRaw) : null,
          expiresAt: expiresAtRaw || null,
          userId: userIdRaw || null,
        });
        setCodes(await getAllDiscountCodes());
        setShowAdd(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create code");
      }
    });
  }

  function handleSave(id: string, form: FormData) {
    setError(null);
    const maxUsesRaw = form.get("maxUses") as string;
    const expiresAtRaw = form.get("expiresAt") as string;

    startTransition(async () => {
      try {
        await updateDiscountCode(id, {
          code: form.get("code") as string,
          discountType: form.get("discountType") as "PERCENTAGE" | "FIXED",
          amount:
            (form.get("discountType") as string) === "PERCENTAGE"
              ? parseInt(form.get("amount") as string)
              : Math.round(parseFloat(form.get("amount") as string) * 100),
          maxUses: maxUsesRaw ? parseInt(maxUsesRaw) : null,
          expiresAt: expiresAtRaw || null,
        });
        setCodes(await getAllDiscountCodes());
        setEditingId(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update code");
      }
    });
  }

  function handleToggle(id: string) {
    startTransition(async () => {
      await toggleDiscountCodeActive(id);
      setCodes(await getAllDiscountCodes());
    });
  }

  function handleExpandUsage(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (!usages[id]) {
      startTransition(async () => {
        const data = await getDiscountCodeUsages(id);
        setUsages((prev) => ({ ...prev, [id]: data }));
      });
    }
  }

  function handleShowAdd() {
    if (!showAdd && clients.length === 0) {
      startTransition(async () => {
        setClients(await getClientsForAssignment());
      });
    }
    setShowAdd(!showAdd);
    setError(null);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-headline text-2xl font-bold text-on-surface">
          Discount Codes
        </h1>
        <button
          onClick={handleShowAdd}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all"
        >
          {showAdd ? "Cancel" : "+ Add Code"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {error}
        </div>
      )}

      {showAdd && (
        <AddCodeForm
          clients={clients}
          isPending={isPending}
          onSubmit={handleCreate}
        />
      )}

      <div className="space-y-2">
        {codes.map((code) => {
          const status = getCodeStatus(code);

          if (editingId === code.id) {
            return (
              <div key={code.id} className="bg-surface-container rounded-xl p-4">
                <EditCodeForm
                  code={code}
                  isPending={isPending}
                  onSave={(form) => handleSave(code.id, form)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            );
          }

          return (
            <div key={code.id} className="bg-surface-container rounded-xl p-4">
              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-on-surface text-sm tracking-wider">
                      {code.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high rounded-full text-xs text-on-surface-variant">
                      {formatAmount(code.discountType, code.amount)} off
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Used {code.usedCount}
                    {code.maxUses !== null ? ` / ${code.maxUses}` : ""} times
                    {code.expiresAt &&
                      ` · Expires ${new Date(code.expiresAt).toLocaleDateString("en-GB")}`}
                    {code.user &&
                      ` · For ${code.user.name || code.user.email}`}
                  </p>
                </div>

                <button
                  onClick={() => handleExpandUsage(code.id)}
                  className="px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                  title="View usage"
                >
                  {expandedId === code.id ? "Hide" : "Usage"}
                </button>

                <button
                  onClick={() => setEditingId(code.id)}
                  className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleToggle(code.id)}
                  disabled={isPending}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    code.active
                      ? "text-red-600 hover:bg-red-50"
                      : "text-green-600 hover:bg-green-50"
                  }`}
                >
                  {code.active ? "Disable" : "Enable"}
                </button>
              </div>

              {/* Usage details */}
              {expandedId === code.id && (
                <div className="mt-3 pt-3 border-t border-outline-variant/20">
                  {!usages[code.id] ? (
                    <p className="text-xs text-on-surface-variant">Loading...</p>
                  ) : usages[code.id].length === 0 ? (
                    <p className="text-xs text-on-surface-variant">No usage yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {usages[code.id].map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center justify-between text-xs bg-surface-container-lowest rounded-lg px-3 py-2"
                        >
                          <div>
                            <span className="font-medium text-on-surface">
                              {u.user?.name || u.booking.guestName || u.booking.guestEmail || "Guest"}
                            </span>
                            <span className="text-on-surface-variant ml-2">
                              {u.booking.service.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-green-600 font-medium">
                              −£{(u.discountAmount / 100).toFixed(0)}
                            </span>
                            <span className="text-on-surface-variant ml-2">
                              {new Date(u.createdAt).toLocaleDateString("en-GB")}
                            </span>
                            <span className="text-on-surface-variant ml-2">
                              Ref: {u.booking.reference}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {codes.length === 0 && !isPending && (
          <p className="text-on-surface-variant text-sm text-center py-8">
            No discount codes yet. Create one to get started.
          </p>
        )}
      </div>
    </>
  );
}

function AddCodeForm({
  clients,
  isPending,
  onSubmit,
}: {
  clients: Client[];
  isPending: boolean;
  onSubmit: (form: FormData) => void;
}) {
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">(
    "PERCENTAGE"
  );

  return (
    <form action={onSubmit} className="bg-surface-container rounded-xl p-6 mb-8 space-y-3">
      <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
        New Discount Code
      </h2>

      <input
        name="code"
        placeholder="Code (e.g. SUMMER20)"
        required
        maxLength={30}
        className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface font-mono uppercase tracking-wider"
      />

      <div className="flex gap-3">
        <div>
          <label className="text-xs text-on-surface-variant">Type</label>
          <select
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as "PERCENTAGE" | "FIXED")}
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          >
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED">Fixed amount (£)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-on-surface-variant">
            {discountType === "PERCENTAGE" ? "Percentage" : "Amount (£)"}
          </label>
          <input
            name="amount"
            type="number"
            step={discountType === "PERCENTAGE" ? "1" : "0.01"}
            min="1"
            max={discountType === "PERCENTAGE" ? "100" : undefined}
            required
            placeholder={discountType === "PERCENTAGE" ? "20" : "5"}
            className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          <label className="text-xs text-on-surface-variant">Max uses (blank = unlimited)</label>
          <input
            name="maxUses"
            type="number"
            min="1"
            placeholder="∞"
            className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
        <div>
          <label className="text-xs text-on-surface-variant">Expires (blank = never)</label>
          <input
            name="expiresAt"
            type="date"
            className="px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-on-surface-variant">
          Assign to member (blank = general code)
        </label>
        <select
          name="userId"
          className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
        >
          <option value="">General — anyone can use</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name || c.email} ({c.email})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Code"}
      </button>
    </form>
  );
}

function EditCodeForm({
  code,
  isPending,
  onSave,
  onCancel,
}: {
  code: DiscountCode;
  isPending: boolean;
  onSave: (form: FormData) => void;
  onCancel: () => void;
}) {
  const [discountType, setDiscountType] = useState(code.discountType);

  return (
    <form action={onSave} className="space-y-3">
      <input
        name="code"
        defaultValue={code.code}
        className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface font-mono uppercase tracking-wider"
      />

      <div className="flex gap-3">
        <div>
          <label className="text-xs text-on-surface-variant">Type</label>
          <select
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as "PERCENTAGE" | "FIXED")}
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          >
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED">Fixed amount (£)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-on-surface-variant">
            {discountType === "PERCENTAGE" ? "Percentage" : "Amount (£)"}
          </label>
          <input
            name="amount"
            type="number"
            step={discountType === "PERCENTAGE" ? "1" : "0.01"}
            defaultValue={
              discountType === "PERCENTAGE"
                ? code.amount
                : (code.amount / 100).toFixed(2)
            }
            className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          <label className="text-xs text-on-surface-variant">Max uses</label>
          <input
            name="maxUses"
            type="number"
            min="1"
            defaultValue={code.maxUses ?? ""}
            placeholder="∞"
            className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
        <div>
          <label className="text-xs text-on-surface-variant">Expires</label>
          <input
            name="expiresAt"
            type="date"
            defaultValue={
              code.expiresAt
                ? new Date(code.expiresAt).toISOString().split("T")[0]
                : ""
            }
            className="px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
