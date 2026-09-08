"use client";

import { useEffect, useRef, useState } from "react";

// Splits "3,20,000+" into "" / 320000 / "+" so the number can animate while
// the prefix and suffix stay put. Values with no digits ("NABL") pass through.
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return { prefix, target, suffix, decimals, grouped: digits.includes(",") };
}

const format = (value: number, decimals: number, grouped: boolean) =>
  grouped
    ? new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)
    : value.toFixed(decimals);

export function StatCounter({ value, className = "" }: { value: string; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => (parsed ? `${parsed.prefix}${format(0, parsed.decimals, parsed.grouped)}${parsed.suffix}` : value));

  useEffect(() => {
    const element = ref.current;
    if (!parsed || !element) return;

    const settle = () => setDisplay(value);
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      settle();
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1100;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(`${parsed.prefix}${format(parsed.target * eased, parsed.decimals, parsed.grouped)}${parsed.suffix}`);
          if (t < 1) frame = requestAnimationFrame(step);
          else settle();
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // `value` fully describes the animation; parsed is derived from it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span className={`tabular-nums ${className}`} ref={ref}>
      {display}
    </span>
  );
}
