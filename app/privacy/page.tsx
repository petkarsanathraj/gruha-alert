import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GruhaAlert handles your data, cookies, and advertising.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 text-sm leading-6 text-slate-700">
      <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Information we collect</h2>
      <p className="mt-2">
        GruhaAlert is largely browse-only. If you choose to subscribe to email alerts, we store the
        <strong> email address</strong> and <strong>district preferences</strong> you provide, solely to send you
        notifications about new KHB plots. You can ask us to delete this at any time.
      </p>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Cookies & advertising</h2>
      <p className="mt-2">
        We may use <strong>Google AdSense</strong> to display ads. Third-party vendors, including Google, use
        cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of
        advertising cookies enables it and its partners to serve ads to you based on your visit to our site
        and/or other sites on the Internet. You may opt out of personalised advertising by visiting
        {" "}<a className="text-indigo-600 hover:underline" href="https://www.google.com/settings/ads">Google Ads Settings</a>.
      </p>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Analytics</h2>
      <p className="mt-2">
        We may use privacy-friendly analytics to understand aggregate traffic. We do not sell your personal data.
      </p>

      <h2 className="mt-6 text-lg font-semibold text-gray-900">Contact</h2>
      <p className="mt-2">
        For any privacy request (including data deletion), see our <a className="text-indigo-600 hover:underline" href="/contact">Contact</a> page.
      </p>
    </div>
  );
}
