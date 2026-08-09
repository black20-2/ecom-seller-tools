import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import ProfitMarginCalculator from "@/components/calculators/ProfitMarginCalculator";

export const metadata: Metadata = {
  title: "Profit Margin Calculator",
  description:
    "Free profit margin calculator. Turn revenue and total cost into a clear profit margin percentage.",
  alternates: { canonical: "/profit-margin-calculator" },
  openGraph: {
    title: "Profit Margin Calculator | Ecom Seller Tools",
    description: "Turn revenue and total cost into a clear profit margin percentage.",
  },
};

export default function ProfitMarginCalculatorPage() {
  return (
    <CalculatorShell
      title="Profit Margin Calculator"
      description="Enter your revenue and total cost to see your profit and profit margin."
      formula={
        <ul className="space-y-1.5">
          <li>Profit = Revenue − Total Cost</li>
          <li>Profit Margin = (Profit ÷ Revenue) × 100</li>
        </ul>
      }
    >
      <ProfitMarginCalculator />
    </CalculatorShell>
  );
}
