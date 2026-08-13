import type { Metadata } from "next";
import CoverageMap from "@/components/sections/CoverageMap";
import ContactTeaser from "@/components/sections/ContactTeaser";

export const metadata: Metadata = {
  title: "Kde pracujeme",
  description:
    "Působíme v pěti krajích Moravy a Vysočiny — sídlo v Sobáčově u Litovle, pobočky v Olomouci a Blansku.",
};

export default function KdePracujemePage() {
  return (
    <>
      <CoverageMap index="01" />
      <ContactTeaser />
    </>
  );
}
