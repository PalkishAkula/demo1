import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const paths = site.type === "portfolio" ? ["/", "/proposal"] : site.type === "dental" ? ["/", "/about", "/services", "/doctors", "/gallery", "/contact"] : ["/", "/about", "/packages", "/tests", "/home-collection", "/reports", "/contact"];
  return paths.map((path) => ({ url: new URL(path, site.siteUrl).toString(), lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
