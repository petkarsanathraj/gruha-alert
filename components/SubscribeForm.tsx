"use client";
import { useState } from "react";

export default function SubscribeForm({ districts }: { districts: string[] }) {
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, districts: district ? [district] : [] }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200">
        ✓ You&apos;re subscribed. We&apos;ll email you when new plots open.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-semibold text-gray-900">Get an email when new plots open</p>
      <p className="mt-1 text-xs text-gray-500">Free. No spam. Unsubscribe anytime.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <select
          value={district} onChange={(e) => setDistrict(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">All districts</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <button
          type="submit" disabled={state === "loading"}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {state === "loading" ? "…" : "Notify me"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
