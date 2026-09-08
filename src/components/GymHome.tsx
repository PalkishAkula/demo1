import Image from "next/image";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { EmergencyStrip } from "@/components/EmergencyStrip";
import { Footer } from "@/components/Footer";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { LocationDetails } from "@/components/LocationDetails";
import { Marquee } from "@/components/Marquee";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { PlanCards } from "@/components/PlanCards";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { Section } from "@/components/Section";
import { StatBar } from "@/components/StatBar";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { TimetableGrid } from "@/components/TimetableGrid";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

// The gym home page. Same ideology as the dental home — config-driven, mobile
// first, no repeated card grid — but the rhythm is built around the two things
// people actually check before joining: the fee table and the class timetable.
export function GymHome({ site }: { site: SiteConfig }) {
  const home = site.home;
  const gym = site.gym;
  if (!home || !gym) return null;

  const phoneLink = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;
  const ratingStat = site.stats.find((stat) => /review/i.test(stat.label));
  const featured = site.services.filter((service) => service.featured);

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
            className="pointer-events-none absolute -left-32 bottom-10 -z-10 hidden h-64 w-64 border-l-4 border-t-4 border-[var(--color-primary)]/12 lg:block"
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
                {home.hero.eyebrow}
              </p>

              <h1 className="mt-5 text-balance font-[family-name:var(--font-heading-active)] text-[2.5rem] font-extrabold leading-[1.03] tracking-tight text-[var(--color-text)] sm:text-6xl lg:text-[4.1rem]">
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
                  Book a free session
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
                className="absolute -left-4 -top-4 bottom-8 right-12 -z-10 hidden bg-[var(--color-primary)]/10 sm:block"
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
                <div className="absolute -bottom-7 right-4 flex items-center gap-3 rounded-[8px] border border-[var(--color-text)]/10 bg-white px-4 py-3 shadow-[var(--shadow-float)] sm:-right-6">
                  <Icon className="size-5 fill-[var(--color-accent)] text-[var(--color-accent)]" name="star" />
                  <p className="text-sm leading-tight">
                    <span className="block font-extrabold tabular-nums text-[var(--color-text)]">
                      {ratingStat.value} on Google
                    </span>
                    <span className="block text-xs text-[var(--color-muted)]">{ratingStat.label}</span>
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <StatBar note={site.contact.languagesLine} stats={site.stats} />

        {/* --------------------------------------------------------- programs */}
        {/* A price list, not a card grid. People scan this the way they scan a
            menu, so it stays as rows with the fee on the right. */}
        <Section
          aside={
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {site.priceRevisionNote}
            </p>
          }
          eyebrow={home.sections.services.eyebrow}
          heading={home.sections.services.heading}
          id="programs"
          subheading={home.sections.services.subheading}
        >
          <Reveal className="divide-y divide-[var(--color-text)]/10 border-y border-[var(--color-text)]/10" stagger={40}>
            {featured.map((service) => (
              <article
                className="group grid gap-3 py-6 sm:grid-cols-[1.6fr_1fr] sm:items-baseline sm:gap-8"
                id={service.id}
                key={service.id}
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    {service.category}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-heading-active)] text-2xl font-bold leading-tight transition-colors duration-150 group-hover:text-[var(--color-primary)]">
                    {service.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">{service.shortDesc}</p>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:flex-col sm:items-end">
                  <p className="flex items-baseline gap-2 text-2xl font-extrabold tabular-nums text-[var(--color-primary)]">
                    {service.price}
                    {service.priceNote && (
                      <span className="text-xs font-medium text-[var(--color-muted)]">{service.priceNote}</span>
                    )}
                  </p>
                  <WhatsAppLink
                    className="nudge inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)]"
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

          <Reveal className="mt-8 flex flex-wrap gap-3" delay={80}>
            <Button href="/services" trailingIcon="arrowRight" variant="secondary">
              All {site.services.length} programs and fees
            </Button>
            <Button href="/membership" trailingIcon="arrowRight" variant="ghost">
              Membership plans
            </Button>
          </Reveal>
        </Section>

        {site.serviceAreas && <Marquee items={site.serviceAreas} label="Members travel from" />}

        {/* --------------------------------------------------------- pricing */}
        <Section
          aside={
            <p className="max-w-xs text-sm leading-6 text-[var(--color-muted)]">{gym.joiningNote}</p>
          }
          eyebrow="Membership"
          heading="Three plans. The longer you commit, the less you pay a month."
          id="membership"
          subheading="Every plan includes the coached floor. What changes is the class limit, the checks and the freeze days."
          variant="surface"
        >
          <PlanCards contact={site.contact} plans={gym.plans} />

          <Reveal className="mt-8" delay={80}>
            <Button href="/membership" trailingIcon="arrowRight" variant="secondary">
              Compare plans line by line
            </Button>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------- timetable */}
        <Section
          aside={
            <Link
              className="nudge inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-white/40 px-4 text-sm font-bold text-white hover:bg-white hover:text-[var(--color-primary)]"
              href="/timetable"
            >
              <span className="sweep">See the full week</span>
              <Icon className="size-4" name="arrowRight" />
            </Link>
          }
          eyebrow="This week"
          heading="Morning batches start at 5.30 AM."
          id="timetable"
          subheading="Slide the table across to see the rest of the week."
          variant="ink"
        >
          <TimetableGrid rows={gym.timetable.slice(0, 4)} tone="ink" />
          <p className="mt-6 max-w-2xl text-sm leading-6 text-white/70">{gym.timetableNote}</p>
        </Section>

        {/* ------------------------------------------------------ why members */}
        <Section
          eyebrow={home.sections.whyChoose.eyebrow}
          heading={home.sections.whyChoose.heading}
          subheading={home.sections.whyChoose.subheading}
        >
          <Reveal
            className="grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12 md:grid-cols-2"
            stagger={80}
          >
            {home.whyChoose.map((point, index) => (
              <article
                className="group bg-white p-7 transition-colors duration-150 hover:bg-[var(--color-surface)] lg:p-9"
                key={point.heading}
              >
                <p className="font-[family-name:var(--font-heading-active)] text-3xl font-extrabold leading-none text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-y-0.5">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-lg font-extrabold">{point.heading}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">{point.text}</p>
              </article>
            ))}
          </Reveal>
        </Section>

        {/* --------------------------------------------------------- coaches */}
        <Section
          aside={
            <Button href="/trainers" trailingIcon="arrowRight" variant="secondary">
              Full profiles
            </Button>
          }
          eyebrow={home.sections.doctors.eyebrow}
          heading={home.sections.doctors.heading}
          id="coaches"
          subheading={home.sections.doctors.subheading}
          variant="surface"
        >
          <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={80}>
            {site.team.map((coach) => (
              <article className="lift flex h-full flex-col border border-[var(--color-text)]/10 bg-white" key={coach.name}>
                <Image
                  alt={coach.photoAlt ?? coach.name}
                  className="aspect-[5/6] w-full object-cover"
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src={coach.photo}
                  width={500}
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-heading-active)] text-xl font-bold leading-tight">
                    {coach.name}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-[var(--color-primary)]">{coach.specialization}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    {coach.qualification.split(",")[0]} · {coach.experience}
                  </p>
                  <WhatsAppLink
                    className="nudge mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-[var(--color-primary)]"
                    message={`Hi, I want to train with ${coach.name} at ${site.brand.shortName}. My name is:`}
                    phone={site.contact.whatsapp}
                  >
                    <span className="sweep">Ask for {coach.name.split(" ")[0]}</span>
                    <Icon className="size-4" name="arrowRight" />
                  </WhatsAppLink>
                </div>
              </article>
            ))}
          </Reveal>
        </Section>

        {/* --------------------------------------------------- member results */}
        <Section
          eyebrow={home.sections.beforeAfter.eyebrow}
          heading={home.sections.beforeAfter.heading}
          subheading={home.sections.beforeAfter.subheading}
        >
          <Reveal className="grid gap-6 md:grid-cols-2" stagger={90}>
            {home.beforeAfter.map((caseStudy) => (
              <BeforeAfterSlider caseStudy={caseStudy} key={caseStudy.treatment} />
            ))}
          </Reveal>
        </Section>

        {/* -------------------------------------------------------- the floor */}
        <Section
          eyebrow="The floor"
          heading="Five areas across two floors."
          id="floor"
          subheading="Nothing here needs a queue. The racks and the deck are separate rooms."
          variant="surface"
        >
          <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={70}>
            {gym.floor.map((zone, index) => (
              <article
                className={`lift relative flex flex-col overflow-hidden border border-[var(--color-text)]/10 bg-white ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
                key={zone.name}
              >
                <Image
                  alt={zone.photoAlt ?? zone.name}
                  className={`w-full object-cover ${index === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}
                  height={480}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={zone.photo}
                  width={720}
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    <Icon className="size-4" name="dumbbell" />
                    {zone.count}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-heading-active)] text-2xl font-bold leading-tight">
                    {zone.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{zone.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </Section>

        {/* --------------------------------------------------------- gallery */}
        <Section
          eyebrow={home.sections.gallery.eyebrow}
          heading={home.sections.gallery.heading}
          id="gallery"
          subheading={home.sections.gallery.subheading}
        >
          <GalleryLightbox gallery={site.gallery} />
        </Section>

        {/* --------------------------------------------------------- reviews */}
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

        {/* --------------------------------------------------------- payment */}
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

        {/* -------------------------------------------------------- location */}
        <Section eyebrow={home.sections.location.eyebrow} heading={home.sections.location.heading} id="location">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal
              className="min-h-[24rem] overflow-hidden rounded-[8px] border border-[var(--color-text)]/10 lg:min-h-[30rem]"
              direction="left"
            >
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

        {/* ---------------------------------------------------- free session */}
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
                Trial session form
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-heading-active)] text-3xl font-bold leading-tight">
                Five boxes. We call you back within two hours.
              </h3>
              <ul className="mt-6 grid gap-2.5 text-sm font-semibold">
                {[
                  "Your name and mobile number",
                  "The program you want to try",
                  "The hours you can train",
                  "Your goal, if you have one in mind",
                  "Any injury or condition we should know about",
                ].map((item) => (
                  <li className="flex items-start gap-2.5" key={item}>
                    <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="check" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button href="/contact#enquiry" size="lg" trailingIcon="arrowRight">
                  Open the trial session form
                </Button>
              </div>
              <p className="mt-5 text-sm leading-6 text-[var(--color-muted)]">
                Calling is faster if you want to train the same evening.
              </p>
            </Reveal>

            <Reveal className="border-l-2 border-[var(--color-accent)] pl-6" delay={120} direction="right">
              <h3 className="font-[family-name:var(--font-heading-active)] text-3xl font-bold leading-tight">
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
              <p className="mt-7 text-sm leading-6 text-[var(--color-muted)]">{gym.inductionNote}</p>
            </Reveal>
          </div>
        </Section>
      </main>

      <Footer site={site} />
      <StickyMobileBar site={site} />
    </div>
  );
}
