import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { StatBar } from "@/components/StatBar";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import type { SiteConfig } from "@/types/site";

export function generateMetadata(): Metadata {
  const site = getSite();
  const locality = site.type === "diagnostics" ? "Governorpet" : "Benz Circle";
  return pageMetadata(site, {
    path: "/about",
    title: `About ${site.brand.name} | Vijayawada`,
    description: `${locality}, Vijayawada practice established in ${site.brand.yearsInService > 15 ? "2008" : "2011"} with stated prices from ₹200.`,
  });
}

export default function AboutPage() {
  const site = getSite();
  const about = site.about;
  if (!about || site.type === "portfolio") notFound();

  const isLab = site.type === "diagnostics";

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <Image
            alt={isLab ? "Krishna Path Labs on MG Road, Governorpet" : "Sridevi Dental at Benz Circle, Vijayawada"}
            className="w-full rounded-[8px] object-cover shadow-[var(--shadow-float)]"
            height={600}
            sizes="(max-width: 1024px) 100vw, 40vw"
            src={isLab ? "/images/krishna-labs/lab-exterior.jpg" : "/images/sridevi-dental/clinic-exterior.jpg"}
            width={800}
          />
        }
        breadcrumb="About"
        eyebrow={isLab ? "About the centre" : "Our clinic"}
        subtitle={site.contact.landmark}
        title={
          isLab
            ? "A Governorpet lab for routine testing, imaging and practical report access."
            : "A Vijayawada dental practice built one careful visit at a time."
        }
      />

      <StatBar stats={site.stats} tone="light" />

      <Section
        eyebrow={site.brand.established}
        heading={
          isLab
            ? "Built around clear reporting and timely collection."
            : "From one chair in Governorpet to a team at Benz Circle."
        }
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-5 text-base leading-8 text-[var(--color-muted)]" direction="left">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal as="ol" className="relative border-l-2 border-[var(--color-accent)]/30 pl-7" direction="right" stagger={90}>
            {about.timeline.map((milestone) => (
              <li className="relative pb-9 last:pb-0" key={milestone.year}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.75rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-[var(--color-accent)] bg-white"
                />
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-accent)] tabular-nums">
                  {milestone.year}
                </p>
                <h3 className="mt-2 text-lg font-extrabold">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{milestone.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      {about.sterilization && about.sterilization.length > 0 && (
        <Section
          eyebrow="Sterilisation"
          ground="dots"
          heading="The steps behind every prepared treatment room."
          subheading="Instruments are tracked from the moment they leave the chair until the pouch is opened in front of you."
          variant="surface"
        >
          <Reveal className="grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12 md:grid-cols-2" stagger={80}>
            {about.sterilization.map((step, index) => (
              <article className="bg-[var(--color-surface)] p-7 transition-colors duration-150 hover:bg-white lg:p-9" key={step.title}>
                <p className="font-[family-name:var(--font-heading-active)] text-3xl leading-none text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p>
              </article>
            ))}
          </Reveal>
        </Section>
      )}

      {about.equipment && about.equipment.length > 0 && (
        <Section
          eyebrow="Equipment"
          heading={
            isLab
              ? "The instruments behind routine test processing."
              : "Tools that help you see what is happening before treatment starts."
          }
        >
          <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={70}>
            {about.equipment.map((item) => (
              <EquipmentCard item={item} key={item.name} />
            ))}
          </Reveal>
        </Section>
      )}
    </SiteShell>
  );
}

function EquipmentCard({ item }: { item: NonNullable<NonNullable<SiteConfig["about"]>["equipment"]>[number] }) {
  return (
    <article className="lift flex h-full flex-col border border-[var(--color-text)]/10 bg-white p-6">
      <Icon className="size-6 text-[var(--color-primary)]" name="microscope" />
      <h3 className="mt-5 font-[family-name:var(--font-heading-active)] text-2xl leading-tight">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{item.text}</p>
    </article>
  );
}
