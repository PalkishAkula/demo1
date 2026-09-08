"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { SiteConfig } from "@/types/site";

type Test = NonNullable<SiteConfig["diagnostics"]>["tests"][number];
type TestSearchProps = { tests: Test[]; phone: string; placeholder?: string };

// Client-side autocomplete over the test catalogue. No API — the whole list
// ships with the page, so results appear on the first keystroke.
export function TestSearch({ tests, phone, placeholder = "Search a test" }: TestSearchProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();
  const listId = `${inputId}-results`;
  const blurTimer = useRef<number | undefined>(undefined);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return [];
    const needle = trimmed.toLowerCase();
    return tests
      .filter((test) => test.name.toLowerCase().includes(needle) || test.category.toLowerCase().includes(needle))
      .slice(0, 6);
  }, [trimmed, tests]);

  const showPanel = isOpen && trimmed.length > 0;

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showPanel || results.length === 0) return;
    if (event.key === "ArrowDown") {
      setActiveIndex((index) => (index + 1) % results.length);
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
      event.preventDefault();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative max-w-2xl">
      <label className="sr-only" htmlFor={inputId}>
        {placeholder}
      </label>

      <Icon
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-muted)]"
        name="search"
      />
      <input
        aria-autocomplete="list"
        aria-controls={showPanel ? listId : undefined}
        aria-expanded={showPanel}
        autoComplete="off"
        className="min-h-14 w-full rounded-[8px] border border-[var(--color-primary)]/30 bg-white pl-12 pr-4 text-base text-[var(--color-text)] shadow-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
        id={inputId}
        onBlur={() => {
          // Let a click on a result land before the panel closes.
          blurTimer.current = window.setTimeout(() => setIsOpen(false), 120);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => {
          window.clearTimeout(blurTimer.current);
          setIsOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        role="combobox"
        type="search"
        value={query}
      />

      {showPanel && (
        <div className="absolute inset-x-0 z-30 mt-2 overflow-hidden rounded-[8px] border border-[var(--color-text)]/15 bg-white shadow-[var(--shadow-float)]">
          {results.length > 0 ? (
            <ul id={listId} role="listbox">
              {results.map((test, index) => (
                <li
                  aria-selected={index === activeIndex}
                  className={`flex items-center justify-between gap-4 border-b border-[var(--color-text)]/8 px-4 py-3 last:border-b-0 ${
                    index === activeIndex ? "bg-[var(--color-surface)]" : ""
                  }`}
                  key={test.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                >
                  <span>
                    <span className="block text-sm font-bold text-[var(--color-text)]">{test.name}</span>
                    <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                      {test.category} · report in {test.reportTime}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-extrabold tabular-nums text-[var(--color-primary)]">
                    {test.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm leading-6 text-[var(--color-muted)]">
              No test found.{" "}
              <a className="font-bold text-[var(--color-primary)] underline underline-offset-2" href={`tel:${phone.replace(/\s/g, "")}`}>
                Call us on {phone}
              </a>{" "}
              — we probably do it.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
