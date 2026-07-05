// IndexNow — instantly notify Bing (and other IndexNow engines) when notice
// URLs change, so fresh KHB notices get indexed in minutes instead of days.
//
// The key is intentionally public: IndexNow validates ownership by fetching
// https://<host>/<key>.txt and checking it contains this exact key.
//
// This module NEVER throws — a ping failure must not break the daily publish.

export const INDEXNOW_KEY = "eb7f27b4d38d42fcb4d122e3f8220517";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gruha-alert.vercel.app").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;

/**
 * Notify IndexNow of changed URLs.
 * @param {string[]} urls - absolute URLs that were added or changed
 * @param {{dryRun?: boolean}} [opts]
 * @returns {Promise<{ok: boolean, status?: number, count: number, skipped?: string}>}
 */
export async function pingIndexNow(urls, { dryRun = false } = {}) {
  const list = [...new Set(urls)].filter(Boolean).slice(0, 10000);
  if (list.length === 0) return { ok: true, count: 0, skipped: "no urls" };

  if (!process.env.INDEXNOW_ENABLED && !dryRun) {
    return { ok: true, count: list.length, skipped: "INDEXNOW_ENABLED not set" };
  }

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: list,
  };

  if (dryRun) {
    console.log(`[indexnow] DRY RUN — would submit ${list.length} url(s):`);
    for (const u of list) console.log(`  ${u}`);
    return { ok: true, count: list.length, skipped: "dry run" };
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    // IndexNow returns 200 or 202 on success.
    const ok = res.ok || res.status === 202;
    console.log(`[indexnow] submitted ${list.length} url(s) → HTTP ${res.status}`);
    return { ok, status: res.status, count: list.length };
  } catch (e) {
    console.warn(`[indexnow] ping failed (non-fatal): ${e.message}`);
    return { ok: false, count: list.length };
  }
}

/**
 * Diff new records against the previous seed to find added/changed notice URLs.
 * A notice is "changed" if it is new, or its deadline/status/apply_url changed.
 * @param {Array} oldRecords
 * @param {Array} newRecords
 * @returns {string[]} absolute URLs to submit (changed notices + home + sitemap)
 */
export function changedUrls(oldRecords, newRecords) {
  const prev = new Map((oldRecords || []).map((r) => [r.id, r]));
  const changedIds = [];
  for (const n of newRecords || []) {
    const o = prev.get(n.id);
    if (!o || o.deadline !== n.deadline || o.status !== n.status || o.apply_url !== n.apply_url) {
      changedIds.push(n.id);
    }
  }
  if (changedIds.length === 0) return [];
  const urls = changedIds.map((id) => `${SITE_URL}/notice/${id}`);
  // Home + sitemap always change when any notice changes.
  urls.push(`${SITE_URL}/`, `${SITE_URL}/sitemap.xml`);
  return urls;
}
