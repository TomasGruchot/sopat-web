import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { company, branches } from "@/lib/data";
import {
  MAP_VIEWBOX,
  REGION_PATHS,
  SERVED_REGIONS,
  REGION_LABELS,
  REGION_LABEL_LAYOUT,
  BRANCH_PINS,
  BRANCH_LABEL_LAYOUT,
} from "@/lib/mapData";

export default function CoverageMap({ index = "06" }: { index?: string }) {
  const servedSet = new Set<string>(SERVED_REGIONS);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          index={index}
          kicker="Kde pracujeme"
          note="mapa působnosti"
          title="Pět krajů Moravy. Zbytek ČR na dotaz."
          description="Sídlo v Sobáčově u Litovle, pobočky v Olomouci a Blansku — realizace vlastními lidmi bez dojezdových příplatků po celé Moravě."
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ul>
              {SERVED_REGIONS.map((id) => (
                <li key={id} className="flex items-center gap-3 border-b border-line py-3">
                  <span className="h-2.5 w-2.5 bg-oxide" aria-hidden />
                  <span className="font-mono text-sm">{REGION_LABELS[id]}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-oxide/20 outline outline-1 outline-oxide" aria-hidden />
                <span className="mono-label text-ink-soft">kraj, kde realizujeme zakázky</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-ink" aria-hidden />
                <span className="mono-label text-ink-soft">sídlo / pobočka</span>
              </div>
            </div>
          </div>

          <figure>
            <svg
              viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
              className="w-full"
              role="img"
              aria-label="Mapa krajů České republiky se zvýrazněnou oblastí působnosti SOPAT.CZ na Moravě a Vysočině"
            >
              {Object.entries(REGION_PATHS).map(([id, d]) => (
                <path
                  key={id}
                  d={d}
                  fill={servedSet.has(id) ? "var(--oxide)" : "var(--paper-2)"}
                  fillOpacity={servedSet.has(id) ? 0.16 : 1}
                  stroke={servedSet.has(id) ? "var(--oxide)" : "var(--line)"}
                  strokeWidth={servedSet.has(id) ? 1.5 : 1}
                  strokeLinejoin="round"
                />
              ))}

              {SERVED_REGIONS.map((id) => {
                const layout = REGION_LABEL_LAYOUT[id];
                if (!layout) return null;
                return (
                  <text
                    key={id}
                    x={layout.x}
                    y={layout.y}
                    textAnchor={layout.anchor || "middle"}
                    fontSize="11"
                    fill="var(--ink)"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                    letterSpacing="0.04em"
                    stroke="var(--paper)"
                    strokeWidth="5"
                    paintOrder="stroke"
                    strokeLinejoin="round"
                  >
                    {layout.short}
                  </text>
                );
              })}

              {branches.map((branch) => {
                const pin = BRANCH_PINS[branch.id];
                const layout = BRANCH_LABEL_LAYOUT[branch.id];
                if (!pin || !layout) return null;
                const [x, y] = pin;
                return (
                  <g key={branch.id}>
                    <circle cx={x} cy={y} r="6" fill="var(--ink)" stroke="var(--paper)" strokeWidth="2" />
                    <text
                      x={x + layout.dx}
                      y={y + layout.dy}
                      textAnchor={layout.anchor}
                      dominantBaseline="middle"
                      fontSize="11"
                      fill="var(--ink)"
                      fontFamily="var(--font-mono)"
                      stroke="var(--paper)"
                      strokeWidth="5"
                      paintOrder="stroke"
                      strokeLinejoin="round"
                    >
                      {layout.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <figcaption className="mono-label mt-3 text-ink-soft">
              Obr. — Kraje ČR, zvýrazněna oblast působnosti · {company.regions.length} krajů
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
