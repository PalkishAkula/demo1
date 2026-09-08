import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortfolioProposal } from "@/components/PortfolioProposal";
import { ProposalDocument } from "@/components/ProposalDocument";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/proposal",
    title: `Website proposal | ${site.brand.name}`,
    description: "Vijayawada website proposal with package, timeline and payment terms.",
  });
}

export default function ProposalPage() {
  const site = getSite();
  if (site.type !== "portfolio" || !site.portfolio) notFound();

  // The fallback is the real document with defaults, so the proposal is
  // readable before hydration and prints correctly with JS disabled.
  return (
    <Suspense fallback={<ProposalDocument client="Your Business" packageId="standard" site={site} />}>
      <PortfolioProposal site={site} />
    </Suspense>
  );
}
