import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important notice about GruhaAlert's independence and accuracy of information.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 text-sm leading-6 text-slate-700">
      <h1 className="text-2xl font-bold text-gray-900">Disclaimer</h1>
      <p className="mt-4">
        GruhaAlert is an <strong>independent information service</strong>. We are <strong>not affiliated with,
        endorsed by, or connected to the Karnataka Housing Board (KHB)</strong>, the Government of Karnataka, or
        any government department.
      </p>
      <p className="mt-3">
        All listings are summarised from publicly available KHB notifications and are provided for general
        information only. Dates, prices, eligibility and availability can change without notice and may contain
        errors introduced during automated processing.
      </p>
      <p className="mt-3">
        <strong>Always verify every detail on the official notification (PDF)</strong> and on
        {" "}<a className="text-indigo-600 hover:underline" href="https://khb.karnataka.gov.in">khb.karnataka.gov.in</a>{" "}
        before applying or making any payment. GruhaAlert accepts no liability for any decision made based on
        information on this site.
      </p>
    </div>
  );
}
