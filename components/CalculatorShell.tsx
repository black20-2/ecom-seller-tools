import { ReactNode } from "react";
import Container from "@/components/Container";

export default function CalculatorShell({
  title,
  description,
  children,
  formulaTitle,
  formula,
  disclaimer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  formulaTitle?: string;
  formula?: ReactNode;
  disclaimer?: string;
}) {
  return (
    <Container className="py-10 sm:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base text-muted">{description}</p>
      </div>

      <div className="mt-8">{children}</div>

      {formula && (
        <div className="mt-14 max-w-3xl border-t border-line pt-8">
          <h2 className="font-display text-xl font-semibold text-navy">
            {formulaTitle ?? "How it's calculated"}
          </h2>
          <div className="mt-3 text-sm leading-relaxed text-muted">{formula}</div>
        </div>
      )}

      {disclaimer && (
        <div className="mt-8 max-w-3xl rounded-lg border border-line bg-surface px-4 py-3 text-xs text-muted">
          {disclaimer}
        </div>
      )}
    </Container>
  );
}
