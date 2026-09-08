import { Icon } from "@/components/Icon";
import { StarRating } from "@/components/StarRating";
import type { SiteConfig } from "@/types/site";

type Review = SiteConfig["reviews"][number];

export function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <article className="lift flex h-full snap-start flex-col border border-[var(--color-text)]/10 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center bg-[var(--color-surface)] font-[family-name:var(--font-heading-active)] text-lg text-[var(--color-primary)]"
          >
            {initial}
          </span>
          <div>
            <h3 className="font-extrabold leading-tight">{review.name}</h3>
            <p className="text-sm text-[var(--color-muted)]">{review.area}</p>
          </div>
        </div>
        <span className="shrink-0 border border-[var(--color-text)]/12 px-2 py-1 text-xs font-bold text-[var(--color-muted)]">
          {review.service}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <StarRating rating={review.rating} />
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">{review.date}</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{review.text}</p>

      {review.ownerReply && (
        <div className="mt-5 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-4">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--color-primary)]">
            <Icon className="size-3.5" name="check" />
            Reply from the owner
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{review.ownerReply}</p>
        </div>
      )}
    </article>
  );
}
