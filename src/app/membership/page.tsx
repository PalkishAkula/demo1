import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PlanCards } from "@/components/PlanCards";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getSite } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const site = getSite();
  return pageMetadata(site, {
    path: "/membership",
    title: `Gym membership fees in Vijayawada | ${site.brand.name}`,
    description: "Patamata gym membership from ₹1,450 a month, ₹3,900 quarterly and ₹12,600 a year with the joining fee waived.",
  });
}

export default function MembershipPage() {
  const site = getSite();
  const gym = site.gym;
  if (site.type !== "gym" || !gym) notFound();

  return (
    <SiteShell site={site}>
      <PageHero
        aside={
          <dl className="grid grid-cols-3 gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12">
            {[
              { value: "₹1,450", label: "monthly" },
              { value: "₹3,900", label: "quarterly" },
              { value: "₹12,600", label: "annual" },
            ].map((item) => (
              <div className="bg-white px-4 py-5" key={item.label}>
                <dd className="font-[family-name:var(--font-heading-active)] text-2xl font-extrabold tabular-nums text-[var(--color-primary)]">
                  {item.value}
                </dd>
                <dt className="mt-1 text-xs leading-4 text-[var(--color-muted)]">{item.label}</dt>
              </div>
            ))}
          </dl>
        }
        breadcrumb="Membership"
        eyebrow="Membership and fees"
        subtitle="Every plan includes the coached floor. What changes is the class limit, the checks and the freeze days."
        title="Three plans, and the whole price list on one page."
      >
        <p className="flex items-center gap-2.5 text-sm font-semibold text-[var(--color-muted)]">
          <Icon className="size-4 text-[var(--color-primary)]" name="rupee" />
          {site.priceRevisionNote}
        </p>
      </PageHero>

      <Section>
        <PlanCards contact={site.contact} plans={gym.plans} />
        <p className="mt-6 text-sm leading-6 text-[var(--color-muted)]">{gym.joiningNote}</p>
      </Section>

      {/* ------------------------------------------------------- comparison */}
      <Section
        eyebrow="Line by line"
        heading="What each plan actually includes."
        subheading="Slide the table across on a phone. Nothing below is decided at the desk."
        variant="surface"
      >
        <div className="-mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[36rem] border-collapse border border-[var(--color-text)]/12 bg-white text-left text-sm">
            <caption className="sr-only">Membership plan comparison</caption>
            <thead>
              <tr>
                <th className="border-b border-[var(--color-text)]/12 px-4 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-muted)]" scope="col">
                  Feature
                </th>
                {gym.plans.map((plan) => (
                  <th
                    className={`border-b border-l border-[var(--color-text)]/12 px-4 py-4 font-[family-name:var(--font-heading-active)] text-lg font-bold ${
                      plan.featured ? "text-[var(--color-primary)]" : "text-[var(--color-text)]"
                    }`}
                    key={plan.id}
                    scope="col"
                  >
                    {plan.name}
                    <span className="mt-1 block text-xs font-semibold tabular-nums text-[var(--color-muted)]">
                      {plan.price} {plan.period}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gym.planComparison.map((row) => (
                <tr className="border-t border-[var(--color-text)]/10" key={row.feature}>
                  <th className="px-4 py-3.5 font-semibold text-[var(--color-text)]" scope="row">
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      className="border-l border-[var(--color-text)]/10 px-4 py-3.5 text-[var(--color-muted)]"
                      key={`${row.feature}-${gym.plans[index]?.id ?? index}`}
                    >
                      {value === "None" ? <span className="text-[var(--color-text)]/30">None</span> : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ----------------------------------------------------------- add-ons */}
      <Section
        aside={
          <Button href="/services" trailingIcon="arrowRight" variant="secondary">
            All programs and fees
          </Button>
        }
        eyebrow="Add-ons"
        heading="Things you can bolt on to any plan."
      >
        <Reveal className="divide-y divide-[var(--color-text)]/10 border-y border-[var(--color-text)]/10" stagger={50}>
          {gym.addOns.map((addOn) => (
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5" key={addOn.name}>
              <div>
                <h3 className="font-[family-name:var(--font-heading-active)] text-xl font-bold leading-tight">
                  {addOn.name}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--color-muted)]">{addOn.note}</p>
              </div>
              <p className="text-xl font-extrabold tabular-nums text-[var(--color-primary)]">{addOn.price}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- induction */}
      <Section eyebrow="Joining" heading="Your first week, step by step." variant="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal as="ol" className="relative border-l-2 border-[var(--color-accent)]/30 pl-7" direction="left" stagger={90}>
            {[
              { title: "Free first session", text: "Walk in with shoes and a water bottle. You train a full session, not a tour." },
              { title: "Measurements and history", text: "The coach records your weight, measurements and any injury before writing anything." },
              { title: "Three induction sessions", text: "Your starting loads are set on the floor across the first week." },
              { title: "Programme card", text: "Your four-week plan goes on a card at the desk and gets reviewed on week five." },
            ].map((step, index) => (
              <li className="relative pb-9 last:pb-0" key={step.title}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.75rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-[var(--color-accent)] bg-white"
                />
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-accent)] tabular-nums">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="border-l-2 border-[var(--color-accent)] pl-6" delay={120} direction="right">
            <h3 className="font-[family-name:var(--font-heading-active)] text-3xl font-bold leading-tight">
              Floor rules, so nobody has to ask.
            </h3>
            <p className="mt-4 leading-7 text-[var(--color-muted)]">{gym.inductionNote}</p>
            <ul className="mt-7 grid gap-4">
              {gym.rules.map((rule) => (
                <li key={rule.title}>
                  <p className="flex items-center gap-2 text-sm font-extrabold">
                    <Icon className="size-4 shrink-0 text-[var(--color-accent)]" name="check" />
                    {rule.title}
                  </p>
                  <p className="mt-1 pl-6 text-sm leading-6 text-[var(--color-muted)]">{rule.text}</p>
                </li>
              ))}
            </ul>
            <WhatsAppLink
              className="nudge mt-8 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-5 text-sm font-bold text-white hover:brightness-110"
              message={`Hi, I want to book my free first session at ${site.brand.shortName}. My name is:`}
              phone={site.contact.whatsapp}
            >
              <Icon className="size-4" name="whatsapp" />
              Book the free first session
              <Icon className="size-4" name="arrowRight" />
            </WhatsAppLink>
          </Reveal>
        </div>
      </Section>
    </SiteShell>
  );
}
