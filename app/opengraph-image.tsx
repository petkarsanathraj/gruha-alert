import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getNotices } from "@/lib/data";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GruhaAlert — Open KHB plots & sites in Karnataka";
export const revalidate = 1800;

export default async function Image() {
  const open = (await getNotices()).filter((n) => n.status === "open").length;
  return renderOG({
    eyebrow: "Karnataka Housing Board",
    title: "Open KHB plots & sites — in plain English",
    subtitle: "Apply dates, prices & official links. Updated daily.",
    badge: open > 0 ? `${open} open now` : "Updated daily",
    footer: "gruha-alert.vercel.app",
  });
}
