import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PackageCards } from "@/components/PackageCards";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/packages",
    title: `Health packages in Vijayawada | ${site.brand.name}`,
    description: "Governorpet health packages with listed tests and January 2026 prices from ₹399.",
  });
}

export default function PackagesPage() {
  const site = getSite();
  const diagnostics = site.diagnostics;
  if (site.type !== "diagnostics" || !diagnostics) notFound();

  const cheapest = diagnostics.packages.reduce((low, item) =>
    Number(item.price.replace(/\D/g, "")) < Number(low.price.replace(/\D/g, "")) ? item : low,
  );
  const collection = diagnostics.homeCollection;

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <ul className="grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12">
            {[
              { icon: "home" as const, text: `${collection.freeAbove} for home collection` },
              { icon: "clock" as const, text: collection.reportPromise },
              { icon: "rupee" as const, text: `Packages start at ${cheapest.price}` },
            ].map((row) => (
              <li className="flex items-center gap-3 bg-white px-4 py-4 text-sm font-semibold" key={row.text}>
                <Icon className="size-4 shrink-0 text-[var(--color-primary)]" name={row.icon} />
                {row.text}
              </li>
            ))}
          </ul>
        }
        breadcrumb="Health packages"
        eyebrow="Health packages"
        subtitle="Open any package to check the listed tests, the January 2026 price and the saving against MRP."
        title="Compare the full test lists before you book."
      />

      <Section
        eyebrow="Every package"
        heading={`${diagnostics.packages.length} packages, priced against MRP.`}
        subheading="Each card lists the tests it covers. Sample collection at the Governorpet centre or at your home."
      >
        <PackageCards
          columns={3}
          contact={site.contact}
          packages={diagnostics.packages}
          priceRevisionNote={site.priceRevisionNote}
        />
      </Section>

      <Section
        eyebrow="Not sure which one"
        ground="dots"
        heading="Call the lab and we will match a package to your prescription."
        variant="surface"
      >
        <p className="max-w-2xl leading-7 text-[var(--color-muted)]">
          Send a photo of your prescription on WhatsApp. We reply with the tests you actually need and the price,
          usually within the hour.
        </p>
      </Section>
    </SiteShell>
  );
}
