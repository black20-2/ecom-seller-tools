import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <span className="font-mono text-sm text-muted">404</span>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-base text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist. It may have moved, or the link may
        be out of date.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
      >
        Back to home
      </Link>
    </Container>
  );
}
