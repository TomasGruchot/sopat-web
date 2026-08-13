import Hero from "@/components/sections/Hero";
import BuildUpTeaser from "@/components/sections/BuildUpTeaser";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import References from "@/components/sections/References";
import Materials from "@/components/sections/Materials";
import CoverageMap from "@/components/sections/CoverageMap";
import WhySopat from "@/components/sections/WhySopat";
import ContactTeaser from "@/components/sections/ContactTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <BuildUpTeaser />
      <Services limit={4} />
      <Process />
      <References limit={3} />
      <Materials />
      <CoverageMap />
      <WhySopat />
      <ContactTeaser />
    </>
  );
}
