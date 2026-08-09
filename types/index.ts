export type CalculatorCategory = "Marketplace Fees" | "Profit & ROI" | "Shipping" | "Currency";

export interface CalculatorMeta {
  slug: string;
  name: string;
  shortDescription: string;
  category: CalculatorCategory;
  href: string;
}

export interface ReceiptLine {
  label: string;
  value: string;
  tone?: "default" | "positive" | "negative" | "muted";
}

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "AED" | "PKR" | "INR";
