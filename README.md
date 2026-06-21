# GruhaAlert 🏠

A public website that lists **open Karnataka Housing Board (KHB) residential plots, sites,
houses and e-auctions** across Karnataka — with last dates, district pages, and links to the
official notifications. Earns via Google AdSense. Built with Next.js + Supabase.

It reuses the scraper from the local `khb-watch` tool, moved to a free cloud cron so it runs
24×7 (no laptop needed).

---

## Run it locally (no accounts needed)
```sh
npm install
npm run dev      # http://localhost:3000
```
The site runs on committed **`data/seed.json`** until Supabase is configured. Refresh the seed:
```sh
node worker/scrape.mjs    # rewrites data/seed.json from live KHB
```

## How it's wired
- `worker/lib.mjs` + `worker/scrape.mjs` — scraper (fetch KHB → classify → OCR scanned PDFs for
  the last date). Writes to **Supabase** if `SUPABASE_URL`/`SUPABASE_SERVICE_KEY` are set, else to `data/seed.json`.
- `lib/data.ts` — reads from Supabase when configured, else the seed file.
- `app/` — Next.js App Router pages: home, `/notice/[id]` (SEO target), `/district/[slug]`, about/privacy/disclaimer/contact, `sitemap.ts`, `robots.ts`.
- `.github/workflows/scrape.yml` — daily cloud scrape (installs poppler+tesseract) → upserts Supabase.
- `supabase/schema.sql` — DB tables + RLS.

---

## Going live (the steps that need YOUR accounts)

1. **Supabase** → create a project → SQL editor → paste `supabase/schema.sql` → run.
   Copy from Project Settings → API: `Project URL`, `anon` key, `service_role` key.
2. **GitHub** → create a repo, push this folder. In repo **Settings → Secrets → Actions** add
   `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`. Run the workflow once (Actions tab → "Run workflow")
   to fill the DB.
3. **Vercel** → New Project → import the GitHub repo → add Environment Variables:
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` (your live URL)
   - (later) `NEXT_PUBLIC_ADSENSE_CLIENT`, `SUPABASE_SERVICE_KEY`
   Deploy → you get a live `*.vercel.app` URL. (A custom domain helps AdSense approval.)
4. **Google AdSense** → sign up with your live URL → add the publisher id as
   `NEXT_PUBLIC_ADSENSE_CLIENT` and update `public/ads.txt` → submit for review.
   *Approval takes days–weeks and needs real content + the Privacy Policy page (already included).*

Until step 4 is approved, ad slots show a tasteful "Ad space" placeholder.

## Notes
- CA (Civic Amenity) sites are intentionally excluded (institutions only, not individuals).
- Market/plot prices are not auto-scraped — each notice links to a 99acres search for that area.
- Email signups are collected now; sending the emails (Resend) is a later step.
