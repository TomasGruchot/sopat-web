import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { roofLayers } from "@/lib/roofLayers";

export default function BuildUpTeaser() {
  return (
    <section className="section-y">
      <Container>
        <SectionHead
          index="01"
          kicker="Skladba střechy"
          note="výkres č. 01"
          title="Střecha je pět vrstev. Stačí, aby selhala jedna."
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Od nosné konstrukce po hydroizolační fólii — každá vrstva má svou funkci a svůj způsob, jak selhat.
              Kompletní řez skladbou s materiály jednotlivých vrstev najdete na samostatné stránce.
            </p>
            <Link
              href="/skladba-strechy"
              className="mono-label mt-8 inline-block text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide"
            >
              Prohlédnout celý řez →
            </Link>
          </div>

          <ol>
            {roofLayers
              .slice()
              .reverse()
              .map((layer) => (
                <li
                  key={layer.id}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-line py-3.5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-4"
                >
                  <span className="mono-label text-oxide">{String(layer.index).padStart(2, "0")}</span>
                  <span className="font-display text-base font-semibold sm:text-lg">{layer.label}</span>
                  <span className="mono-label col-start-2 text-ink-soft sm:col-start-auto sm:block">{layer.material}</span>
                </li>
              ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
