"use client";

import { useMemo, useState } from "react";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import type { SiteConfig } from "@/types/site";

type SiteGalleryProps = Pick<SiteConfig, "gallery" | "team" | "home"> & {
  variant?: "dental" | "gym";
};

// Tabbed gallery shared by the sites that publish photos. Only the tab labels
// and the image categories behind them differ per business type.
const tabPlan = {
  dental: {
    spaces: { label: "Clinic", categories: ["clinic"] },
    kit: { label: "Equipment", categories: ["technology", "safety"] },
    cases: "Before & After",
    people: "Team",
  },
  gym: {
    spaces: { label: "The floor", categories: ["studio"] },
    kit: { label: "Equipment", categories: ["equipment", "facilities"] },
    cases: "Member results",
    people: "Coaches",
  },
} as const;

export function SiteGallery({ gallery, team, home, variant = "dental" }: SiteGalleryProps) {
  const plan = tabPlan[variant];

  const tabs = useMemo(() => {
    const inCategory = (categories: readonly string[]) => gallery.filter((image) => categories.includes(image.category));

    return {
      [plan.spaces.label]: inCategory(plan.spaces.categories),
      [plan.kit.label]: inCategory(plan.kit.categories),
      [plan.cases]: (home?.beforeAfter ?? []).flatMap((caseStudy) => [
        {
          src: caseStudy.beforeSrc,
          alt: caseStudy.beforeAlt,
          caption: `${caseStudy.treatment} · before`,
          category: "before",
        },
        {
          src: caseStudy.afterSrc,
          alt: caseStudy.afterAlt,
          caption: `${caseStudy.treatment} · ${caseStudy.duration}`,
          category: "after",
        },
      ]),
      [plan.people]: team.map((member) => ({
        src: member.photo,
        alt: member.photoAlt ?? member.name,
        caption: member.name,
        category: member.specialization,
      })),
    } as Record<string, SiteConfig["gallery"]>;
  }, [gallery, home?.beforeAfter, plan, team]);

  const names = Object.keys(tabs);
  const [tab, setTab] = useState(names[0]);
  const active = tabs[tab] ?? [];

  return (
    <>
      <div
        className="mb-8 flex overflow-x-auto border-b border-[var(--color-text)]/15"
        role="tablist"
        aria-label="Gallery categories"
      >
        {names.map((item) => (
          <button
            aria-selected={tab === item}
            className={`min-h-12 whitespace-nowrap border-b-2 px-4 text-sm font-bold transition-colors duration-150 ${
              tab === item
                ? "border-[var(--color-accent)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
            key={item}
            onClick={() => setTab(item)}
            role="tab"
            type="button"
          >
            {item}
            <span className="ml-2 text-xs font-semibold opacity-70 tabular-nums">{tabs[item].length}</span>
          </button>
        ))}
      </div>

      {/* Keyed so the masonry remounts and re-lays out when the tab changes. */}
      <GalleryLightbox gallery={active} key={tab} />
    </>
  );
}
