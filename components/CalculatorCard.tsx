import Link from "next/link";
import { CalculatorMeta } from "@/types";

export default function CalculatorCard({ calculator }: { calculator: CalculatorMeta }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-cardHover">
      <div>
        <span className="inline-flex rounded-full bg-profit-light px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-profit-dark">
          {calculator.category}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-navy">{calculator.name}</h3>
        <p className="mt-2 text-sm text-muted">{calculator.shortDescription}</p>
      </div>

      <Link
        href={calculator.href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-profit hover:text-profit-dark"
      >
        Open Calculator
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
