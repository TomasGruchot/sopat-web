import type { Metadata } from "next";
import References from "@/components/sections/References";
import ContactTeaser from "@/components/sections/ContactTeaser";

export const metadata: Metadata = {
  title: "Realizace",
  description:
    "Přehled realizovaných hydroizolací a rekonstrukcí plochých střech SOPAT.CZ — plocha, lokalita a typ izolace u každého projektu.",
};

export default function RealizacePage() {
  return (
    <>
      <References index="01" />
      <ContactTeaser />
    </>
  );
}
