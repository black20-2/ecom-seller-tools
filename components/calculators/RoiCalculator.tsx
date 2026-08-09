"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoney, formatPercent, parseInput } from "@/lib/format";
import { ReceiptLine } from "@/types";

interface FormState {
  investmentCost: string;
  profit: string;
}

const initialState: FormState = {
  investmentCost: "",
  profit: "",
};

export default function RoiCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (form.investmentCost.trim() === "") nextErrors.investmentCost = "This field is required.";
    if (form.profit.trim() === "") nextErrors.profit = "This field is required.";

    const values = {} as Record<keyof FormState, number>;
    (Object.keys(form) as (keyof FormState)[]).forEach((field) => {
      const parsed = parseInput(form[field]);
      if (parsed === null) {
        nextErrors[field] = "Enter a valid number.";
      } else {
        values[field] = parsed;
      }
    });

    if (values.investmentCost === 0 && form.investmentCost.trim() !== "") {
      nextErrors.investmentCost = "Investment cost must be greater than zero.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length > 0 ? null : { values };
  }

  function handleCalculate() {
    const result = validate();
    if (!result) return;
    const { investmentCost, profit } = result.values;

    const roi = (profit / investmentCost) * 100;
    const totalReturn = investmentCost + profit;

    setLines([
      { label: "Investment cost", value: formatMoney(investmentCost) },
      { label: "Profit", value: formatMoney(profit), tone: profit >= 0 ? "positive" : "negative" },
      { label: "Total return", value: formatMoney(totalReturn) },
    ]);
    setTotal({
      label: "ROI",
      value: formatPercent(roi),
      tone: roi >= 0 ? "positive" : "negative",
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
          id="investment-cost"
          label="Investment Cost"
          prefix="$"
          value={form.investmentCost}
          onChange={(v) => update("investmentCost", v)}
          error={errors.investmentCost}
        />
        <FormField
          id="profit"
          label="Profit"
          prefix="$"
          value={form.profit}
          onChange={(v) => update("profit", v)}
          error={errors.profit}
          helpText="Enter a negative number if the product lost money."
        />

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="ROI Breakdown" lines={lines} total={total} />
    </div>
  );
}
