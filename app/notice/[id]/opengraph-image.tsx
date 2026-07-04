import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getNotice, getNotices } from "@/lib/data";
import { statusBadge, deadlineLabel } from "@/lib/format";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "KHB plot notice — GruhaAlert";
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await getNotices()).map((n) => ({ id: n.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = await getNotice(id);
  if (!n) {
    return renderOG({ title: "Notice not found", footer: "gruha-alert.vercel.app" });
  }
  const badge = statusBadge(n);
  return renderOG({
    eyebrow: `KHB ${n.type}${n.district !== "Other" ? ` · ${n.district}` : ""}`,
    title: n.place,
    subtitle: n.deadline ? `Apply before ${deadlineLabel(n.deadline)}` : "See the official notification for dates",
    badge: badge.text,
    badgeTone: badge.tone,
  });
}
