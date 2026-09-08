"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { SiteConfig } from "@/types/site";

type LocationDetailsProps = Pick<SiteConfig, "contact" | "hours"> & {
  parkingLabel: string;
  directionsLabel: string;
};

function displayTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return `${hours % 12 || 12}.${String(minutes).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
}

function displayHours(entry: SiteConfig["hours"][number]) {
  if (entry.closed) return <span>Closed</span>;

  // The lunch break is stated on its own line — patients turn up during it.
  if (entry.breakStart && entry.breakEnd) {
    return (
      <>
        <span className="block">
          {displayTime(entry.open)}–{displayTime(entry.breakStart)}
        </span>
        <span className="block font-semibold text-[var(--color-text)]">
          Closed {displayTime(entry.breakStart)}–{displayTime(entry.breakEnd)}
        </span>
        <span className="block">
          {displayTime(entry.breakEnd)}–{displayTime(entry.close)}
        </span>
      </>
    );
  }

  return (
    <span>
      {displayTime(entry.open)}–{displayTime(entry.close)}
    </span>
  );
}

export function LocationDetails({ contact, hours, parkingLabel, directionsLabel }: LocationDetailsProps) {
  const [today, setToday] = useState("");

  useEffect(
    () =>
      setToday(
        new Intl.DateTimeFormat("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }).format(new Date()),
      ),
    [],
  );

  return (
    <div className="border border-[var(--color-text)]/10 bg-white p-6 lg:p-8">
      <address className="not-italic text-base leading-7 text-[var(--color-text)]">
        <span className="block font-bold">{contact.addressLine1}</span>
        <span className="block">
          {contact.addressLine2}, {contact.city}
        </span>
        <span className="block">
          {contact.state} {contact.pincode}
        </span>
      </address>

      <p className="mt-4 flex gap-2.5 border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-6 text-[var(--color-muted)]">
        <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="pin" />
        {contact.landmark}
      </p>

      {contact.parkingNote && (
        <p className="mt-4 flex gap-2.5 text-sm leading-6 text-[var(--color-muted)]">
          <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="scooter" />
          <span>
            <strong className="font-bold text-[var(--color-text)]">{parkingLabel}:</strong> {contact.parkingNote}
          </span>
        </p>
      )}

      {contact.languagesLine && (
        <p className="mt-3 flex gap-2.5 text-sm leading-6 text-[var(--color-muted)]">
          <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-primary)]" name="users" />
          {contact.languagesLine}
        </p>
      )}

      <dl className="mt-7 border-t border-[var(--color-text)]/10 text-sm">
        {hours.map((entry) => {
          const isToday = today === entry.day;
          return (
            <div
              className={`flex items-start justify-between gap-4 border-b border-[var(--color-text)]/10 px-3 py-2.5 ${
                isToday ? "bg-[var(--color-surface)]" : ""
              }`}
              key={entry.day}
            >
              <dt className={`font-bold ${isToday ? "text-[var(--color-primary)]" : ""}`}>
                {entry.day}
                {isToday && (
                  <span className="ml-2 align-middle text-[0.6rem] font-extrabold uppercase tracking-[0.1em] text-[var(--color-accent)]">
                    Today
                  </span>
                )}
              </dt>
              <dd className="text-right tabular-nums text-[var(--color-muted)]">{displayHours(entry)}</dd>
            </div>
          );
        })}
      </dl>

      <Button className="mt-6 w-full" external href={contact.mapDirectionsUrl} icon="pin" size="lg">
        {directionsLabel}
      </Button>
    </div>
  );
}
