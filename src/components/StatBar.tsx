import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import type { SiteConfig } from "@/types/site";

type StatBarProps = Pick<SiteConfig, "stats"> & {
  tone?: "dark" | "light";
  /** Sits under the row as a small caption — usually the languages line. */
  note?: string;
};

export function StatBar({ stats, tone = "dark", note }: StatBarProps) {
  const isDark = tone === "dark";

  return (
    <section
      aria-label="Practice at a glance"
      className={`relative isolate overflow-hidden ${isDark ? "bg-[var(--color-primary-dark)] text-white" : "border-y border-[var(--color-text)]/10 bg-white text-[var(--color-text)]"}`}
    >
      <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid grid-cols-2 lg:grid-cols-4" stagger={90}>
          {stats.map((stat, index) => (
            <div
              className={`px-4 py-8 sm:px-6 lg:px-8 ${
                isDark ? "border-white/15" : "border-[var(--color-text)]/10"
              } ${index > 0 ? "lg:border-l" : ""} ${index % 2 === 1 ? "border-l lg:border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""}`}
              key={stat.label}
            >
              <p
                className={`font-[family-name:var(--font-heading-active)] text-3xl leading-none sm:text-4xl ${
                  isDark ? "text-white" : "text-[var(--color-primary)]"
                }`}
              >
                <StatCounter value={stat.value} />
              </p>
              <p className={`mt-2 text-sm leading-5 ${isDark ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
        {note && (
          <p className={`border-t py-4 text-xs font-bold uppercase tracking-[0.12em] ${isDark ? "border-white/15 text-white/60" : "border-[var(--color-text)]/10 text-[var(--color-muted)]"}`}>
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
