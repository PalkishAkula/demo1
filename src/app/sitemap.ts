import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const pathsByType: Record<string, string[]> = {
    portfolio: ["/", "/proposal"],
    dental: ["/", "/about", "/services", "/doctors", "/gallery", "/contact"],
    gym: ["/", "/about", "/membership", "/services", "/timetable", "/trainers", "/gallery", "/contact"],
    diagnostics: ["/", "/about", "/packages", "/tests", "/home-collection", "/reports", "/contact"],
  };
  const paths = pathsByType[site.type] ?? pathsByType.dental;
  return paths.map((path) => ({ url: new URL(path, site.siteUrl).toString(), lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
