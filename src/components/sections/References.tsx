import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { projects, type Project } from "@/lib/data";

export default function References({ limit, index = "04" }: { limit?: number; index?: string }) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          index={index}
          kicker="Realizace"
          note={limit ? `výběr ${items.length} z ${projects.length}` : `${projects.length} projektů`}
          title="Plocha, místo, typ izolace. Reálná data, žádné odhady."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <ProjectFigure key={project.id} project={project} figureNumber={i + 2} />
          ))}
        </div>

        {limit && (
          <div className="mt-12">
            <Link
              href="/realizace"
              className="mono-label text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide"
            >
              Zobrazit všech {projects.length} realizací →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProjectFigure({ project, figureNumber }: { project: Project; figureNumber: number }) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/3] overflow-hidden border border-ink bg-paper-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Realizovaná střecha — ${project.name}, ${project.place}`}
            fill
            className="fig-img object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <HatchFallback />
        )}
      </div>
      <figcaption className="mt-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="min-w-0 font-medium">{project.name}</span>
          <span className="font-mono text-sm whitespace-nowrap">{project.area}</span>
        </div>
        <div className="mono-label mt-1.5 flex flex-wrap justify-between gap-x-3 gap-y-1 text-ink-soft">
          <span className="min-w-0">
            {project.place} · {project.insulation}
          </span>
          <span className="shrink-0">Obr. {String(figureNumber).padStart(2, "0")}</span>
        </div>
      </figcaption>
    </figure>
  );
}

function HatchFallback() {
  return (
    <svg width="100%" height="100%" aria-hidden>
      <defs>
        <pattern id="proj-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 10 L10 0" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj-hatch)" />
    </svg>
  );
}
