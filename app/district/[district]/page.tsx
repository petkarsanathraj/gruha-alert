import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDistricts, getNoticesByDistrict } from "@/lib/data";
import { sortNotices, unslugDistrict, slugifyDistrict, MAJOR_DISTRICTS } from "@/lib/format";
import NoticeCard from "@/components/NoticeCard";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

type Props = { params: Promise<{ district: string }> };

const majorSlugs = new Set(MAJOR_DISTRICTS.map(slugifyDistrict));

export async function generateStaticParams() {
  const fromData = (await getDistricts()).map((d) => d.slug);
  return [...new Set([...majorSlugs, ...fromData])].map((district) => ({ district }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district } = await params;
  const name = titleCase(unslugDistrict(district));
  const list = (await getNoticesByDistrict(district)).filter((n) => n.status !== "closed");
  return {
    title: `KHB Plots in ${name}`,
    description: `Open Karnataka Housing Board plots, sites and e-auctions in ${name} district — with last dates and official links. Updated daily.`,
    alternates: { canonical: `/district/${district}` },
    // don't index empty district pages (thin content) until they have listings
    robots: list.length ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { district } = await params;
  const open = sortNotices(await getNoticesByDistrict(district)).filter((n) => n.status !== "closed");
  const name = titleCase(unslugDistrict(district));

  // unknown district with no data → 404; known/major district → empty state
  if (open.length === 0 && !majorSlugs.has(district)) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700">
        <span aria-hidden className="text-lg leading-none">←</span> Back to all plots
      </Link>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">KHB plots in {name}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {open.length} open notice{open.length === 1 ? "" : "s"} in {name} district.
      </p>

      <div className="my-7"><AdSlot /></div>

      {open.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {open.map((n) => <NoticeCard key={n.id} notice={n} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-slate-700">No open KHB plots in {name} right now.</p>
          <p className="mt-1 text-sm text-slate-500">New notices are added daily. Check back soon, or browse other districts.</p>
          <Link href="/" className="mt-5 inline-block rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
            See all open plots
          </Link>
        </div>
      )}
    </div>
  );
}

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
