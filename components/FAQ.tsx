import Container from "@/components/Container";

const faqs = [
  {
    question: "What are e-commerce calculators?",
    answer:
      "They're simple tools that do the math sellers deal with every day — marketplace fees, profit, ROI, margins, shipping costs and currency conversion — so you don't have to build a spreadsheet.",
  },
  {
    question: "Are these calculators free?",
    answer: "Yes. Every calculator on Ecom Seller Tools is free to use, with no login and no signup required.",
  },
  {
    question: "Are Amazon and eBay fees exact?",
    answer:
      "No. Marketplace fees vary by category, account type, location and current policy. Our calculators let you enter the fee percentage that applies to you, so always confirm exact rates with Amazon or eBay directly.",
  },
  {
    question: "Can I use these calculators on mobile?",
    answer: "Yes. Every tool is built to work cleanly on desktop, tablet and mobile devices.",
  },
  {
    question: "How is profit calculated?",
    answer:
      "In general, profit is your revenue minus every cost involved in the sale — product cost, shipping, marketplace fees, advertising and any other costs you enter.",
  },
];

export default function FAQ() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="text-2xl font-semibold sm:text-3xl">Frequently Asked Questions</h2>

        <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {faq.question}
                <span className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
