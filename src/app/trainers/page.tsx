import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/trainers",
    title: `Gym trainers in Vijayawada | ${site.brand.name}`,
    description: "Meet 4 certified Patamata gym coaches for strength, women's batches, fat loss and diet planning.",
  });
}

export default function TrainersPage() {
  const site = getSite();
  if (site.type !== "gym") notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Trainers"
        eyebrow="The coaching team"
        subtitle="Ask for the coach whose focus matches what you want to train. You keep the same coach through your plan."
        title="Meet the coaches who write and watch your programme."
      >
        <div className="flex flex-wrap gap-2">
          {site.team.map((coach) => (
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-[var(--color-text)]/15 bg-white px-4 text-sm font-bold text-[var(--color-text)] transition-colors duration-150 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              href={`#${slug(coach.name)}`}
              key={coach.name}
            >
              {coach.name}
              <Icon className="size-3.5 rotate-90" name="arrowRight" />
            </a>
          ))}
        </div>
      </PageHero>

      <Section>
        <div className="space-y-10">
          {site.team.map((coach, index) => (
            <Reveal
              as="article"
              className="lift grid scroll-mt-28 overflow-hidden border border-[var(--color-text)]/10 bg-white lg:grid-cols-[0.75fr_1.25fr]"
              direction={index % 2 === 0 ? "left" : "right"}
              id={slug(coach.name)}
              key={coach.name}
            >
              <Image
                alt={coach.photoAlt ?? coach.name}
                className="h-full min-h-80 w-full object-cover"
                height={720}
                sizes="(max-width: 1024px) 100vw, 40vw"
                src={coach.photo}
                width={620}
              />

              <div className="p-7 lg:p-10">
                <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-accent)]">
                  <Icon className="size-4" name="clock" />
                  {coach.experience} coaching
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-heading-active)] text-3xl font-bold leading-tight lg:text-4xl">
                  {coach.name}
                </h2>
                <p className="mt-2 font-bold text-[var(--color-primary)]">{coach.qualification}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{coach.specialization}</p>
                <p className="mt-5 max-w-2xl leading-7 text-[var(--color-muted)]">{coach.bio}</p>

                <div className="mt-8 grid gap-7 border-t border-[var(--color-text)]/10 pt-7 md:grid-cols-2">
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      <Icon className="size-4 text-[var(--color-primary)]" name="report" />
                      Certifications
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6">
                      {coach.education?.map((item) => (
                        <li className="flex gap-2.5" key={item}>
                          <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      <Icon className="size-4 text-[var(--color-primary)]" name="dumbbell" />
                      Coaching focus
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6">
                      {coach.treatmentFocus?.map((item) => (
                        <li className="flex gap-2.5" key={item}>
                          <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-7 text-sm text-[var(--color-muted)]">
                  <strong className="text-[var(--color-text)]">Memberships:</strong> {coach.memberships?.join(" · ")}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  <strong className="text-[var(--color-text)]">Languages:</strong> {coach.languages.join(" · ")}
                </p>

                <WhatsAppLink
                  className="nudge mt-7 inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 text-sm font-bold text-white hover:brightness-110"
                  message={`Hi, I want to train with ${coach.name} at ${site.brand.shortName}. My name is:`}
                  phone={site.contact.whatsapp}
                >
                  <Icon className="size-4" name="whatsapp" />
                  Train with {coach.name.split(" ")[0]}
                  <Icon className="size-4" name="arrowRight" />
                </WhatsAppLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
