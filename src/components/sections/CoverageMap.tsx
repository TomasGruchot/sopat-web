import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { company, branches } from "@/lib/data";
import {
  MAP_VIEWBOX,
  REGION_PATHS,
  SERVED_REGIONS,
  BRANCH_PINS,
  BRANCH_LABEL_LAYOUT,
} from "@/lib/mapData";

export default function CoverageMap({ index = "06" }: { index?: string }) {
  const servedSet = new Set<string>(SERVED_REGIONS);

  return (
    <section className="section-y">
      <Container>
        <SectionHead
          index={index}
          kicker="Kde pracujeme"
          note="mapa působnosti"
          title="Celá Česká republika. I Slovensko."
          description="Sídlo v Sobáčově u Litovle, pobočky v Olomouci a Blansku — realizace vlastními lidmi po celé ČR i na Slovensku."
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-x-14 gap-y-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ul>
              {company.countries.map((country) => (
                <li key={country} className="flex items-center gap-3 border-b border-line py-3">
                  <span className="h-2.5 w-2.5 bg-oxide" aria-hidden />
                  <span className="font-mono text-sm">{country}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              Základna na Moravě — zakázky ale bereme napříč všemi kraji ČR a na Slovensku.
            </p>

            <div className="mt-8 space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-oxide/20 outline outline-1 outline-oxide" aria-hidden />
                <span className="mono-label text-ink-soft">oblast působnosti</span>
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
              aria-label="Mapa České republiky a Slovenska se zvýrazněnou působností SOPAT.CZ"
            >
              {[
                ...Object.entries(REGION_PATHS).filter(([id]) => id === "Slovensko"),
                ...Object.entries(REGION_PATHS).filter(([id]) => id !== "Slovensko"),
              ].map(([id, d]) => (
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

              <text
                x={320}
                y={290}
                textAnchor="middle"
                fontSize="28"
                fill="var(--ink)"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.08em"
                stroke="var(--paper)"
                strokeWidth="8"
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                ČESKO
              </text>
              <text
                x={1148}
                y={520}
                textAnchor="middle"
                fontSize="28"
                fill="var(--ink)"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.08em"
                stroke="var(--paper)"
                strokeWidth="8"
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                SLOVENSKO
              </text>

              {branches.map((branch) => {
                const pin = BRANCH_PINS[branch.id];
                const layout = BRANCH_LABEL_LAYOUT[branch.id];
                if (!pin || !layout) return null;
                const [x, y] = pin;
                return (
                  <g key={branch.id}>
                    <circle cx={x} cy={y} r="10" fill="var(--ink)" stroke="var(--paper)" strokeWidth="3" />
                    <text
                      x={x + layout.dx}
                      y={y + layout.dy}
                      textAnchor={layout.anchor}
                      dominantBaseline="middle"
                      fontSize="20"
                      fontWeight="600"
                      fill="var(--ink)"
                      fontFamily="var(--font-mono)"
                      stroke="var(--paper)"
                      strokeWidth="7"
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
              Obr. — Česká republika a Slovensko · základna na Moravě
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
