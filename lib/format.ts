import type { Notice } from "./types";

export function daysLeft(deadline: string | null): number | null {
  if (!deadline) return null;
  const end = new Date(deadline + "T23:59:59");
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

export function deadlineLabel(deadline: string | null): string {
  if (!deadline) return "Not specified";
  const [y, m, d] = deadline.split("-");
  return `${d}-${m}-${y}`;
}

export function statusBadge(n: Notice): { text: string; tone: "green" | "amber" | "gray" } {
  if (n.status === "open") {
    const dl = daysLeft(n.deadline);
    return { text: dl != null ? `Open · ${dl} day${dl === 1 ? "" : "s"} left` : "Open", tone: dl != null && dl <= 7 ? "amber" : "green" };
  }
  if (n.status === "closed") return { text: "Closed", tone: "gray" };
  return { text: "Check PDF for dates", tone: "amber" };
}

// Sort: open first, then soonest deadline, unknown last.
export function sortNotices(list: Notice[]): Notice[] {
  const rank = (s: string) => (s === "open" ? 0 : s === "unknown" ? 1 : 2);
  return [...list].sort((a, b) =>
    rank(a.status) - rank(b.status) ||
    (daysLeft(a.deadline) ?? 99999) - (daysLeft(b.deadline) ?? 99999));
}

export const slugifyDistrict = (d: string) => d.toLowerCase().replace(/\s+/g, "-");
export const unslugDistrict = (s: string) => s.replace(/-/g, " ");

// Plain-English, reliable copy generated from the structured fields.
export function typeExplain(type: string): string {
  switch (type) {
    case "Demand survey":
      return "KHB is gauging public demand before developing this layout. Register your interest now — if enough people apply, sites are developed and allotted by lottery.";
    case "e-Auction":
      return "KHB sells developed sites and houses to the highest bidder above an upset (reserve) price, through an online auction.";
    case "Extended":
      return "The application deadline for this KHB layout has been extended — you can still apply online before the new last date.";
    case "Apply online":
      return "Apply online for a residential site or house in this KHB layout. Allotment is by computerised lottery across EWS / LIG / MIG / HIG income categories.";
    default:
      return "A KHB residential layout open for application. Apply online before the last date; allotment is by computerised lottery across income categories.";
  }
}

export function summary(n: Notice): string {
  const where = n.district && n.district !== "Other" ? `${n.place}, ${n.district} district` : n.place;
  const window =
    n.start && n.deadline ? ` Applications are open from ${deadlineLabel(n.start)} to ${deadlineLabel(n.deadline)}.` :
    n.deadline ? ` The last date to apply is ${deadlineLabel(n.deadline)}.` : "";
  return `The Karnataka Housing Board (KHB) has invited applications for residential plots in ${where}.${window} ${typeExplain(n.type)}`;
}

// Major Karnataka districts the scraper can classify — these always get a page
// (with an empty state when nothing is open), so e.g. /district/mysore never 404s.
export const MAJOR_DISTRICTS = [
  "Bangalore", "Mysore", "Davanagere", "Kodagu", "Mandya", "Chamarajanagar",
  "Dharwad", "Kalaburagi", "Koppal", "Gadag", "Vijayapura", "Raichur",
  "Bagalkote", "Chikkamagaluru",
];
