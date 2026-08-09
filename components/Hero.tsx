import Container from "@/components/Container";
import HeroPreview from "@/components/HeroPreview";

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-profit-light px-3 py-1 font-mono text-xs font-medium uppercase tracking-wide text-profit-dark">
            Free · No login · No signup
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Free E-commerce Calculators
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Calculate fees, profit, ROI, margins, shipping costs and currency conversions with
            simple free tools.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroPreview />
        </div>
      </Container>
    </section>
  );
}
