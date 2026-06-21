import "server-only";
import type { Notice } from "./types";
import seed from "@/data/seed.json";
import { slugifyDistrict } from "./format";

// Reads from Supabase when configured; otherwise falls back to the committed
// seed.json so the site runs locally with zero infra.
const SB_URL = process.env.SUPABASE_URL;
const SB_ANON = process.env.SUPABASE_ANON_KEY;
const useSupabase = Boolean(SB_URL && SB_ANON);

async function sbSelect(query: string): Promise<Notice[]> {
  const res = await fetch(`${SB_URL}/rest/v1/notifications?${query}`, {
    headers: { apikey: SB_ANON!, Authorization: `Bearer ${SB_ANON!}` },
    next: { revalidate: 1800 }, // refresh at most every 30 min
  });
  if (!res.ok) throw new Error(`Supabase read failed: ${res.status}`);
  return res.json();
}

export async function getNotices(): Promise<Notice[]> {
  if (useSupabase) return sbSelect("select=*&order=status.asc,deadline.asc");
  return seed as unknown as Notice[];
}

export async function getNotice(id: string): Promise<Notice | null> {
  const all = await getNotices();
  return all.find((n) => n.id === id) ?? null;
}

export async function getDistricts(): Promise<{ name: string; slug: string; count: number }[]> {
  const all = await getNotices();
  const open = all.filter((n) => n.status !== "closed");
  const map = new Map<string, number>();
  for (const n of open) map.set(n.district, (map.get(n.district) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: slugifyDistrict(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getNoticesByDistrict(slug: string): Promise<Notice[]> {
  const all = await getNotices();
  return all.filter((n) => slugifyDistrict(n.district) === slug);
}
