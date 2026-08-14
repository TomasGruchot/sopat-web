import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { roofLayers } from "@/lib/roofLayers";

// Cross-section geometry (SVG user units)
const VB_W = 1000;
const VB_H = 470;
const STACK_X0 = 70;
const STACK_X1 = 750;
const STACK_BOTTOM = 400;
const DIM_X = 800;
const DRAIN_X = 880;
const DRAIN_BOTTOM = 452;

// Bands bottom-to-top, matching the real build-up order in roofLayers.
const bands = roofLayers.reduce<Array<(typeof roofLayers)[number] & { y: number; bottom: number; center: number }>>(
  (acc, layer) => {
    const bottom = acc.length === 0 ? STACK_BOTTOM : acc[acc.length - 1].y;
    const top = bottom - layer.height;
    acc.push({ ...layer, y: top, bottom, center: (top + bottom) / 2 });
    return acc;
  },
  []
);

const STACK_TOP = bands[bands.length - 1].y;

const CHIP_R = 15;
const CHIP_MIN_GAP = CHIP_R * 2 + 6;

// Keep index chips from overlapping when adjacent bands are thin.
const chipYs = bands.map((b) => b.center);
for (let pass = 0; pass < 4; pass++) {
  for (let i = 1; i < chipYs.length; i++) {
    // bands go bottom→top; SVG y decreases upward, so chipYs[i] < chipYs[i-1]
    const gap = chipYs[i - 1] - chipYs[i];
    if (gap < CHIP_MIN_GAP) {
      const push = (CHIP_MIN_GAP - gap) / 2;
      chipYs[i - 1] += push;
      chipYs[i] -= push;
    }
  }
}

// Technical-drawing fill per layer id (hatching conventions).
function bandFill(id: string): string {
  switch (id) {
    case "nosna":
      return "url(#hatch-cross)";
    case "parozabrana":
      return "var(--ink)";
    case "izolace":
      return "url(#hatch-diag)";
    case "separace":
      return "url(#dots)";
    case "hydroizolace":
      return "var(--oxide)";
    default:
      return "none";
  }
}

export default function BuildUp() {
  return (
    <section className="section-y">
      <Container>
        <SectionHead
          index="01"
          kicker="Skladba střechy"
          note="řez skladbou · výkres č. 01"
          title="Střecha je pět vrstev. Stačí, aby selhala jedna."
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-x-14 gap-y-8 lg:grid-cols-[1.35fr_1fr]">
          <figure>
            <div className="border border-ink bg-paper p-4 md:p-6">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full"
                role="img"
                aria-label="Technický řez skladbou ploché střechy s pěti vrstvami"
              >
                <defs>
                  <pattern id="hatch-diag" width="12" height="12" patternUnits="userSpaceOnUse">
                    <path d="M0 12 L12 0" stroke="var(--ink-soft)" strokeWidth="1" />
                  </pattern>
                  <pattern id="hatch-cross" width="11" height="11" patternUnits="userSpaceOnUse">
                    <path d="M0 11 L11 0 M0 0 L11 11" stroke="var(--ink-soft)" strokeWidth="0.8" />
                  </pattern>
                  <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="1.1" fill="var(--ink-soft)" />
                  </pattern>
                </defs>

                {/* Layer bands */}
                {bands.map((band, i) => {
                  const chipY = chipYs[i];
                  return (
                  <g key={band.id}>
                    <rect
                      x={STACK_X0}
                      y={band.y}
                      width={STACK_X1 - STACK_X0}
                      height={band.bottom - band.y}
                      fill={bandFill(band.id)}
                      stroke="var(--ink)"
                      strokeWidth="1.5"
                    />
                    {/* Index chip on the left — may sit slightly off-center on thin bands */}
                    <circle cx={STACK_X0 - 34} cy={chipY} r={CHIP_R} fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" />
                    <text
                      x={STACK_X0 - 34}
                      y={chipY + 4.5}
                      textAnchor="middle"
                      fontSize="13"
                      fill="var(--ink)"
                      fontFamily="var(--font-mono)"
                    >
                      {band.index}
                    </text>
                    {/* Leader: chip → band center */}
                    <path
                      d={`M ${STACK_X0 - 19} ${chipY} L ${STACK_X0 - 8} ${chipY} L ${STACK_X0 - 8} ${band.center} L ${STACK_X0} ${band.center}`}
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="1"
                    />
                  </g>
                  );
                })}

                {/* Dimension line (kóta) on the right of the stack */}
                <g stroke="var(--ink-soft)" strokeWidth="1">
                  <line x1={DIM_X} y1={STACK_TOP} x2={DIM_X} y2={STACK_BOTTOM} />
                  <line x1={DIM_X - 7} y1={STACK_TOP} x2={DIM_X + 7} y2={STACK_TOP} />
                  <line x1={DIM_X - 7} y1={STACK_BOTTOM} x2={DIM_X + 7} y2={STACK_BOTTOM} />
                  <line x1={STACK_X1} y1={STACK_TOP} x2={DIM_X - 4} y2={STACK_TOP} strokeDasharray="4 4" />
                  <line x1={STACK_X1} y1={STACK_BOTTOM} x2={DIM_X - 4} y2={STACK_BOTTOM} strokeDasharray="4 4" />
                </g>
                <text
                  x={DIM_X + 18}
                  y={(STACK_TOP + STACK_BOTTOM) / 2}
                  fontSize="13"
                  fill="var(--ink-soft)"
                  fontFamily="var(--font-mono)"
                  transform={`rotate(-90 ${DIM_X + 18} ${(STACK_TOP + STACK_BOTTOM) / 2})`}
                  textAnchor="middle"
                >
                  ≈ 250–450 mm dle posudku
                </text>

                {/* Drain (střešní vtok) at the roof edge */}
                <line
                  x1={DRAIN_X}
                  y1={STACK_TOP + 4}
                  x2={DRAIN_X}
                  y2={DRAIN_BOTTOM}
                  stroke="var(--ink)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx={DRAIN_X} cy={STACK_TOP + 2} r="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
                <text
                  x={DRAIN_X}
                  y={DRAIN_BOTTOM + 16}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--ink-soft)"
                  fontFamily="var(--font-mono)"
                >
                  vtok
                </text>

                {/* Surface line above hydro layer */}
                <line
                  x1={STACK_X0 - 12}
                  y1={STACK_TOP}
                  x2={DRAIN_X + 24}
                  y2={STACK_TOP}
                  stroke="var(--ink)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
              </svg>
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2">
              <span className="mono-label text-ink-soft">Výkres 01 — Řez skladbou ploché střechy, M 1:10</span>
              <span className="mono-label text-oxide">■ hydroizolační vrstva</span>
            </figcaption>
          </figure>

          <ol className="lg:pt-2">
            {bands
              .slice()
              .reverse()
              .map((band) => (
                <li key={band.id} className="border-t border-line py-5 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="mono-label text-oxide">
                      {String(band.index).padStart(2, "0")}
                    </span>
                    <span className="mono-label text-ink-soft">{band.material}</span>
                  </div>
                  <h3 className="font-display mt-2 text-xl font-semibold">{band.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{band.description}</p>
                </li>
              ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
