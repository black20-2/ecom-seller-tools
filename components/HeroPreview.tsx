"use client";

import { useMemo, useState } from "react";
import { formatMoney, formatPercent, parseInput } from "@/lib/format";

export default function HeroPreview() {
  const [price, setPrice] = useState("40.00");
  const [cost, setCost] = useState("15.00");
  const [feePercent, setFeePercent] = useState("13");

  const result = useMemo(() => {
    const p = parseInput(price) ?? 0;
    const c = parseInput(cost) ?? 0;
    const f = parseInput(feePercent) ?? 0;

    const fees = p * (f / 100);
    const profit = p - c - fees;
    const margin = p > 0 ? (profit / p) * 100 : 0;

    return { fees, profit, margin };
  }, [price, cost, feePercent]);

  return (
    <div className="receipt w-full max-w-sm px-5 py-6">
      <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Try it — quick profit check
      </p>

      <div className="mt-4 space-y-3">
        <MiniField label="Selling price" prefix="$" value={price} onChange={setPrice} />
        <MiniField label="Product cost" prefix="$" value={cost} onChange={setCost} />
        <MiniField label="Marketplace fee" suffix="%" value={feePercent} onChange={setFeePercent} />
      </div>

      <div className="mt-5 border-t border-dashed border-line pt-4">
        <div className="receipt-row">
          <span className="text-muted">Estimated fees</span>
          <span>{formatMoney(result.fees)}</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between font-mono">
          <span className="text-sm font-semibold text-ink">Estimated profit</span>
          <span className={`text-lg font-semibold ${result.profit >= 0 ? "text-profit-dark" : "text-rust-dark"}`}>
            {formatMoney(result.profit)}
          </span>
        </div>
        <p className="mt-1 text-right font-mono text-xs text-muted">{formatPercent(result.margin)} margin</p>
      </div>
    </div>
  );
}

function MiniField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="flex items-center gap-1 rounded-md border border-line bg-paper px-2.5 py-1.5 font-mono text-sm">
        {prefix && <span className="text-muted">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 bg-transparent text-right outline-none"
          aria-label={label}
        />
        {suffix && <span className="text-muted">{suffix}</span>}
      </span>
    </label>
  );
}
