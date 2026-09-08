import { Icon } from "@/components/Icon";
import type { SiteConfig } from "@/types/site";

export function EmergencyStrip({ site }: { site: SiteConfig }) {
  if (!site.emergencyNote) return null;

  return (
    <a
      className="group flex items-center justify-center gap-3 bg-[var(--color-accent)] px-5 py-3 text-center text-sm font-extrabold text-[var(--color-text)] hover:brightness-105"
      href={`tel:${site.contact.phonePrimary.replace(/\s/g, "")}`}
    >
      <Icon className="size-4 shrink-0" name="phone" />
      <span>{site.emergencyNote}</span>
      <Icon
        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        name="arrowRight"
      />
    </a>
  );
}
