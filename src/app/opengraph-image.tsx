import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const site = getSite();
  const locality = site.type === "dental" ? "Benz Circle · Vijayawada" : site.type === "diagnostics" ? "Governorpet · Vijayawada" : "Vijayawada · Andhra Pradesh";
  return new ImageResponse(<div style={{ background: site.theme.primaryDark, color: "white", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "64px", width: "100%" }}><div style={{ alignItems: "center", display: "flex", fontSize: 28, fontWeight: 700, gap: 18 }}><span style={{ alignItems: "center", border: `3px solid ${site.theme.accent}`, color: site.theme.accent, display: "flex", fontSize: 32, height: 64, justifyContent: "center", width: 64 }}>{site.brand.logoText}</span>{site.brand.shortName}</div><div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}><p style={{ color: site.theme.accent, fontSize: 26, margin: 0 }}>{locality}</p><h1 style={{ fontSize: 68, lineHeight: 1.04, margin: "18px 0 0" }}>{site.brand.tagline}</h1></div><p style={{ fontSize: 24, margin: 0 }}>{site.type === "portfolio" ? "Websites for local businesses" : site.contact.phonePrimary}</p></div>, size);
}
