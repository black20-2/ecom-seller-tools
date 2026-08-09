import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import AmazonFeeCalculator from "@/components/calculators/AmazonFeeCalculator";

export const metadata: Metadata = {
  title: "Amazon Fee Calculator",
  description:
    "Free Amazon fee calculator. Estimate referral fees, FBA costs, advertising and profit per unit for any product you sell on Amazon.",
  alternates: { canonical: "/amazon-fee-calculator" },
  openGraph: {
    title: "Amazon Fee Calculator | Ecom Seller Tools",
    description: "Estimate Amazon referral fees, FBA costs and profit per unit for any product.",
  },
};

export default function AmazonFeeCalculatorPage() {
  return (
    <CalculatorShell
      title="Amazon Fee Calculator"
      description="Estimate Amazon referral fees, fulfillment costs and your real profit per unit."
      formula={
        <ul className="space-y-1.5">
          <li>Revenue = Selling Price</li>
          <li>Amazon Fees = Revenue × Referral Fee Percentage</li>
          <li>Total Costs = Product Cost + Fulfillment Cost + Shipping Cost + Advertising Cost + Other Costs + Amazon Fees</li>
          <li>Estimated Profit = Revenue − Total Costs</li>
          <li>Profit Margin = Estimated Profit ÷ Revenue × 100</li>
          <li>ROI = Estimated Profit ÷ Total Costs × 100</li>
        </ul>
      }
      disclaimer="Amazon fees vary by marketplace, category, fulfillment method and seller account. Verify current fees with Amazon."
    >
      <AmazonFeeCalculator />
    </CalculatorShell>
  );
}
