import type { SVGProps } from "react";

// One stroke weight, one grid, no fills. Used anywhere a section needs a
// visual anchor — CLAUDE.md rules out emoji and icons inside coloured circles.
const paths = {
  tooth: "M7.5 3.2C5.4 3.2 4 4.9 4 7.2c0 1.6.4 2.6.8 4 .4 1.5.5 2.6.7 4.4.2 1.7.6 4.4 2.1 4.4 1.3 0 1.6-1.6 2-3.6.3-1.6.6-2.9 1.4-2.9s1.1 1.3 1.4 2.9c.4 2 .7 3.6 2 3.6 1.5 0 1.9-2.7 2.1-4.4.2-1.8.3-2.9.7-4.4.4-1.4.8-2.4.8-4 0-2.3-1.4-4-3.5-4-1.4 0-2.2.6-3.5.6s-2.1-.6-3.5-.6Z",
  shield: "M12 3 5 5.8v5.4c0 4.3 2.9 7.6 7 9 4.1-1.4 7-4.7 7-9V5.8L12 3Z|m9 11.8 2.1 2.2L15.5 9.6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z|M12 7.2V12l3.2 2",
  rupee: "M7 4h10M7 8.4h10M16.5 4c0 3-2.2 4.4-5.2 4.4H7l7.6 11.6",
  calendar: "M4.5 6.6h15v13.2h-15zM4.5 10.6h15M8.6 3.4v4M15.4 3.4v4",
  microscope: "M9 20h10M6.5 20h.01M11 4.4l3.6 5.6-3 2-3.6-5.6zM10 14.6a5 5 0 1 0 5.6 5.4M13.4 6.2l1.8-1.2",
  home: "M4 10.6 12 4l8 6.6V20H4z|M9.6 20v-5.6h4.8V20",
  phone: "M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3c0 .6-.4 1-1 1C11.3 20 4 12.7 4 5c0-.6.4-1 1-1Z",
  whatsapp: "M20 11.7a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.7Z|M9 8.6c.3 2.2 2.2 4 4.5 4.5",
  pin: "M12 21s7-6.2 7-12A7 7 0 1 0 5 9c0 5.8 7 12 7 12Z|M12 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  check: "m5 12.4 4.4 4.4L19 7.2",
  arrowRight: "M4.5 12h15M13.4 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8.6 7H17v8.4",
  chevronDown: "m6 9.5 6 6 6-6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  flask: "M10 3.4v5L5.2 17.6c-.7 1.4.2 2.9 1.7 2.9h10.2c1.5 0 2.4-1.5 1.7-2.9L14 8.4v-5|M8.6 3.4h6.8M7.6 14.4h8.8",
  droplet: "M12 3.4c3.2 3.6 5.6 6.3 5.6 9.2A5.6 5.6 0 0 1 12 20.6a5.6 5.6 0 0 1-5.6-8c0-2.9 2.4-5.6 5.6-9.2Z",
  report: "M6 3.4h8l4 4v13.2H6z|M14 3.4v4h4M9 12.4h6M9 16h4",
  scooter: "M6.5 18.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM18.5 18.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z|M9 16h6.5M4 6h2.6l2.6 10M14 6h3.4l1 7.6",
  users: "M15.4 20v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.2V20|M9.2 11.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2M21 20v-1.8a3.6 3.6 0 0 0-2.7-3.5M15.6 4.2a3.6 3.6 0 0 1 0 7",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  chair: "M7 4h7a3 3 0 0 1 3 3v6H7z|M7 13v4a3 3 0 0 0 3 3h7M4.6 20H9",
  card: "M3.4 6.6h17.2v10.8H3.4zM3.4 10.4h17.2M6.6 14.4h3.4",
  lock: "M6.4 10.4h11.2v9.2H6.4zM8.8 10.4V7.8a3.2 3.2 0 0 1 6.4 0v2.6",
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; className?: string };

export function Icon({ name, className = "size-5", ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name].split("|").map((d) => (
        <path d={d} key={d} />
      ))}
    </svg>
  );
}
