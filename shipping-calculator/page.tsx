import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import ShippingCalculator from "@/components/calculators/ShippingCalculator";

export const metadata: Metadata = {
  title: "Shipping Calculator",
  description:
    "Free shipping cost calculator. Estimate shipping cost from package weight, dimensions and your own shipping rate.",
  alternates: { canonical: "/shipping-calculator" },
  openGraph: {
    title: "Shipping Calculator | Ecom Seller Tools",
    description: "Estimate what a package will cost to ship using your own rate.",
  },
};

export default function ShippingCalculatorPage() {
  return (
    <CalculatorShell
      title="Shipping Calculator"
      description="Estimate shipping cost from your package weight, dimensions and your own shipping rate."
      formula={
        <ul className="space-y-1.5">
          <li>Volumetric Weight = (Length × Width × Height) ÷ 139</li>
          <li>Billable Weight = greater of Actual Weight or Volumetric Weight</li>
          <li>Estimated Shipping Cost = Billable Weight × Shipping Rate + Additional Shipping Cost</li>
        </ul>
      }
      disclaimer="This is a general estimate, not an official Amazon, eBay, UPS, FedEx, DHL or USPS shipping price. Enter your own rate for the most accurate result."
    >
      <ShippingCalculator />
    </CalculatorShell>
  );
}
