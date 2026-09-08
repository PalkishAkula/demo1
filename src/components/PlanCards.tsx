import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

type PlanCardsProps = {
  plans: NonNullable<SiteConfig["gym"]>["plans"];
  contact: SiteConfig["contact"];
};

// Three membership columns. The featured plan sits on a dark ground rather than
// a glow or a badge ribbon, so it reads as a price list and not as an ad.
export function PlanCards({ plans, contact }: PlanCardsProps) {
  return (
    <Reveal className="grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12 lg:grid-cols-3" stagger={90}>
      {plans.map((plan) => {
        const isFeatured = Boolean(plan.featured);

        return (
          <article
            className={`flex flex-col p-7 lg:p-8 ${
              isFeatured ? "bg-[var(--color-primary-dark)] text-white" : "bg-white text-[var(--color-text)]"
            }`}
            id={plan.id}
            key={plan.id}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-[family-name:var(--font-heading-active)] text-2xl font-bold leading-none">
                {plan.name}
              </h3>
              {isFeatured && (
                <span className="border border-[var(--color-accent)] px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                  Most picked
                </span>
              )}
            </div>

            <p className={`mt-5 flex items-baseline gap-2 ${isFeatured ? "text-white" : "text-[var(--color-primary)]"}`}>
              <span className="font-[family-name:var(--font-heading-active)] text-4xl font-extrabold tabular-nums">
                {plan.price}
              </span>
              <span className={`text-sm font-semibold ${isFeatured ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                {plan.period}
              </span>
            </p>

            {plan.mrp && (
              <p className={`mt-2 text-sm ${isFeatured ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                Instead of <span className="line-through tabular-nums">{plan.mrp}</span> paid month by month
              </p>
            )}

            <p
              className={`mt-4 border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6 ${
                isFeatured ? "text-white/80" : "text-[var(--color-muted)]"
              }`}
            >
              {plan.bestFor}
            </p>

            <ul className="mt-6 grid gap-2.5 text-sm">
              {plan.inclusions.map((item) => (
                <li className="flex items-start gap-2.5" key={item}>
                  <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" name="check" />
                  <span className={isFeatured ? "text-white/85" : "text-[var(--color-muted)]"}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <p className={`text-xs font-bold uppercase tracking-[0.1em] ${isFeatured ? "text-white/60" : "text-[var(--color-muted)]"}`}>
                Joining fee: {plan.joiningFee}
              </p>
              <WhatsAppLink
                className={`nudge mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-bold transition-[filter,background-color] duration-150 ${
                  isFeatured
                    ? "bg-[var(--color-accent)] text-[var(--color-text)] hover:brightness-105"
                    : "bg-[var(--color-whatsapp)] text-white hover:brightness-110"
                }`}
                message={plan.whatsappMessage}
                phone={contact.whatsapp}
              >
                <Icon className="size-4" name="whatsapp" />
                Join on the {plan.name.toLowerCase()} plan
              </WhatsAppLink>
            </div>
          </article>
        );
      })}
    </Reveal>
  );
}
