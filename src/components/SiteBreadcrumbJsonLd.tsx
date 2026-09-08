"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import type { SiteConfig } from "@/types/site";

// Mirrors the visible breadcrumb rendered by PageHero, so the markup and the
// structured data always name the same page.
const labels: Record<string, string> = {
  "/about": "About",
  "/contact": "Contact",
  "/doctors": "Doctors",
  "/gallery": "Gallery",
  "/services": "Services",
  "/packages": "Health packages",
  "/tests": "Test catalogue",
  "/home-collection": "Home collection",
  "/reports": "Reports",
};

export function SiteBreadcrumbJsonLd({ site }: { site: SiteConfig }) {
  const path = usePathname();
  const label = labels[path];
  if (!label) return null;
  return <JsonLd data={breadcrumbSchema(site, label, path)} />;
}
