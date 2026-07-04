import type { Notice } from "./types";
import { deadlineLabel, daysLeft, typeExplain } from "./format";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gruha-alert.vercel.app";

export const SITE_NAME = "GruhaAlert";
export const SITE_TAGLINE =
  "Open Karnataka Housing Board (KHB) plots, sites & e-auctions — in plain English, updated daily.";

/** The year most relevant to a notice (its deadline, else its start). */
export function noticeYear(n: Notice): string | null {
  const src = n.deadline || n.start;
  return src ? src.slice(0, 4) : null;
}

/** Keyword-rich, intent-matching <title> for a notice page. */
export function noticeTitle(n: Notice): string {
  const y = noticeYear(n);
  const where = n.district && n.district !== "Other" ? `${n.place}, ${n.district}` : n.place;
  return `KHB ${n.type} in ${where}${y ? ` ${y}` : ""} — Apply Online, Last Date`;
}

/** Meta description tuned for how people actually search (English + a Kannada hook). */
export function noticeDescription(n: Notice): string {
  const where = n.district && n.district !== "Other" ? `${n.place}, ${n.district} district` : n.place;
  const dl = daysLeft(n.deadline);
  const when =
    n.deadline && dl != null && dl >= 0
      ? `Apply before ${deadlineLabel(n.deadline)} (${dl} day${dl === 1 ? "" : "s"} left).`
      : n.deadline
        ? `Last date to apply: ${deadlineLabel(n.deadline)}.`
        : "Check the official notification for the last date.";
  return `KHB ${n.type} in ${where}. ${when} Plot sizes, EWS/LIG/MIG/HIG prices, eligibility, documents and how to apply online — with the official Karnataka Housing Board notification (PDF).`;
}

/** Long-tail keyword set per notice, including the Kannada notice name if present. */
export function noticeKeywords(n: Notice): string[] {
  const y = noticeYear(n);
  const base = [
    `KHB ${n.place}`,
    `${n.place} KHB plots`,
    `KHB ${n.place} allotment${y ? ` ${y}` : ""}`,
    `KHB plots ${n.district}`,
    `${n.place} sites`,
    `KHB ${n.type}`,
    "Karnataka Housing Board",
  ];
  if (n.title_kn) base.push(n.title_kn);
  return base;
}

/** FAQ Q&A for a notice — rendered visibly AND emitted as FAQPage JSON-LD. */
export function noticeFaq(n: Notice): { q: string; a: string }[] {
  const isAuction = n.type === "e-Auction";
  const last = n.deadline
    ? `The last date to apply is ${deadlineLabel(n.deadline)}. Always confirm the exact date on the official KHB notification (PDF).`
    : "The last date is listed in the official KHB notification (PDF) — open it to confirm before you apply.";
  return [
    {
      q: `What is the last date to apply for KHB plots in ${n.place}?`,
      a: last,
    },
    {
      q: `How do I apply for a KHB ${isAuction ? "e-auction" : "site"} in ${n.place}?`,
      a: isAuction
        ? "Read the official notification for the upset (reserve) price and auction window, register on the KHB e-auction portal, pay the earnest money deposit, and place your bid before the auction closes. The highest bid above the reserve price wins."
        : "Open the official notification (PDF) to check plot sizes, prices and eligibility, then apply online on the KHB portal, choose your income category (EWS/LIG/MIG/HIG) and pay the registration fee plus initial deposit before the last date.",
    },
    {
      q: "Who can apply, and how are sites allotted?",
      a: isAuction
        ? "Any eligible resident of Karnataka can bid. Sites go to the highest bidder above the reserve price. " + typeExplain(n.type)
        : "Any individual or family resident in Karnataka, applying under an income category (EWS/LIG/MIG/HIG) with ID and income proof. When applications exceed available sites, allotment is by a transparent computerised lottery with reservation quotas.",
    },
    {
      q: "What documents do I need?",
      a: "Usually Aadhaar and PAN, a Karnataka residence/domicile proof, an income certificate for your category (EWS/LIG/MIG/HIG), a category certificate if you claim a reservation, and a declaration that you don't already own a government-allotted site. The notification lists the exact list.",
    },
    {
      q: `Is GruhaAlert the official Karnataka Housing Board website?`,
      a: "No. GruhaAlert is an independent service that summarises public KHB notifications in plain English. It is not affiliated with the Karnataka Housing Board. Always verify every detail on the official PDF and at khb.karnataka.gov.in before applying.",
    },
  ];
}

/** BreadcrumbList JSON-LD from [{name, path}] (path is relative to SITE_URL). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** FAQPage JSON-LD from Q&A pairs. */
export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Site-wide Organization + WebSite JSON-LD (emit once, in the root layout). */
export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      description: SITE_TAGLINE,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_TAGLINE,
      inLanguage: ["en-IN", "kn-IN"],
    },
  ];
}
