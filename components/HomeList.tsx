"use client";
import { useMemo, useState } from "react";
import type { Notice } from "@/lib/types";
import NoticeCard from "./NoticeCard";

export default function HomeList({ notices }: { notices: Notice[] }) {
  const [district, setDistrict] = useState("All");
  const [type, setType] = useState("All");

  const districts = useMemo(
    () => ["All", ...Array.from(new Set(notices.map((n) => n.district))).sort()],
    [notices],
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(notices.map((n) => n.type))).sort()],
    [notices],
  );

  const filtered = notices.filter(
    (n) => (district === "All" || n.district === district) && (type === "All" || n.type === type),
  );

  return (
    <div>
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <Chips label="Choose a district" value={district} options={districts} onChange={setDistrict} />
        <div className="mt-4 border-t border-stone-100 pt-4">
          <Chips label="Type of notice" value={type} options={types} onChange={setType} />
        </div>
      </div>

      <p className="mt-6 text-base text-slate-600">
        <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "plot is" : "plots are"} shown below
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => <NoticeCard key={n.id} notice={n} />)}
      </div>
      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-base text-slate-500">
          No plots match this filter. Tap <span className="font-semibold text-slate-700">All</span> to see everything.
        </div>
      )}
    </div>
  );
}

function Chips({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-semibold text-slate-500">{label}</p>
      {/* swipeable on mobile, wraps on desktop — like property apps */}
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition ${
              value === o
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-stone-100 text-slate-700 hover:bg-stone-200"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
