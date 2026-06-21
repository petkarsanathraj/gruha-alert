import type { Notice } from "@/lib/types";
import { statusBadge } from "@/lib/format";

const TONES: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
  gray: "bg-slate-100 text-slate-500 ring-slate-500/20",
};

export default function StatusBadge({ notice }: { notice: Notice }) {
  const { text, tone } = statusBadge(notice);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${TONES[tone]}`}>
      {tone === "green" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      {text}
    </span>
  );
}
