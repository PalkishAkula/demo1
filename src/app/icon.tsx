import { ImageResponse } from "next/og";
import { getSite } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const site = getSite();
  return new ImageResponse(<div style={{ alignItems: "center", background: site.theme.primary, color: "white", display: "flex", fontSize: 28, fontWeight: 800, height: "100%", justifyContent: "center", width: "100%" }}>{site.brand.logoText}</div>, { ...size });
}
