import { ReactNode } from "react";
import { ReceiptLine } from "@/types";

const toneClasses: Record<NonNullable<ReceiptLine["tone"]>, string> = {
  default: "text-ink",
  positive: "text-profit-dark",
  negative: "text-rust-dark",
  muted: "text-muted",
};

export default function ReceiptResult({
  title,
  lines,
  total,
  placeholder,
}: {
  title: string;
  lines: ReceiptLine[];
  total?: ReceiptLine;
  placeholder?: ReactNode;
}) {
  const isEmpty = lines.length === 0 && !total;

  return (
    <div className="receipt px-5 py-6 sm:px-6">
      <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</p>

      {isEmpty ? (
        <div className="py-8 text-center text-sm text-muted">
          {placeholder ?? "Enter your numbers and press Calculate to see a result."}
        </div>
      ) : (
        <div className="mt-4">
          {lines.map((line) => (
            <div key={line.label} className="receipt-row">
              <span className="text-muted">{line.label}</span>
              <span className={toneClasses[line.tone ?? "default"]}>{line.value}</span>
            </div>
          ))}

          {total && (
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3 font-mono">
              <span className="text-sm font-semibold text-ink">{total.label}</span>
              <span className={`text-lg font-semibold ${toneClasses[total.tone ?? "default"]}`}>
                {total.value}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
