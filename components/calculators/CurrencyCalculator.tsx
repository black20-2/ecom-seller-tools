"use client";

import { useState } from "react";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoneyWithSymbol, parseInput } from "@/lib/format";
import { convertCurrency, currencies, getCurrencySymbol } from "@/lib/currency";
import { CurrencyCode, ReceiptLine } from "@/types";

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState("100.00");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("GBP");
  const [error, setError] = useState("");
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function handleCalculate() {
    const value = parseInput(amount);
    if (value === null || amount.trim() === "") {
      setError("Enter a valid amount.");
      setLines([]);
      setTotal(undefined);
      return;
    }
    setError("");

    const converted = convertCurrency(value, from, to);

    setLines([
      { label: `Amount (${from})`, value: formatMoneyWithSymbol(value, getCurrencySymbol(from)) },
      { label: "Conversion", value: `1 ${from} → ${convertCurrency(1, from, to).toFixed(4)} ${to}` },
    ]);
    setTotal({
      label: `Converted (${to})`,
      value: formatMoneyWithSymbol(converted, getCurrencySymbol(to)),
      tone: "positive",
    });
  }

  function handleReset() {
    setAmount("100.00");
    setFrom("USD");
    setTo("GBP");
    setError("");
    setLines([]);
    setTotal(undefined);
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      <form
        className="grid gap-5 rounded-xl border border-line bg-surface p-6 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-ink">
            Amount <span className="text-rust">*</span>
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-invalid={Boolean(error)}
            className={`mt-1.5 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-ink shadow-sm focus:border-profit focus:ring-1 focus:ring-profit ${
              error ? "border-rust" : "border-line"
            }`}
          />
          {error && <p className="mt-1.5 text-xs font-medium text-rust">{error}</p>}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div>
            <label htmlFor="from-currency" className="block text-sm font-medium text-ink">
              From Currency
            </label>
            <select
              id="from-currency"
              value={from}
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
              className="mt-1.5 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink shadow-sm focus:border-profit focus:ring-1 focus:ring-profit"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper text-muted hover:text-profit"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 7h12M13 4l3 3-3 3M16 13H4M7 10l-3 3 3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div>
            <label htmlFor="to-currency" className="block text-sm font-medium text-ink">
              To Currency
            </label>
            <select
              id="to-currency"
              value={to}
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
              className="mt-1.5 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink shadow-sm focus:border-profit focus:ring-1 focus:ring-profit"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="Currency Conversion" lines={lines} total={total} />
    </div>
  );
}
