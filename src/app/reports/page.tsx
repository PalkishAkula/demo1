import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ReportsMock } from "@/components/ReportsMock";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/reports",
    title: `Diagnostic reports in Vijayawada | ${site.brand.name}`,
    description: "Governorpet report access for 60 listed tests, with routine reports ready within 6 hours.",
  });
}

export default function ReportsPage() {
  const site = getSite();
  if (site.type !== "diagnostics") notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Reports"
        eyebrow="Reports"
        subtitle="Reports also go to your WhatsApp as soon as the pathologist signs them, so most people never need this screen."
        title="Download a report with your patient ID."
      />

      <Section ground="dots" variant="surface">
        <ReportsMock />
      </Section>
    </SiteShell>
  );
}
