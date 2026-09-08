import Image from "next/image";
import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { DiagnosticsHome } from "@/components/DiagnosticsHome";
import { EmergencyStrip } from "@/components/EmergencyStrip";
import { Footer } from "@/components/Footer";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocationDetails } from "@/components/LocationDetails";
import { Marquee } from "@/components/Marquee";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { PortfolioHome } from "@/components/PortfolioHome";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { Section } from "@/components/Section";
import { StatBar } from "@/components/StatBar";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, { path: "/", title: site.seo.title, description: site.seo.description });
}

export default function Home() {
  const site = getSite();
  if (site.type === "portfolio") return <PortfolioHome site={site} />;
  if (site.type === "diagnostics") return <DiagnosticsHome site={site} />;

  const home = site.home;
  if (!home) return null;

  const phoneLink = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;
  const ratingStat = site.stats.find((stat) => /review/i.test(stat.label));

  return (
    <div className="overflow-x-clip" id="top">
      <Header site={site} />

      <main className="pt-[var(--header-h)]" id="main-content">
        <EmergencyStrip site={site} />

        {/* ---------------------------------------------------------- hero */}
        <section className="relative isolate overflow-hidden bg-[var(--color-surface)] pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
          <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-24 -z-10 hidden size-96 rounded-full border border-[var(--color-primary)]/12 lg:block"
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
                {home.hero.eyebrow}
              </p>

              <h1 className="mt-5 text-balance font-[family-name:var(--font-heading-active)] text-[2.5rem] leading-[1.03] tracking-tight text-[var(--color-text)] sm:text-6xl lg:text-[4.1rem]">
                {home.hero.heading}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-muted)]">{home.hero.subheading}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink
                  className="nudge inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-6 py-3 text-base font-bold text-white transition-[filter,box-shadow] duration-150 hover:brightness-110 hover:shadow-[var(--shadow-card)] sm:w-auto"
                  message={home.hero.whatsappMessage}
                  phone={site.contact.whatsapp}
                >
                  <Icon className="size-5" name="whatsapp" />
                  Book on WhatsApp
                </WhatsAppLink>
                <Button className="w-full sm:w-auto" href={phoneLink} icon="phone" size="lg" variant="secondary">
                  Call Now
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <OpenNowBadge hours={site.hours} />
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
                  <Icon className="size-4 text-[var(--color-primary)]" name="pin" />
                  {site.contact.landmark}
                </p>
              </div>
            </Reveal>

            <Reveal className="relative" delay={120} direction="scale">
              {/* Offset block behind the frame keeps the composition asymmetric. */}
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-4 bottom-8 left-12 -z-10 hidden bg-[var(--color-primary)]/10 sm:block"
              />
              <Image
                alt={home.hero.image.alt}
                className="w-full rounded-[8px] object-cover shadow-[var(--shadow-float)]"
                height={760}
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                src={home.hero.image.src}
                width={900}
              />

              {ratingStat && (
                <div className="absolute -bottom-7 left-4 flex items-center gap-3 rounded-[8px] border border-[var(--color-text)]/10 bg-white px-4 py-3 shadow-[var(--shadow-float)] sm:-left-6">
                  <Icon className="size-5 fill-[var(--color-accent)] text-[var(--color-accent)]" name="star" />
                  <p className="text-sm leading-tight">
                    <span className="block font-extrabold tabular-nums text-[var(--color-text)]">{ratingStat.value} on Google</span>
                    <span className="block text-xs text-[var(--color-muted)]">{ratingStat.label}</span>
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <StatBar note={site.contact.languagesLine} stats={site.stats} />

        {/* ------------------------------------------------------ treatments */}
        <Section
          aside={
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {site.priceRevisionNote}
            </p>
          }
          eyebrow={home.sections.services.eyebrow}
          heading={home.sections.services.heading}
          id="services"
          subheading={home.sections.services.subheading}
        >
          <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={60}>
            {site.services.map((service) => (
              <article
                className={`lift flex flex-col border border-[var(--color-text)]/10 bg-white p-6 ${
                  service.featured ? "border-l-4 border-l-[var(--color-accent)]" : ""
                }`}
                id={service.id}
                key={service.id}
              >
                <h3 className="font-[family-name:var(--font-heading-active)] text-2xl leading-tight">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{service.shortDesc}</p>

                <div className="mt-auto pt-6">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-xl font-extrabold text-[var(--color-primary)]">
                    {service.price}
                    {service.priceNote && (
                      <span className="text-xs font-medium text-[var(--color-muted)]">{service.priceNote}</span>
                    )}
                  </p>
                  {service.duration && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                      <Icon className="size-3.5" name="clock" />
                      {service.duration}
                    </p>
                  )}
                  <WhatsAppLink
                    className="nudge mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)]"
                    message={service.whatsappMessage}
                    phone={site.contact.whatsapp}
                  >
                    <span className="sweep">Book on WhatsApp</span>
                    <Icon className="size-4" name="arrowRight" />
                  </WhatsAppLink>
                </div>
              </article>
            ))}
          </Reveal>

          <Reveal className="mt-8" delay={80}>
            <Button href="/services" trailingIcon="arrowRight" variant="secondary">
              All treatments and fees
            </Button>
          </Reveal>
        </Section>

        {site.serviceAreas && (
          <Marquee items={site.serviceAreas} label="Patients travel from" />
        )}

        {/* ---------------------------------------------------- why patients */}
        <Section
          eyebrow={home.sections.whyChoose.eyebrow}
          heading={home.sections.whyChoose.heading}
          subheading={home.sections.whyChoose.subheading}
          variant="surface"
        >
          <Reveal className="grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12 md:grid-cols-2" stagger={80}>
            {home.whyChoose.map((point, index) => (
              <article className="group bg-[var(--color-surface)] p-7 transition-colors duration-150 hover:bg-white lg:p-9" key={point.heading}>
                <p className="font-[family-name:var(--font-heading-active)] text-3xl leading-none text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-y-0.5">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-lg font-extrabold">{point.heading}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">{point.text}</p>
              </article>
            ))}
          </Reveal>
        </Section>

        {/* ----------------------------------------------------------- team */}
        <Section
          aside={
            <Button href="/doctors" trailingIcon="arrowRight" variant="secondary">
              Full profiles
            </Button>
          }
          eyebrow={home.sections.doctors.eyebrow}
          heading={home.sections.doctors.heading}
          id="team"
          subheading={home.sections.doctors.subheading}
        >
          <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={90}>
            {site.team.map((doctor) => (
              <article className="lift flex h-full flex-col border border-[var(--color-text)]/10 bg-white" key={doctor.name}>
                <Image
                  alt={doctor.photoAlt ?? doctor.name}
                  className="aspect-[6/5] w-full object-cover"
                  height={480}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={doctor.photo}
                  width={576}
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[family-name:var(--font-heading-active)] text-2xl leading-tight">{doctor.name}</h3>
                  <p className="mt-2 text-sm font-bold text-[var(--color-primary)]">{doctor.qualification}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {doctor.specialization} · {doctor.experience}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{doctor.bio}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {doctor.languages.map((language) => (
                      <span
                        className="border border-[var(--color-text)]/15 px-2 py-1 text-xs font-bold text-[var(--color-muted)]"
                        key={language}
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </Section>

        {/* --------------------------------------------------- before/after */}
        <Section
          eyebrow={home.sections.beforeAfter.eyebrow}
          heading={home.sections.beforeAfter.heading}
          subheading={home.sections.beforeAfter.subheading}
          variant="surface"
        >
          <Reveal className="grid gap-6 md:grid-cols-2" stagger={90}>
            {home.beforeAfter.map((caseStudy) => (
              <BeforeAfterSlider caseStudy={caseStudy} key={caseStudy.treatment} />
            ))}
          </Reveal>
        </Section>

        {/* -------------------------------------------------------- gallery */}
        <Section
          eyebrow={home.sections.gallery.eyebrow}
          heading={home.sections.gallery.heading}
          id="gallery"
          subheading={home.sections.gallery.subheading}
        >
          <GalleryLightbox gallery={site.gallery} />
        </Section>

        {/* -------------------------------------------------------- reviews */}
        <Section
          aside={
            <a
              className="nudge inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]"
              href={home.googleReviews.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sweep">{home.googleReviews.label}</span>
              <Icon className="size-4" name="arrowUpRight" />
            </a>
          }
          eyebrow={home.sections.reviews.eyebrow}
          heading={home.sections.reviews.heading}
          id="reviews"
          subheading={home.sections.reviews.subheading}
          variant="surface"
        >
          <Reveal
            className="-mx-5 grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid-flow-row md:grid-cols-2 md:overflow-visible md:px-0"
            stagger={80}
          >
            {site.reviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.date}`} review={review} />
            ))}
          </Reveal>
        </Section>

        {/* ------------------------------------------------ payment and EMI */}
        <section className="bg-[var(--color-primary)] text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-5 py-6 text-sm font-semibold sm:px-8">
            {home.paymentNotes.map((note) => (
              <span className="flex items-center gap-2.5" key={note}>
                <Icon className="size-4 shrink-0 text-[var(--color-accent)]" name="check" />
                {note}
              </span>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- location */}
        <Section eyebrow={home.sections.location.eyebrow} heading={home.sections.location.heading} id="location">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="min-h-[24rem] overflow-hidden rounded-[8px] border border-[var(--color-text)]/10 lg:min-h-[30rem]" direction="left">
              <iframe
                className="size-full min-h-[24rem] border-0 lg:min-h-[30rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={site.contact.mapEmbedUrl}
                title={`Map to ${site.brand.name}`}
              />
            </Reveal>
            <Reveal direction="right">
              <LocationDetails
                contact={site.contact}
                directionsLabel={home.sections.location.directionsLabel}
                hours={site.hours}
                parkingLabel={home.sections.location.parkingLabel}
              />
            </Reveal>
          </div>
        </Section>

        {/* ---------------------------------------------------- appointment */}
        <Section
          eyebrow={home.sections.appointment.eyebrow}
          heading={home.sections.appointment.heading}
          subheading={home.sections.appointment.subheading}
          variant="surface"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal
              className="scroll-mt-28 rounded-[8px] border border-[var(--color-text)]/10 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
              id="enquiry"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Appointment form
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
                Four boxes. We call you back within two hours.
              </h3>
              <ul className="mt-6 grid gap-2.5 text-sm font-semibold">
                {[
                  "Your name and mobile number",
                  "The treatment you need",
                  "The day that suits you",
                  "Anything we should know before you arrive",
                ].map((item) => (
                  <li className="flex items-start gap-2.5" key={item}>
                    <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="check" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button href="/contact#enquiry" size="lg" trailingIcon="arrowRight">
                  Open the appointment form
                </Button>
              </div>
              <p className="mt-5 text-sm leading-6 text-[var(--color-muted)]">
                Calling is faster if you need a slot today.
              </p>
            </Reveal>

            <Reveal className="border-l-2 border-[var(--color-accent)] pl-6" delay={120} direction="right">
              <h3 className="font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
                {home.sections.appointment.reassuranceHeading}
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[var(--color-muted)]">
                {home.sections.appointment.reassuranceText}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={phoneLink} icon="phone">
                  Call {site.contact.phonePrimary}
                </Button>
                <WhatsAppLink
                  className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-[var(--color-whatsapp)] px-4 py-2 text-sm font-bold text-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)] hover:text-white"
                  message={home.hero.whatsappMessage}
                  phone={site.contact.whatsapp}
                >
                  <Icon className="size-4" name="whatsapp" />
                  WhatsApp
                </WhatsAppLink>
              </div>
              {site.contact.parkingNote && (
                <p className="mt-7 text-sm leading-6 text-[var(--color-muted)]">{site.contact.parkingNote}</p>
              )}
            </Reveal>
          </div>
        </Section>
      </main>

      <Footer site={site} />
      <StickyMobileBar site={site} />
    </div>
  );
}
