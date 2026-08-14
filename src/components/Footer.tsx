import Link from "next/link";
import { company, branches } from "@/lib/data";

const NAV = [
  { href: "/skladba-strechy", label: "Skladba střechy" },
  { href: "/sluzby", label: "Služby" },
  { href: "/realizace", label: "Realizace" },
  { href: "/kde-pracujeme", label: "Kde pracujeme" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/gdpr", label: "Ochrana osobních údajů" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="border-b border-paper/15 py-10 md:py-14">
          <div className="font-display text-[clamp(2.5rem,14vw,8.5rem)] leading-none font-semibold tracking-tight">
            SOPAT<span className="text-oxide">.</span>CZ
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-paper/70">
              Hydroizolace, sanace a zateplení plochých střech vlastními zaměstnanci. Od roku {company.founded}, po
              celé ČR i na Slovensku.
            </p>
            <p className="mono-label mt-6 text-paper/50">
              IČ {company.ic}
              <br />
              DIČ {company.dic}
            </p>
          </div>

          <div>
            <h3 className="mono-label text-paper/50">Sídlo a pobočky</h3>
            <ul className="mt-4 space-y-4">
              {branches.map((branch) => (
                <li key={branch.id} className="text-sm">
                  <div className="text-paper">{branch.title}</div>
                  <div className="text-paper/60">{branch.address}</div>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="font-mono text-xs text-paper/60 hover:text-paper"
                  >
                    {branch.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mono-label text-paper/50">Navigace</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-paper/70 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mono-label text-paper/50">Kontakt</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`tel:${company.phoneHref}`} className="font-mono text-paper/70 hover:text-paper">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="text-paper/70 hover:text-paper">
                  {company.email}
                </a>
              </li>
              <li>
                <Link href="/kontakt" className="text-paper/70 underline underline-offset-4 hover:text-paper">
                  Nezávazná poptávka
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/15 py-5 text-xs leading-relaxed text-paper/50 md:flex-row md:items-center md:justify-between md:gap-6">
          <span>© {new Date().getFullYear()} {company.name}. Všechna práva vyhrazena.</span>
          <span className="md:text-right">
            Registrováno u KS Ostrava · pojištěno u {company.insurer} · {company.iso}
          </span>
        </div>
      </div>
    </footer>
  );
}
