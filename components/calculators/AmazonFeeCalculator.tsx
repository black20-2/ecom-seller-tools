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
  referralPercent: string;
  fbaCost: string;
  shippingCost: string;
  adCost: string;
  otherCosts: string;
}

const initialState: FormState = {
  sellingPrice: "",
  productCost: "",
  referralPercent: "",
  fbaCost: "",
  shippingCost: "",
  adCost: "",
  otherCosts: "",
};

export default function AmazonFeeCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const required: (keyof FormState)[] = ["sellingPrice", "productCost", "referralPercent"];

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
    const { sellingPrice, productCost, referralPercent, fbaCost, shippingCost, adCost, otherCosts } =
      result.values;

    const revenue = sellingPrice;
    const amazonFees = revenue * (referralPercent / 100);
    const nonFeeCosts = productCost + fbaCost + shippingCost + adCost + otherCosts;
    const totalCosts = nonFeeCosts + amazonFees;
    const profit = revenue - totalCosts;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;

    setLines([
      { label: "Revenue", value: formatMoney(revenue) },
      { label: "Amazon fees", value: formatMoney(amazonFees), tone: "negative" },
      { label: "Total costs", value: formatMoney(totalCosts) },
      { label: "ROI", value: formatPercent(roi) },
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
          id="product-cost"
          label="Product Cost"
          prefix="$"
          value={form.productCost}
          onChange={(v) => update("productCost", v)}
          error={errors.productCost}
        />
        <FormField
          id="referral-percent"
          label="Amazon Referral Fee Percentage"
          suffix="%"
          value={form.referralPercent}
          onChange={(v) => update("referralPercent", v)}
          error={errors.referralPercent}
        />
        <FormField
          id="fba-cost"
          label="Fulfillment / FBA Cost"
          prefix="$"
          required={false}
          value={form.fbaCost}
          onChange={(v) => update("fbaCost", v)}
          error={errors.fbaCost}
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

      <ReceiptResult title="Amazon Fee Breakdown" lines={lines} total={total} />
    </div>
  );
}
