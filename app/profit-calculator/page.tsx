import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import ProfitCalculator from "@/components/calculators/ProfitCalculator";

export const metadata: Metadata = {
  title: "Profit Calculator",
  description:
    "Free profit calculator for e-commerce sellers. Add up product cost, shipping, platform fees, advertising and other costs to see your profit.",
  alternates: { canonical: "/profit-calculator" },
  openGraph: {
    title: "Profit Calculator | Ecom Seller Tools",
    description: "See your profit on any sale after every cost is accounted for.",
  },
};

export default function ProfitCalculatorPage() {
  return (
    <CalculatorShell
      title="Profit Calculator"
      description="Add up your costs and see exactly what you take home on a sale."
      formula={
        <ul className="space-y-1.5">
          <li>Total Cost = Product Cost + Shipping Cost + Platform Fees + Advertising Cost + Other Costs</li>
          <li>Profit = Selling Price − Total Cost</li>
          <li>Profit Margin = Profit ÷ Selling Price × 100</li>
        </ul>
      }
    >
      <ProfitCalculator />
    </CalculatorShell>
  );
}
