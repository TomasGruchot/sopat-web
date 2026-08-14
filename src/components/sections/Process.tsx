import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { processSteps } from "@/lib/data";

export default function Process({ index = "03" }: { index?: string }) {
  return (
    <section className="section-y bg-paper-2">
      <Container>
        <SectionHead
          index={index}
          kicker="Jak pracujeme"
          note="postup zakázky"
          title="Šest kroků od první prohlídky po záruční servis."
        />

        <ol className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.number} className="border-t border-ink/25 pt-5">
              <span className="mono-label text-oxide">Krok {step.number}</span>
              <h3 className="font-display mt-3 text-xl font-semibold leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
