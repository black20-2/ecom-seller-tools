"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoney, formatPercent, parseInput } from "@/lib/format";
import { ReceiptLine } from "@/types";

interface FormState {
  sellingPrice: string;
  shippingCharged: string;
  productCost: string;
  shippingCost: string;
  feePercent: string;
  adPercent: string;
}

const initialState: FormState = {
  sellingPrice: "",
  shippingCharged: "",
  productCost: "",
  shippingCost: "",
  feePercent: "",
  adPercent: "",
};

export default function EbayFeeCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const required: (keyof FormState)[] = ["sellingPrice", "productCost", "feePercent"];

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
    const { sellingPrice, shippingCharged, productCost, shippingCost, feePercent, adPercent } = result.values;

    const totalRevenue = sellingPrice + shippingCharged;
    const ebayFees = totalRevenue * (feePercent / 100);
    const advertisingCost = totalRevenue * (adPercent / 100);
    const totalCost = productCost + shippingCost + ebayFees + advertisingCost;
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    setLines([
      { label: "Total revenue", value: formatMoney(totalRevenue) },
      { label: "eBay fees", value: formatMoney(ebayFees), tone: "negative" },
      { label: "Advertising cost", value: formatMoney(advertisingCost), tone: "negative" },
      { label: "Total cost", value: formatMoney(totalCost) },
    ]);
    setTotal({
      label: `Estimated profit (${formatPercent(margin)} margin)`,
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
          id="shipping-charged"
          label="Shipping Charged to Buyer"
          prefix="$"
          required={false}
          value={form.shippingCharged}
          onChange={(v) => update("shippingCharged", v)}
          error={errors.shippingCharged}
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
          id="fee-percent"
          label="eBay Fee Percentage"
          suffix="%"
          value={form.feePercent}
          onChange={(v) => update("feePercent", v)}
          error={errors.feePercent}
          helpText="Your final value fee percentage."
        />
        <FormField
          id="ad-percent"
          label="Advertising Fee Percentage"
          suffix="%"
          required={false}
          value={form.adPercent}
          onChange={(v) => update("adPercent", v)}
          error={errors.adPercent}
          helpText="Optional — leave blank if not promoting this listing."
        />

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="eBay Fee Breakdown" lines={lines} total={total} />
    </div>
  );
}
