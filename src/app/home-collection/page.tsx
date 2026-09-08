import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  const freeAbove = site.diagnostics?.homeCollection.freeAbove ?? "";
  return pageMetadata(site, {
    path: "/home-collection",
    title: `Home blood collection in Vijayawada | ${site.brand.name}`,
    description: `Governorpet lab home collection across 10 Vijayawada areas. ${freeAbove}, slots from 6 AM.`,
  });
}

export default function HomeCollectionPage() {
  const site = getSite();
  const diagnostics = site.diagnostics;
  if (site.type !== "diagnostics" || !diagnostics) notFound();

  const collection = diagnostics.homeCollection;

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <Image
            alt="A technician collecting a sample at a home in Vijayawada"
            className="w-full rounded-[8px] object-cover shadow-[var(--shadow-float)]"
            height={640}
            sizes="(max-width: 1024px) 100vw, 40vw"
            src="/images/krishna-labs/home-visit.jpg"
            width={640}
          />
        }
        breadcrumb="Home collection"
        eyebrow="Home collection"
        subtitle={collection.reportPromise}
        title="A technician can collect your sample before your day starts."
      >
        <div className="flex flex-wrap gap-3">
          {[collection.freeAbove, collection.standardCharge, "Slots from 6:00 AM"].map((chip) => (
            <span
              className="inline-flex items-center gap-2 rounded-[8px] border border-[var(--color-text)]/15 bg-white px-3 py-2 text-sm font-bold"
              key={chip}
            >
              <Icon className="size-4 text-[var(--color-primary)]" name="check" />
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

      <Marquee items={collection.areas} label="Areas covered" tone="ink" />

      <Section eyebrow="How it works" heading="Four steps from your door to the report.">
        <Reveal className="grid gap-7 md:grid-cols-4 md:gap-0" stagger={90}>
          {diagnostics.home.howItWorks.map((step, index) => (
            <article
              className="relative border-l-2 border-[var(--color-accent)] pl-5 md:border-l-0 md:border-t-2 md:pr-6 md:pl-0 md:pt-6"
              key={step.title}
            >
              <p className="font-[family-name:var(--font-heading-active)] text-2xl leading-none text-[var(--color-accent)] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section
        eyebrow="Book a slot"
        ground="dots"
        heading="Choose your area and a time that works."
        subheading="We confirm on WhatsApp with the technician's name before they arrive."
        variant="surface"
      >
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal as="aside" className="h-fit border border-[var(--color-text)]/12 bg-white p-7" direction="left">
            <p className="font-[family-name:var(--font-heading-active)] text-3xl text-[var(--color-primary)]">
              {collection.freeAbove}
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{collection.standardCharge}</p>

            <h2 className="mt-8 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Areas covered
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {collection.areas.map((area) => (
                <li className="border border-[var(--color-text)]/12 px-2 py-1 text-xs font-bold" key={area}>
                  {area}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Collection slots
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {collection.slots.map((slot) => (
                <li className="flex items-center gap-2 border border-[var(--color-text)]/12 px-3 py-2 font-semibold" key={slot}>
                  <Icon className="size-4 shrink-0 text-[var(--color-primary)]" name="clock" />
                  {slot}
                </li>
              ))}
            </ul>

            {site.contact.languagesLine && (
              <p className="mt-8 border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6 text-[var(--color-muted)]">
                {site.contact.languagesLine}
              </p>
            )}
          </Reveal>

          <Reveal
            className="scroll-mt-28 border border-[var(--color-text)]/12 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
            direction="right"
            id="booking"
          >
            <EnquiryForm
              brand={site.brand}
              contact={site.contact}
              enquiryFields={site.enquiryFields}
              services={site.services}
              submitLabel={diagnostics.home.hero.bookingLabel}
            />
          </Reveal>
        </div>
      </Section>
    </SiteShell>
  );
}
