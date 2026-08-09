import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import RoiCalculator from "@/components/calculators/RoiCalculator";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Free ROI calculator for e-commerce sellers. Find the return on investment for a product based on investment cost and profit.",
  alternates: { canonical: "/roi-calculator" },
  openGraph: {
    title: "ROI Calculator | Ecom Seller Tools",
    description: "Find the return on investment for any product you sell.",
  },
};

export default function RoiCalculatorPage() {
  return (
    <CalculatorShell
      title="ROI Calculator"
      description="See how hard your money is working — enter your investment cost and profit to get your ROI."
      formula={
        <ul className="space-y-1.5">
          <li>ROI = (Profit ÷ Investment Cost) × 100</li>
          <li>Total Return = Investment Cost + Profit</li>
        </ul>
      }
    >
      <RoiCalculator />
    </CalculatorShell>
  );
}
