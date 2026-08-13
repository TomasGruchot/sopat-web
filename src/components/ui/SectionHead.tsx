import { clsx } from "clsx";

/**
 * Shared section opener in the "printed documentation" style:
 * strong top rule, mono index + kicker row, large serif title.
 */
export function SectionHead({
  index,
  kicker,
  title,
  note,
  description,
  className,
}: {
  index?: string;
  kicker: string;
  title: string;
  note?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={clsx("border-t-2 border-ink pt-4", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="mono-label text-ink">
          {index && <span className="text-oxide">({index})</span>} {kicker}
        </span>
        {note && <span className="mono-label text-ink-soft">{note}</span>}
      </div>
      <h2 className="font-display mt-6 max-w-3xl text-[clamp(1.85rem,5.5vw,3.2rem)] leading-[1.02] font-semibold sm:mt-8">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-xl text-base text-ink-soft md:text-lg">{description}</p>}
    </div>
  );
}
