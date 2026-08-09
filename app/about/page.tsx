import type { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Ecom Seller Tools — free calculators built for e-commerce sellers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">About {site.name}</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
        <p>
          {site.name} is a free set of calculators built for people who sell on marketplaces like
          eBay and Amazon. The goal is simple: give sellers a fast, no-signup way to work out
          fees, profit, ROI, margins, shipping costs and currency conversions before they commit
          to a listing.
        </p>
        <p>
          Every calculator runs entirely in your browser. Nothing you type is stored, uploaded, or
          shared — there&rsquo;s no login, no database and no payment system involved.
        </p>
        <p>
          Marketplace fees and shipping rates change often and vary by seller, category and
          location, so every calculator is built to let you enter your own numbers rather than
          relying on fixed assumptions. Always confirm exact fees with the marketplace or carrier
          you&rsquo;re using.
        </p>
      </div>
    </Container>
  );
}
