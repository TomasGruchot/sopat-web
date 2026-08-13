import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { services } from "@/lib/data";

export default function Services({ limit, index = "02" }: { limit?: number; index?: string }) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          index={index}
          kicker="Nabízené služby"
          note={limit ? `výběr ${items.length} z ${services.length}` : `${services.length} položek`}
          title="Devět služeb. Jeden dodavatel od návrhu po revizi."
          description="Neprodáváme jednu technologii — navrhneme řešení podle skutečného stavu střechy a rozpočtu."
        />

        <div className="mt-12 -mx-5 border-t border-line md:-mx-8">
          {items.map((service, i) => (
            <div
              key={service.id}
              className="grid grid-cols-[3rem_1fr] items-start gap-x-4 border-b border-line px-5 py-6 transition-colors hover:bg-paper-2 md:grid-cols-[4rem_1.1fr_1.5fr_9rem_7rem] md:items-center md:gap-x-8 md:px-8"
            >
              <span className="mono-label pt-1.5 text-ink-soft md:pt-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl font-semibold md:text-2xl">{service.label}</h3>
                <p className="mt-2 text-sm text-ink-soft md:hidden">{service.description}</p>
                <Link
                  href={`/kontakt?sluzba=${service.id}`}
                  className="mono-label mt-3 inline-block text-oxide underline decoration-oxide/40 underline-offset-4 hover:decoration-oxide md:hidden"
                >
                  Poptat →
                </Link>
              </div>
              <p className="hidden text-sm leading-relaxed text-ink-soft md:block">{service.description}</p>
              {service.image ? (
                <div className="relative hidden h-20 overflow-hidden border border-line md:block">
                  <Image src={service.image} alt="" fill className="fig-img object-cover" sizes="9rem" />
                </div>
              ) : (
                <div className="hidden md:block" />
              )}
              <div className="hidden md:flex md:justify-end">
                <Link
                  href={`/kontakt?sluzba=${service.id}`}
                  className="mono-label text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide"
                >
                  Poptat →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div className="mt-8">
            <Link href="/sluzby" className="mono-label text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide">
              Zobrazit všech {services.length} služeb →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
