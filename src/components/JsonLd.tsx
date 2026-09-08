import { schemaScript } from "@/lib/seo";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script dangerouslySetInnerHTML={{ __html: schemaScript(data) }} type="application/ld+json" />;
}
