import Link from "next/link";
import { Icon } from "@/components/Icon";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

const quickLinksByType: Record<string, { href: string; label: string }[]> = {
  dental: [
    { href: "/about", label: "About the clinic" },
    { href: "/doctors", label: "Meet the doctors" },
    { href: "/gallery", label: "Clinic gallery" },
    { href: "/contact", label: "Contact Benz Circle" },
  ],
  diagnostics: [
    { href: "/packages", label: "Health packages" },
    { href: "/home-collection", label: "Home collection" },
    { href: "/reports", label: "Download reports" },
    { href: "/contact", label: "Governorpet contact" },
  ],
  gym: [
    { href: "/membership", label: "Membership fees" },
    { href: "/timetable", label: "Class timetable" },
    { href: "/gallery", label: "Studio gallery" },
    { href: "/about", label: "About the studio" },
    { href: "/contact", label: "Contact Patamata" },
  ],
};

function displayTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return `${hours % 12 || 12}.${String(minutes).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
}

function hoursText(entry: SiteConfig["hours"][number]) {
  if (entry.closed) return "Closed";
  if (entry.breakStart && entry.breakEnd) {
    return `${displayTime(entry.open)}–${displayTime(entry.breakStart)}, ${displayTime(entry.breakEnd)}–${displayTime(entry.close)}`;
  }
  return `${displayTime(entry.open)}–${displayTime(entry.close)}`;
}

export function Footer({ site }: { site: SiteConfig }) {
  const mapMessage = `Hello, I want to book with ${site.brand.shortName}. My name is:`;
  const quickLinks = quickLinksByType[site.type] ?? quickLinksByType.dental;
  const servicesHref = site.type === "diagnostics" ? "/tests" : "/services";
  const phoneHref = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-primary-dark)] pb-24 pt-16 text-white md:pb-10">
      <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <section>
          <p className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center border-2 border-white/70 text-sm font-extrabold">
              {site.brand.logoText}
            </span>
            <span className="font-[family-name:var(--font-heading-active)] text-2xl leading-tight">
              {site.brand.name}
            </span>
          </p>

          {/* NAP in plain crawlable text — one identical string across the site. */}
          <address className="mt-5 not-italic text-sm leading-6 text-white/75">
            <span className="block">{site.contact.addressLine1}</span>
            <span className="block">{site.contact.addressLine2}</span>
            <span className="block">
              {site.contact.city}, {site.contact.state} {site.contact.pincode}
            </span>
          </address>
          <p className="mt-2 text-sm leading-6 text-white/55">{site.contact.landmark}</p>

          <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold" href={phoneHref}>
            <Icon className="size-4 text-[var(--color-accent)]" name="phone" />
            {site.contact.phonePrimary}
          </a>
          <a className="mt-2 flex items-center gap-2 text-sm text-white/75" href={`mailto:${site.contact.email}`}>
            <Icon className="size-4 text-[var(--color-accent)]" name="report" />
            {site.contact.email}
          </a>
          {site.contact.languagesLine && (
            <p className="mt-5 border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6 text-white/75">
              {site.contact.languagesLine}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            {site.type === "diagnostics" ? "Services" : site.type === "gym" ? "Programs" : "Treatments"}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm text-white/75">
            {site.services.map((service) => (
              <li key={service.id}>
                <Link className="sweep" href={`${servicesHref}#${service.id}`}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-accent)]">Quick links</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-white/75">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="sweep" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <WhatsAppLink
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 py-2 text-sm font-bold text-white"
            message={mapMessage}
            phone={site.contact.whatsapp}
          >
            <Icon className="size-4" name="whatsapp" />
            Message on WhatsApp
          </WhatsAppLink>
        </section>

        <section>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-accent)]">Hours</h2>
          <table className="mt-5 w-full text-left text-sm text-white/75">
            <tbody>
              {site.hours.map((entry) => (
                <tr className="border-b border-white/10 align-top" key={entry.day}>
                  <th className="py-2 pr-3 font-medium" scope="row">
                    {entry.day.slice(0, 3)}
                  </th>
                  <td className="py-2 text-right tabular-nums">{hoursText(entry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {site.contact.parkingNote && <p className="mt-4 text-sm leading-6 text-white/55">{site.contact.parkingNote}</p>}
        </section>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/15 px-5 pt-6 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-1">
          {site.registrationLine && <p>{site.registrationLine}</p>}
          <p>Sample website · Designed by Local Site Studio · Not a real business</p>
        </div>
        <a className="nudge inline-flex items-center gap-2 font-bold text-white/75 hover:text-white" href="#top">
          Back to top
          <Icon className="size-4 -rotate-90" name="arrowRight" />
        </a>
      </div>
    </footer>
  );
}
