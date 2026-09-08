import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DentalGallery } from "@/components/DentalGallery";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/gallery",
    title: `Dental clinic gallery in Vijayawada | ${site.brand.name}`,
    description: "See the Benz Circle clinic rooms, team and 4 treatment cases before your ₹200 visit.",
  });
}

export default function GalleryPage() {
  const site = getSite();
  if (site.type !== "dental") notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Gallery"
        eyebrow="Clinic gallery"
        subtitle="Use the tabs to view clinic spaces, equipment, treatment cases and the team. Click any photo to open it full size."
        title="See the rooms and the people before you visit."
      />

      <Section>
        <DentalGallery gallery={site.gallery} home={site.home} team={site.team} />
      </Section>
    </SiteShell>
  );
}
