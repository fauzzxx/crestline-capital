import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crestlinecapital.in";

export const metadata: Metadata = {
  title: "Crestline Capital | Structured Bulk Real Estate Buying Network",
  description: "Join Crestline Capital's private buyer network and unlock builder-level pricing through structured capital pools.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Crestline Capital | Structured Bulk Real Estate Buying Network",
    description: "Join Crestline Capital's private buyer network and unlock builder-level pricing through structured capital pools.",
    url: siteUrl,
    siteName: "Crestline Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crestline Capital | Structured Bulk Real Estate Buying Network",
    description: "Join Crestline Capital's private buyer network and unlock builder-level pricing through structured capital pools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
