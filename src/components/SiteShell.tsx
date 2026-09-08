import type { ReactNode } from "react";
import { EmergencyStrip } from "@/components/EmergencyStrip";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteBreadcrumbJsonLd } from "@/components/SiteBreadcrumbJsonLd";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import type { SiteConfig } from "@/types/site";

export function SiteShell({ children, site }: { children: ReactNode; site: SiteConfig }) {
  return (
    <div className="overflow-x-clip" id="top">
      <Header site={site} />
      <main className="pt-[var(--header-h)]" id="main-content">
        <SiteBreadcrumbJsonLd site={site} />
        <EmergencyStrip site={site} />
        {children}
      </main>
      <Footer site={site} />
      <StickyMobileBar site={site} />
    </div>
  );
}
