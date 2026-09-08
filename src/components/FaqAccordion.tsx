"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Item = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-text)]/10 border-y border-[var(--color-text)]/10">
      {items.map((item, index) => {
        const id = `faq-answer-${index}`;
        const isOpen = open === index;

        return (
          <article key={item.question}>
            <h3>
              <button
                aria-controls={id}
                aria-expanded={isOpen}
                className="group flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-bold"
                onClick={() => setOpen((current) => (current === index ? null : index))}
                type="button"
              >
                <span className="transition-colors duration-150 group-hover:text-[var(--color-primary)]">
                  {item.question}
                </span>
                <Icon
                  className={`size-5 shrink-0 text-[var(--color-primary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  name="chevronDown"
                />
              </button>
            </h3>

            <div className="panel" data-open={isOpen} id={id}>
              <div>
                <p className="max-w-2xl pb-5 text-sm leading-7 text-[var(--color-muted)]">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
