import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import CurrencyCalculator from "@/components/calculators/CurrencyCalculator";

export const metadata: Metadata = {
  title: "Currency Calculator",
  description:
    "Free currency calculator for e-commerce sellers. Convert between USD, GBP, EUR, CAD, AUD, AED, PKR and INR.",
  alternates: { canonical: "/currency-calculator" },
  openGraph: {
    title: "Currency Calculator | Ecom Seller Tools",
    description: "Convert between the currencies e-commerce sellers deal with most.",
  },
};

export default function CurrencyCalculatorPage() {
  return (
    <CalculatorShell
      title="Currency Calculator"
      description="Convert an amount between common seller currencies."
      formula={
        <ul className="space-y-1.5">
          <li>Amount in USD = Amount ÷ Rate of From Currency</li>
          <li>Converted Amount = Amount in USD × Rate of To Currency</li>
        </ul>
      }
      disclaimer="Exchange rates shown are for calculation purposes and may not represent live market rates."
    >
      <CurrencyCalculator />
    </CalculatorShell>
  );
}
