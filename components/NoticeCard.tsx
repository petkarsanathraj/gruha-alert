import Link from "next/link";
import type { Notice } from "@/lib/types";
import { deadlineLabel, daysLeft } from "@/lib/format";
import StatusBadge from "./StatusBadge";

export default function NoticeCard({ notice }: { notice: Notice }) {
  const dl = daysLeft(notice.deadline);
  return (
    <Link
      href={`/notice/${notice.id}`}
      className="group flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 transition hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            {notice.district !== "Other" ? notice.district : "Karnataka"}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-snug text-slate-900">{notice.place}</h3>
        </div>
        <StatusBadge notice={notice} />
      </div>

      <span className="mt-3 inline-flex w-fit rounded-md bg-stone-100 px-2.5 py-1 text-sm font-medium text-slate-700">
        {notice.type}
      </span>

      <div className="mt-4 rounded-xl bg-stone-50 p-4">
        <p className="text-sm font-medium text-slate-500">Apply before</p>
        <div className="mt-0.5 flex items-baseline justify-between">
          <p className="text-lg font-bold text-slate-900">{deadlineLabel(notice.deadline)}</p>
          {dl != null && dl >= 0 && (
            <p className={`text-base font-bold ${dl <= 7 ? "text-amber-600" : "text-emerald-700"}`}>
              {dl} days left
            </p>
          )}
        </div>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-emerald-700 group-hover:gap-2.5 group-hover:transition-all">
        View details & how to apply <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
