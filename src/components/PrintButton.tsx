"use client";

import { Icon } from "@/components/Icon";

export function PrintButton() {
  return (
    <button
      className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-primary)] px-4 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)]"
      onClick={() => window.print()}
      type="button"
    >
      <Icon className="size-4" name="report" />
      Print / Save as PDF
    </button>
  );
}
