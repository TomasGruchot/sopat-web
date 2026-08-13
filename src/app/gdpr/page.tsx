import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR)",
  description: "Informace o zpracování osobních údajů společností SOPAT.CZ s.r.o.",
};

export default function GdprPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <Link
        href="/"
        className="mono-label text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide"
      >
        ← Zpět na web
      </Link>
      <h1 className="font-display mt-8 text-3xl font-semibold md:text-4xl">Ochrana osobních údajů</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-ink-soft">
        <p>
          Společnost {company.name}, IČ {company.ic}, se sídlem Sobáčov 3, 783 21 Mladeč, zpracovává osobní údaje
          poskytnuté prostřednictvím poptávkového formuláře výhradně za účelem zpracování a vyřízení vaší poptávky
          na hydroizolaci, sanaci nebo zateplení střechy.
        </p>
        <p>
          Zpracováváme jméno, telefonní číslo, e-mail, případně fotografie střechy a informace o objektu, které nám
          sami poskytnete. Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a případné realizaci zakázky,
          nejdéle však po dobu 3 let od posledního kontaktu.
        </p>
        <p>
          Údaje nepředáváme třetím stranám s výjimkou subjektů nezbytných pro doručení nabídky (e-mailový nebo
          telefonní operátor). Máte právo na přístup k údajům, jejich opravu, výmaz nebo omezení zpracování — napište
          nám na{" "}
          <a href={`mailto:${company.email}`} className="text-oxide underline underline-offset-4">
            {company.email}
          </a>
          .
        </p>
        <p>Kontaktní telefon: {company.phone}.</p>
      </div>
    </div>
  );
}
