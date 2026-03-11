"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled;
  const linkClass = `text-sm font-medium tracking-wide transition-colors duration-300 ${
    isTransparent ? "text-white/90 hover:text-gold" : "text-cream-muted hover:text-gold"
  }`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-gradient-to-b from-black/60 to-transparent"
          : "bg-background/95 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 -ml-1">
          <div className="w-10 h-10 rounded-lg maroon-gradient-bg flex items-center justify-center border border-gold/20">
            <span className="font-heading text-lg font-bold gold-gradient-text">CC</span>
          </div>
          <div>
            <span className={`font-heading text-xl font-semibold block ${isTransparent ? "text-white" : "text-foreground"}`}>
              Crestline <span className="gold-gradient-text">Capital</span>
            </span>
            <span className={`text-[10px] uppercase tracking-widest block ${isTransparent ? "text-white/60" : "text-cream-muted"}`}>
              Private Buyer Network
            </span>
          </div>
        </Link>

        {/* Desktop nav — logo left, links center-right, CTA extreme right */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-end min-w-0">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href} className={`uppercase flex-shrink-0 ${linkClass}`}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={`uppercase flex-shrink-0 ${linkClass}`}>
                {link.label}
              </Link>
            )
          )}
          <Link href="/dashboard" className={`uppercase flex-shrink-0 ${linkClass}`}>
            Dashboard
          </Link>
          <Link href="/login" className={`uppercase flex-shrink-0 ${linkClass}`}>
            Login
          </Link>
          <Link
            href="/membership"
            className="flex-shrink-0 ml-2 -mr-1 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide rounded-md gold-gradient-bg text-accent-foreground hover:opacity-90 transition-opacity border border-gold/20"
          >
            Request Membership
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${isTransparent ? "text-white" : "text-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="uppercase text-sm text-cream-muted hover:text-gold transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="uppercase text-sm text-cream-muted hover:text-gold transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="uppercase text-sm text-cream-muted hover:text-gold py-2">Dashboard</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="uppercase text-sm text-cream-muted hover:text-gold py-2">Login</Link>
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-3 text-sm font-semibold uppercase rounded-lg gold-gradient-bg text-accent-foreground text-center mt-2"
              >
                Request Membership
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
