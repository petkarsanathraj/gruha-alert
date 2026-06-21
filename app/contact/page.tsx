import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GruhaAlert.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 text-sm leading-6 text-slate-700">
      <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
      <p className="mt-4">
        Questions, corrections, a missing notification, or a data-deletion request? We&apos;d love to hear from you.
      </p>
      <p className="mt-3">
        Email: <a className="text-indigo-600 hover:underline" href="mailto:hello@gruha-alert.example">hello@gruha-alert.example</a>
      </p>
      <p className="mt-3 text-gray-500">
        (Replace this with your real email before going live.)
      </p>
    </div>
  );
}
