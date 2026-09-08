"use client";

import { useMemo, useState } from "react";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import type { SiteConfig } from "@/types/site";

type DentalGalleryProps = Pick<SiteConfig, "gallery" | "team" | "home">;

export function DentalGallery({ gallery, team, home }: DentalGalleryProps) {
  const tabs = useMemo(
    () => ({
      Clinic: gallery.filter((image) => image.category === "clinic"),
      Equipment: gallery.filter((image) => image.category === "technology" || image.category === "safety"),
      "Before & After": (home?.beforeAfter ?? []).flatMap((caseStudy) => [
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
      Team: team.map((doctor) => ({
        src: doctor.photo,
        alt: doctor.photoAlt ?? doctor.name,
        caption: doctor.name,
        category: doctor.specialization,
      })),
    }),
    [gallery, home?.beforeAfter, team],
  );

  const names = Object.keys(tabs) as (keyof typeof tabs)[];
  const [tab, setTab] = useState<keyof typeof tabs>(names[0]);

  return (
    <>
      <div className="mb-8 flex overflow-x-auto border-b border-[var(--color-text)]/15" role="tablist" aria-label="Gallery categories">
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
      <GalleryLightbox gallery={tabs[tab]} key={tab} />
    </>
  );
}
