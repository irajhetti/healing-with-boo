"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  toggleQuestionActive,
  reorderQuestions,
  deleteQuestion,
} from "../actions/consultation";

type Question = Awaited<ReturnType<typeof getAllQuestions>>[number];

const TYPE_LABELS: Record<string, string> = {
  SHORT_TEXT: "Short Text",
  LONG_TEXT: "Long Text",
  DROPDOWN: "Dropdown",
  YES_NO: "Yes / No",
};

export default function ConsultationPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      setQuestions(await getAllQuestions());
    });
  }, []);

  function handleCreate(form: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await createQuestion({
          label: form.get("label") as string,
          type: form.get("type") as Question["type"],
          options: (form.get("options") as string) || undefined,
          required: form.get("required") === "on",
        });
        setQuestions(await getAllQuestions());
        setShowAdd(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create");
      }
    });
  }

  function handleSave(id: string, form: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateQuestion(id, {
          label: form.get("label") as string,
          type: form.get("type") as Question["type"],
          options: (form.get("options") as string) || undefined,
          required: form.get("required") === "on",
        });
        setQuestions(await getAllQuestions());
        setEditingId(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update");
      }
    });
  }

  function handleToggle(id: string) {
    startTransition(async () => {
      await toggleQuestionActive(id);
      setQuestions(await getAllQuestions());
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this question? Member answers will also be removed.")) return;
    startTransition(async () => {
      await deleteQuestion(id);
      setQuestions(await getAllQuestions());
    });
  }

  function handleMove(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= questions.length) return;
    const reordered = [...questions];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setQuestions(reordered);
    startTransition(async () => {
      await reorderQuestions(reordered.map((q) => q.id));
    });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline text-2xl font-medium text-on-surface">
            Consultation Form
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Questions your members answer on their profile
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setError(null); }}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all"
        >
          {showAdd ? "Cancel" : "+ Add Question"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {error}
        </div>
      )}

      {showAdd && (
        <QuestionForm
          isPending={isPending}
          onSubmit={handleCreate}
          submitLabel="Add Question"
        />
      )}

      <div className="space-y-2">
        {questions.map((q, i) =>
          editingId === q.id ? (
            <div key={q.id} className="bg-surface-container rounded-xl p-4">
              <QuestionForm
                isPending={isPending}
                onSubmit={(form) => handleSave(q.id, form)}
                submitLabel="Save"
                defaults={q}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div key={q.id} className="bg-surface-container rounded-xl p-4">
              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                {/* Reorder arrows */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => handleMove(i, -1)}
                    disabled={i === 0 || isPending}
                    className="text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>
                  <button
                    onClick={() => handleMove(i, 1)}
                    disabled={i === questions.length - 1 || isPending}
                    className="text-on-surface-variant hover:text-on-surface disabled:opacity-20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-medium ${q.active ? "text-on-surface" : "text-on-surface-variant line-through"}`}>
                      {q.label}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high rounded-full text-xs text-on-surface-variant">
                      {TYPE_LABELS[q.type]}
                    </span>
                    {q.required && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                        Required
                      </span>
                    )}
                    {!q.active && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                        Disabled
                      </span>
                    )}
                  </div>
                  {q.type === "DROPDOWN" && q.options && (
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Options: {(JSON.parse(q.options) as string[]).join(", ")}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setEditingId(q.id)}
                  className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(q.id)}
                  disabled={isPending}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    q.active ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"
                  }`}
                >
                  {q.active ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  disabled={isPending}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}

        {questions.length === 0 && !isPending && (
          <p className="text-on-surface-variant text-sm text-center py-8">
            No questions yet. Add your first consultation question to get started.
          </p>
        )}
      </div>
    </>
  );
}

function QuestionForm({
  isPending,
  onSubmit,
  submitLabel,
  defaults,
  onCancel,
}: {
  isPending: boolean;
  onSubmit: (form: FormData) => void;
  submitLabel: string;
  defaults?: Question;
  onCancel?: () => void;
}) {
  const [type, setType] = useState<string>(defaults?.type || "SHORT_TEXT");

  return (
    <form action={onSubmit} className={defaults ? "space-y-3" : "bg-surface-container rounded-xl p-6 mb-8 space-y-3"}>
      {!defaults && (
        <h2 className="font-headline text-lg font-medium text-on-surface mb-2">
          New Question
        </h2>
      )}

      <input
        name="label"
        placeholder="Question text (e.g. Do you have any allergies?)"
        required
        defaultValue={defaults?.label}
        className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
      />

      <div className="flex gap-3 flex-wrap">
        <div>
          <label className="text-xs text-on-surface-variant">Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
          >
            <option value="SHORT_TEXT">Short Text</option>
            <option value="LONG_TEXT">Long Text</option>
            <option value="DROPDOWN">Dropdown</option>
            <option value="YES_NO">Yes / No</option>
          </select>
        </div>

        {type === "DROPDOWN" && (
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-on-surface-variant">Options (comma-separated)</label>
            <input
              name="options"
              placeholder="Option 1, Option 2, Option 3"
              defaultValue={
                defaults?.options
                  ? (JSON.parse(defaults.options) as string[]).join(", ")
                  : ""
              }
              className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm text-on-surface"
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
        <input
          type="checkbox"
          name="required"
          defaultChecked={defaults?.required}
          className="rounded border-outline-variant/30"
        />
        Required
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
