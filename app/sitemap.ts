import type { MetadataRoute } from "next";
import { getNotices, getDistricts } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gruha-alert.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notices = await getNotices();
  const districts = await getDistricts();

  const staticPages = ["", "/about", "/privacy", "/disclaimer", "/contact"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: p === "" ? 1 : 0.5,
  }));

  const noticePages = notices.map((n) => ({
    url: `${SITE_URL}/notice/${n.id}`,
    lastModified: new Date(n.last_seen),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const districtPages = districts.map((d) => ({
    url: `${SITE_URL}/district/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...districtPages, ...noticePages];
}
