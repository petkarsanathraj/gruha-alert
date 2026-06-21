"use client";
import { useEffect } from "react";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // "ca-pub-XXXXXXXXXXXXXXXX"

// A single, clearly-labelled, responsive ad unit. We label it "Advertisement"
// (required by AdSense, prevents accidental clicks, and keeps trust) and place
// only one per content block so it earns without annoying the reader.
export default function AdSlot({ slot, className = "" }: { slot?: string; className?: string }) {
  useEffect(() => {
    if (!CLIENT) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <aside className={`mx-auto w-full max-w-3xl ${className}`} aria-label="Advertisement">
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-slate-400">
        Advertisement
      </p>
      {CLIENT ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white text-xs text-slate-400">
          Ad space
        </div>
      )}
    </aside>
  );
}
