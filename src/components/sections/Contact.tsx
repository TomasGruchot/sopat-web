"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Select } from "@/components/ui/Select";
import { ContactMap } from "@/components/ui/ContactMap";
import { branches, company, services } from "@/lib/data";

type Errors = Record<string, string>;

const BUILDING_OPTIONS = [
  { value: "bytovy-dum", label: "Bytový dům" },
  { value: "prumyslova-hala", label: "Průmyslová hala" },
  { value: "rodinny-dum", label: "Rodinný dům" },
  { value: "jine", label: "Jiné" },
];

const SERVICE_OPTIONS = services.map((s) => ({ value: s.id, label: s.label }));

const inputClass = (error?: string) =>
  clsx(
    "underline-field w-full rounded-none border-b bg-transparent py-2.5 text-base text-ink outline-none transition-colors",
    error ? "border-oxide" : "border-ink focus:border-oxide"
  );

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mono-label mb-1.5 block text-ink-soft">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-oxide">{error}</p>}
    </div>
  );
}

function messageForService(serviceId: string): string {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return "";
  return `Mám zájem o: ${service.label}.`;
}

export default function Contact() {
  const searchParams = useSearchParams();
  const sluzbaParam = searchParams.get("sluzba") || "";
  const initialService = services.some((s) => s.id === sluzbaParam) ? sluzbaParam : "";

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [serviceId, setServiceId] = useState(initialService);
  const [buildingType, setBuildingType] = useState("");
  const [message, setMessage] = useState(() => (initialService ? messageForService(initialService) : ""));

  useEffect(() => {
    const next = services.some((s) => s.id === sluzbaParam) ? sluzbaParam : "";
    setServiceId(next);
    if (next) {
      setMessage((prev) => {
        const empty = !prev.trim();
        const wasAuto = services.some((s) => prev === messageForService(s.id));
        return empty || wasAuto ? messageForService(next) : prev;
      });
      // Scroll to form when arriving with a preselected service
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [sluzbaParam]);

  const selectedService = services.find((s) => s.id === serviceId);
  const hq = branches[0];

  const handleServiceChange = (nextId: string) => {
    setServiceId(nextId);
    setMessage((prev) => {
      const empty = !prev.trim();
      const wasAuto = services.some((s) => prev === messageForService(s.id));
      if (!nextId) return wasAuto ? "" : prev;
      return empty || wasAuto ? messageForService(nextId) : prev;
    });
  };

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const buildingType = String(data.get("buildingType") || "").trim();

    if (!name) next.name = "Napište prosím vaše jméno.";
    if (!phone || phone.replace(/\D/g, "").length < 9) next.phone = "Zadejte platné telefonní číslo.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Zadejte platnou e-mailovou adresu.";
    if (!buildingType) next.buildingType = "Vyberte typ objektu.";

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/poptavka", { method: "POST", body: data });
      if (!response.ok) throw new Error("request-failed");
      setStatus("success");
      form.reset();
      setFileNames([]);
      setServiceId("");
      setBuildingType("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-y">
      <Container>
        <SectionHead
          kicker="Nezávazná poptávka"
          note="odpovídáme do 2 pracovních dnů"
          title="Zatéká vám do domu? Napište nám, ozveme se."
          description="Odpovídáme na technické dotazy i bez závazku. Nabídku zpracujeme na základě fotek a přibližné plochy střechy."
        />

        <div className="mt-8 grid grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
          {status === "success" ? (
            <div className="flex min-h-[380px] flex-col items-start justify-center border border-ink p-8 md:p-12">
              <span className="mono-label text-oxide">Odesláno</span>
              <h3 className="font-display mt-4 text-3xl font-semibold">Poptávka je u nás.</h3>
              <p className="mt-3 max-w-sm text-ink-soft">
                Ozveme se vám nejpozději do dvou pracovních dnů na telefon nebo e-mail, který jste vyplnili.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mono-label mt-8 text-ink underline decoration-oxide decoration-2 underline-offset-8 hover:text-oxide"
              >
                Odeslat další poptávku
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="scroll-mt-28 space-y-7" noValidate>
              {selectedService && (
                <p className="border border-ink bg-paper-2 px-4 py-3 text-sm text-ink">
                  <span className="mono-label text-oxide">Poptáváte:</span>{" "}
                  <span className="font-medium">{selectedService.label}</span>
                </p>
              )}

              <Field label="Zájem o službu" name="service">
                <Select
                  id="service"
                  name="service"
                  value={serviceId}
                  options={SERVICE_OPTIONS}
                  placeholder="Vyberte službu (nepovinné)"
                  onChange={handleServiceChange}
                />
              </Field>

              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <Field label="Jméno *" name="name" error={errors.name}>
                  <input id="name" name="name" type="text" required className={inputClass(errors.name)} />
                </Field>
                <Field label="Telefon *" name="phone" error={errors.phone}>
                  <input id="phone" name="phone" type="tel" required className={inputClass(errors.phone)} />
                </Field>
              </div>

              <Field label="E-mail *" name="email" error={errors.email}>
                <input id="email" name="email" type="email" required className={inputClass(errors.email)} />
              </Field>

              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <Field label="Typ objektu *" name="buildingType" error={errors.buildingType}>
                  <Select
                    id="buildingType"
                    name="buildingType"
                    value={buildingType}
                    options={BUILDING_OPTIONS}
                    placeholder="Vyberte typ objektu"
                    required
                    error={Boolean(errors.buildingType)}
                    onChange={(value) => {
                      setBuildingType(value);
                      if (errors.buildingType) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.buildingType;
                          return next;
                        });
                      }
                    }}
                  />
                </Field>
                <Field label="Přibližná plocha střechy (m²)" name="area">
                  <input id="area" name="area" type="number" min="0" inputMode="numeric" className={inputClass()} />
                </Field>
              </div>

              <Field label="Zpráva" name="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={clsx(inputClass(), "resize-none")}
                />
              </Field>

              <div>
                <label className="mono-label mb-1.5 block text-ink-soft" htmlFor="photos">
                  Fotky střechy (nepovinné)
                </label>
                <label
                  htmlFor="photos"
                  className="flex cursor-pointer items-center justify-between border border-dashed border-ink-soft px-4 py-3.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <span>
                    {fileNames.length > 0 ? `${fileNames.length} soubor(ů) vybráno` : "Vyberte fotky nebo je sem přetáhněte"}
                  </span>
                  <span className="mono-label text-oxide">Vybrat</span>
                </label>
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
                />
                {fileNames.length > 0 && (
                  <p className="mt-2 truncate text-xs text-ink-soft">{fileNames.join(", ")}</p>
                )}
              </div>

              {status === "error" && (
                <p className="text-sm text-oxide">
                  Poptávku se nepodařilo odeslat. Zkuste to prosím znovu nebo nám zavolejte.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mono-label w-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-oxide disabled:opacity-60"
              >
                {status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
              </button>
              <p className="text-xs text-ink-soft">
                Odesláním souhlasíte se zpracováním osobních údajů pro účely vyřízení poptávky.
              </p>
            </form>
          )}

          <div>
            <ContactMap lat={hq.lat} lon={hq.lon} address={hq.address} />

            <div className="mt-8 space-y-8">
              {branches.map((branch) => (
                <div key={branch.id} className="border-t-2 border-ink pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold">{branch.title}</h3>
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="font-mono text-sm hover:text-oxide">
                      {branch.phone}
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{branch.address}</p>
                  {branch.email && (
                    <a href={`mailto:${branch.email}`} className="text-sm text-ink-soft underline underline-offset-4 hover:text-oxide">
                      {branch.email}
                    </a>
                  )}

                  <ul className="mt-4 space-y-2.5">
                    {branch.contacts.map((contact) => (
                      <li key={contact.email} className="border-t border-line pt-2.5 text-sm">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span>
                            {contact.name} <span className="text-ink-soft">— {contact.role}</span>
                          </span>
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                            className="font-mono text-xs text-ink-soft hover:text-oxide"
                          >
                            {contact.phone}
                          </a>
                        </div>
                        <a href={`mailto:${contact.email}`} className="text-xs text-ink-soft hover:text-oxide">
                          {contact.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mono-label mt-8 text-ink-soft">
              IČ {company.ic} · DIČ {company.dic}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
