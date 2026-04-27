"use client";

import { useEffect, useState, useTransition } from "react";
import { getAllServices, updateService, toggleServiceActive, createService } from "../actions/services";

type Service = Awaited<ReturnType<typeof getAllServices>>[number];

const CATEGORY_LABELS: Record<string, string> = {
  MASSAGE: "Massage",
  HEALING: "Healing",
  COMBINED: "Combined / Signature",
  SIGNATURE: "Signature",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setServices(await getAllServices());
    });
  }, []);

  function handleToggle(id: string) {
    startTransition(async () => {
      await toggleServiceActive(id);
      setServices(await getAllServices());
    });
  }

  function handleSave(id: string, form: FormData) {
    startTransition(async () => {
      await updateService(id, {
        name: form.get("name") as string,
        description: form.get("description") as string,
        price: Math.round(parseFloat(form.get("price") as string) * 100),
        duration: parseInt(form.get("duration") as string),
      });
      setServices(await getAllServices());
      setEditingId(null);
    });
  }

  function handleCreate(form: FormData) {
    startTransition(async () => {
      await createService({
        name: form.get("name") as string,
        category: form.get("category") as "MASSAGE" | "HEALING" | "COMBINED" | "SIGNATURE",
        description: form.get("description") as string,
        price: Math.round(parseFloat(form.get("price") as string) * 100),
        duration: parseInt(form.get("duration") as string),
      });
      setServices(await getAllServices());
      setShowAdd(false);
    });
  }

  // Group by category
  const grouped = services.reduce(
    (acc, s) => {
      const cat = s.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(s);
      return acc;
    },
    {} as Record<string, Service[]>
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-headline text-2xl font-medium text-on-surface">
          Services
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all"
        >
          {showAdd ? "Cancel" : "+ Add Service"}
        </button>
      </div>

      {showAdd && (
        <form
          action={handleCreate}
          className="bg-surface-container rounded-xl p-6 mb-8 space-y-3"
        >
          <h2 className="font-headline text-lg font-medium text-on-surface mb-2">
            New Service
          </h2>
          <input
            name="name"
            placeholder="Service name"
            required
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
          <select
            name="category"
            required
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          >
            <option value="MASSAGE">Massage</option>
            <option value="HEALING">Healing</option>
            <option value="COMBINED">Combined / Signature</option>
          </select>
          <input
            name="description"
            placeholder="Short description"
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          />
          <div className="flex gap-3">
            <div>
              <label className="text-xs text-on-surface-variant">Price (£)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="50"
                className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant">Duration (min)</label>
              <input
                name="duration"
                type="number"
                required
                placeholder="60"
                className="w-20 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Service"}
          </button>
        </form>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-8">
          <h2 className="font-headline text-lg font-medium text-on-surface mb-3">
            {CATEGORY_LABELS[category] || category}
          </h2>

          <div className="space-y-2">
            {items.map((service) => (
              <div
                key={service.id}
                className="bg-surface-container rounded-xl p-4"
              >
                {editingId === service.id ? (
                  <form
                    action={(formData) => handleSave(service.id, formData)}
                    className="space-y-3"
                  >
                    <input
                      name="name"
                      defaultValue={service.name}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
                    />
                    <input
                      name="description"
                      defaultValue={service.description || ""}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
                    />
                    <div className="flex gap-3">
                      <div>
                        <label className="text-xs text-on-surface-variant">
                          Price (£)
                        </label>
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={(service.price / 100).toFixed(2)}
                          className="w-24 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-on-surface-variant">
                          Duration (min)
                        </label>
                        <input
                          name="duration"
                          type="number"
                          defaultValue={service.duration}
                          className="w-20 px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
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
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            service.active
                              ? "text-on-surface"
                              : "text-on-surface-variant line-through"
                          }`}
                        >
                          {service.name}
                        </span>
                        {!service.active && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                            Disabled
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        £{(service.price / 100).toFixed(0)} · {service.duration}{" "}
                        min
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingId(service.id)}
                      className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggle(service.id)}
                      disabled={isPending}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        service.active
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {service.active ? "Disable" : "Enable"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
