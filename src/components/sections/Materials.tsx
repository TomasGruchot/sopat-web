import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { materials, company } from "@/lib/data";

export default function Materials() {
  return (
    <section className="section-y">
      <Container>
        <SectionHead
          index="05"
          kicker="Systémy a certifikace"
          note={`${materials.length} systémů`}
          title="Nejsme vázáni na jeden systém."
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Materiál vybíráme podle skutečného stavu konstrukce a rozpočtu — ne podle toho, co máme na skladě.
              Pracujeme se všemi hlavními hydroizolačními a tepelně-izolačními systémy na trhu.
            </p>

            <dl className="mt-10 space-y-0">
              <div className="flex flex-col gap-1 border-t border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="font-mono text-sm">{company.iso}</dt>
                <dd className="mono-label text-ink-soft sm:text-right">certifikovaný systém řízení kvality</dd>
              </div>
              <div className="flex flex-col gap-1 border-t border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="font-mono text-sm">{company.insurer}</dt>
                <dd className="mono-label text-ink-soft sm:text-right">pojištěná odpovědnost za škodu</dd>
              </div>
            </dl>
          </div>

          <ul>
            {materials.map((material) => (
              <li
                key={material.name}
                className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="font-display text-lg font-semibold">{material.name}</span>
                <span className="mono-label text-ink-soft sm:text-right">{material.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
