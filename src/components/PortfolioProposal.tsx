"use client";

import { useSearchParams } from "next/navigation";
import { ProposalDocument } from "@/components/ProposalDocument";
import type { SiteConfig } from "@/types/site";

// Reads ?client= and ?package= so one route covers every prospect. The same
// document is server-rendered with defaults, so the page is never blank.
export function PortfolioProposal({ site }: { site: SiteConfig }) {
  const params = useSearchParams();

  return (
    <ProposalDocument
      client={params.get("client") || "Your Business"}
      packageId={params.get("package") || "standard"}
      site={site}
    />
  );
}
