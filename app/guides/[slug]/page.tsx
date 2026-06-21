import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/lib/guides";
import AdSlot from "@/components/AdSlot";

export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "Guide not found" };
  return { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` } };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    about: "Karnataka Housing Board plot allotment",
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/guides"
        className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700">
        <span aria-hidden className="text-lg leading-none">←</span> All guides
      </Link>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{g.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">{g.intro}</p>

      <div className="my-7"><AdSlot /></div>

      <div className="space-y-7">
        {g.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-slate-900">{s.h}</h2>
            <div className="mt-2 space-y-2">
              {s.body.map((p, j) => (
                <p key={j} className="text-base leading-7 text-slate-700">{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
        <p className="text-base font-semibold text-slate-900">See which KHB plots are open right now</p>
        <Link href="/" className="mt-3 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
          Browse open plots →
        </Link>
      </div>

      <p className="mt-6 text-xs leading-5 text-slate-400">
        GruhaAlert is an independent information service, not affiliated with the Karnataka Housing Board. This guide
        is general information — always confirm current rules on the official KHB notification before applying.
      </p>
    </article>
  );
}
