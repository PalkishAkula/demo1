import type { SiteConfig } from "@/types/site";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type TimetableGridProps = {
  rows: NonNullable<SiteConfig["gym"]>["timetable"];
  tone?: "light" | "ink";
};

// A real weekly timetable, not a card grid. It scrolls sideways on a phone with
// the time column pinned, which is how people read it standing at the desk.
export function TimetableGrid({ rows, tone = "light" }: TimetableGridProps) {
  const isInk = tone === "ink";
  const border = isInk ? "border-white/20" : "border-[var(--color-text)]/12";
  const headText = isInk ? "text-white/70" : "text-[var(--color-muted)]";
  const stickyBg = isInk ? "bg-[var(--color-primary)]" : "bg-white";

  return (
    // No negative margin here: the sticky time column pins to this scrollport's
    // left edge, so the scrollport has to start where the table starts.
    <div className="overflow-x-auto">
      <table className={`w-full min-w-[46rem] border-collapse border ${border} text-left text-sm`}>
        <caption className="sr-only">Weekly class timetable</caption>
        <thead>
          <tr>
            <th
              className={`sticky left-0 z-10 border-r ${border} ${stickyBg} px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] ${headText}`}
              scope="col"
            >
              Time
            </th>
            {DAYS.map((day) => (
              <th
                className={`border-l ${border} px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] ${headText}`}
                key={day}
                scope="col"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className={`border-t ${border}`} key={row.slot}>
              <th
                className={`sticky left-0 z-10 border-r ${border} ${stickyBg} whitespace-nowrap px-4 py-4 font-bold tabular-nums ${
                  isInk ? "text-white" : "text-[var(--color-text)]"
                }`}
                scope="row"
              >
                {row.slot}
              </th>
              {row.classes.map((entry, index) => {
                const isClosed = entry === "—";
                const isOpenFloor = entry === "Open floor";
                return (
                  <td
                    className={`border-l ${border} px-4 py-4 align-top ${
                      isClosed
                        ? isInk
                          ? "text-white/25"
                          : "text-[var(--color-text)]/25"
                        : isOpenFloor
                          ? isInk
                            ? "text-white/55"
                            : "text-[var(--color-muted)]"
                          : isInk
                            ? "font-bold text-white"
                            : "font-bold text-[var(--color-text)]"
                    }`}
                    key={`${row.slot}-${DAYS[index]}`}
                  >
                    {isClosed ? <span aria-label="Closed">—</span> : entry}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
