import { CalculatorMeta } from "@/types";

export const calculators: CalculatorMeta[] = [
  {
    slug: "ebay-fee-calculator",
    name: "eBay Fee Calculator",
    shortDescription:
      "Work out eBay fees, ad costs and your real profit on a listing before you sell it.",
    category: "Marketplace Fees",
    href: "/ebay-fee-calculator",
  },
  {
    slug: "amazon-fee-calculator",
    name: "Amazon Fee Calculator",
    shortDescription:
      "Estimate Amazon referral fees, FBA costs and profit per unit for any product.",
    category: "Marketplace Fees",
    href: "/amazon-fee-calculator",
  },
  {
    slug: "profit-calculator",
    name: "Profit Calculator",
    shortDescription:
      "Add up product cost, shipping, fees and ads to see your profit on any sale.",
    category: "Profit & ROI",
    href: "/profit-calculator",
  },
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    shortDescription:
      "Find the return on investment for a product based on cost and profit.",
    category: "Profit & ROI",
    href: "/roi-calculator",
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    shortDescription:
      "Turn revenue and total cost into a clear profit margin percentage.",
    category: "Profit & ROI",
    href: "/profit-margin-calculator",
  },
  {
    slug: "shipping-calculator",
    name: "Shipping Calculator",
    shortDescription:
      "Estimate shipping cost from package weight, dimensions and your own rate.",
    category: "Shipping",
    href: "/shipping-calculator",
  },
  {
    slug: "currency-calculator",
    name: "Currency Calculator",
    shortDescription:
      "Convert between USD, GBP, EUR and other common seller currencies.",
    category: "Currency",
    href: "/currency-calculator",
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}
