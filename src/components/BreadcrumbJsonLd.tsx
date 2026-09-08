import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import type { SiteConfig } from "@/types/site";

export function BreadcrumbJsonLd({ site, label, path }: { site: SiteConfig; label: string; path: string }) {
  return <JsonLd data={breadcrumbSchema(site, label, path)} />;
}
