import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const site = getSite();
  return new ImageResponse(<div style={{ alignItems: "center", background: site.theme.primary, color: "white", display: "flex", fontSize: 72, fontWeight: 800, height: "100%", justifyContent: "center", width: "100%" }}>{site.brand.logoText}</div>, { ...size });
}
