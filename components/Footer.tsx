import Link from "next/link";
import Container from "@/components/Container";
import { calculators } from "@/lib/calculators";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm text-white">
              $
            </span>
            {site.name}
          </div>
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-navy">Navigate</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-profit">
                Home
              </Link>
            </li>
            <li>
              <Link href="/all-calculators" className="hover:text-profit">
                All Calculators
              </Link>
            </li>
            <li>
              <Link href="/amazon-fee-calculator" className="hover:text-profit">
                Amazon
              </Link>
            </li>
            <li>
              <Link href="/ebay-fee-calculator" className="hover:text-profit">
                eBay
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-navy">Calculators</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {calculators.slice(0, 5).map((calc) => (
              <li key={calc.slug}>
                <Link href={calc.href} className="hover:text-profit">
                  {calc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-navy">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-profit">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-profit">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-profit">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="hover:text-profit">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container>
          <p className="text-xs text-muted">
            © {year} {site.name}. All calculators are provided for estimation purposes only.
          </p>
        </Container>
      </div>
    </footer>
  );
}
