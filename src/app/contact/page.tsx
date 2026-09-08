import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LocationDetails } from "@/components/LocationDetails";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/site";
import { faqSchema, pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  const isLab = site.type === "diagnostics";
  return pageMetadata(site, {
    path: "/contact",
    title: `Contact ${site.brand.name} | Vijayawada`,
    description: isLab
      ? "Call the Governorpet lab for 60 listed tests, home collection and prices from ₹120."
      : "Call the Benz Circle clinic for ₹200 consultations, treatment prices and appointment times.",
  });
}

export default function ContactPage() {
  const site = getSite();
  const diagnostics = site.diagnostics;
  const isLab = site.type === "diagnostics" && Boolean(diagnostics);
  const faqs = site.contactFaqs ?? [];
  const bookingLabel = diagnostics?.home.hero.bookingLabel;
  const phoneHref = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;

  return (
    <SiteShell site={site}>
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <PageHero
        breadcrumb="Contact"
        eyebrow={isLab ? "Contact the centre" : "Contact the clinic"}
        subtitle={
          isLab
            ? "Call between 6.30 am and 9 pm, or send the form and a technician will confirm your slot."
            : "Send the form and we call you back within two hours during clinic hours."
        }
        title={isLab ? "Book home collection or find the Governorpet lab." : "Book, find us or ask a practical question."}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <OpenNowBadge hours={site.hours} />
          <a className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]" href={phoneHref}>
            <Icon className="size-4" name="phone" />
            {site.contact.phonePrimary}
          </a>
          <a className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]" href={`mailto:${site.contact.email}`}>
            <Icon className="size-4 text-[var(--color-primary)]" name="report" />
            {site.contact.email}
          </a>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal
            className="scroll-mt-28 rounded-[8px] border border-[var(--color-text)]/10 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
            direction="left"
            id="enquiry"
          >
            <EnquiryForm
              brand={site.brand}
              contact={site.contact}
              enquiryFields={site.enquiryFields}
              services={site.services}
              submitLabel={bookingLabel}
            />
          </Reveal>

          <Reveal className="grid gap-8" direction="right" delay={120}>
            <iframe
              className="min-h-[22rem] w-full rounded-[8px] border border-[var(--color-text)]/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={site.contact.mapEmbedUrl}
              title={`Map to ${site.brand.name}`}
            />
            <LocationDetails
              contact={site.contact}
              directionsLabel="Get Directions"
              hours={site.hours}
              parkingLabel="Parking"
            />
          </Reveal>
        </div>
      </Section>

      {faqs.length > 0 && (
        <Section
          eyebrow="Common questions"
          ground="dots"
          heading={isLab ? "Before you book a test." : "Before you travel to Benz Circle."}
          variant="surface"
        >
          <div className="max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Section>
      )}
    </SiteShell>
  );
}
