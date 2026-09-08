import krishnaLabs from "@/config/krishna-labs.json";
import sriDeviDental from "@/config/sridevi-dental.json";
import portfolio from "@/config/portfolio.json";
import type { SiteConfig } from "@/types/site";

const sites: Record<string, SiteConfig> = {
  "sridevi-dental": sriDeviDental as SiteConfig,
  "krishna-labs": krishnaLabs as SiteConfig,
  portfolio: portfolio as SiteConfig,
};

export function getSite(): SiteConfig {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "sridevi-dental";

  return sites[siteId] ?? sites["sridevi-dental"];
}
