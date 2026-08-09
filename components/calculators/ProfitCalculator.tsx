"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoney, formatPercent, parseInput } from "@/lib/format";
import { ReceiptLine } from "@/types";

interface FormState {
  sellingPrice: string;
  productCost: string;
  shippingCost: string;
  platformFees: string;
  adCost: string;
  otherCosts: string;
}

const initialState: FormState = {
  sellingPrice: "",
  productCost: "",
  shippingCost: "",
  platformFees: "",
  adCost: "",
  otherCosts: "",
};

export default function ProfitCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const required: (keyof FormState)[] = ["sellingPrice", "productCost"];

    for (const field of required) {
      if (form[field].trim() === "") {
        nextErrors[field] = "This field is required.";
      }
    }

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
    const { sellingPrice, productCost, shippingCost, platformFees, adCost, otherCosts } = result.values;

    const totalCost = productCost + shippingCost + platformFees + adCost + otherCosts;
    const profit = sellingPrice - totalCost;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

    setLines([
      { label: "Selling price", value: formatMoney(sellingPrice) },
      { label: "Total cost", value: formatMoney(totalCost), tone: "negative" },
    ]);
    setTotal({
      label: `Profit (${formatPercent(margin)} margin)`,
      value: formatMoney(profit),
      tone: profit >= 0 ? "positive" : "negative",
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
          id="selling-price"
          label="Selling Price"
          prefix="$"
          value={form.sellingPrice}
          onChange={(v) => update("sellingPrice", v)}
          error={errors.sellingPrice}
        />
        <FormField
          id="product-cost"
          label="Product Cost"
          prefix="$"
          value={form.productCost}
          onChange={(v) => update("productCost", v)}
          error={errors.productCost}
        />
        <FormField
          id="shipping-cost"
          label="Shipping Cost"
          prefix="$"
          required={false}
          value={form.shippingCost}
          onChange={(v) => update("shippingCost", v)}
          error={errors.shippingCost}
        />
        <FormField
          id="platform-fees"
          label="Platform Fees"
          prefix="$"
          required={false}
          value={form.platformFees}
          onChange={(v) => update("platformFees", v)}
          error={errors.platformFees}
        />
        <FormField
          id="ad-cost"
          label="Advertising Cost"
          prefix="$"
          required={false}
          value={form.adCost}
          onChange={(v) => update("adCost", v)}
          error={errors.adCost}
        />
        <FormField
          id="other-costs"
          label="Other Costs"
          prefix="$"
          required={false}
          value={form.otherCosts}
          onChange={(v) => update("otherCosts", v)}
          error={errors.otherCosts}
        />

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="Profit Breakdown" lines={lines} total={total} />
    </div>
  );
}
