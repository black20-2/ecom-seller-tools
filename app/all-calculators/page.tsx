import type { Metadata } from "next";
import Container from "@/components/Container";
import CalculatorCard from "@/components/CalculatorCard";
import { calculators } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Browse every free e-commerce calculator: eBay fees, Amazon fees, profit, ROI, profit margin, shipping and currency conversion.",
  alternates: { canonical: "/all-calculators" },
};

export default function AllCalculatorsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">All Calculators</h1>
      <p className="mt-3 max-w-2xl text-base text-muted">
        Every free tool on Ecom Seller Tools, in one place. Pick a calculator to get started —
        no login required.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>
    </Container>
  );
}
