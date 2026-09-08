import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DentalServices } from "@/components/DentalServices";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/services",
    title: `Dental services in Vijayawada | ${site.brand.name}`,
    description: "Benz Circle dental service prices from ₹200, including root canals, crowns and braces.",
  });
}

export default function ServicesPage() {
  const site = getSite();
  if (site.type !== "dental") notFound();

  const featured = site.services.filter((service) => service.featured).length;

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <dl className="grid grid-cols-3 gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12">
            {[
              { value: String(site.services.length), label: "treatments listed" },
              { value: String(featured), label: "most booked" },
              { value: "₹200", label: "consultation" },
            ].map((item) => (
              <div className="bg-white px-4 py-5" key={item.label}>
                <dd className="font-[family-name:var(--font-heading-active)] text-2xl tabular-nums text-[var(--color-primary)]">
                  {item.value}
                </dd>
                <dt className="mt-1 text-xs leading-4 text-[var(--color-muted)]">{item.label}</dt>
              </div>
            ))}
          </dl>
        }
        breadcrumb="Services"
        eyebrow="Treatments and fees"
        subtitle="Open a row for timing, visits, aftercare and the price we quote before treatment starts."
        title="Every treatment we do, with the price next to it."
      >
        <p className="flex items-center gap-2.5 text-sm font-semibold text-[var(--color-muted)]">
          <Icon className="size-4 text-[var(--color-primary)]" name="rupee" />
          {site.priceRevisionNote}
        </p>
      </PageHero>

      <Section>
        <DentalServices contact={site.contact} priceRevisionNote={site.priceRevisionNote} services={site.services} />
      </Section>
    </SiteShell>
  );
}
