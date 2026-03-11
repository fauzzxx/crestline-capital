"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="section-container flex items-center justify-between h-20">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg maroon-gradient-bg flex items-center justify-center gold-glow">
            <span className="font-heading text-lg font-bold gold-gradient-text">CC</span>
          </div>
          <span className="font-heading text-xl font-semibold text-foreground">
            Crestline <span className="gold-gradient-text">Capital</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm flex items-center gap-2 transition-colors ${
              pathname === "/dashboard" ? "text-gold" : "text-cream-muted hover:text-gold"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/tools"
            className={`text-sm flex items-center gap-2 transition-colors ${
              pathname === "/dashboard/tools" ? "text-gold" : "text-cream-muted hover:text-gold"
            }`}
          >
            Calculators
          </Link>
          <Link href="/" className="text-sm text-cream-muted hover:text-gold transition-colors">
            Home
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-cream-muted hover:text-gold transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
