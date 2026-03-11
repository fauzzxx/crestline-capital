import Link from "next/link";
import { Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MembershipUnderReviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="section-container max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-maroon/20 text-gold mb-6">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Membership <span className="gold-gradient-text">Under Review</span>
          </h1>
          <p className="text-cream-muted mb-8">
            Your membership request is being reviewed by our team. You will be notified once approved. This usually takes 1–2 business days.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg gold-gradient-bg text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
