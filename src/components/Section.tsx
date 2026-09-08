import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionProps = {
  children: ReactNode;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  /** Sits opposite the heading on desktop — a link, a badge, a note. */
  aside?: ReactNode;
  variant?: "default" | "surface" | "dark" | "ink";
  /** Decorative ground, used instead of gradients to break up flat runs. */
  ground?: "none" | "dots" | "rules" | "diagonal";
  id?: string;
  className?: string;
  /** Tightens the vertical rhythm for strips that sit between full sections. */
  compact?: boolean;
};

const variants = {
  default: "bg-white text-[var(--color-text)]",
  surface: "bg-[var(--color-surface)] text-[var(--color-text)]",
  dark: "bg-[var(--color-primary-dark)] text-white",
  ink: "bg-[var(--color-primary)] text-white",
};

const grounds = {
  none: "",
  dots: "bg-dotgrid",
  rules: "bg-rules",
  diagonal: "bg-diagonal",
};

export function Section({
  children,
  eyebrow,
  heading,
  subheading,
  aside,
  variant = "default",
  ground = "none",
  id,
  className = "",
  compact = false,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || heading || subheading || aside);

  return (
    <section
      className={`relative isolate ${compact ? "py-10 sm:py-12" : "py-14 sm:py-20 lg:py-24"} ${variants[variant]} ${className}`}
      id={id}
    >
      {ground !== "none" && (
        <span aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${grounds[ground]}`} />
      )}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {hasHeader && (
          <Reveal as="header" className="mb-9 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="mb-3 flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  <span aria-hidden="true" className="inline-block h-px w-7 bg-current opacity-70" />
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="text-balance font-[family-name:var(--font-heading-active)] text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                  {heading}
                </h2>
              )}
              {subheading && <p className="mt-4 max-w-xl text-base leading-7 opacity-75">{subheading}</p>}
            </div>
            {aside && <div className="shrink-0 lg:pb-2">{aside}</div>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
