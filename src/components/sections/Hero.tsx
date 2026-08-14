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
    <section className="hero-screen flex flex-col py-[clamp(0.6rem,1.8svh,1.35rem)]">
      <Container className="flex min-h-0 flex-1 flex-col">
        <p className="mono-label shrink-0 text-ink-soft">
          Hydroizolace · sanace · zateplení plochých střech — od roku {company.founded}
        </p>

        <h1 className="font-display mt-[clamp(0.4rem,1.2svh,0.9rem)] max-w-5xl shrink-0 text-[clamp(1.85rem,min(6.4vw,8svh),4.35rem)] leading-[0.98] font-semibold tracking-tight">
          Střecha, na kterou už{" "}
          <em className="font-medium italic">nebudete muset myslet.</em>
        </h1>

        <div className="mt-[clamp(0.65rem,1.8svh,1.25rem)] flex shrink-0 flex-col justify-between gap-3 sm:flex-row sm:items-end sm:gap-6">
          <p className="max-w-md text-sm text-ink-soft sm:text-base md:text-lg">
            Nová hydroizolace i záchrana staré střechy — vlastními lidmi, bez subdodavatelů, po celé Moravě.
          </p>
          <div className="flex gap-2 sm:gap-3">
            <Button href="/kontakt" variant="solid" className="flex-1 px-4 py-2.5 sm:flex-none sm:px-6 sm:py-3.5">
              Nezávazná poptávka
            </Button>
            <Button href="/realizace" variant="outline" className="flex-1 px-4 py-2.5 sm:flex-none sm:px-6 sm:py-3.5">
              Realizace
            </Button>
          </div>
        </div>

        <figure className="mt-[clamp(0.65rem,2svh,1.25rem)] flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden border border-ink">
            <Image
              src="/images/aerial-vsetin.jpg"
              alt="Letecký pohled na plochou střechu po rekonstrukci s hydroizolační fólií"
              fill
              priority
              className="fig-img object-cover"
              sizes="(min-width: 1320px) 1256px, 100vw"
            />
          </div>
          <figcaption className="mt-1.5 hidden flex-wrap justify-between gap-2 [@media(min-height:700px)]:flex">
            <span className="mono-label text-ink-soft">Obr. 01 — Plochá střecha, hydroizolační fólie</span>
            <span className="mono-label text-ink-soft">Ilustrační fotografie</span>
          </figcaption>
        </figure>

        <dl className="mt-[clamp(0.45rem,1.4svh,1rem)] grid shrink-0 grid-cols-2 border-t-2 border-ink md:grid-cols-4 [@media(max-height:540px)]:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={clsx(
                "py-[clamp(0.4rem,1.2svh,1rem)] pr-3 sm:pr-6",
                i > 0 && "border-l border-line pl-3 sm:pl-6",
                i === 2 && "max-md:border-l-0 max-md:pl-0 [@media(max-height:540px)]:border-l [@media(max-height:540px)]:pl-3",
                i >= 2 && "max-md:border-t max-md:border-line [@media(max-height:540px)]:border-t-0"
              )}
            >
              <dd className="font-display text-xl font-semibold sm:text-2xl md:text-3xl">{stat.value}</dd>
              <dt className="mono-label mt-1 text-ink-soft">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
