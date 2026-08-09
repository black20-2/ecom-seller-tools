import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import EbayFeeCalculator from "@/components/calculators/EbayFeeCalculator";

export const metadata: Metadata = {
  title: "eBay Fee Calculator",
  description:
    "Free eBay fee calculator. Enter your selling price, shipping and costs to estimate eBay fees, advertising cost and your real profit.",
  alternates: { canonical: "/ebay-fee-calculator" },
  openGraph: {
    title: "eBay Fee Calculator | Ecom Seller Tools",
    description:
      "Estimate eBay fees, advertising cost and profit on any listing before you sell it.",
  },
};

export default function EbayFeeCalculatorPage() {
  return (
    <CalculatorShell
      title="eBay Fee Calculator"
      description="Estimate your eBay fees, advertising cost and real profit on a listing before you sell it."
      formula={
        <ul className="space-y-1.5">
          <li>Total Revenue = Selling Price + Shipping Charged to Buyer</li>
          <li>eBay Fees = Total Revenue × eBay Fee Percentage</li>
          <li>Advertising Cost = Total Revenue × Advertising Fee Percentage</li>
          <li>Total Cost = Product Cost + Shipping Cost + eBay Fees + Advertising Cost</li>
          <li>Estimated Profit = Total Revenue − Total Cost</li>
          <li>Profit Margin = Estimated Profit ÷ Total Revenue × 100</li>
        </ul>
      }
      disclaimer="eBay fees can vary depending on seller, category, location and current eBay policies. Verify current fees with eBay."
    >
      <EbayFeeCalculator />
    </CalculatorShell>
  );
}
