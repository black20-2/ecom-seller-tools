import Container from "@/components/Container";

const steps = [
  {
    number: "01",
    title: "Choose a calculator",
    description: "Pick the tool that matches what you need — fees, profit, ROI, shipping or currency.",
  },
  {
    number: "02",
    title: "Enter your numbers",
    description: "Type in your selling price, costs and fees. Everything runs in your browser.",
  },
  {
    number: "03",
    title: "Get your result",
    description: "See a clear, itemized breakdown instantly — no signup, no waiting.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-surface py-14 sm:py-20">
      <Container>
        <h2 className="text-2xl font-semibold sm:text-3xl">How It Works</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-mono text-sm text-profit">{step.number}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
