"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import ReceiptResult from "@/components/ReceiptResult";
import { formatMoney, formatNumber, parseInput } from "@/lib/format";
import { ReceiptLine } from "@/types";

interface FormState {
  weight: string;
  length: string;
  width: string;
  height: string;
  rate: string;
  additionalCost: string;
}

const initialState: FormState = {
  weight: "",
  length: "",
  width: "",
  height: "",
  rate: "",
  additionalCost: "",
};

// A commonly used dimensional-weight divisor for inches/pounds. This is a
// general estimation assumption, not a specific carrier's official formula.
const DIM_DIVISOR = 139;

export default function ShippingCalculator() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [lines, setLines] = useState<ReceiptLine[]>([]);
  const [total, setTotal] = useState<ReceiptLine | undefined>(undefined);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): { values: Record<keyof FormState, number> } | null {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const required: (keyof FormState)[] = ["weight", "length", "width", "height", "rate"];

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
    const { weight, length, width, height, rate, additionalCost } = result.values;

    const volumetricWeight = (length * width * height) / DIM_DIVISOR;
    const billableWeight = Math.max(weight, volumetricWeight);
    const shippingCost = billableWeight * rate + additionalCost;

    setLines([
      { label: "Actual weight", value: `${formatNumber(weight)} lb` },
      { label: "Volumetric weight", value: `${formatNumber(volumetricWeight)} lb` },
      { label: "Billable weight", value: `${formatNumber(billableWeight)} lb` },
      { label: "Additional cost", value: formatMoney(additionalCost) },
    ]);
    setTotal({
      label: "Estimated shipping cost",
      value: formatMoney(shippingCost),
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
          id="weight"
          label="Product Weight"
          suffix="lb"
          value={form.weight}
          onChange={(v) => update("weight", v)}
          error={errors.weight}
        />
        <FormField
          id="rate"
          label="Shipping Rate"
          prefix="$"
          suffix="/ lb"
          value={form.rate}
          onChange={(v) => update("rate", v)}
          error={errors.rate}
          helpText="Your own carrier or negotiated rate."
        />
        <FormField
          id="length"
          label="Package Length"
          suffix="in"
          value={form.length}
          onChange={(v) => update("length", v)}
          error={errors.length}
        />
        <FormField
          id="width"
          label="Package Width"
          suffix="in"
          value={form.width}
          onChange={(v) => update("width", v)}
          error={errors.width}
        />
        <FormField
          id="height"
          label="Package Height"
          suffix="in"
          value={form.height}
          onChange={(v) => update("height", v)}
          error={errors.height}
        />
        <FormField
          id="additional-cost"
          label="Additional Shipping Cost"
          prefix="$"
          required={false}
          value={form.additionalCost}
          onChange={(v) => update("additionalCost", v)}
          error={errors.additionalCost}
          helpText="Packaging, insurance, or handling — optional."
        />

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ReceiptResult title="Shipping Estimate" lines={lines} total={total} />
    </div>
  );
}
