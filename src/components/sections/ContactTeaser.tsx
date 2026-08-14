import Link from "next/link";
import { company } from "@/lib/data";

export default function ContactTeaser() {
  return (
    <section className="bg-ink text-paper">
      <div className="section-y mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-6 px-5 sm:gap-8 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          <p className="mono-label text-paper/50">Nezávazná poptávka</p>
          <h2 className="font-display mt-3 text-[clamp(1.7rem,min(5vw,6vh),2.75rem)] font-semibold leading-[1.02]">
            Zatéká? <em className="font-medium italic">Napište nám.</em>
          </h2>
          <p className="mt-3 max-w-md text-sm text-paper/70 md:text-base">
            Odpovídáme na technické dotazy i bez závazku. Nabídku zpracujeme na základě fotek a přibližné plochy
            střechy — do dvou pracovních dnů.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-5 sm:items-start md:items-end">
          <Link
            href="/kontakt"
            className="mono-label border border-paper px-7 py-4 text-center text-paper transition-colors hover:bg-paper hover:text-ink sm:text-left"
          >
            Odeslat poptávku →
          </Link>
          <div className="md:text-right">
            <a href={`tel:${company.phoneHref}`} className="font-mono text-lg text-paper hover:text-paper/80 sm:text-xl">
              {company.phone}
            </a>
            <p className="mono-label mt-1 text-paper/50">po–pá 7.00–16.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
