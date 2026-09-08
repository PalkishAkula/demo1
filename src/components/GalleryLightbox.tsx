"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { SiteConfig } from "@/types/site";

type Gallery = SiteConfig["gallery"];

export function GalleryLightbox({ gallery }: { gallery: Gallery }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = activeIndex === null ? null : gallery[activeIndex];

  const step = useCallback(
    (delta: number) => setActiveIndex((index) => (index === null ? null : (index + delta + gallery.length) % gallery.length)),
    [gallery.length],
  );

  const close = useCallback(() => {
    setActiveIndex(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "Tab") {
        // Two focusable controls only — keep the ring inside the dialog.
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, close, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {gallery.map((image, index) => (
          <button
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[8px] border border-[var(--color-text)]/10 text-left transition-[border-color,box-shadow] duration-150 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card)]"
            key={image.src}
            onClick={(event) => {
              openerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
            type="button"
          >
            <span className="relative block overflow-hidden">
              <Image
                alt={image.alt}
                className="h-auto w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                height={index % 3 === 0 ? 900 : 660}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                src={image.src}
                width={720}
              />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Icon className="size-4 text-[var(--color-text)]" name="search" />
              </span>
            </span>
            <span className="flex items-center justify-between gap-3 bg-white px-3 py-2.5">
              <span className="text-xs font-bold text-[var(--color-text)]">{image.caption}</span>
              <span className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                {image.category}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          aria-label={active.caption}
          aria-modal="true"
          className="lightbox fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 sm:p-8"
          onClick={close}
          role="dialog"
        >
          <button
            aria-label="Close image"
            className="absolute right-4 top-4 grid size-11 place-items-center border border-white/50 text-white hover:bg-white/10 sm:right-6 sm:top-6"
            onClick={close}
            ref={closeRef}
            type="button"
          >
            <Icon className="size-5" name="close" />
          </button>

          <button
            aria-label="Previous image"
            className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/50 text-white hover:bg-white/10 sm:left-6"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            type="button"
          >
            <Icon className="size-5 rotate-180" name="arrowRight" />
          </button>

          <button
            aria-label="Next image"
            className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/50 text-white hover:bg-white/10 sm:right-6"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            type="button"
          >
            <Icon className="size-5" name="arrowRight" />
          </button>

          <figure className="max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image
              alt={active.alt}
              className="max-h-[74vh] w-auto rounded-[8px] object-contain"
              height={1200}
              sizes="(max-width: 1024px) 100vw, 80vw"
              src={active.src}
              width={1600}
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-white">
              <span className="font-bold">{active.caption}</span>
              <span className="tabular-nums text-white/60">
                {(activeIndex ?? 0) + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
