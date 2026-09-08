"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

type ServiceListProps = Pick<SiteConfig, "contact" | "services" | "priceRevisionNote"> & {
  variant?: "dental" | "gym";
};

// Row labels are the only thing that changes between businesses. The shape of a
// service — price, duration, how often, aftercare — is the same either way.
const copy = {
  dental: {
    filterLabel: "Filter treatments by category",
    who: "Who needs it",
    duration: "Time",
    visits: "Visits",
    price: "Price",
    aftercare: "Aftercare",
  },
  gym: {
    filterLabel: "Filter programs by category",
    who: "Who it suits",
    duration: "Session",
    visits: "How often",
    price: "Fee",
    aftercare: "After the session",
  },
} as const;

export function ServiceList({ contact, services, priceRevisionNote, variant = "dental" }: ServiceListProps) {
  const words = copy[variant];
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((service) => service.category).filter((item): item is string => Boolean(item))))],
    [services],
  );
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id ?? null);

  const visibleServices = category === "All" ? services : services.filter((service) => service.category === category);

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 mb-8 overflow-x-auto border-y border-[var(--color-text)]/10 bg-white/95 px-5 py-3 backdrop-blur-[2px] sm:-mx-8 sm:px-8">
        <div className="mx-auto flex w-max min-w-full max-w-7xl gap-2" role="tablist" aria-label={words.filterLabel}>
          {categories.map((item) => (
            <button
              aria-selected={category === item}
              className={`min-h-11 whitespace-nowrap rounded-[8px] px-4 text-sm font-bold transition-colors duration-150 ${
                category === item
                  ? "bg-[var(--color-primary)] text-white"
                  : "border border-[var(--color-text)]/15 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
              key={item}
              onClick={() => setCategory(item)}
              role="tab"
              type="button"
            >
              {item}
              {item !== "All" && (
                <span className="ml-2 text-xs font-semibold opacity-70 tabular-nums">
                  {services.filter((service) => service.category === item).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">{priceRevisionNote}</p>

      <div className="divide-y divide-[var(--color-text)]/10 border-y border-[var(--color-text)]/10">
        {visibleServices.map((service) => {
          const isOpen = expanded === service.id;
          return (
            <article className="scroll-mt-32" id={service.id} key={service.id}>
              <h2>
                <button
                  aria-controls={`${service.id}-details`}
                  aria-expanded={isOpen}
                  className="group flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left"
                  onClick={() => setExpanded((current) => (current === service.id ? null : service.id))}
                  type="button"
                >
                  <span>
                    <span className="block font-[family-name:var(--font-heading-active)] text-2xl leading-tight transition-colors duration-150 group-hover:text-[var(--color-primary)]">
                      {service.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-[var(--color-muted)]">{service.category}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 text-right">
                    <span>
                      <span className="block text-lg font-extrabold text-[var(--color-primary)]">{service.price}</span>
                      <span className="mt-1 block text-xs font-bold text-[var(--color-muted)]">
                        {isOpen ? "Close" : "View details"}
                      </span>
                    </span>
                    <Icon
                      className={`size-5 text-[var(--color-primary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      name="chevronDown"
                    />
                  </span>
                </button>
              </h2>

              <div className="panel" data-open={isOpen} id={`${service.id}-details`}>
                <div>
                  <div className="grid gap-6 border-t border-[var(--color-text)]/10 pb-8 pt-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm leading-7 text-[var(--color-muted)]">{service.longDesc}</p>
                      <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                        <strong className="text-[var(--color-text)]">{words.who}:</strong> {service.whoNeeds}
                      </p>
                    </div>

                    <dl className="grid h-fit gap-3 text-sm">
                      {[
                        { term: words.duration, value: service.duration },
                        { term: words.visits, value: service.visits },
                      ].map((row) => (
                        <div className="flex justify-between gap-4 border-b border-[var(--color-text)]/10 pb-3" key={row.term}>
                          <dt className="font-bold">{row.term}</dt>
                          <dd className="text-right text-[var(--color-muted)]">{row.value}</dd>
                        </div>
                      ))}
                      <div className="flex justify-between gap-4 border-b border-[var(--color-text)]/10 pb-3">
                        <dt className="font-bold">{words.price}</dt>
                        <dd className="text-right font-bold text-[var(--color-primary)]">
                          {service.price} {service.priceNote}
                        </dd>
                      </div>
                    </dl>

                    <p className="border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6 text-[var(--color-muted)]">
                      <strong className="text-[var(--color-text)]">{words.aftercare}:</strong> {service.aftercare}
                    </p>

                    <WhatsAppLink
                      className="nudge inline-flex min-h-11 w-fit items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 text-sm font-bold text-white hover:brightness-110"
                      message={service.whatsappMessage}
                      phone={contact.whatsapp}
                    >
                      <Icon className="size-4" name="whatsapp" />
                      Book on WhatsApp
                      <Icon className="size-4" name="arrowRight" />
                    </WhatsAppLink>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
