import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guides — Understanding KHB plots & allotment",
  description:
    "Simple guides to Karnataka Housing Board plots: how allotment works, income categories (EWS/LIG/MIG/HIG), documents needed, and KHB vs MUDA vs BDA.",
  alternates: { canonical: "/guides" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "KHB plot & allotment guides",
  itemListElement: GUIDES.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.title,
    url: `${SITE_URL}/guides/${g.slug}`,
  })),
};

export default function GuidesIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Guides</h1>
      <p className="mt-2 text-base text-slate-600">
        Everything you need to understand KHB plots and apply with confidence — in plain English.
      </p>

      <div className="mt-8 space-y-4">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`}
            className="block rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-900">{g.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{g.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">Read guide →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
