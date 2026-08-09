import Link from "next/link";
import Container from "@/components/Container";
import { calculators } from "@/lib/calculators";
import { CalculatorCategory } from "@/types";

const categoryOrder: CalculatorCategory[] = ["Marketplace Fees", "Profit & ROI", "Shipping", "Currency"];

const categoryDescriptions: Record<CalculatorCategory, string> = {
  "Marketplace Fees": "Work out what Amazon and eBay actually take from a sale.",
  "Profit & ROI": "See what's left over, and how hard your money is working.",
  Shipping: "Estimate what a package will cost to send.",
  Currency: "Convert between the currencies sellers deal with most.",
};

export default function CalculatorCategories() {
  return (
    <section className="border-t border-line bg-surface py-14 sm:py-20">
      <Container>
        <h2 className="text-2xl font-semibold sm:text-3xl">Calculator Categories</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryOrder.map((category) => {
            const items = calculators.filter((c) => c.category === category);
            return (
              <div key={category} className="rounded-xl border border-line bg-paper p-5">
                <h3 className="font-display text-base font-semibold text-navy">{category}</h3>
                <p className="mt-1.5 text-sm text-muted">{categoryDescriptions[category]}</p>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.slug}>
                      <Link href={item.href} className="text-sm font-medium text-profit hover:text-profit-dark">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
