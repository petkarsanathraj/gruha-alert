import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gruha-alert.vercel.app";
const ADSENSE = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GruhaAlert — Open KHB Plots & Sites in Karnataka",
    template: "%s · GruhaAlert",
  },
  description:
    "Every open Karnataka Housing Board (KHB) residential plot, site, house and e-auction — in plain English, with apply dates and official links. Updated daily.",
  keywords: ["KHB plots", "Karnataka Housing Board", "KHB sites", "KHB e-auction", "plots in Karnataka", "Mysore plots", "Bangalore KHB", "KHB allotment", "KHB allotment 2026", "KHB new layout", "ಕರ್ನಾಟಕ ಗೃಹ ಮಂಡಳಿ"],
  openGraph: { type: "website", siteName: "GruhaAlert", url: SITE_URL, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "GruhaAlert — Open KHB Plots & Sites in Karnataka" },
  robots: { index: true, follow: true },
  // Search engine verification. Set these env vars in Vercel to the tokens each
  // console gives you, then redeploy:
  //   GOOGLE_SITE_VERIFICATION — Google Search Console
  //   BING_SITE_VERIFICATION   — Bing Webmaster Tools (the msvalidate.01 value)
  ...((process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION)
    ? {
        verification: {
          ...(process.env.GOOGLE_SITE_VERIFICATION
            ? { google: process.env.GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {ADSENSE && (
          <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`}
            crossOrigin="anonymous" strategy="afterInteractive" />
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-stone-50 font-sans text-slate-800 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
