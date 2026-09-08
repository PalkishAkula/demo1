"use client";

import { useEffect, useState } from "react";
import type { SiteConfig } from "@/types/site";

type Status = { open: boolean; detail: string };
const weekdayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function minutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function displayTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

function getStatus(hours: SiteConfig["hours"]): Status {
  const parts = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const today = value("weekday");
  const current = Number(value("hour")) * 60 + Number(value("minute"));
  const todayHours = hours.find((entry) => entry.day === today);
  const inBreak = todayHours?.breakStart && todayHours?.breakEnd && current >= minutes(todayHours.breakStart) && current < minutes(todayHours.breakEnd);

  if (todayHours && !todayHours.closed && current >= minutes(todayHours.open) && current < minutes(todayHours.close) && !inBreak) {
    return { open: true, detail: `Open now · Closes ${displayTime(todayHours.close)}` };
  }

  if (todayHours && inBreak && todayHours.breakEnd) {
    return { open: false, detail: `Closed · Opens ${displayTime(todayHours.breakEnd)} today` };
  }

  const startIndex = weekdayOrder.indexOf(today);
  for (let offset = 0; offset < 7; offset += 1) {
    const day = weekdayOrder[(startIndex + offset) % 7];
    const entry = hours.find((item) => item.day === day);
    const canOpenToday = offset === 0 && entry && !entry.closed && current < minutes(entry.open);
    if ((offset > 0 || canOpenToday) && entry && !entry.closed) {
      const when = offset === 1 ? "tomorrow" : offset === 0 ? "today" : `on ${day}`;
      return { open: false, detail: `Closed · Opens ${displayTime(entry.open)} ${when}` };
    }
  }

  return { open: false, detail: "Closed" };
}

export function OpenNowBadge({ hours }: Pick<SiteConfig, "hours">) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(hours));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours]);

  // Rendered only after the effect runs, so the server and client markup agree
  // regardless of where the visitor is.
  if (!status) return null;

  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-[8px] border px-3 py-1.5 text-sm font-bold ${
        status.open
          ? "border-[var(--color-open)]/40 bg-[var(--color-open)]/8 text-[var(--color-open)]"
          : "border-[var(--color-muted)]/40 bg-[var(--color-muted)]/8 text-[var(--color-muted)]"
      }`}
    >
      <span aria-hidden="true" className="relative grid size-2.5 place-items-center">
        <span className={`absolute inset-0 rounded-full ${status.open ? "bg-[var(--color-open)]" : "bg-[var(--color-muted)]"}`} />
        {status.open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-open)] opacity-60" />
        )}
      </span>
      {status.detail}
    </p>
  );
}
