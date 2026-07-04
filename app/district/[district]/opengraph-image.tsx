import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getDistricts, getNoticesByDistrict } from "@/lib/data";
import { unslugDistrict, slugifyDistrict, MAJOR_DISTRICTS } from "@/lib/format";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "KHB plots by district — GruhaAlert";
export const revalidate = 1800;

export async function generateStaticParams() {
  const major = MAJOR_DISTRICTS.map(slugifyDistrict);
  const fromData = (await getDistricts()).map((d) => d.slug);
  return [...new Set([...major, ...fromData])].map((district) => ({ district }));
}

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

export default async function Image({ params }: { params: Promise<{ district: string }> }) {
  const { district } = await params;
  const name = titleCase(unslugDistrict(district));
  const open = (await getNoticesByDistrict(district)).filter((n) => n.status !== "closed").length;
  return renderOG({
    eyebrow: "Karnataka Housing Board",
    title: `KHB plots in ${name}`,
    subtitle: "Open sites, e-auctions & last dates — updated daily.",
    badge: open > 0 ? `${open} open now` : "Check back soon",
    badgeTone: open > 0 ? "green" : "gray",
  });
}
