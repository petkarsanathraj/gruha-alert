#!/usr/bin/env node
// GruhaAlert worker. Run locally to generate seed data, or in CI to upsert to Supabase.
//
//   node worker/scrape.mjs            -> writes ../data/seed.json (local/dev)
//   SUPABASE_URL=.. SUPABASE_SERVICE_KEY=.. node worker/scrape.mjs   -> upserts to Supabase
//
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { scrapeAll } from "./lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SEED = join(HERE, "..", "data", "seed.json");

async function main() {
  const records = await scrapeAll({ inspect: 40 });
  console.log(`scraped ${records.length} residential notices (${records.filter((r) => r.status === "open").length} open)`);

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (url && key) {
    // Upsert into Supabase. Preserve first_seen on conflict, refresh the rest.
    const rows = records.map((r) => ({ ...r, first_seen: undefined })); // let DB keep original first_seen
    const res = await fetch(`${url}/rest/v1/notifications?on_conflict=id`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(records),
    });
    if (!res.ok) throw new Error(`Supabase upsert failed: ${res.status} ${await res.text()}`);
    console.log(`upserted ${records.length} rows to Supabase`);
  } else {
    writeFileSync(SEED, JSON.stringify(records, null, 2));
    console.log(`wrote seed -> ${SEED} (no SUPABASE_URL/KEY set, dev mode)`);
  }
}

main().catch((e) => { console.error("worker failed:", e.message); process.exit(1); });
