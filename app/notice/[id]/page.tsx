import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotice, getNotices } from "@/lib/data";
import { deadlineLabel, daysLeft, summary, typeExplain } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return (await getNotices()).map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const n = await getNotice(id);
  if (!n) return { title: "Notice not found" };
  return {
    title: `${n.place}, ${n.district} — KHB ${n.type}`,
    description: `KHB ${n.type} in ${n.place}, ${n.district}. Last date to apply: ${deadlineLabel(n.deadline)}. Official notification, apply dates and how to apply.`,
    alternates: { canonical: `/notice/${n.id}` },
  };
}

export default async function NoticePage({ params }: Props) {
  const { id } = await params;
  const n = await getNotice(id);
  if (!n) notFound();

  const dl = daysLeft(n.deadline);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: `${n.place} — KHB ${n.type}`,
    serviceType: "Residential plot allotment",
    areaServed: { "@type": "AdministrativeArea", name: `${n.district}, Karnataka` },
    provider: { "@type": "GovernmentOrganization", name: "Karnataka Housing Board" },
    url: n.pdf_url,
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700">
        <span aria-hidden className="text-lg leading-none">←</span> Back to all plots
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/district/${n.district.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-xs font-semibold uppercase tracking-wide text-emerald-700 hover:underline">
            {n.district !== "Other" ? `${n.district} district` : "Karnataka"}
          </Link>
          <StatusBadge notice={n} />
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{n.place}</h1>
        <p className="mt-1 text-sm text-slate-500">{n.board} · {n.type}{n.title_kn ? ` · ${n.title_kn}` : ""}</p>
      </header>

      {/* Apply window */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Box label="Apply from" value={n.start ? deadlineLabel(n.start) : "See PDF"} />
        <Box label="Last date" value={deadlineLabel(n.deadline)} highlight />
        <Box label="Days left" value={dl == null ? "—" : dl < 0 ? "Closed" : `${dl}`} />
      </div>

      {/* Summary */}
      <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
        <p className="leading-7 text-slate-700">{summary(n)}</p>
      </section>

      <div className="my-6"><AdSlot /></div>

      {/* How to apply */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">How to apply</h2>
        <ol className="mt-3 space-y-3">
          {[
            "Open the official notification (PDF) below and check plot sizes, prices, income category and eligibility.",
            "Go to the KHB online application portal and register / fill the application before the last date.",
            "Pay the registration fee + initial deposit online (the deposit is refunded if you are not allotted).",
            n.type === "e-Auction"
              ? "Place your bid above the upset price during the auction window — highest bid wins."
              : "Allotment is decided by a computerised lottery if applications exceed available sites.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        {!n.apply_url && (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-600/20">
            Online application for this project is <strong>not open on the KHB portal yet</strong>. Read the official
            notice (PDF) below for the dates and exact steps — apply once it opens.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          {n.apply_url ? (
            <>
              <a href={n.apply_url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
                Apply for this project ↗
              </a>
              <a href={n.pdf_url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                Official notification (PDF) ↗
              </a>
            </>
          ) : (
            <a href={n.pdf_url} target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
              Official notice & how to apply (PDF) ↗
            </a>
          )}
          <a href={n.maps_url} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-stone-50">
            See location on map ↗
          </a>
          <a href={n.price_url} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-stone-50">
            Check area prices ↗
          </a>
        </div>
        {n.apply_url && (
          <p className="mt-4 text-sm text-slate-500">
            Already applied?{" "}
            <a href={n.oldapp_url} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 hover:underline">
              Returning-applicant login ↗
            </a>
          </p>
        )}
      </section>

      {/* Eligibility */}
      <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Who can apply & what it means</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{typeExplain(n.type)}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sites are allotted across income categories — <strong>EWS, LIG, MIG and HIG</strong> — each with its own
          registration fee and deposit. You apply as an individual resident of Karnataka with ID and income proof.
        </p>
      </section>

      <p className="mt-6 text-xs leading-5 text-slate-400">
        GruhaAlert is not affiliated with the Karnataka Housing Board. This page summarises a public notification and
        may contain errors — always confirm every detail on the official PDF and at khb.karnataka.gov.in before applying.
      </p>
    </div>
  );
}

function Box({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 text-center ${highlight ? "border-amber-200 bg-amber-50" : "border-stone-200 bg-white"}`}>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className={`mt-1 text-base font-bold ${highlight ? "text-amber-700" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}
