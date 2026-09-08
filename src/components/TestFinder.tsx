"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

type Test = NonNullable<SiteConfig["diagnostics"]>["tests"][number];
type TestFinderProps = {
  tests: Test[];
  priceRevisionNote?: string;
  /** When given, the selection can be handed to WhatsApp as a booking list. */
  whatsapp?: string;
  phone?: string;
};

const categories = ["All", "Blood", "Hormone", "Imaging", "Cardiac", "Urine"] as const;

function rupees(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export function TestFinder({ tests, priceRevisionNote, whatsapp, phone }: TestFinderProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [added, setAdded] = useState<string[]>([]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tests.filter(
      (test) =>
        (category === "All" || test.category === category) &&
        (!needle || test.name.toLowerCase().includes(needle) || test.sampleType.toLowerCase().includes(needle)),
    );
  }, [category, query, tests]);

  const selected = tests.filter((test) => added.includes(test.id));
  const total = selected.reduce((sum, test) => sum + rupees(test.price), 0);

  const bookingMessage = selected.length
    ? `Hi, I want to book these tests at Krishna Path Labs:\n${selected
        .map((test) => `• ${test.name} (${test.price})`)
        .join("\n")}\nTotal: ₹${total.toLocaleString("en-IN")}\nMy name is:`
    : "";

  return (
    <div>
      {priceRevisionNote && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">{priceRevisionNote}</p>
      )}

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label className="sr-only" htmlFor="finder-search">
            Find a test
          </label>
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]"
            name="search"
          />
          <input
            className="min-h-11 w-full rounded-[8px] border border-[var(--color-text)]/15 bg-white pl-10 pr-3 outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
            id="finder-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by test or sample type"
            type="search"
            value={query}
          />
        </div>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter tests by category">
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
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[8px] border border-[var(--color-text)]/12 bg-white">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="sticky top-[var(--header-h)] z-10 bg-[var(--color-surface)]">
            <tr className="border-b border-[var(--color-text)]/12">
              <th className="px-4 py-3 font-extrabold uppercase tracking-[0.08em]" scope="col">
                Test
              </th>
              <th className="px-4 py-3 font-extrabold uppercase tracking-[0.08em]" scope="col">
                Sample
              </th>
              <th className="px-4 py-3 font-extrabold uppercase tracking-[0.08em]" scope="col">
                Report
              </th>
              <th className="px-4 py-3 text-right font-extrabold uppercase tracking-[0.08em]" scope="col">
                Price
              </th>
              <th className="px-4 py-3 text-right font-extrabold uppercase tracking-[0.08em]" scope="col">
                <span className="sr-only">Add to booking</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {visible.map((test) => {
              const isAdded = added.includes(test.id);
              return (
                <tr className="border-b border-[var(--color-text)]/8 transition-colors duration-150 last:border-b-0 hover:bg-[var(--color-surface)]" key={test.id}>
                  <th className="px-4 py-3 font-bold" scope="row">
                    {test.name}
                    <span className="mt-0.5 block text-xs font-medium text-[var(--color-muted)]">{test.category}</span>
                  </th>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{test.sampleType}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{test.reportTime}</td>
                  <td className="px-4 py-3 text-right font-extrabold tabular-nums text-[var(--color-primary)]">
                    {test.price}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className={`inline-flex min-h-9 items-center gap-1.5 rounded-[8px] px-3 text-xs font-bold transition-colors duration-150 ${
                        isAdded
                          ? "bg-[var(--color-primary)] text-white"
                          : "border border-[var(--color-text)]/15 text-[var(--color-primary)] hover:border-[var(--color-primary)]"
                      }`}
                      onClick={() =>
                        setAdded((current) =>
                          current.includes(test.id) ? current.filter((id) => id !== test.id) : [...current, test.id],
                        )
                      }
                      type="button"
                    >
                      <Icon className="size-3.5" name={isAdded ? "check" : "arrowRight"} />
                      {isAdded ? "Added" : "Add"}
                      <span className="sr-only"> {test.name} to booking</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="px-4 py-8 text-center text-sm leading-6 text-[var(--color-muted)]">
            No test found.
            {phone && (
              <>
                {" "}
                <a className="font-bold text-[var(--color-primary)] underline underline-offset-2" href={`tel:${phone.replace(/\s/g, "")}`}>
                  Call us on {phone}
                </a>{" "}
                — we probably do it.
              </>
            )}
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-[var(--color-muted)]">
        Showing <span className="font-bold tabular-nums">{visible.length}</span> of{" "}
        <span className="tabular-nums">{tests.length}</span> listed tests.
      </p>

      {selected.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[8px] border border-[var(--color-primary)]/30 bg-[var(--color-surface)] p-4">
          <p className="text-sm font-bold">
            <span className="tabular-nums">{selected.length}</span> test{selected.length > 1 ? "s" : ""} selected ·{" "}
            <span className="tabular-nums text-[var(--color-primary)]">₹{total.toLocaleString("en-IN")}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="min-h-11 px-3 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-text)]"
              onClick={() => setAdded([])}
              type="button"
            >
              Clear
            </button>
            {whatsapp && (
              <WhatsAppLink
                className="nudge inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 text-sm font-bold text-white hover:brightness-110"
                message={bookingMessage}
                phone={whatsapp}
              >
                <Icon className="size-4" name="whatsapp" />
                Send this list on WhatsApp
              </WhatsAppLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
