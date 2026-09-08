import { Icon } from "@/components/Icon";
import { PrintButton } from "@/components/PrintButton";
import type { SiteConfig } from "@/types/site";

type ProposalDocumentProps = {
  site: SiteConfig;
  client: string;
  packageId: string;
};

// Server-rendered so the proposal is readable (and printable) without JS.
// The client wrapper re-renders it with the values from the query string.
export function ProposalDocument({ site, client, packageId }: ProposalDocumentProps) {
  const data = site.portfolio;
  if (!data) return null;

  const selected = data.packages.find((item) => item.id === packageId) ?? data.packages[1];
  const today = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date());

  return (
    <main className="proposal min-h-screen bg-[var(--color-surface)] px-5 py-8 text-[var(--color-text)] sm:px-6 sm:py-12">
      <div className="no-print mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-muted)]">Print this page or save it as a PDF to send to the client.</p>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-3xl border border-[var(--color-text)]/15 bg-white p-8 sm:p-10">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-[var(--color-text)]/15 pb-6">
          <div>
            <p className="text-sm font-bold text-[var(--color-accent)]">Proposal prepared for</p>
            <h1 className="mt-2 font-[family-name:var(--font-heading-active)] text-4xl leading-tight">{client}</h1>
            <p className="mt-2 text-sm tabular-nums text-[var(--color-muted)]">{today}</p>
          </div>
          <p className="text-right text-sm leading-6">
            <strong className="block">{site.brand.name}</strong>
            <span className="block text-[var(--color-muted)]">Vijayawada, Andhra Pradesh</span>
            <span className="block text-[var(--color-muted)]">{site.contact.phonePrimary}</span>
          </p>
        </header>

        <section className="mt-7 grid gap-px border border-[var(--color-text)]/12 bg-[var(--color-text)]/12 sm:grid-cols-3">
          {[
            { label: "Package", value: selected.name },
            { label: "Investment", value: selected.price },
            { label: "Timeline", value: `Live in ${selected.timeline}` },
          ].map((cell) => (
            <div className="bg-white px-5 py-4" key={cell.label}>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">{cell.label}</p>
              <p className="mt-2 text-xl font-bold tabular-nums">{cell.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-heading-active)] text-2xl">Included</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 sm:grid-cols-2">
            {selected.inclusions.map((item) => (
              <li className="flex items-start gap-2.5" key={item}>
                <Icon className="mt-1 size-3.5 shrink-0 text-[var(--color-accent)]" name="check" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-heading-active)] text-2xl">How we work</h2>
          <ol className="mt-4 grid gap-2 text-sm leading-6">
            {data.process.map((step, index) => (
              <li className="flex items-start gap-3" key={step}>
                <span className="font-bold tabular-nums text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 grid gap-6 border-t border-[var(--color-text)]/15 pt-6 sm:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-heading-active)] text-2xl">Payment terms</h2>
            <p className="mt-2 text-sm leading-6">50% advance to begin. 50% before the site goes live.</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-heading-active)] text-2xl">UPI</h2>
            <p className="mt-2 text-sm leading-6 tabular-nums">{data.upi}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{site.contact.phonePrimary}</p>
          </div>
        </section>

        <p className="mt-8 border-t border-[var(--color-text)]/15 pt-5 text-xs leading-5 text-[var(--color-muted)]">
          This proposal includes hosting and SSL for the first year. Domain registration remains in the client&apos;s
          name. {data.maintenance}
        </p>
      </article>
    </main>
  );
}
