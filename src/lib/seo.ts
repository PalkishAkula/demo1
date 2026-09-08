import type { Metadata } from "next";
import type { SiteConfig } from "@/types/site";

type PageMeta = { path: string; title: string; description: string };

export function pageMetadata(site: SiteConfig, { path, title, description }: PageMeta): Metadata {
  const url = new URL(path, site.siteUrl).toString();
  return {
    title,
    description,
    keywords: site.seo.keywords,
    alternates: { canonical: url },
    robots: site.isDemo ? { index: false, follow: false } : undefined,
    openGraph: { type: "website", url, title, description, siteName: site.brand.name, images: [{ url: new URL(site.seo.ogImage, site.siteUrl).toString(), width: 1200, height: 630, alt: site.brand.name }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL(site.seo.ogImage, site.siteUrl).toString()] },
  };
}

type JsonLdValue = Record<string, unknown>;

export function schemaScript(value: JsonLdValue) {
  if (value["@context"] !== "https://schema.org" || typeof value["@type"] !== "string") throw new Error("Invalid JSON-LD schema block");
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function time(value: string) {
  return `${value}:00+05:30`;
}

function openingHoursSpecification(site: SiteConfig) {
  return site.hours.flatMap((entry) => {
    if (entry.closed) return [];
    const weekday = `https://schema.org/${entry.day}`;
    const first = { "@type": "OpeningHoursSpecification", dayOfWeek: weekday, opens: time(entry.open), closes: time(entry.breakStart ?? entry.close) };
    return entry.breakStart && entry.breakEnd ? [first, { "@type": "OpeningHoursSpecification", dayOfWeek: weekday, opens: time(entry.breakEnd), closes: time(entry.close) }] : [first];
  });
}

function rating(site: SiteConfig) {
  const score = site.stats.find((stat) => /^\d(?:\.\d)?$/.test(stat.value))?.value ?? "4.8";
  const reviews = site.stats.find((stat) => /reviews/.test(stat.label))?.label.match(/\d[\d,]*/)?.[0]?.replace(/,/g, "") ?? String(site.reviews.length);
  return { "@type": "AggregateRating", ratingValue: score, reviewCount: reviews, bestRating: "5", worstRating: "1" };
}

export function businessSchema(site: SiteConfig): JsonLdValue {
  if (site.type === "portfolio") return { "@context": "https://schema.org", "@type": "ProfessionalService", name: site.brand.name, "@id": `${site.siteUrl}/#business`, url: site.siteUrl, image: new URL(site.seo.ogImage, site.siteUrl).toString(), telephone: site.contact.phonePrimary, email: site.contact.email, areaServed: "Vijayawada", address: { "@type": "PostalAddress", addressLocality: site.contact.city, addressRegion: site.contact.state, postalCode: site.contact.pincode, addressCountry: "IN" } };
  const core = {
    "@context": "https://schema.org",
    "@type": site.type === "dental" ? "Dentist" : site.type === "gym" ? "ExerciseGym" : "MedicalClinic",
    name: site.brand.name,
    "@id": `${site.siteUrl}/#business`,
    url: site.siteUrl,
    image: new URL(site.seo.ogImage, site.siteUrl).toString(),
    telephone: site.contact.phonePrimary,
    email: site.contact.email,
    address: { "@type": "PostalAddress", streetAddress: `${site.contact.addressLine1}, ${site.contact.addressLine2}`, addressLocality: site.contact.city, addressRegion: site.contact.state, postalCode: site.contact.pincode, addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: openingHoursSpecification(site),
    priceRange: site.type === "dental" ? "₹200–₹75,000" : site.type === "gym" ? "₹250–₹12,600" : "₹120–₹8,500",
    aggregateRating: rating(site),
  };
  if (site.type === "dental") return { ...core, medicalSpecialty: ["Dentistry", "Prosthodontics", "Orthodontics"] };
  if (site.type === "gym")
    return {
      ...core,
      additionalType: "https://schema.org/SportsActivityLocation",
      amenityFeature: (site.gym?.floor ?? []).map((zone) => ({ "@type": "LocationFeatureSpecification", name: zone.name, value: true })),
      makesOffer: (site.gym?.plans ?? []).map((plan) => ({ "@type": "Offer", name: `${plan.name} membership`, price: plan.price.replace(/[^\d]/g, ""), priceCurrency: "INR" })),
    };
  return { ...core, additionalType: "https://schema.org/DiagnosticLab", availableService: (site.diagnostics?.packages ?? []).map((item) => ({ "@type": "Service", name: item.name, offers: { "@type": "Offer", price: item.price.replace(/[^\d]/g, ""), priceCurrency: "INR" } })) };
}

export function faqSchema(items: SiteConfig["faqs"]): JsonLdValue {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function breadcrumbSchema(site: SiteConfig, label: string, path: string): JsonLdValue {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl }, { "@type": "ListItem", position: 2, name: label, item: new URL(path, site.siteUrl).toString() }] };
}
