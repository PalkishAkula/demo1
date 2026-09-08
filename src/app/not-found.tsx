import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { getSite } from "@/lib/site";

export default function NotFound() {
  const site = getSite();
  const isLab = site.type === "diagnostics";
  const isPortfolio = site.type === "portfolio";
  const isGym = site.type === "gym";

  const heading = isPortfolio
    ? "That studio page is not here."
    : isLab
      ? "That report page is not here."
      : isGym
        ? "That gym page is not here."
        : "That clinic page is not here.";

  const text = isPortfolio
    ? "Go back to the studio page to see the demo sites, packages and contact details."
    : isLab
      ? "Use the home page to search 60 tests, book a Governorpet visit or arrange a Vijayawada collection."
      : isGym
        ? "Use the home page to check Patamata floor hours, membership fees or this week's class timetable."
        : "Use the home page to check Benz Circle hours, treatment prices or the next available appointment.";

  const links = isPortfolio
    ? [{ href: "/#work", label: "See the demo sites" }]
    : isLab
      ? [
          { href: "/tests", label: "Test catalogue" },
          { href: "/packages", label: "Health packages" },
          { href: "/home-collection", label: "Home collection" },
        ]
      : isGym
        ? [
            { href: "/membership", label: "Membership and fees" },
            { href: "/timetable", label: "Class timetable" },
            { href: "/contact", label: "Contact the studio" },
          ]
        : [
            { href: "/services", label: "Treatments and fees" },
            { href: "/doctors", label: "Meet the doctors" },
            { href: "/contact", label: "Contact the clinic" },
          ];

  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[var(--color-surface)] px-5 py-20">
      <span aria-hidden="true" className="bg-dotgrid pointer-events-none absolute inset-0 -z-10" />

      <div className="w-full max-w-xl border-l-4 border-[var(--color-accent)] bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
        <p className="font-[family-name:var(--font-heading-active)] text-6xl leading-none text-[var(--color-accent)] tabular-nums">
          404
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-heading-active)] text-4xl leading-tight text-[var(--color-text)]">
          {heading}
        </h1>
        <p className="mt-4 leading-7 text-[var(--color-muted)]">{text}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" icon="home" size="lg">
            Go to the home page
          </Button>
          <Button
            href={`tel:${site.contact.phonePrimary.replace(/\s/g, "")}`}
            icon="phone"
            size="lg"
            variant="secondary"
          >
            Call {site.contact.phonePrimary}
          </Button>
        </div>

        <ul className="mt-8 grid gap-2 border-t border-[var(--color-text)]/10 pt-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a className="nudge inline-flex items-center gap-2 font-bold text-[var(--color-primary)]" href={link.href}>
                <span className="sweep">{link.label}</span>
                <Icon className="size-4" name="arrowRight" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
