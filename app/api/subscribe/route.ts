import { NextResponse } from "next/server";

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

export async function POST(req: Request) {
  let body: { email?: string; districts?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const districts = Array.isArray(body.districts) ? body.districts : [];
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // No DB configured yet (local/dev): accept and no-op so the UI still works.
  if (!SB_URL || !SB_KEY) {
    console.log(`[subscribe] (no DB) ${email} districts=${districts.join(",") || "all"}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(`${SB_URL}/rest/v1/subscribers?on_conflict=email`, {
      method: "POST",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([{ email, districts }]),
    });
    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe] failed:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
