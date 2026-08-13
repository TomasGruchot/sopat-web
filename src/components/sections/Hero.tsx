import Image from "next/image";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/data";

const STATS = [
  { value: "26", label: "let na trhu" },
  { value: "300+", label: "realizovaných střech" },
  { value: "ISO 9001", label: "certifikace kvality" },
  { value: "5", label: "krajů ČR" },
];

export default function Hero() {
  return (
    <section className="pb-16 pt-10 sm:pb-20 sm:pt-12 md:pb-28 md:pt-20">
      <Container>
        <p className="mono-label text-ink-soft">
          Hydroizolace · sanace · zateplení plochých střech — od roku {company.founded}
        </p>

        <h1 className="font-display mt-5 max-w-5xl text-[clamp(2.15rem,8vw,6rem)] leading-[0.98] font-semibold tracking-tight sm:mt-6">
          Střecha, na kterou už{" "}
          <em className="font-medium italic">nebudete muset myslet.</em>
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-6 sm:mt-10 sm:gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base text-ink-soft sm:text-lg">
            Nová hydroizolace i záchrana staré střechy — vlastními lidmi, bez subdodavatelů, po celé Moravě.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href="/kontakt" variant="solid" className="w-full sm:w-auto">
              Nezávazná poptávka
            </Button>
            <Button href="/realizace" variant="outline" className="w-full sm:w-auto">
              Realizace
            </Button>
          </div>
        </div>

        <figure className="mt-12 md:mt-16">
          <div className="relative aspect-[16/9] overflow-hidden border border-ink md:aspect-[21/9]">
            <Image
              src="/images/aerial-vsetin.jpg"
              alt="Letecký pohled na plochou střechu po rekonstrukci s hydroizolační fólií"
              fill
              priority
              className="fig-img object-cover"
              sizes="(min-width: 1320px) 1256px, 100vw"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2">
            <span className="mono-label text-ink-soft">Obr. 01 — Plochá střecha, hydroizolační fólie</span>
            <span className="mono-label text-ink-soft">Ilustrační fotografie</span>
          </figcaption>
        </figure>

        <dl className="mt-10 grid grid-cols-2 border-t-2 border-ink sm:mt-14 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={clsx(
                "py-5 pr-4 sm:py-6 sm:pr-6",
                i > 0 && "border-l border-line pl-4 sm:pl-6",
                i === 2 && "max-md:border-l-0 max-md:pl-0",
                i >= 2 && "max-md:border-t max-md:border-line"
              )}
            >
              <dd className="font-display text-2xl font-semibold sm:text-3xl md:text-4xl">{stat.value}</dd>
              <dt className="mono-label mt-2 text-ink-soft">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
