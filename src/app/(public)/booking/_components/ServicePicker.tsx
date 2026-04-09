"use client";

import { useState } from "react";
import type { ServiceCategory } from "@prisma/client";
import type { ServiceWithCategory } from "@/app/(public)/booking/actions";
import { formatDuration, formatPrice } from "@/lib/utils";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  MASSAGE: "Massage",
  HEALING: "Healing",
  COMBINED: "Combined",
  SIGNATURE: "Signature",
};

const CATEGORY_ORDER: ServiceCategory[] = [
  "MASSAGE",
  "HEALING",
  "COMBINED",
  "SIGNATURE",
];

type Props = {
  services: Record<ServiceCategory, ServiceWithCategory[]>;
  selected: ServiceWithCategory | null;
  onSelect: (service: ServiceWithCategory) => void;
};

export function ServicePicker({ services, selected, onSelect }: Props) {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("MASSAGE");

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full font-label text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeTab === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services[activeTab]?.map((service) => {
          const isSelected = selected?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_-5px] shadow-primary/20"
                  : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-label font-medium text-on-surface">
                    {service.name}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {formatDuration(service.duration)}
                  </p>
                  {service.description && (
                    <p className="text-xs text-on-surface-variant/70 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                </div>
                <p className="font-headline text-lg text-primary ml-4">
                  {formatPrice(service.price)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
