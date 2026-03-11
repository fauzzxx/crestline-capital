import { ContactForm } from "./ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="section-container max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Get in <span className="gold-gradient-text">Touch</span>
            </h1>
            <p className="text-cream-muted">We&apos;d love to hear from you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="glass-card p-6 flex items-start gap-4">
              <span className="text-gold mt-1 text-xl">✉</span>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                <p className="text-sm text-cream-muted">info@crestlinecapital.in</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <span className="text-gold mt-1 text-xl">📍</span>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Office</h3>
                <p className="text-sm text-cream-muted">Financial District, Hyderabad</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
