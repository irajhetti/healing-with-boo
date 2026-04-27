"use client";

import { useEffect, useState, useTransition } from "react";
import { getMembers, getMemberConsultation } from "../actions/members";

type Member = Awaited<ReturnType<typeof getMembers>>[number];
type Consultation = Awaited<ReturnType<typeof getMemberConsultation>>;

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<Record<string, Consultation>>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setMembers(await getMembers());
    });
  }, []);

  function handleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (!consultations[id]) {
      startTransition(async () => {
        const data = await getMemberConsultation(id);
        setConsultations((prev) => ({ ...prev, [id]: data }));
      });
    }
  }

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      !q ||
      m.name?.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-medium text-on-surface mb-1">
          Members
        </h1>
        <p className="text-sm text-on-surface-variant">
          View member profiles and consultation answers
        </p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full max-w-sm px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/50 mb-6"
      />

      <div className="space-y-2">
        {filtered.map((member) => (
          <div key={member.id} className="bg-surface-container rounded-xl p-4">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-on-surface">
                    {member.name || "No name"}
                  </span>
                  {member.hasConsultation && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                      Form filled
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant">
                  {member.email}
                  {member.phone && ` · ${member.phone}`}
                  {" · Joined "}
                  {new Date(member.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <button
                onClick={() => handleExpand(member.id)}
                className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {expandedId === member.id ? "Hide" : "View"}
              </button>
            </div>

            {expandedId === member.id && (
              <div className="mt-4 pt-4 border-t border-outline-variant/20">
                {!consultations[member.id] ? (
                  <p className="text-xs text-on-surface-variant">Loading...</p>
                ) : (
                  <ConsultationView data={consultations[member.id]} />
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && !isPending && (
          <p className="text-on-surface-variant text-sm text-center py-8">
            {search ? "No members match your search." : "No members registered yet."}
          </p>
        )}
      </div>
    </>
  );
}

function ConsultationView({ data }: { data: Consultation }) {
  return (
    <div className="space-y-4">
      {/* Existing preferences */}
      <div>
        <h3 className="text-xs font-label font-medium text-on-surface-variant uppercase tracking-wider mb-2">
          Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="bg-surface-container-lowest rounded-lg px-3 py-2">
            <span className="text-xs text-on-surface-variant">Pressure:</span>{" "}
            <span className="text-sm text-on-surface">{data.pressurePref}</span>
          </div>
          <div className="bg-surface-container-lowest rounded-lg px-3 py-2">
            <span className="text-xs text-on-surface-variant">Health Notes:</span>{" "}
            <span className="text-sm text-on-surface">{data.healthNotes || "None"}</span>
          </div>
        </div>
      </div>

      {/* Consultation answers */}
      {data.questions.length > 0 && (
        <div>
          <h3 className="text-xs font-label font-medium text-on-surface-variant uppercase tracking-wider mb-2">
            Consultation Answers
          </h3>
          <div className="space-y-2">
            {data.questions.map((q) => (
              <div key={q.id} className="bg-surface-container-lowest rounded-lg px-3 py-2">
                <p className="text-xs text-on-surface-variant">
                  {q.label}
                  {!q.active && " (retired)"}
                </p>
                <p className={`text-sm ${q.answer ? "text-on-surface" : "text-on-surface-variant/50 italic"}`}>
                  {q.answer
                    ? q.type === "YES_NO"
                      ? q.answer === "true" ? "Yes" : "No"
                      : q.answer
                    : "Not answered"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
