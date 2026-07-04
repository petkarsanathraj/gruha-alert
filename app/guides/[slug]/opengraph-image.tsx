import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { GUIDES, getGuide } from "@/lib/guides";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "KHB guide — GruhaAlert";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  return renderOG({
    eyebrow: "KHB Guide",
    title: g ? g.title : "Guide",
    subtitle: "Plain-English help for Karnataka Housing Board applicants.",
    badge: "Free guide",
  });
}
