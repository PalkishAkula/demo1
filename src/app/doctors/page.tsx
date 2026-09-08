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
    path: "/doctors",
    title: `Dental doctors in Vijayawada | ${site.brand.name}`,
    description: "Meet 3 Benz Circle dental doctors for implants, braces and ₹200 consultations.",
  });
}

export default function DoctorsPage() {
  const site = getSite();
  if (site.type !== "dental") notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        breadcrumb="Doctors"
        eyebrow="The clinical team"
        subtitle="Book directly with the doctor whose treatment focus matches your appointment."
        title="Meet the doctors who plan and review your treatment."
      >
        <div className="flex flex-wrap gap-2">
          {site.team.map((doctor) => (
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-[var(--color-text)]/15 bg-white px-4 text-sm font-bold text-[var(--color-text)] transition-colors duration-150 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              href={`#${slug(doctor.name)}`}
              key={doctor.name}
            >
              {doctor.name}
              <Icon className="size-3.5 rotate-90" name="arrowRight" />
            </a>
          ))}
        </div>
      </PageHero>

      <Section>
        <div className="space-y-10">
          {site.team.map((doctor, index) => (
            <Reveal
              as="article"
              className="lift grid overflow-hidden border border-[var(--color-text)]/10 bg-white scroll-mt-28 lg:grid-cols-[0.75fr_1.25fr]"
              direction={index % 2 === 0 ? "left" : "right"}
              id={slug(doctor.name)}
              key={doctor.name}
            >
              <Image
                alt={doctor.photoAlt ?? doctor.name}
                className="h-full min-h-80 w-full object-cover"
                height={720}
                sizes="(max-width: 1024px) 100vw, 40vw"
                src={doctor.photo}
                width={620}
              />

              <div className="p-7 lg:p-10">
                <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-accent)]">
                  <Icon className="size-4" name="clock" />
                  {doctor.experience}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-heading-active)] text-3xl leading-tight lg:text-4xl">
                  {doctor.name}
                </h2>
                <p className="mt-2 font-bold text-[var(--color-primary)]">{doctor.qualification}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{doctor.specialization}</p>
                <p className="mt-5 max-w-2xl leading-7 text-[var(--color-muted)]">{doctor.bio}</p>

                <div className="mt-8 grid gap-7 border-t border-[var(--color-text)]/10 pt-7 md:grid-cols-2">
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      <Icon className="size-4 text-[var(--color-primary)]" name="report" />
                      Education
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6">
                      {doctor.education?.map((item) => (
                        <li className="flex gap-2.5" key={item}>
                          <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      <Icon className="size-4 text-[var(--color-primary)]" name="tooth" />
                      Treatment focus
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6">
                      {doctor.treatmentFocus?.map((item) => (
                        <li className="flex gap-2.5" key={item}>
                          <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-7 text-sm text-[var(--color-muted)]">
                  <strong className="text-[var(--color-text)]">Memberships:</strong> {doctor.memberships?.join(" · ")}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  <strong className="text-[var(--color-text)]">Languages:</strong> {doctor.languages.join(" · ")}
                </p>

                <WhatsAppLink
                  className="nudge mt-7 inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 text-sm font-bold text-white hover:brightness-110"
                  message={`Hi, I want to book an appointment with ${doctor.name} at ${site.brand.shortName}. My name is:`}
                  phone={site.contact.whatsapp}
                >
                  <Icon className="size-4" name="whatsapp" />
                  Book with {doctor.name}
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
