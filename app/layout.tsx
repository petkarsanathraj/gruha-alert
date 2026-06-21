import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  keywords: ["KHB plots", "Karnataka Housing Board", "KHB sites", "KHB e-auction", "plots in Karnataka", "Mysore plots", "Bangalore KHB", "KHB allotment"],
  openGraph: { type: "website", siteName: "GruhaAlert", url: SITE_URL },
  robots: { index: true, follow: true },
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
