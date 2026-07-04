import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What GruhaAlert is, where the data comes from, and how to use it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 text-slate-700">
      <h1 className="text-2xl font-bold text-gray-900">About GruhaAlert</h1>
      <p className="mt-4">
        GruhaAlert helps people in Karnataka discover <strong>open Karnataka Housing Board (KHB) residential
        plots, sites, houses and e-auctions</strong> — in plain English, with the last date to apply and a link
        to the official notification.
      </p>
      <h2 className="mt-6 text-lg font-semibold text-gray-900">Where the data comes from</h2>
      <p className="mt-2">
        We collect publicly available notifications from the official KHB website
        (<a className="text-indigo-600 hover:underline" href="https://khb.karnataka.gov.in">khb.karnataka.gov.in</a>),
        read the key details (district, type, last date), and present them in one searchable place. Listings are
        refreshed daily.
      </p>
      <h2 className="mt-6 text-lg font-semibold text-gray-900">What we don&apos;t do</h2>
      <p className="mt-2">
        We don&apos;t accept applications, take payments, or guarantee allotments. We are an independent
        information service, <strong>not affiliated with the Karnataka Housing Board</strong> or any government
        body. Always verify on the official PDF before acting.
      </p>
      <h2 className="mt-6 text-lg font-semibold text-gray-900">Civic Amenity (CA) sites</h2>
      <p className="mt-2">
        We intentionally exclude KHB <em>CA (Civic Amenity) sites</em>, which are allotted only to registered
        institutions — not individuals. GruhaAlert focuses on residential opportunities open to the public.
      </p>
    </div>
  );
}
