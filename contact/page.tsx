import type { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${site.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Contact</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
        <p>
          Have a question, spotted a bug, or want to suggest a new calculator? We&rsquo;d like to
          hear from you.
        </p>
        <div className="rounded-xl border border-dashed border-line bg-surface p-5 text-sm">
          <p className="font-medium text-ink">Site owner — add your real contact details here.</p>
          <p className="mt-1.5 text-muted">
            Replace this block with a support email address, or a contact form, before you deploy
            to production. No contact details are published on this page yet so nothing here is
            invented or placeholder-fake.
          </p>
        </div>
      </div>
    </Container>
  );
}
