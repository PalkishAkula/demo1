"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ScrollProgress } from "@/components/ScrollProgress";
import type { SiteConfig } from "@/types/site";

const navByType: Record<string, { href: string; label: string }[]> = {
  dental: [
    { href: "/services", label: "Treatments" },
    { href: "/doctors", label: "Doctors" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  diagnostics: [
    { href: "/packages", label: "Packages" },
    { href: "/tests", label: "Tests" },
    { href: "/home-collection", label: "Home collection" },
    { href: "/reports", label: "Reports" },
    { href: "/contact", label: "Contact" },
  ],
  gym: [
    { href: "/membership", label: "Membership" },
    { href: "/services", label: "Programs" },
    { href: "/timetable", label: "Timetable" },
    { href: "/trainers", label: "Trainers" },
    { href: "/contact", label: "Contact" },
  ],
  portfolio: [
    { href: "/#work", label: "Work" },
    { href: "/#packages", label: "Packages" },
    { href: "/#faq", label: "Questions" },
  ],
};

const ctaByType: Record<string, { href: string; label: string }> = {
  dental: { href: "/contact#enquiry", label: "Book Appointment" },
  diagnostics: { href: "/contact#enquiry", label: "Book Home Collection" },
  gym: { href: "/contact#enquiry", label: "Free First Session" },
  portfolio: { href: "/#contact", label: "Start a project" },
};

export function Header({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Stop the page scrolling behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const links = navByType[site.type] ?? navByType.dental;
  const cta = ctaByType[site.type] ?? ctaByType.dental;
  const phoneHref = `tel:${site.contact.phonePrimary.replace(/\s/g, "")}`;

  // The header is always solid. No page renders a hero underneath it, so a
  // transparent header would draw its text straight onto the white page.
  const headerTone = isScrolled
    ? "border-[var(--color-text)]/10 bg-white shadow-[0_1px_0_rgb(0_0_0/0.04),0_6px_20px_-16px_rgb(0_0_0/0.35)]"
    : "border-[var(--color-text)]/10 bg-white";
  const foreground = "text-[var(--color-text)]";
  const accentForeground = "text-[var(--color-primary)]";

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 border-b ${headerTone}`}>
      <ScrollProgress />

      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link aria-label={`${site.brand.name} — home`} className={`group flex items-center gap-3 ${foreground}`} href="/">
          <span
            className="relative grid size-10 shrink-0 place-items-center border-2 border-[var(--color-primary)] text-sm font-extrabold text-[var(--color-primary)] transition-colors duration-150"
          >
            {site.brand.logoText}
            <span
              aria-hidden="true"
              className="absolute -right-px -top-px size-2.5 bg-[var(--color-accent)] transition-transform duration-200 group-hover:scale-150"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-heading-active)] text-lg sm:text-xl">{site.brand.shortName}</span>
            <span className="mt-1 hidden text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)] sm:block">
              {site.contact.addressLine2} · {site.contact.city}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((link) => (
            <Link
              aria-current={pathname === link.href ? "page" : undefined}
              className={`navlink whitespace-nowrap text-sm font-semibold hover:text-[var(--color-accent)] ${foreground}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex xl:gap-5">
          <a
            aria-label={`Call ${site.contact.phonePrimary}`}
            className={`inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold ${accentForeground}`}
            href={phoneHref}
          >
            <Icon className="size-4" name="phone" />
            <span className="hidden xl:inline">{site.contact.phonePrimary}</span>
          </a>
          <Button className="whitespace-nowrap" href={cta.href}>
            {cta.label}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            aria-label={`Call ${site.brand.name}`}
            className={`inline-flex size-11 items-center justify-center ${accentForeground}`}
            href={phoneHref}
          >
            <Icon name="phone" />
          </a>
          <button
            aria-controls="mobile-drawer"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`inline-flex size-11 items-center justify-center ${foreground}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <Icon className="size-6" name={isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <button
          aria-label="Close menu"
          className="backdrop fixed inset-0 z-10 bg-black/40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          type="button"
        />
      )}

      <nav
        aria-label="Mobile"
        className={`fixed inset-y-0 right-0 z-20 flex w-[min(22rem,88vw)] flex-col overflow-y-auto overscroll-contain bg-white px-6 py-5 shadow-[var(--shadow-float)] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="mobile-drawer"
        // Off-screen drawer must not be reachable by tab or screen reader.
        inert={isMenuOpen ? undefined : true}
      >
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading-active)] text-xl text-[var(--color-text)]">
            {site.brand.shortName}
          </span>
          <button
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center text-[var(--color-text)]"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          >
            <Icon className="size-6" name="close" />
          </button>
        </div>

        <div className="mt-6 grid gap-px">
          {links.map((link) => (
            <Link
              aria-current={pathname === link.href ? "page" : undefined}
              className="flex min-h-12 items-center justify-between border-b border-[var(--color-text)]/10 py-3 font-semibold text-[var(--color-text)] aria-[current=page]:text-[var(--color-primary)]"
              href={link.href}
              key={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
              <Icon className="size-4 text-[var(--color-muted)]" name="arrowRight" />
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-[var(--color-text)]/10 pt-5">
          {site.contact.languagesLine && (
            <p className="mb-3 text-sm leading-6 text-[var(--color-muted)]">{site.contact.languagesLine}</p>
          )}
          <a
            className="flex min-h-11 items-center gap-2 font-bold text-[var(--color-primary)]"
            href={phoneHref}
          >
            <Icon className="size-4" name="phone" />
            {site.contact.phonePrimary}
          </a>
          <Button className="mt-3 w-full" href={cta.href}>
            {cta.label}
          </Button>
        </div>
      </nav>
    </header>
  );
}
