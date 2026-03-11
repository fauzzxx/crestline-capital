import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-heading font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-cream-muted">Page not found</p>
        <Link href="/" className="text-gold underline hover:no-underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
