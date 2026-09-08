import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SiteGallery } from "@/components/SiteGallery";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  const isGym = site.type === "gym";
  return pageMetadata(site, {
    path: "/gallery",
    title: isGym
      ? `Gym photos in Patamata, Vijayawada | ${site.brand.name}`
      : `Dental clinic gallery in Vijayawada | ${site.brand.name}`,
    description: isGym
      ? "See the Patamata strength floor, cardio deck, group studio and coaches before your free first session."
      : "See the Benz Circle clinic rooms, team and 4 treatment cases before your ₹200 visit.",
  });
}

export default function GalleryPage() {
  const site = getSite();
  if (site.type !== "dental" && site.type !== "gym") notFound();

  const isGym = site.type === "gym";

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Gallery"
        eyebrow={isGym ? "Studio gallery" : "Clinic gallery"}
        subtitle={
          isGym
            ? "Use the tabs to view the floor, the equipment, member results and the coaching team. Click any photo to open it full size."
            : "Use the tabs to view clinic spaces, equipment, treatment cases and the team. Click any photo to open it full size."
        }
        title={isGym ? "See the floor before you pay for a month." : "See the rooms and the people before you visit."}
      />

      <Section>
        <SiteGallery gallery={site.gallery} home={site.home} team={site.team} variant={isGym ? "gym" : "dental"} />
      </Section>
    </SiteShell>
  );
}
