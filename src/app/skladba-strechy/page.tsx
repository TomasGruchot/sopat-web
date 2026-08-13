import type { Metadata } from "next";
import BuildUp from "@/components/sections/BuildUp";
import ContactTeaser from "@/components/sections/ContactTeaser";

export const metadata: Metadata = {
  title: "Skladba střechy",
  description:
    "Technický řez skladbou ploché střechy — nosná konstrukce, parozábrana, tepelná izolace, separační vrstva a hydroizolační fólie.",
};

export default function SkladbaStrechyPage() {
  return (
    <>
      <BuildUp />
      <ContactTeaser />
    </>
  );
}
