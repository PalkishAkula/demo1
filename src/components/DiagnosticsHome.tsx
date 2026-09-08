import Image from "next/image";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { LocationDetails } from "@/components/LocationDetails";
import { Marquee } from "@/components/Marquee";
import { OpenNowBadge } from "@/components/OpenNowBadge";
import { PackageCards } from "@/components/PackageCards";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { StatBar } from "@/components/StatBar";
import { TestFinder } from "@/components/TestFinder";
import { TestSearch } from "@/components/TestSearch";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

export function DiagnosticsHome({ site }: { site: SiteConfig }) {
  const diagnostics = site.diagnostics;
  if (!diagnostics) return null;

  const home = diagnostics.home;
  const collection = diagnostics.homeCollection;
  const phoneHref = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;

  return (
    <SiteShell site={site}>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative isolate overflow-hidden bg-[var(--color-primary-dark)] py-16 text-white lg:py-24">
        <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 -z-10 hidden size-[32rem] rounded-full border border-white/10 lg:block"
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-[family-name:var(--font-heading-active)] text-[2.5rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              {home.hero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{home.hero.subheading}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#booking" icon="home" size="lg">
                {home.hero.bookingLabel}
              </Button>
              <Button className="w-full border-white/40 text-white hover:bg-white hover:text-[var(--color-primary-dark)] sm:w-auto" href={phoneHref} icon="phone" size="lg" variant="secondary">
                {site.contact.phonePrimary}
              </Button>
            </div>

            <div className="mt-8">
              <OpenNowBadge hours={site.hours} />
            </div>
          </Reveal>

          {/* The search box is the centrepiece — it sits in its own card. */}
          <Reveal className="border border-white/20 bg-white p-6 text-[var(--color-text)] shadow-[var(--shadow-float)] lg:p-8" delay={120} direction="scale">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.13em] text-[var(--color-primary)]">
              <Icon className="size-4" name="search" />
              Find a test
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              Search by test name to see the current price and report time before you book from Governorpet or from
              home.
            </p>
            <div className="mt-5">
              <TestSearch
                phone={site.contact.phonePrimary}
                placeholder="Search CBC, thyroid, Vitamin D..."
                tests={diagnostics.tests}
              />
            </div>
            <p className="mt-4 text-xs text-[var(--color-muted)]">
              <span className="font-bold tabular-nums">{diagnostics.tests.length}</span> tests listed ·{" "}
              <span className="font-bold tabular-nums">{diagnostics.packages.length}</span> packages · prices revised
              January 2026
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ home collection strip */}
      <section className="border-b border-[var(--color-text)]/10 bg-[var(--color-surface)]">
        <Reveal className="mx-auto grid max-w-7xl gap-px px-5 sm:grid-cols-3 sm:px-8" stagger={80}>
          {home.collectionStrip.map((item, index) => (
            <p className="flex items-center gap-3 border-l-2 border-[var(--color-accent)] py-5 pl-4 text-sm font-bold" key={item}>
              <Icon
                className="size-5 shrink-0 text-[var(--color-primary)]"
                name={index === 0 ? "home" : index === 1 ? "clock" : "whatsapp"}
              />
              {item}
            </p>
          ))}
        </Reveal>
      </section>

      <StatBar note={site.contact.languagesLine} stats={site.stats} tone="light" />

      {/* -------------------------------------------------------- packages */}
      <Section
        aside={
          <Button href="/packages" trailingIcon="arrowRight" variant="secondary">
            All packages
          </Button>
        }
        eyebrow="Health packages"
        heading="Choose a package by what you want to check."
        id="packages"
        subheading="Open a card to compare its full test list against the January 2026 price."
      >
        <PackageCards contact={site.contact} packages={diagnostics.packages} priceRevisionNote={site.priceRevisionNote} />
      </Section>

      <Marquee items={collection.areas} label="Home collection in" tone="ink" />

      {/* ----------------------------------------------------- test finder */}
      <Section
        eyebrow="Test finder"
        ground="dots"
        heading={`Search all ${diagnostics.tests.length} listed tests before you book.`}
        id="tests"
        subheading="Filter by category, check the report window and add a test to your booking list."
        variant="surface"
      >
        <TestFinder
          phone={site.contact.phonePrimary}
          priceRevisionNote={site.priceRevisionNote}
          tests={diagnostics.tests}
          whatsapp={site.contact.whatsapp}
        />
      </Section>

      {/* ---------------------------------------------------- how it works */}
      <Section eyebrow="Home collection" heading="Four clear steps from your home to the report.">
        <Reveal className="grid gap-7 md:grid-cols-4 md:gap-0" stagger={90}>
          {home.howItWorks.map((step, index) => (
            <article
              className="relative border-l-2 border-[var(--color-accent)] pl-5 md:border-l-0 md:border-t-2 md:pl-0 md:pr-6 md:pt-6"
              key={step.title}
            >
              <p className="font-[family-name:var(--font-heading-active)] text-2xl leading-none tabular-nums text-[var(--color-accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ facilities */}
      <Section eyebrow="Facilities" heading="Testing and imaging under one roof." variant="surface">
        <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={70}>
          {home.facilities.map((facility) => (
            <article
              className="lift grid grid-cols-[6.5rem_1fr] gap-4 border border-[var(--color-text)]/10 bg-white p-4"
              key={facility.name}
            >
              <Image
                alt={facility.photoAlt ?? facility.name}
                className="aspect-square size-26 rounded-[6px] object-cover"
                height={224}
                sizes="112px"
                src={facility.photo}
                width={224}
              />
              <div>
                <h3 className="font-[family-name:var(--font-heading-active)] text-xl leading-tight">{facility.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{facility.text}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ----------------------------------------------------- pathologist */}
      <Section eyebrow="Pathologist review" heading="Your report is checked before it is shared.">
        <Reveal
          as="article"
          className="grid overflow-hidden border border-[var(--color-text)]/10 bg-white md:grid-cols-[0.42fr_0.58fr]"
          direction="scale"
        >
          <Image
            alt={`${diagnostics.pathologist.name} reviewing a pathology report at the Governorpet lab`}
            className="h-full min-h-72 w-full object-cover"
            height={640}
            sizes="(max-width: 768px) 100vw, 42vw"
            src={diagnostics.pathologist.photo}
            width={640}
          />
          <div className="p-7 lg:p-10">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-accent)]">
              <Icon className="size-4" name="microscope" />
              {diagnostics.pathologist.experience}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
              {diagnostics.pathologist.name}
            </h3>
            <p className="mt-2 font-bold text-[var(--color-primary)]">{diagnostics.pathologist.qualification}</p>
            <p className="mt-5 max-w-2xl leading-7 text-[var(--color-muted)]">{diagnostics.pathologist.bio}</p>
            <p className="mt-6 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-4 text-sm leading-6 text-[var(--color-muted)]">
              {diagnostics.pathologist.signedReportNote}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- reviews */}
      <Section
        aside={
          home.googleReviews && (
            <a
              className="nudge inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]"
              href={home.googleReviews.url}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sweep">{home.googleReviews.label}</span>
              <Icon className="size-4" name="arrowUpRight" />
            </a>
          )
        }
        eyebrow="Patient feedback"
        heading="What people mention about collection and report timing."
        id="reviews"
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

      {/* ---------------------------------------------- corporate and camps */}
      <section className="relative isolate overflow-hidden bg-[var(--color-primary-dark)] py-12 text-white">
        <span aria-hidden="true" className="bg-diagonal pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
              {home.corporate.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{home.corporate.text}</p>
          </div>
          <WhatsAppLink
            className="nudge inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[8px] bg-[var(--color-accent)] px-5 text-sm font-bold text-[var(--color-text)] hover:brightness-105"
            message={`Hi, I want to ask about a health camp with ${site.brand.shortName}. Our group is:`}
            phone={site.contact.whatsapp}
          >
            <Icon className="size-4" name="users" />
            {home.corporate.linkLabel}
            <Icon className="size-4" name="arrowRight" />
          </WhatsAppLink>
        </div>
      </section>

      {/* -------------------------------------------------------- location */}
      <Section eyebrow="Governorpet centre" heading="Visit the lab or book from home." id="location">
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
          <Reveal delay={120} direction="right">
            <LocationDetails
              contact={site.contact}
              directionsLabel="Get Directions"
              hours={site.hours}
              parkingLabel="Parking"
            />
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- booking */}
      <Section
        eyebrow="Home collection booking"
        ground="dots"
        heading="Choose your area and a time that works."
        subheading={collection.reportPromise}
        variant="surface"
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal
            className="scroll-mt-28 border border-[var(--color-text)]/10 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
            direction="left"
            id="booking"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Booking form
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
              Tell us your area, the test and a slot.
            </h3>
            <ul className="mt-6 grid gap-2.5 text-sm font-semibold">
              {[
                "Your name and mobile number",
                "Your area in Vijayawada",
                "The test or package you want",
                "The collection slot that suits you",
              ].map((item) => (
                <li className="flex items-start gap-2.5" key={item}>
                  <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/contact#enquiry" size="lg" trailingIcon="arrowRight">
                {home.hero.bookingLabel}
              </Button>
            </div>
            <p className="mt-5 text-sm leading-6 text-[var(--color-muted)]">
              A technician confirms the slot on WhatsApp before they leave.
            </p>
          </Reveal>

          <Reveal as="aside" className="border-l-2 border-[var(--color-accent)] pl-6" delay={120} direction="right">
            <h3 className="font-[family-name:var(--font-heading-active)] text-3xl leading-tight">
              {collection.freeAbove}
            </h3>
            <p className="mt-4 max-w-md leading-7 text-[var(--color-muted)]">
              {collection.standardCharge}. A technician confirms on WhatsApp before they leave, and the report reaches
              the same number.
            </p>
            <ul className="mt-7 grid gap-2 text-sm">
              {collection.slots.map((slot) => (
                <li className="flex items-center gap-2.5 font-semibold" key={slot}>
                  <Icon className="size-4 shrink-0 text-[var(--color-primary)]" name="clock" />
                  {slot}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={phoneHref} icon="phone">
                Call the lab
              </Button>
              <Button href="/home-collection" trailingIcon="arrowRight" variant="secondary">
                Home collection details
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </SiteShell>
  );
}
