// GruhaAlert scraper core — ports the proven khb-watch logic and returns
// clean, structured records (no side effects). Used by worker/scrape.mjs.
import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, "cache");

export const HOMEPAGE = "https://khb.karnataka.gov.in";
export const APPLY_URL = "https://khb.karnataka.gov.in/23/online-application-for-allotment/en"; // general portal (lists all projects)
export const OLDAPP_URL = "https://khbepay.com/NEWAPPLICANT/OldApplicant.aspx"; // returning applicant (generic)
const APPFORM = (prj) => `https://khbepay.com/NEWAPPLICANT/AppForm.aspx?prj=${prj}`;
const STALE_DAYS = 45; // a dateless notice older than this is treated as closed

// Dynamically discover which projects are open for online application, and their
// prj ids, straight from the official KHB portal. Each AppForm.aspx?prj=N form
// states its own project name in the selected <option>, which we match to notices.
const STOP = new Set(["notification", "online", "applications", "application", "public",
  "notice", "layout", "village", "phase", "scheme", "project", "demand", "survey",
  "extension", "allotment", "remaining", "sites", "revised", "corrigendum", "master",
  "township", "housing", "board", "karnataka"]);

async function fetchProjectMap() {
  try {
    const res = await fetch(APPLY_URL, { headers: { "User-Agent": "Mozilla/5.0 GruhaAlert" } });
    const html = await res.text();
    const prjs = [...new Set([...html.matchAll(/AppForm\.aspx\?prj=(\d+)/gi)].map((m) => m[1]))];
    const out = [];
    for (const prj of prjs) {
      try {
        const f = await (await fetch(APPFORM(prj), { headers: { "User-Agent": "Mozilla/5.0 GruhaAlert" } })).text();
        const m = f.match(new RegExp(`selected="selected"\\s+value="${prj}">([^<]+)`, "i"));
        out.push({ prj, name: (m ? m[1] : "").toLowerCase() });
      } catch { /* skip */ }
    }
    return out;
  } catch { return []; }
}

function matchPrj(notice, projects) {
  const toks = (`${notice.place} ${notice.label_en} ${notice.district}`.toLowerCase().match(/[a-z]{5,}/g) || [])
    .filter((t) => !STOP.has(t));
  for (const p of projects) if (toks.some((t) => p.name.includes(t))) return p.prj;
  return null;
}

const RULES = {
  open: ["online application", "online notification", "ds notification", "demand survey",
    "public notification", "public notice", "notification", "time extension",
    "date extension", "e-auction", "eauction", "e auction"],
  drop_result: ["lottery list", "lottery schedule", "lottery date", "lottery", "final applicant",
    "final list", "final eligible", "provisional list", "provisional", "applicant list",
    "announcement", "proceedings", "master plan", "schedule", "finallist"],
  drop_irrelevant: ["ca sites", "ca properties", "corrigendum ca", "ca_", " ca ", "civic amenity",
    "tender", "technical", "quotation", "holiday", "letter about", "landlooser",
    "land looser", "landloser"],
};

const lc = (s) => (s || "").toLowerCase();
const hasAny = (s, list) => list.some((k) => lc(s).includes(k));

export function labelFromUrl(pdfUrl) {
  let name = decodeURIComponent(pdfUrl.split("/").pop() || "");
  name = name.replace(/\.pdf$/i, "").replace(/_\d{6,}$/, "");
  return name.replace(/[_%]+/g, " ").replace(/\s+/g, " ").trim();
}

function classify(title, pdfUrl) {
  const hay = `${title} ${labelFromUrl(pdfUrl)}`;
  if (hasAny(hay, RULES.drop_irrelevant)) return "irrelevant";
  if (hasAny(hay, RULES.drop_result)) return "result";
  if (hasAny(hay, RULES.open)) return "open";
  return "other";
}

const DISTRICTS = [
  ["ದಾವಣಗೆರೆ|ಜಗಳೂರು|ದೊಣ್ಣೆಹಳ್ಳಿ|davanagere|davangere|jagalur|donnehalli|kunduwada|harihara", "Davanagere"],
  ["ಮೈಸೂರು|ನಂಜನಗೂಡು|ಹೂಟಗಲ್ಲಿ|ಹುಣಸೂರು|mysore|mysuru|nanjanagud|nanjangud|narasipur|hootagalli|hunsur|mukanahalli|yelwal|kesare", "Mysore"],
  ["ಬೆಂಗಳೂರು|ಸೂರ್ಯನಗರ|ಆನೇಕಲ್|ನೆಲಮಂಗಲ|ರಾಜಾಪುರ|bangalore|bengaluru|suryanagar|snr|anekal|nelamangala|rajapura", "Bangalore"],
  ["ಕೊಡಗು|kodagu|madikeri|nidugani|kushalnagar", "Kodagu"],
  ["ಮಂಡ್ಯ|mandya|nagamangala|kottatti|elechakanahalli|halalu", "Mandya"],
  ["ಚಾಮರಾಜನಗರ|chamarajanagar|panjanahalli|gundlupet|hanur", "Chamarajanagar"],
  ["ಧಾರವಾಡ|dharwad|sattur|hiremalligewad", "Dharwad"],
  ["ಕಲಬುರಗಿ|ಕಲಬುರ್ಗಿ|kalaburagi|kalburgi|kalburagi|sheikh roza|alanda|alandha|roza", "Kalaburagi"],
  ["ಕೊಪ್ಪಳ|koppal|koppala", "Koppal"],
  ["ಗದಗ|gadag|kalasapura", "Gadag"],
  ["ವಿಜಯಪುರ|vijayapura|babaleshwara|muddebihala|mahalbagayath|kasaba", "Vijayapura"],
  ["ರಾಯಚೂರು|raichur|manvi", "Raichur"],
  ["ಬಾಗಲಕೋಟೆ|bagalkote|chikkabadavadagi", "Bagalkote"],
  ["ಚಿಕ್ಕಮಗಳೂರು|chikkamagaluru|mudigere", "Chikkamagaluru"],
];
function districtOf(title, label) {
  const hay = lc(`${title} ${label}`);
  for (const [pat, name] of DISTRICTS) if (new RegExp(pat, "i").test(hay)) return name;
  return null;
}

function typeOf(label) {
  const l = lc(label);
  if (l.includes("e-auction") || l.includes("eauction")) return "e-Auction";
  if (l.includes("ds notification") || l.includes("demand survey")) return "Demand survey";
  if (l.includes("online application") || l.includes("online")) return "Apply online";
  if (l.includes("extension")) return "Extended";
  return "New layout";
}

// Turn an ugly PDF filename into a readable place/layout name.
const ROMAN = { i: "1", ii: "2", iii: "3", iv: "4", v: "5", vi: "6" };
const NOISE = /\b(notification|public|notice|online|applications?|revised|corrigendum|with|contacts?|cropped|master|plan|allotment|project|regarding|dated|ds|ll|noti|final|list|date|extension|remaining|sites?|scheme|housing|board|karnataka|the|for|of|to)\b/gi;
function cleanPlace(label, type) {
  if (type === "e-Auction") {
    const n = (label.match(/\b(\d{1,3})\b/) || [])[1];
    return n ? `Statewide e-Auction (Round ${n})` : "Statewide e-Auction";
  }
  let s = ` ${label} `;
  s = s.replace(/\b\d{2}-\d{2}-\d{4}\b/g, " ").replace(/\b\d{6,8}\b/g, " "); // dates
  s = s.replace(NOISE, " ").replace(/[,&()]+/g, " ").replace(/\s+/g, " ").trim();
  // title-case generic words first
  s = s.split(" ").filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  // then apply nicely-cased aliases as the authoritative final pass
  s = s.replace(/\bSnr\b/gi, "Suryanagar");
  s = s.replace(/\bPh[-\s]?(iv|iii|ii|i|vi|v|\d+)\b/gi, (_m, n) => `Phase ${ROMAN[n.toLowerCase()] || n}`);
  s = s.replace(/\bPratipati\b/gi, "Pratipati JV");
  s = s.replace(/\bJv\b/gi, "JV");
  s = s.replace(/\s+/g, " ").trim();
  return s.length >= 3 ? s : null;
}

function uploadEpoch(pdfUrl) {
  const m = pdfUrl.match(/_(\d{9,10})\.pdf$/i);
  return m ? new Date(+m[1] * 1000) : null;
}

function pdfText(pdfUrl) {
  const safe = pdfUrl.split("/").pop().replace(/[^A-Za-z0-9._-]/g, "_");
  const pdfPath = join(CACHE, safe);
  const ocrPath = pdfPath.replace(/\.pdf$/i, ".ocr.txt");
  const quiet = { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] };
  try {
    if (!existsSync(pdfPath)) execFileSync("curl", ["-sL", "--max-time", "40", "-o", pdfPath, pdfUrl]);
    let raw = "";
    try { raw = execFileSync("pdftotext", ["-layout", pdfPath, "-"], quiet); } catch {}
    if (raw.replace(/\s/g, "").length >= 60) return raw;
    if (existsSync(ocrPath)) return readFileSync(ocrPath, "utf8");
    const base = join(CACHE, safe.replace(/\.pdf$/i, "") + "_ocr");
    execFileSync("pdftoppm", ["-png", "-r", "200", "-f", "1", "-l", "2", pdfPath, base]);
    let ocr = "";
    for (const png of [`${base}-1.png`, `${base}-01.png`, `${base}-2.png`, `${base}-02.png`]) {
      if (!existsSync(png)) continue;
      try { ocr += execFileSync("tesseract", [png, "stdout", "-l", "eng"], quiet); } catch {}
      try { ocr += "\n" + execFileSync("tesseract", [png, "stdout", "-l", "eng", "--psm", "11"], quiet); } catch {}
    }
    writeFileSync(ocrPath, ocr);
    return ocr.replace(/\s/g, "").length > raw.replace(/\s/g, "").length ? ocr : raw;
  } catch { return ""; }
}

// returns { start, deadline } ISO strings (start = earliest, deadline = latest)
function applyWindow(txt) {
  const ds = [...txt.matchAll(/\b(\d{2})-(\d{2})-(\d{4})\b/g)]
    .map((m) => ({ iso: `${m[3]}-${m[2]}-${m[1]}`, d: new Date(+m[3], +m[2] - 1, +m[1]) }))
    .filter((x) => !isNaN(x.d) && x.d.getFullYear() >= 2024 && x.d.getFullYear() <= 2030)
    .sort((a, b) => a.d - b.d);
  if (!ds.length) return { start: null, deadline: null };
  return { start: ds[0].iso, deadline: ds[ds.length - 1].iso };
}

function statusOf(deadline, epoch) {
  if (deadline) return new Date(deadline + "T23:59:59") >= new Date() ? "open" : "closed";
  if (epoch) {
    const ageDays = (Date.now() - epoch.getTime()) / 86400000;
    return ageDays <= STALE_DAYS ? "unknown" : "closed";
  }
  return "unknown";
}

const mapsUrl = (place, district) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, ${district}, Karnataka`)}`;
const priceUrl = (place, district) =>
  `https://www.google.com/search?q=${encodeURIComponent(`${place} ${district} Karnataka land guidance value plot price`)}`;

const hashId = (url) => createHash("sha1").update(url).digest("hex").slice(0, 12);

export async function scrapeAll({ inspect = 40 } = {}) {
  const res = await fetch(HOMEPAGE, { headers: { "User-Agent": "Mozilla/5.0 GruhaAlert" } });
  const html = await res.text();

  const byUrl = new Map();
  for (const m of html.matchAll(/<a href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const url = m[1];
    const t = /pcontent">([\s\S]*?)<\/span>/.exec(m[2]);
    const title = t ? t[1].replace(/\s+/g, " ").trim() : "";
    const prev = byUrl.get(url);
    if (!prev || (title && !prev.title)) byUrl.set(url, { url, title });
  }

  const open = [...byUrl.values()]
    .map((it) => ({ ...it, label: labelFromUrl(it.url), category: classify(it.title, it.url) }))
    .filter((i) => i.category === "open")
    .slice(0, inspect);

  const projects = await fetchProjectMap(); // live project → prj id map from KHB portal
  const now = new Date().toISOString();
  return open.map((it) => {
    const { start, deadline } = applyWindow(pdfText(it.url));
    const type = typeOf(it.label);
    const district = districtOf(it.title, it.label) || "Other";
    const place = cleanPlace(it.label, type) || (district !== "Other" ? `${district} layout` : "KHB layout");
    const base = { board: "KHB", district, place, type, label_en: it.label };
    const prj = matchPrj(base, projects);
    return {
      id: hashId(it.url),
      ...base,
      title_kn: it.title || null,
      start,
      deadline,
      status: statusOf(deadline, uploadEpoch(it.url)),
      pdf_url: it.url,
      // Only a verified project form (reliable). null = not open for online
      // application yet → the UI leads with the official PDF instead.
      apply_url: prj ? APPFORM(prj) : null,
      oldapp_url: OLDAPP_URL,
      maps_url: mapsUrl(place, district),
      price_url: priceUrl(place, district),
      first_seen: now,
      last_seen: now,
    };
  });
}
