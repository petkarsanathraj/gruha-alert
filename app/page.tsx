import type { Metadata } from "next";
import Link from "next/link";
import { getNotices, getDistricts } from "@/lib/data";
import { sortNotices } from "@/lib/format";
import { SITE_URL, faqPageJsonLd } from "@/lib/seo";
import HomeList from "@/components/HomeList";
import SubscribeForm from "@/components/SubscribeForm";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE_URL },
};

const HOME_FAQS = [
  {
    q: "What is the Karnataka Housing Board (KHB)?",
    a: "KHB is a Karnataka government board that develops residential layouts across the state and allots sites and houses to the public through applications, a computerised lottery, or e-auctions.",
  },
  {
    q: "How can I check which KHB plots are open to apply for now?",
    a: "GruhaAlert lists every open KHB residential plot, site and e-auction in one place — with the last date to apply and a direct link to the official notification. The list is updated daily.",
  },
  {
    q: "How do I apply for a KHB site online?",
    a: "Open the notification for the project, apply on the KHB portal, choose your income category (EWS/LIG/MIG/HIG), and pay the registration fee plus initial deposit before the last date. The deposit is refunded if you are not allotted.",
  },
  {
    q: "Who is eligible for a KHB plot?",
    a: "Any individual or family who is a resident of Karnataka can apply, under an income category, with ID and income proof. Reservation quotas apply for SC/ST, women, ex-servicemen and other categories.",
  },
  {
    q: "What is the difference between KHB, BDA and MUDA?",
    a: "KHB allots sites statewide, BDA covers the Bengaluru region and MUDA covers the Mysuru area. The application and lottery process is similar — the jurisdiction differs.",
  },
];

export default async function HomePage() {
  const all = await getNotices();
  const notices = sortNotices(all.filter((n) => n.status !== "closed"));
  const districts = await getDistricts();
  const openCount = notices.filter((n) => n.status === "open").length;
  const updated = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Open KHB plots & sites in Karnataka",
      numberOfItems: notices.length,
      itemListElement: notices.slice(0, 20).map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${n.place} — KHB ${n.type}`,
        url: `${SITE_URL}/notice/${n.id}`,
      })),
    },
    faqPageJsonLd(HOME_FAQS),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero — condensed so listings are visible fast on mobile */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-5 sm:py-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Updated {updated}
          </p>
          <h1 className="mt-3 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Open Karnataka Housing Board plots & sites —{" "}
            <span className="text-emerald-700">in plain English.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            See which KHB plots are open to apply for right now — with the last date and a direct link to apply.
            Simple, clear, and free.
          </p>

          <div className="mt-5 flex gap-3 text-center">
            <Stat value={String(openCount)} label="Open now" accent />
            <Stat value={String(districts.length)} label="Districts" />
            <Stat value="Daily" label="Updated" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-5 sm:py-10">
        <h2 className="text-2xl font-bold text-slate-900">Plots open to apply now</h2>
        <p className="mb-5 mt-1 text-base text-slate-600">Apply before the last date shown on each plot.</p>
        <HomeList notices={notices} />

        <div className="my-10"><AdSlot /></div>

        {/* Email signup — placed AFTER the listings (value first) */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
          <SubscribeForm districts={districts.map((d) => d.name)} />
        </section>

        {/* Browse by district (also helps Google find district pages) */}
        {districts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Browse by district</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {districts.map((d) => (
                <Link key={d.slug} href={`/district/${d.slug}`}
                  className="rounded-full bg-white px-4 py-2 text-base font-medium text-slate-700 ring-1 ring-stone-200 hover:bg-emerald-50 hover:text-emerald-700">
                  {d.name} · {d.count}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Explainer */}
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">How KHB plot allotment works</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <Explain title="Who can apply"
              body="Any individual or family resident in Karnataka. You apply under an income category — EWS, LIG, MIG or HIG — with ID and income proof." />
            <Explain title="How sites are given"
              body="When applications exceed available sites, allotment is by a transparent computerised lottery. For e-auctions, sites go to the highest bidder above a reserve price." />
            <Explain title="What you pay"
              body="A small non-refundable registration fee plus an initial deposit when applying (refunded if not allotted). The site cost is paid after allotment, in instalments." />
          </div>
          <p className="mt-6 rounded-xl bg-stone-50 p-4 text-sm text-slate-600">
            <strong className="font-semibold text-slate-800">Note:</strong> KHB <em>CA (Civic Amenity) sites</em> are
            for registered institutions only and are <strong>not</strong> for individuals — we exclude them so you
            only see plots you can actually apply for.
          </p>
        </section>

        {/* FAQ — targets People-Also-Ask + FAQPage rich results */}
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-stone-100">
            {HOME_FAQS.map((f, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <h3 className="text-base font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs leading-5 text-slate-400">
          GruhaAlert is an independent information service, not affiliated with the Karnataka Housing Board. Details
          are summarised from public notifications and may change — always verify on the official PDF and at
          khb.karnataka.gov.in before applying.
        </p>
      </div>
    </>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`flex-1 rounded-xl border p-3 ${accent ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-white"}`}>
      <p className={`text-2xl font-bold ${accent ? "text-emerald-700" : "text-slate-900"}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function Explain({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-base leading-7 text-slate-600">{body}</p>
    </div>
  );
}
