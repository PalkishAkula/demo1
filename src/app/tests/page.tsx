import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TestFinder } from "@/components/TestFinder";
import { TestSearch } from "@/components/TestSearch";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/tests",
    title: `Diagnostic tests in Vijayawada | ${site.brand.name}`,
    description: "Governorpet diagnostic tests with sample details, report times and prices from ₹150.",
  });
}

export default function TestsPage() {
  const site = getSite();
  const diagnostics = site.diagnostics;
  if (site.type !== "diagnostics" || !diagnostics) notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Test catalogue"
        eyebrow="Test catalogue"
        subtitle={`All ${diagnostics.tests.length} listed tests with the sample needed, the report window and the price. Add what you need and send the list on WhatsApp.`}
        title="Find a test, the sample needed and the report time."
      >
        <TestSearch
          phone={site.contact.phonePrimary}
          placeholder="Search CBC, thyroid, Vitamin D..."
          tests={diagnostics.tests}
        />
      </PageHero>

      <Section>
        <TestFinder
          phone={site.contact.phonePrimary}
          priceRevisionNote={site.priceRevisionNote}
          tests={diagnostics.tests}
          whatsapp={site.contact.whatsapp}
        />
      </Section>
    </SiteShell>
  );
}
