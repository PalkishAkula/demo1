export function StarRating({ rating }: { rating: number }) {
  return <div aria-label={`${rating} out of 5 stars`} className="flex gap-1 text-[var(--color-accent)]">{Array.from({ length: 5 }, (_, index) => <svg aria-hidden="true" className="size-4" fill={index < rating ? "currentColor" : "none"} key={index} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>)}</div>;
}
