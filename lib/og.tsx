import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OGProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeTone?: "green" | "amber" | "gray";
  footer?: string;
};

const TONES = {
  green: { bg: "#ecfdf5", fg: "#047857", br: "#a7f3d0" },
  amber: { bg: "#fffbeb", fg: "#b45309", br: "#fcd34d" },
  gray: { bg: "#f1f5f9", fg: "#475569", br: "#cbd5e1" },
};

/** Shared 1200×630 brand card used by every opengraph-image route. */
export function renderOG({ eyebrow, title, subtitle, badge, badgeTone = "green", footer }: OGProps) {
  const tone = TONES[badgeTone];
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f5f4",
          backgroundImage:
            "radial-gradient(circle at 90% 8%, #d1fae5 0%, transparent 42%)",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 66,
              height: 66,
              background: "#047857",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800, color: "#0f172a" }}>
            GruhaAlert
          </div>
        </div>

        {/* Middle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 700,
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.05,
              marginTop: 14,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", fontSize: 34, color: "#475569", marginTop: 20 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {badge ? (
            <div
              style={{
                display: "flex",
                background: tone.bg,
                color: tone.fg,
                border: `2px solid ${tone.br}`,
                borderRadius: 999,
                padding: "12px 30px",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {badge}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 28, color: "#64748b" }}>
            {footer || "gruha-alert.vercel.app"}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
