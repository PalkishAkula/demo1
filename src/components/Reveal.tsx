"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Direction the block travels in from. Ignored when `stagger` is set. */
  direction?: "up" | "left" | "right" | "scale";
  /** Delay in ms, for hand-staggering a couple of siblings. */
  delay?: number;
  /**
   * Gap in ms between each direct child. Delays are applied by CSS to the real
   * children, so grid and flex layouts are unaffected.
   */
  stagger?: number;
  as?: ElementType;
  className?: string;
  id?: string;
};

// Reveals once, then stops observing. Anything already on screen at load
// reveals on the first frame rather than waiting for a scroll event.
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  stagger,
  as: Tag = "div",
  className = "",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reduced motion, or a browser without IntersectionObserver: show at once.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {};
  if (stagger) (style as Record<string, string>)["--stagger"] = `${stagger}ms`;
  if (delay) (style as Record<string, string>)["--reveal-delay"] = `${delay}ms`;

  return (
    <Tag
      className={`${stagger ? "stagger" : "reveal"} ${visible ? "is-visible" : ""} ${className}`}
      data-reveal={stagger ? undefined : direction}
      id={id}
      ref={ref}
      style={style}
    >
      {children}
    </Tag>
  );
}
