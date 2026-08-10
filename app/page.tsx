import Hero from "@/components/Hero";
import CalculatorExplorer from "@/components/CalculatorExplorer";
import CalculatorCategories from "@/components/CalculatorCategories";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CalculatorExplorer />
      <CalculatorCategories />
      <HowItWorks />
      <FAQ />
    </>
  );
}