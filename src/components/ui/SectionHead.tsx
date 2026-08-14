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
      <h2 className="font-display mt-3 max-w-3xl text-[clamp(1.55rem,min(4vw,5.5vh),2.55rem)] leading-[1.05] font-semibold sm:mt-4">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-xl text-sm text-ink-soft md:mt-4 md:text-base">{description}</p>}
    </div>
  );
}
