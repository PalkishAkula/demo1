"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { SiteConfig } from "@/types/site";

type CaseStudy = NonNullable<SiteConfig["home"]>["beforeAfter"][number];

const MIN = 4;
const MAX = 96;

// Hand-built drag-to-reveal. Pointer events cover mouse, touch and pen with
// one code path; arrow keys move the divider for keyboard users.
export function BeforeAfterSlider({ caseStudy }: { caseStudy: CaseStudy }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(MAX, Math.max(MIN, next)));
  }, []);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    moveTo(event.clientX);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    // Keep the page from scrolling while the divider is being dragged.
    event.preventDefault();
    moveTo(event.clientX);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") setPosition((value) => Math.max(MIN, value - step));
    else if (event.key === "ArrowRight") setPosition((value) => Math.min(MAX, value + step));
    else if (event.key === "Home") setPosition(MIN);
    else if (event.key === "End") setPosition(MAX);
    else return;
    event.preventDefault();
  }

  return (
    <figure>
      <div
        aria-label={`${caseStudy.treatment} — drag to compare before and after`}
        aria-valuemax={MAX}
        aria-valuemin={MIN}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before`}
        className={`relative aspect-[4/3] touch-none select-none overflow-hidden rounded-[8px] border border-[var(--color-text)]/10 bg-[var(--color-surface)] ${
          isDragging ? "cursor-ew-resize" : "cursor-grab"
        }`}
        onKeyDown={onKeyDown}
        onPointerCancel={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        ref={frameRef}
        role="slider"
        tabIndex={0}
      >
        <Image
          alt={caseStudy.afterAlt}
          className="pointer-events-none size-full object-cover"
          height={720}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={caseStudy.afterSrc}
          width={960}
        />

        <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            alt={caseStudy.beforeAlt}
            className="size-full object-cover"
            height={720}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={caseStudy.beforeSrc}
            width={960}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-[var(--color-text)]/85 px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-[var(--color-primary)] px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-white">
          After
        </span>

        {/* Divider and handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.15)]"
          style={{ left: `${position}%` }}
        >
          <span
            className={`absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--color-text)] bg-white transition-transform duration-150 ${
              isDragging ? "scale-110" : ""
            }`}
          >
            <svg aria-hidden="true" className="size-5 text-[var(--color-text)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m10 8-4 4 4 4M14 8l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-sm font-bold text-[var(--color-text)]">
        {caseStudy.treatment} <span className="font-normal text-[var(--color-muted)]">· {caseStudy.duration}</span>
      </figcaption>
    </figure>
  );
}
