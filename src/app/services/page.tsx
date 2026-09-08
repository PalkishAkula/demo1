import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ServiceList } from "@/components/ServiceList";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  const isGym = site.type === "gym";
  return pageMetadata(site, {
    path: "/services",
    title: isGym
      ? `Gym programs and fees in Vijayawada | ${site.brand.name}`
      : `Dental services in Vijayawada | ${site.brand.name}`,
    description: isGym
      ? "Patamata gym programs from ₹250 a day, including coached strength batches, circuits, Zumba and personal training."
      : "Benz Circle dental service prices from ₹200, including root canals, crowns and braces.",
  });
}

export default function ServicesPage() {
  const site = getSite();
  if (site.type !== "dental" && site.type !== "gym") notFound();

  const isGym = site.type === "gym";
  const featured = site.services.filter((service) => service.featured).length;

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <dl className="grid grid-cols-3 gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12">
            {[
              { value: String(site.services.length), label: isGym ? "programs listed" : "treatments listed" },
              { value: String(featured), label: "most booked" },
              { value: isGym ? "₹250" : "₹200", label: isGym ? "day pass" : "consultation" },
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
        breadcrumb={isGym ? "Programs" : "Services"}
        eyebrow={isGym ? "Programs and fees" : "Treatments and fees"}
        subtitle={
          isGym
            ? "Open a row for the session length, how often it runs, who it suits and the fee you pay at the desk."
            : "Open a row for timing, visits, aftercare and the price we quote before treatment starts."
        }
        title={
          isGym
            ? "Every way you can train here, with the fee next to it."
            : "Every treatment we do, with the price next to it."
        }
      >
        <p className="flex items-center gap-2.5 text-sm font-semibold text-[var(--color-muted)]">
          <Icon className="size-4 text-[var(--color-primary)]" name="rupee" />
          {site.priceRevisionNote}
        </p>
      </PageHero>

      <Section>
        <ServiceList
          contact={site.contact}
          priceRevisionNote={site.priceRevisionNote}
          services={site.services}
          variant={isGym ? "gym" : "dental"}
        />
      </Section>
    </SiteShell>
  );
}
