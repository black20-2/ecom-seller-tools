"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import CalculatorCard from "@/components/CalculatorCard";
import { calculators } from "@/lib/calculators";

export default function CalculatorExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calculators;
    return calculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <label htmlFor="calculator-search" className="sr-only">
            Search a calculator
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M17 17l-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="calculator-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a calculator..."
              className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm shadow-sm focus:border-profit focus:ring-1 focus:ring-profit"
            />
          </div>
        </div>

        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {query ? "Search results" : "Popular E-commerce Calculators"}
          </h2>
          <span className="font-mono text-xs text-muted">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed border-line bg-surface px-4 py-8 text-center text-sm text-muted">
            No calculators match &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        )}
      </Container>
    </section>
  );
}
