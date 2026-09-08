"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { SiteConfig } from "@/types/site";

export function StickyMobileBar({ site }: { site: SiteConfig }) {
  const [isFieldFocused, setIsFieldFocused] = useState(false);

  // Slide the bar away while a field has focus so it never covers the input
  // or the on-screen keyboard's suggestion strip.
  useEffect(() => {
    const update = () => {
      const element = document.activeElement;
      setIsFieldFocused(
        element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLSelectElement,
      );
    };
    const deferUpdate = () => window.setTimeout(update, 0);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", deferUpdate);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", deferUpdate);
    };
  }, []);

  const message =
    site.type === "diagnostics"
      ? `Hi, I want to book a home collection with ${site.brand.shortName}. My area is:`
      : `Hi, I want to book a dental appointment at ${site.brand.shortName}. My name is:`;

  const actions: { label: string; href: string; icon: IconName; external?: boolean }[] = [
    { label: "Call", href: `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`, icon: "phone" },
    { label: "WhatsApp", href: getWhatsAppUrl(site.contact.whatsapp, message), icon: "whatsapp", external: true },
    { label: "Directions", href: site.contact.mapDirectionsUrl, icon: "pin", external: true },
  ];

  return (
    <nav
      aria-label="Contact actions"
      className="mobile-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-[var(--color-text)]/15 bg-white shadow-[0_-4px_20px_rgb(0_0_0/0.09)] md:hidden"
      data-hidden={isFieldFocused}
      // Hidden from the tab order while off-screen.
      inert={isFieldFocused ? true : undefined}
    >
      {actions.map((action, index) => (
        <a
          className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-primary)] active:bg-[var(--color-surface)] ${
            index > 0 ? "border-l border-[var(--color-text)]/12" : ""
          }`}
          href={action.href}
          key={action.label}
          rel={action.external ? "noreferrer" : undefined}
          target={action.external ? "_blank" : undefined}
        >
          <Icon className="size-5" name={action.icon} />
          {action.label}
        </a>
      ))}
    </nav>
  );
}
