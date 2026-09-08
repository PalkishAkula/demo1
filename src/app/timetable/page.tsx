import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TimetableGrid } from "@/components/TimetableGrid";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/timetable",
    title: `Gym class timetable in Vijayawada | ${site.brand.name}`,
    description: "Patamata gym timetable with 5.30 AM strength batches, Zumba, yoga and evening circuit classes.",
  });
}

export default function TimetablePage() {
  const site = getSite();
  const gym = site.gym;
  if (site.type !== "gym" || !gym) notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Timetable"
        eyebrow="Class timetable"
        subtitle="Coached batches run to the clock. Open floor means the racks and the deck are free to use with a coach present."
        title="Every class, every slot, all seven days."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <OpenNowBadge hours={site.hours} />
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
            <Icon className="size-4 text-[var(--color-primary)]" name="timer" />
            {gym.timetable.length} slots a day, {gym.classes.length} coached classes
          </p>
        </div>
      </PageHero>

      <Section>
        <TimetableGrid rows={gym.timetable} />
        <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{gym.timetableNote}</p>
      </Section>

      <Section
        eyebrow="The classes"
        heading="Who takes each class, and how long it runs."
        subheading="Batch sizes are capped so the coach can watch the whole room."
        variant="surface"
      >
        <Reveal className="divide-y divide-[var(--color-text)]/10 border-y border-[var(--color-text)]/10" stagger={60}>
          {gym.classes.map((item) => (
            <article className="grid gap-3 py-6 md:grid-cols-[1.5fr_1fr] md:gap-8" key={item.name}>
              <div>
                <h3 className="font-[family-name:var(--font-heading-active)] text-2xl font-bold leading-tight">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">{item.text}</p>
              </div>
              <dl className="grid h-fit gap-2 text-sm sm:grid-cols-3 md:grid-cols-1">
                {[
                  { term: "Coach", value: item.coach },
                  { term: "Level", value: item.level },
                  { term: "Runs for", value: item.duration },
                ].map((row) => (
                  <div className="flex justify-between gap-4 border-b border-[var(--color-text)]/10 pb-2 md:border-b-0 md:pb-0" key={row.term}>
                    <dt className="font-bold">{row.term}</dt>
                    <dd className="text-right text-[var(--color-muted)]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-10 border-l-2 border-[var(--color-accent)] pl-6" delay={80}>
          <h3 className="font-[family-name:var(--font-heading-active)] text-2xl font-bold leading-tight">
            Hold a slot for tomorrow morning.
          </h3>
          <p className="mt-3 max-w-xl leading-7 text-[var(--color-muted)]">
            Send the class name and the day. The desk confirms your place the same evening.
          </p>
          <WhatsAppLink
            className="nudge mt-6 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-5 text-sm font-bold text-white hover:brightness-110"
            message={`Hi, I want to book a class slot at ${site.brand.shortName}. The class and day I want:`}
            phone={site.contact.whatsapp}
          >
            <Icon className="size-4" name="whatsapp" />
            Book a class slot
            <Icon className="size-4" name="arrowRight" />
          </WhatsAppLink>
        </Reveal>
      </Section>
    </SiteShell>
  );
}
