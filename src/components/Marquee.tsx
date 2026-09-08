import { Icon } from "@/components/Icon";

type MarqueeProps = {
  items: string[];
  label: string;
  /** Seconds for one full pass. Longer lists want a longer duration. */
  duration?: number;
  tone?: "ink" | "surface";
};

// The localities we serve, scrolling. It pauses on hover and collapses to a
// static list under prefers-reduced-motion.
export function Marquee({ items, label, duration = 42, tone = "ink" }: MarqueeProps) {
  const isInk = tone === "ink";
  const run = [...items, ...items];

  return (
    <section
      aria-label={label}
      className={`marquee-viewport overflow-hidden border-y ${
        isInk
          ? "border-white/15 bg-[var(--color-primary)] text-white"
          : "border-[var(--color-text)]/10 bg-[var(--color-surface)] text-[var(--color-text)]"
      }`}
    >
      <div className="flex items-center">
        <p className={`z-10 shrink-0 border-r px-5 py-4 text-xs font-extrabold uppercase tracking-[0.14em] sm:px-8 ${isInk ? "border-white/15 bg-[var(--color-primary-dark)]" : "border-[var(--color-text)]/10 bg-white"}`}>
          {label}
        </p>
        <div className="marquee py-4" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
          {run.map((item, index) => (
            <span className="flex shrink-0 items-center gap-3 px-5 text-sm font-semibold" key={`${item}-${index}`}>
              <Icon className={`size-4 ${isInk ? "text-[var(--color-accent)]" : "text-[var(--color-primary)]"}`} name="pin" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
