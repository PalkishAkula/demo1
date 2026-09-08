"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";

// A non-functional report portal. It looks like the real thing so a prospect
// can picture it, but nothing is stored and no OTP is ever sent.
export function ReportsMock() {
  const [status, setStatus] = useState<"idle" | "sending" | "demo">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("demo"), 700);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <form
        className="rounded-[8px] border border-[var(--color-text)]/12 bg-white p-6 shadow-[var(--shadow-card)] lg:p-8"
        onSubmit={submit}
      >
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--color-primary)]">
          <Icon className="size-4" name="lock" />
          Secure report access
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-heading-active)] text-2xl leading-tight">
          Sign in to download your report
        </h2>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold" htmlFor="patient-id">
            Patient ID
            <input
              className="min-h-11 rounded-[8px] border border-[var(--color-muted)]/40 bg-white px-3 font-normal tabular-nums outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              id="patient-id"
              inputMode="numeric"
              name="patientId"
              placeholder="KPL-2026-000000"
              required
              type="text"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold" htmlFor="patient-mobile">
            Registered mobile
            <input
              className="min-h-11 rounded-[8px] border border-[var(--color-muted)]/40 bg-white px-3 font-normal tabular-nums outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              id="patient-mobile"
              inputMode="tel"
              name="mobile"
              placeholder="10-digit mobile number"
              required
              type="tel"
            />
          </label>

          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[var(--color-primary)] px-5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[var(--color-primary-dark)] disabled:opacity-70"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" && (
              <svg aria-hidden="true" className="spin size-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-90" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" />
              </svg>
            )}
            {status === "sending" ? "Sending OTP" : "Get OTP"}
          </button>
        </div>

        {status === "demo" && (
          <p
            className="mt-5 flex items-start gap-2.5 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-4 text-sm leading-6"
            role="status"
          >
            <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" name="report" />
            <span>
              <strong className="block">Demo only.</strong>
              This portfolio version does not send an OTP or store any report. On a live site this screen opens the
              patient&apos;s report history.
            </span>
          </p>
        )}

        <p className="mt-6 border-t border-[var(--color-text)]/10 pt-4 text-xs leading-5 text-[var(--color-muted)]">
          Your patient ID is printed at the top of the collection slip. Reports stay available for 24 months.
        </p>
      </form>

      {/* The blurred panel behind the login, so the layout reads as software. */}
      <div className="relative overflow-hidden rounded-[8px] border border-[var(--color-text)]/12 bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-text)]/12 bg-[var(--color-surface)] px-5 py-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--color-muted)]">Recent reports</p>
          <Icon className="size-4 text-[var(--color-muted)]" name="lock" />
        </div>

        <table className="w-full select-none text-left text-sm blur-[3px]" aria-hidden="true">
          <tbody>
            {[
              ["Full Body Advanced", "08 Sep 2026", "Ready"],
              ["Thyroid Profile", "02 Aug 2026", "Ready"],
              ["Lipid Profile", "14 Jun 2026", "Ready"],
              ["CBC with ESR", "27 Mar 2026", "Ready"],
              ["Vitamin D (25-OH)", "27 Mar 2026", "Ready"],
            ].map(([name, date, state]) => (
              <tr className="border-b border-[var(--color-text)]/8 last:border-b-0" key={name}>
                <td className="px-5 py-4 font-bold">{name}</td>
                <td className="px-5 py-4 tabular-nums text-[var(--color-muted)]">{date}</td>
                <td className="px-5 py-4 text-right">
                  <span className="bg-[var(--color-primary)]/10 px-2 py-1 text-xs font-bold text-[var(--color-primary)]">
                    {state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="absolute inset-x-0 bottom-0 top-12 grid place-items-center bg-white/55 px-6 text-center">
          <p className="max-w-xs text-sm font-bold leading-6 text-[var(--color-text)]">
            Sign in to see your report history.
          </p>
        </div>
      </div>
    </div>
  );
}
