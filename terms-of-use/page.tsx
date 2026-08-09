import type { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${site.name}.`,
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted">Last updated: this page is a starting template — update the date once you finalize it.</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Estimates only</h2>
          <p className="mt-2">
            Every calculator on {site.name} produces an estimate based on the numbers you enter.
            Results are for general informational purposes and are not a guarantee of actual
            fees, costs, profit or shipping charges. Marketplace fees, shipping rates and currency
            values change and vary by seller, category, location and provider — always confirm
            exact figures with the relevant marketplace, carrier or financial institution.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">No professional advice</h2>
          <p className="mt-2">
            Nothing on this site is financial, tax, legal or business advice. You&rsquo;re
            responsible for verifying any numbers before making business decisions based on them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Use at your own risk</h2>
          <p className="mt-2">
            The site is provided &ldquo;as is,&rdquo; without warranties of any kind. To the
            fullest extent permitted by law, {site.name} is not liable for any losses or damages
            arising from your use of, or reliance on, the calculators.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Changes</h2>
          <p className="mt-2">
            We may update these terms or the calculators at any time. Continued use of the site
            after changes means you accept the updated terms.
          </p>
        </section>

        <p className="rounded-lg border border-dashed border-line bg-surface p-4 text-sm">
          This page is a general starting template, not legal advice. Have it reviewed by a
          qualified professional for your jurisdiction before relying on it.
        </p>
      </div>
    </Container>
  );
}
