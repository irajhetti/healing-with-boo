"use client";

import { useState, useTransition } from "react";
import { validateDiscountCode } from "@/app/(public)/booking/actions";
import type { DiscountValidationResult, MemberDiscountCode } from "@/app/(public)/booking/actions";
import { formatPrice } from "@/lib/utils";

type Props = {
  serviceId: string;
  memberCodes: MemberDiscountCode[];
  onApply: (code: string, result: DiscountValidationResult) => void;
  onClear: () => void;
  appliedCode: string | null;
  discountResult: DiscountValidationResult | null;
};

export function DiscountCodeInput({
  serviceId,
  memberCodes,
  onApply,
  onClear,
  appliedCode,
  discountResult,
}: Props) {
  const [open, setOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApply(code: string) {
    if (!code.trim()) return;
    setError(null);
    startTransition(async () => {
      const result = await validateDiscountCode({ code: code.trim(), serviceId });
      if (result.valid) {
        onApply(code.trim().toUpperCase(), result);
        setCodeInput("");
      } else {
        setError(result.error || "Invalid code.");
      }
    });
  }

  function handleClear() {
    setError(null);
    setCodeInput("");
    onClear();
  }

  // If a code is applied, show the applied state
  if (appliedCode && discountResult?.valid) {
    return (
      <div className="mt-8">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
          <span className="material-symbols-outlined text-green-600 text-[20px]">
            check_circle
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-label font-medium text-green-800 text-sm">
              {appliedCode}
            </p>
            <p className="text-xs text-green-600">
              {discountResult.discountType === "PERCENTAGE"
                ? `${discountResult.amount}% off`
                : `${formatPrice(discountResult.amount!)} off`}
              {" — "}you save {formatPrice(discountResult.savedAmount!)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-green-100 transition-colors"
          >
            <span className="material-symbols-outlined text-green-600 text-[18px]">
              close
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          {open ? "expand_less" : "sell"}
        </span>
        Got a discount code?
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {/* Member codes dropdown */}
          {memberCodes.length > 0 && (
            <div>
              <label className="text-xs font-label text-on-surface-variant mb-1 block">
                Your codes
              </label>
              <div className="space-y-2">
                {memberCodes.map((mc) => (
                  <button
                    key={mc.id}
                    type="button"
                    onClick={() => handleApply(mc.code)}
                    disabled={isPending}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-outline-variant/30 hover:border-primary/40 hover:bg-primary/5 transition-all text-left disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      sell
                    </span>
                    <div className="flex-1">
                      <span className="font-label font-medium text-on-surface text-sm">
                        {mc.code}
                      </span>
                      <span className="text-xs text-on-surface-variant ml-2">
                        {mc.discountType === "PERCENTAGE"
                          ? `${mc.amount}% off`
                          : `${formatPrice(mc.amount)} off`}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant mt-2">
                Or enter a code manually:
              </p>
            </div>
          )}

          {/* Manual code input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="Enter code"
              maxLength={30}
              className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 font-mono tracking-wider"
            />
            <button
              type="button"
              onClick={() => handleApply(codeInput)}
              disabled={isPending || !codeInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "..." : "Apply"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-error">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
