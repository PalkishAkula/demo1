type PhonePreviewProps = {
  /** Brand colour of the site being previewed. */
  color: string;
  title: string;
  locality: string;
  mark: string;
  accent?: string;
};

// A scaled mock of a demo homepage inside a phone frame. Drawn rather than
// screenshotted so it stays sharp and never goes stale.
export function PhonePreview({ color, title, locality, mark, accent = "#E85D4A" }: PhonePreviewProps) {
  return (
    <div className="mx-auto w-44 shrink-0 rounded-[26px] border-[7px] border-[#14181A] bg-[#14181A] shadow-[0_18px_44px_-18px_rgb(0_0_0/0.55)] sm:w-48">
      <div className="relative overflow-hidden rounded-[19px] bg-white">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#14181A]"
        />

        {/* Header bar */}
        <div className="flex items-center justify-between px-2.5 pb-2 pt-5" style={{ background: color }}>
          <span className="grid size-4 place-items-center border border-white/70 text-[5px] font-extrabold text-white">
            {mark}
          </span>
          <span className="flex flex-col gap-[3px]">
            {[8, 8, 8].map((width, index) => (
              <span className="block h-px bg-white/80" key={index} style={{ width }} />
            ))}
          </span>
        </div>

        {/* Hero */}
        <div className="px-2.5 pb-3 pt-3" style={{ background: color }}>
          <p className="text-[5px] font-extrabold uppercase tracking-[0.12em]" style={{ color: accent }}>
            {locality}
          </p>
          <p className="mt-1.5 text-[10px] font-bold leading-tight text-white">{title}</p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="h-3 w-12 rounded-[2px] bg-[#25D366]" />
            <span className="h-3 w-9 rounded-[2px] border border-white/60" />
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-4 gap-px bg-black/10">
          {["18k", "14", "4.8", "6"].map((value) => (
            <span className="bg-white py-1.5 text-center text-[6px] font-extrabold tabular-nums" style={{ color }} key={value}>
              {value}
            </span>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-1.5 p-2.5">
          {Array.from({ length: 4 }, (_, index) => (
            <span className="block rounded-[2px] border border-black/10 p-1.5" key={index}>
              <span className="block h-1 w-8 rounded-full bg-black/25" />
              <span className="mt-1 block h-1 w-11 rounded-full bg-black/10" />
              <span className="mt-1.5 block h-1.5 w-6 rounded-full" style={{ background: color }} />
            </span>
          ))}
        </div>

        {/* Sticky action bar */}
        <div className="grid grid-cols-3 gap-px border-t border-black/10 bg-black/10">
          {["Call", "Chat", "Map"].map((label) => (
            <span className="bg-white py-1.5 text-center text-[5px] font-extrabold" style={{ color }} key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
