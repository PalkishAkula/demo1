"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { SiteConfig } from "@/types/site";

// Web3Forms only accepts a real access key. Treat the placeholder that ships in
// .env.local as "not configured" so we never fire a request that must fail.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const isKeyConfigured = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ACCESS_KEY);

type EnquiryFormProps = Pick<SiteConfig, "brand" | "contact" | "enquiryFields" | "services"> & {
  submitLabel?: string;
};

const fieldClasses =
  "rounded-[8px] border border-[var(--color-muted)]/40 bg-white px-3 py-2.5 font-normal text-[var(--color-text)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 aria-[invalid=true]:border-[var(--color-danger)]";

export function EnquiryForm({
  brand,
  contact,
  enquiryFields,
  services,
  submitLabel = "Request a call",
}: EnquiryFormProps) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  // Set when sending fails, so the enquiry can still go out over WhatsApp.
  const [fallbackMessage, setFallbackMessage] = useState("");

  // Rebuild the answers as a readable WhatsApp message.
  function composeMessage(data: FormData) {
    const lines = enquiryFields
      .map((field) => {
        const value = String(data.get(field.name) ?? "").trim();
        return value ? `${field.label}: ${value}` : "";
      })
      .filter(Boolean);
    return [`Enquiry for ${brand.shortName}`, ...lines].join("\n");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFallbackMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Indian mobile numbers: 10 digits starting 6-9, with any prefix stripped.
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }

    const whatsappText = composeMessage(data);

    // No key configured yet: send the enquiry over WhatsApp instead of losing it.
    if (!isKeyConfigured) {
      setError("Our enquiry inbox is being set up. Send this on WhatsApp and we will reply today.");
      setFallbackMessage(whatsappText);
      return;
    }

    setIsSubmitting(true);
    data.set("access_key", ACCESS_KEY);
    data.set("subject", `New enquiry for ${brand.name}`);
    data.set("from_name", brand.name);

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!result.success) throw new Error(result.message ?? "Submission failed");
      setSubmittedName(String(data.get("name") ?? "there"));
      form.reset();
    } catch {
      setError("We could not send your request just now. Send it on WhatsApp or call us instead.");
      setFallbackMessage(whatsappText);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedName) {
    const message = `Hello, I sent an enquiry to ${brand.shortName}.`;
    return (
      <div className="reveal is-visible border border-[var(--color-primary)] bg-[var(--color-surface)] p-6" role="status">
        <span className="grid size-11 place-items-center rounded-full bg-[var(--color-primary)] text-white">
          <Icon className="size-6" name="check" />
        </span>
        <p className="mt-5 font-[family-name:var(--font-heading-active)] text-2xl leading-tight text-[var(--color-text)]">
          Thank you, {submittedName}. We&apos;ll call you within 2 hours.
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          If it is urgent, calling is faster than waiting for us to call back.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`} icon="phone">
            Call {contact.phonePrimary}
          </Button>
          <WhatsAppLink
            className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 py-2 text-sm font-bold text-white hover:brightness-110"
            message={message}
            phone={contact.whatsapp}
          >
            <Icon className="size-4" name="whatsapp" />
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={submit}>
      {/* Honeypot — bots fill it, people never see it. */}
      <input className="hidden" name="botcheck" tabIndex={-1} type="checkbox" autoComplete="off" />

      {enquiryFields.map((field) => {
        const id = `enquiry-${field.name}`;
        const isPhone = field.name === "phone";
        const options =
          field.name === "service" && (!field.options || field.options.length === 0)
            ? services.map((service) => service.name)
            : (field.options ?? []);
        // A select with no options is unfillable, and it is required more often
        // than not. Degrade it to a plain text box instead of trapping the user.
        const isSelect = field.type === "select" && options.length > 0;

        return (
          <label className="grid gap-2 text-sm font-bold text-[var(--color-text)]" htmlFor={id} key={field.name}>
            <span>
              {field.label}
              {!field.required && <span className="ml-1.5 font-medium text-[var(--color-muted)]">(optional)</span>}
            </span>

            {field.type === "textarea" ? (
              <textarea
                className={`min-h-28 ${fieldClasses}`}
                id={id}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : isSelect ? (
              <select className={fieldClasses} defaultValue="" id={id} name={field.name} required={field.required}>
                <option disabled value="">
                  {field.placeholder ?? "Choose an option"}
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                aria-describedby={isPhone && error ? "enquiry-error" : undefined}
                aria-invalid={isPhone && Boolean(error)}
                autoComplete={isPhone ? "tel" : field.name === "name" ? "name" : undefined}
                className={fieldClasses}
                id={id}
                inputMode={isPhone ? "tel" : undefined}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                type={field.type === "select" ? "text" : field.type}
              />
            )}
          </label>
        );
      })}

      {error && (
        <div className="rounded-[8px] border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 p-4" id="enquiry-error" role="alert">
          <p className="flex items-start gap-2 text-sm font-semibold text-[var(--color-danger)]">
            <Icon className="mt-0.5 size-4 shrink-0" name="close" />
            {error}
          </p>
          {fallbackMessage && (
            <div className="mt-3 flex flex-wrap gap-2">
              <WhatsAppLink
                className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--color-whatsapp)] px-4 py-2 text-sm font-bold text-white hover:brightness-110"
                message={fallbackMessage}
                phone={contact.whatsapp}
              >
                <Icon className="size-4" name="whatsapp" />
                Send on WhatsApp
              </WhatsAppLink>
              <a
                className="inline-flex min-h-11 items-center gap-2 rounded-[8px] border border-[var(--color-primary)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`}
              >
                <Icon className="size-4" name="phone" />
                Call {contact.phonePrimary}
              </a>
            </div>
          )}
        </div>
      )}

      <Button className="mt-1" disabled={isSubmitting} size="lg" type="submit">
        {isSubmitting && (
          <svg aria-hidden="true" className="spin size-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" />
          </svg>
        )}
        {isSubmitting ? "Sending request" : submitLabel}
      </Button>

      <p className="text-xs leading-5 text-[var(--color-muted)]">
        We use your number only to call back about this enquiry.
      </p>
    </form>
  );
}
