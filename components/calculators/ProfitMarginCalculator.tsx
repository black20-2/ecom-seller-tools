"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoney, formatPercent, parseInput } from "@/lib/format";
import { ReceiptLine } from "@/types";

interface FormState {
  revenue: string;
  totalCost: string;
}

const initialState: FormState = {
  revenue: "",
  totalCost: "",
};

export default function ProfitMarginCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (form.revenue.trim() === "") nextErrors.revenue = "This field is required.";
    if (form.totalCost.trim() === "") nextErrors.totalCost = "This field is required.";

    const values = {} as Record<keyof FormState, number>;
    (Object.keys(form) as (keyof FormState)[]).forEach((field) => {
      const parsed = parseInput(form[field]);
      if (parsed === null) {
        nextErrors[field] = "Enter a valid number.";
      } else {
        values[field] = parsed;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length > 0 ? null : { values };
  }

  function handleCalculate() {
    const result = validate();
    if (!result) return;
    const { revenue, totalCost } = result.values;

    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    setLines([
      { label: "Revenue", value: formatMoney(revenue) },
      { label: "Total cost", value: formatMoney(totalCost), tone: "negative" },
      { label: "Profit", value: formatMoney(profit), tone: profit >= 0 ? "positive" : "negative" },
    ]);
    setTotal({
      label: "Profit margin",
      value: formatPercent(margin),
      tone: margin >= 0 ? "positive" : "negative",
    });
  }

  function handleReset() {
    setForm(initialState);
    setErrors({});
    setLines([]);
    setTotal(undefined);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      <form
        className="grid gap-5 rounded-xl border border-line bg-surface p-6 shadow-card sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <FormField
          id="revenue"
          label="Revenue"
          prefix="$"
          value={form.revenue}
          onChange={(v) => update("revenue", v)}
          error={errors.revenue}
        />
        <FormField
          id="total-cost"
          label="Total Cost"
          prefix="$"
          value={form.totalCost}
          onChange={(v) => update("totalCost", v)}
          error={errors.totalCost}
        />

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="Profit Margin Breakdown" lines={lines} total={total} />
    </div>
  );
}
