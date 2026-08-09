import { CurrencyCode } from "@/types";

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export const currencies: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "AED", name: "UAE Dirham", symbol: "AED " },
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs " },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
];

/**
 * Static reference rates, expressed as "1 USD = X units of currency".
 *
 * These numbers are placeholders for calculation purposes only and are not
 * live market rates. Swap this object for a call to a live exchange-rate
 * API (for example, exchangerate.host or a paid provider) when one is
 * available — every function below already takes the rate table as its
 * source of truth, so no other code needs to change.
 */
export const usdReferenceRates: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.78,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.5,
  AED: 3.67,
  PKR: 278,
  INR: 83.5,
};

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: Record<CurrencyCode, number> = usdReferenceRates
): number {
  const amountInUsd = amount / rates[from];
  return amountInUsd * rates[to];
}

export function getCurrencySymbol(code: CurrencyCode): string {
  return currencies.find((c) => c.code === code)?.symbol ?? "";
}
