import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { PhonePreview } from "@/components/PhonePreview";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

export function PortfolioHome({ site }: { site: SiteConfig }) {
  const data = site.portfolio;
  if (!data) return null;

  const phoneHref = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;

  return (
    <div className="bg-[var(--color-primary-dark)] text-white" id="top">
      <main className="pb-20 md:pb-0" id="main-content">
        {/* ------------------------------------------------------------ top */}
        <header className="border-b border-white/12 px-5 py-5 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <Link className="flex items-center gap-3" href="/">
              <span className="grid size-9 place-items-center border-2 border-white/70 text-xs font-extrabold">
                {site.brand.logoText}
              </span>
              <span className="font-[family-name:var(--font-heading-active)] text-xl">{site.brand.name}</span>
            </Link>
            <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-semibold md:flex">
              {[
                { href: "#work", label: "Work" },
                { href: "#packages", label: "Packages" },
                { href: "#faq", label: "Questions" },
              ].map((link) => (
                <a className="navlink text-white/75 hover:text-white" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <a className="text-sm font-bold text-[var(--color-accent)]" href={phoneHref}>
              {site.contact.phonePrimary}
            </a>
          </div>
        </header>

        {/* ----------------------------------------------------------- hero */}
        <section className="relative isolate overflow-hidden px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
          <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="flex items-center gap-2.5 text-sm font-bold text-[var(--color-accent)]">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-70" />
                {data.ownerName} · Vijayawada
              </p>

              <h1 className="mt-7 max-w-4xl text-balance font-[family-name:var(--font-heading-active)] text-[2.75rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]">
                I build websites for clinics, labs and coaching centres in Vijayawada.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
                Mobile-first, click-to-call, WhatsApp booking and a Google listing that actually shows up. Standard
                build live in five days.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <WhatsAppLink
                  className="nudge inline-flex min-h-13 items-center justify-center gap-2 rounded-[8px] bg-[var(--color-accent)] px-7 text-base font-bold text-[var(--color-primary-dark)] hover:brightness-105"
                  message={data.whatsappMessage}
                  phone={site.contact.whatsapp}
                >
                  <Icon className="size-5" name="whatsapp" />
                  WhatsApp me
                  <Icon className="size-4" name="arrowRight" />
                </WhatsAppLink>

                <p className="flex items-center gap-2.5 text-sm font-semibold text-white/70">
                  <span aria-hidden="true" className="relative grid size-2.5 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                  </span>
                  {data.availability}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- work */}
        <section className="bg-[var(--color-surface)] px-5 py-20 text-[var(--color-text)] sm:px-8 lg:py-28" id="work">
          <div className="mx-auto max-w-6xl">
            <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
              Selected work
            </p>
            <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-heading-active)] text-4xl leading-tight sm:text-5xl">
              Two demos you can open on your phone right now.
            </h2>

            <Reveal className="mt-12 grid gap-8 lg:grid-cols-2" stagger={120}>
              {data.work.map((work) => (
                <article
                  className="lift grid gap-7 border border-[var(--color-text)]/15 bg-white p-6 sm:grid-cols-[auto_1fr] sm:p-7"
                  key={work.name}
                >
                  <PhonePreview
                    color={work.previewColor}
                    locality={work.previewLocality}
                    mark={work.name.slice(0, 2).toUpperCase()}
                    title={work.previewTitle}
                  />

                  <div className="flex flex-col">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                      {work.type}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-heading-active)] text-2xl leading-tight">
                      {work.name}
                    </h3>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <li
                          className="border border-[var(--color-text)]/15 px-2.5 py-1 text-xs font-bold text-[var(--color-muted)]"
                          key={tag}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <a
                      className="nudge mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-sm font-bold text-[var(--color-primary)]"
                      href={work.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="sweep">View live site</span>
                      <Icon className="size-4" name="arrowUpRight" />
                    </a>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------- included */}
        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-[family-name:var(--font-heading-active)] text-4xl leading-[1.05] sm:text-5xl">
              What&apos;s included in a standard build.
            </h2>
            <Reveal as="ul" className="grid gap-x-10 gap-y-1 sm:grid-cols-2" stagger={45}>
              {data.included.map((item) => (
                <li className="flex items-start gap-3 border-t border-white/15 py-4 text-sm text-white/80" key={item}>
                  <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" name="check" />
                  {item}
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------- packages */}
        <section className="bg-white px-5 py-20 text-[var(--color-text)] sm:px-8 lg:py-28" id="packages">
          <div className="mx-auto max-w-6xl">
            <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
              Packages
            </p>
            <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-heading-active)] text-4xl leading-tight sm:text-5xl">
              One price, quoted before we start.
            </h2>

            <Reveal className="mt-12 grid gap-4 lg:grid-cols-3" stagger={100}>
              {data.packages.map((item) => (
                <article
                  className={`lift flex flex-col border p-7 ${
                    item.featured
                      ? "border-t-4 border-[var(--color-accent)] bg-[var(--color-surface)]"
                      : "border-[var(--color-text)]/15"
                  }`}
                  key={item.id}
                >
                  {item.featured && (
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                      Most chosen
                    </p>
                  )}
                  <h3 className="mt-3 font-[family-name:var(--font-heading-active)] text-3xl leading-none">
                    {item.name}
                  </h3>
                  <p className="mt-5 text-4xl font-extrabold tabular-nums text-[var(--color-primary)]">{item.price}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
                    <Icon className="size-4" name="clock" />
                    Live in {item.timeline}
                  </p>

                  <ul className="mt-7 grid gap-2.5 border-t border-[var(--color-text)]/12 pt-6 text-sm leading-6">
                    {item.inclusions.map((inclusion) => (
                      <li className="flex items-start gap-2.5" key={inclusion}>
                        <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                        {inclusion}
                      </li>
                    ))}
                  </ul>

                  <WhatsAppLink
                    className="nudge mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] pt-0 text-sm font-bold text-[var(--color-primary)] underline decoration-[var(--color-accent)] underline-offset-4"
                    message={`Hi, I want the ${item.name} package (${item.price}) for my Vijayawada business. My business is:`}
                    phone={site.contact.whatsapp}
                  >
                    Ask about {item.name}
                    <Icon className="size-4" name="arrowRight" />
                  </WhatsAppLink>
                </article>
              ))}
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--color-text)]/12 pt-6 text-sm font-semibold">
              <p className="flex items-center gap-2.5">
                <Icon className="size-4 text-[var(--color-accent)]" name="star" />
                {data.founderOffer}
              </p>
              <p className="flex items-center gap-2.5 text-[var(--color-muted)]">
                <Icon className="size-4" name="card" />
                {data.maintenance}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- process */}
        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-2xl font-[family-name:var(--font-heading-active)] text-4xl leading-tight sm:text-5xl">
              Five steps. One clear launch.
            </h2>
            <Reveal as="ol" className="mt-12 grid gap-6 md:grid-cols-5 md:gap-4" stagger={90}>
              {data.process.map((step, index) => (
                <li className="border-t-2 border-[var(--color-accent)] pt-5 text-sm leading-6 text-white/80" key={step}>
                  <span className="block font-[family-name:var(--font-heading-active)] text-2xl tabular-nums text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 block">{step}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ faq */}
        <section className="bg-[var(--color-surface)] px-5 py-20 text-[var(--color-text)] sm:px-8 lg:py-28" id="faq">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-[family-name:var(--font-heading-active)] text-4xl leading-[1.05] sm:text-5xl">
              Questions before we begin.
            </h2>
            <FaqAccordion items={data.faqs} />
          </div>
        </section>

        {/* -------------------------------------------------------- contact */}
        <section className="px-5 py-20 sm:px-8 lg:py-28" id="contact">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-[var(--color-accent)]">Tell me what you run</p>
              <h2 className="mt-4 font-[family-name:var(--font-heading-active)] text-4xl leading-[1.05] sm:text-5xl">
                Start with a short WhatsApp message.
              </h2>
              <p className="mt-6 max-w-md leading-8 text-white/70">
                Send your business name and locality. I reply with a free demo of your own business before you pay
                anything.
              </p>

              <a className="mt-9 flex items-center gap-3 text-lg font-bold" href={phoneHref}>
                <Icon className="size-5 text-[var(--color-accent)]" name="phone" />
                {site.contact.phonePrimary}
              </a>
              <a className="mt-3 flex items-center gap-3 text-white/75" href={`mailto:${site.contact.email}`}>
                <Icon className="size-5 text-[var(--color-accent)]" name="report" />
                {site.contact.email}
              </a>
              {site.contact.languagesLine && (
                <p className="mt-8 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-6 text-white/70">
                  {site.contact.languagesLine}
                </p>
              )}
            </div>

            <div className="bg-white p-6 text-[var(--color-text)] sm:p-8">
              <EnquiryForm
                brand={site.brand}
                contact={site.contact}
                enquiryFields={site.enquiryFields}
                services={site.services}
                submitLabel="Send enquiry"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/12 px-5 py-8 text-xs leading-5 text-white/55 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.brand.name} · Vijayawada, Andhra Pradesh · Sample portfolio site · Demo businesses shown are not real
          </p>
          <a className="nudge inline-flex items-center gap-2 font-bold text-white/75 hover:text-white" href="#top">
            Back to top
            <Icon className="size-4 -rotate-90" name="arrowRight" />
          </a>
        </div>
      </footer>

      {/* Mobile call to action — the studio only needs one. */}
      <WhatsAppLink
        className="fixed inset-x-0 bottom-0 z-50 flex min-h-16 items-center justify-center gap-2 bg-[var(--color-accent)] text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--color-primary-dark)] md:hidden"
        message={data.whatsappMessage}
        phone={site.contact.whatsapp}
      >
        <Icon className="size-5" name="whatsapp" />
        WhatsApp me
      </WhatsAppLink>
    </div>
  );
}
