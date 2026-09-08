import type { Metadata } from "next";
import { DM_Sans, Fraunces, Instrument_Serif, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema, pageMetadata } from "@/lib/seo";
import { getSite } from "@/lib/site";
import type { FontName } from "@/types/site";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const plusJakartaSans = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta-sans", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

const fontVariables: Record<FontName, string> = {
  Fraunces: "var(--font-fraunces)",
  "Instrument Serif": "var(--font-instrument-serif)",
  "Plus Jakarta Sans": "var(--font-plus-jakarta-sans)",
  Inter: "var(--font-inter)",
  "DM Sans": "var(--font-dm-sans)",
};

const site = getSite();

export const metadata: Metadata = {
  ...pageMetadata(site, { path: "/", title: site.seo.title, description: site.seo.description }),
  metadataBase: new URL(site.siteUrl),
  icons: { icon: "/icon", apple: "/apple-icon" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // The whole palette and both active fonts come from the site config, so a new
  // client site is a JSON file — no component edits.
  const themeStyle = {
    "--color-primary": site.theme.primary,
    "--color-primary-dark": site.theme.primaryDark,
    "--color-surface": site.theme.surface,
    "--color-accent": site.theme.accent,
    "--color-text": site.theme.text,
    "--color-muted": site.theme.muted,
    "--radius": site.theme.radius,
    "--font-heading-active": fontVariables[site.theme.fontHeading],
    "--font-body-active": fontVariables[site.theme.fontBody],
  } as React.CSSProperties;

  const fontClasses = [fraunces, instrumentSerif, plusJakartaSans, inter, dmSans]
    .map((font) => font.variable)
    .join(" ");

  return (
    <html lang="en-IN" style={themeStyle}>
      {/* Bottom padding clears the sticky mobile action bar. */}
      <body className={`${fontClasses} pb-[4.5rem] antialiased md:pb-0`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <JsonLd data={businessSchema(site)} />
        {children}
      </body>
    </html>
  );
}
