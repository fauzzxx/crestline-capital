import { MembershipForm } from "./MembershipForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="section-container max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              Join Our Network
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-4">
              Request <span className="gold-gradient-text">Membership</span>
            </h1>
            <p className="text-cream-muted">
              Complete the form below. Our team will review and approve qualified applicants.
            </p>
          </div>
          <MembershipForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
