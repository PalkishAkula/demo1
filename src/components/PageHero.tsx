import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Current page label. "Home" is always the first crumb. */
  breadcrumb?: string;
  tone?: "surface" | "dark";
  /** Chips, buttons or a stat row under the copy. */
  children?: ReactNode;
  /** Sits to the right of the copy on desktop. */
  aside?: ReactNode;
};

// The single h1 for every inner page, plus the visible breadcrumb that matches
// the BreadcrumbList schema.
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  tone = "surface",
  children,
  aside,
}: PageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16 ${
        isDark ? "bg-[var(--color-primary-dark)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text)]"
      }`}
    >
      <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-32 -top-32 -z-10 hidden size-[28rem] rounded-full border lg:block ${
          isDark ? "border-white/10" : "border-[var(--color-primary)]/12"
        }`}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className={`flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] ${isDark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
              <li>
                <Link className="sweep" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon className="size-3.5" name="arrowRight" />
              </li>
              <li aria-current="page" className={isDark ? "text-white" : "text-[var(--color-primary)]"}>
                {breadcrumb}
              </li>
            </ol>
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <p className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-[family-name:var(--font-heading-active)] text-[2.25rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h1>
            {subtitle && (
              <p className={`mt-5 max-w-2xl text-lg leading-8 ${isDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                {subtitle}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>

          {aside && (
            <Reveal delay={120} direction="right">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
