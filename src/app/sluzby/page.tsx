import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import ContactTeaser from "@/components/sections/ContactTeaser";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Hydroizolace, sanace, zateplení, izolace spodních staveb, klempířské práce, hromosvody a projektová dokumentace — devět služeb od jednoho dodavatele.",
};

export default function SluzbyPage() {
  return (
    <>
      <Services index="01" />
      <Process index="02" />
      <ContactTeaser />
    </>
  );
}
