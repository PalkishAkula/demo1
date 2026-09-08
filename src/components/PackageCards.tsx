"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

type Package = NonNullable<SiteConfig["diagnostics"]>["packages"][number];
type PackageCardsProps = Pick<SiteConfig, "contact" | "priceRevisionNote"> & {
  packages: Package[];
  /** Four across on the homepage, three on the packages page. */
  columns?: 3 | 4;
};

function rupees(value: string) {
  return Number(value.replace(/[^\d]/g, ""));
}

function saving(price: string, mrp: string) {
  const current = rupees(price);
  const original = rupees(mrp);
  if (!original || !current) return 0;
  return Math.round((1 - current / original) * 100);
}

export function PackageCards({ packages, contact, priceRevisionNote, columns = 4 }: PackageCardsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {priceRevisionNote && (
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">{priceRevisionNote}</p>
      )}

      <div className={`grid gap-4 sm:grid-cols-2 ${columns === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
        {packages.map((item) => {
          const percent = saving(item.price, item.mrp);
          const isOpen = expanded === item.id;

          return (
            <article
              className="lift flex flex-col border border-[var(--color-text)]/10 bg-white p-5"
              id={item.id}
              key={item.id}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-[family-name:var(--font-heading-active)] text-xl leading-tight">{item.name}</h3>
                {percent > 0 && (
                  <span className="shrink-0 bg-[var(--color-accent)] px-2 py-1 text-xs font-extrabold text-[var(--color-text)]">
                    Save {percent}%
                  </span>
                )}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                <Icon className="size-4" name="flask" />
                <span className="tabular-nums">{item.testCount}</span> tests included
              </p>

              <p className="mt-5 flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tabular-nums text-[var(--color-primary)]">{item.price}</span>
                <s className="text-sm tabular-nums text-[var(--color-muted)]">{item.mrp}</s>
              </p>

              <button
                aria-controls={`${item.id}-tests`}
                aria-expanded={isOpen}
                className="mt-4 flex min-h-11 items-center justify-between gap-3 border-t border-[var(--color-text)]/10 pt-4 text-left text-sm font-bold text-[var(--color-primary)]"
                onClick={() => setExpanded((current) => (current === item.id ? null : item.id))}
                type="button"
              >
                <span className="sweep">
                  {isOpen ? "Hide test list" : `View all ${item.testCount} tests`}
                </span>
                <Icon
                  className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  name="chevronDown"
                />
              </button>

              <div className="panel" data-open={isOpen} id={`${item.id}-tests`}>
                <div>
                  <ul className="max-h-64 space-y-1.5 overflow-y-auto pb-4 text-sm leading-6 text-[var(--color-muted)]">
                    {item.includedTests.map((test) => (
                      <li className="flex gap-2" key={test}>
                        <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <WhatsAppLink
                className="nudge mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 py-2 text-sm font-bold text-white hover:brightness-110"
                message={item.whatsappMessage}
                phone={contact.whatsapp}
              >
                <Icon className="size-4" name="whatsapp" />
                Book this package
              </WhatsAppLink>
            </article>
          );
        })}
      </div>
    </>
  );
}
