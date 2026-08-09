import type { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: this page is a starting template — update the date once you finalize it.</p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-xl font-semibold text-navy">No accounts, no stored calculations</h2>
          <p className="mt-2">
            {site.name} does not require an account or login. Every calculator runs directly in
            your browser — the numbers you enter are not sent to, or stored on, our servers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Basic technical data</h2>
          <p className="mt-2">
            Like most websites, our hosting provider may automatically log basic technical
            information (such as IP address, browser type and pages visited) for security and
            performance purposes. This is standard web server behavior, not something specific to
            this site&rsquo;s calculators.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Cookies</h2>
          <p className="mt-2">
            This site does not use cookies to track you across other websites. If you add
            analytics or advertising tools later, update this section to describe exactly what
            they collect.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Third-party links</h2>
          <p className="mt-2">
            Pages may link to third-party sites, such as Amazon or eBay, for reference. We
            aren&rsquo;t responsible for the privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-navy">Changes to this policy</h2>
          <p className="mt-2">
            We may update this policy from time to time. Continued use of the site after changes
            means you accept the updated policy.
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
