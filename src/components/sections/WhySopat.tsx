import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { whySopat } from "@/lib/data";

export default function WhySopat() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          index="07"
          kicker="Proč SOPAT"
          title="Čtyři důvody, které se nedají koupit levněji."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {whySopat.map((item, i) => (
            <div key={item.title} className="flex gap-4 border-t border-line pt-6 sm:gap-6">
              <span className="font-display shrink-0 text-3xl font-semibold text-oxide sm:text-4xl md:text-5xl" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold md:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
