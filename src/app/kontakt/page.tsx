import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nezávazná poptávka na hydroizolaci, sanaci nebo zateplení ploché střechy. Sídlo Sobáčov u Litovle, pobočky Olomouc a Blansko.",
};

export default function KontaktPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-paper" />}>
      <Contact />
    </Suspense>
  );
}
